import '@testing-library/jest-dom'
import { vi } from 'vitest'

// IndexedDB Mock (브라우저 환경이 아닐 때 사용)
Object.defineProperty(window, 'indexedDB', {
  writable: true,
  value: {
    open: vi.fn(),
    deleteDatabase: vi.fn(),
  },
})

// Next Auth Mock
vi.mock('next-auth/react', () => ({
  useSession: vi.fn(() => ({
    data: null,
    status: 'unauthenticated'
  })),
  signIn: vi.fn(),
  signOut: vi.fn(),
  SessionProvider: ({ children }: { children: React.ReactNode }) => children,
}))

// NextAuth/JWT Mock
vi.mock('next-auth/jwt', () => ({
  getToken: vi.fn(),
}))

// Next Router Mock
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  })),
  useSearchParams: vi.fn(),
  usePathname: vi.fn(),
}))

// 환경 변수 Mock
process.env.NEXTAUTH_SECRET = 'test-secret'
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:8000' 