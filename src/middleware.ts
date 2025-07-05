import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
    
    // 인증된 사용자가 auth 페이지에 접근하면 대시보드로 리다이렉트
    if (isAuthPage && token) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    
    // 관리자만 접근 가능한 페이지
    const adminOnlyPaths = ['/crawler']
    const isAdminPath = adminOnlyPaths.some(path => 
      req.nextUrl.pathname.startsWith(path)
    )
    
    if (isAdminPath && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl
        
        // 공개 페이지 (인증 불필요)
        const publicPaths = ['/', '/auth/login', '/auth/error']
        if (publicPaths.includes(pathname)) {
          return true
        }
        
        // API 라우트는 별도 처리
        if (pathname.startsWith('/api/')) {
          return true
        }
        
        // 보호된 페이지는 토큰 필요
        const protectedPaths = ['/dashboard', '/reports', '/crawler']
        const isProtectedPath = protectedPaths.some(path => 
          pathname.startsWith(path)
        )
        
        if (isProtectedPath) {
          return !!token
        }
        
        return true
      }
    }
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ]
} 