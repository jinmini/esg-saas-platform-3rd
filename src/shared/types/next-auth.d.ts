import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user: {
      role?: string;
    } & DefaultSession['user'];
  }

  interface User {
    role?: string;
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    role?: string;
  }
} 