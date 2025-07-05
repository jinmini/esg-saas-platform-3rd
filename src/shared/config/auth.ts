import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('이메일과 비밀번호를 입력해주세요.')
        }

        try {
          // TODO: 실제 API 연동 시 교체
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            })
          })

          if (!res.ok) {
            throw new Error('인증에 실패했습니다.')
          }

          const user = await res.json()
          
          if (user) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
              accessToken: user.accessToken,
              refreshToken: user.refreshToken,
            }
          }
        } catch (error) {
          // 임시 Mock 인증 (개발용)
          if (credentials.email === 'admin@esg-platform.com' && credentials.password === 'admin123') {
            return {
              id: '1',
              email: 'admin@esg-platform.com',
              name: 'ESG 관리자',
              role: 'admin',
              accessToken: 'mock-access-token',
              refreshToken: 'mock-refresh-token',
            }
          }
          
          if (credentials.email === 'user@esg-platform.com' && credentials.password === 'user123') {
            return {
              id: '2',
              email: 'user@esg-platform.com',
              name: 'ESG 사용자',
              role: 'user',
              accessToken: 'mock-access-token',
              refreshToken: 'mock-refresh-token',
            }
          }
        }
        
        return null
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.user.role = token.role as string
      return session
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login', // 에러 시 로그인 페이지로 리다이렉트
  },
  secret: process.env.NEXTAUTH_SECRET,
  // 추가 보안 설정
  debug: process.env.NODE_ENV === 'development',
} 