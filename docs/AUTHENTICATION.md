# Authentication System Documentation

## Overview

This e-commerce store implements a secure user authentication system using NextAuth.js with custom credentials provider and Sanity as the database backend. The system provides user registration, login, logout, and session management functionality.

## Features

- ✅ User Registration with email and password
- ✅ Secure password hashing using bcrypt (12 salt rounds)
- ✅ User login with email/password credentials
- ✅ JWT-based session management
- ✅ Secure logout functionality
- ✅ Protected routes with middleware
- ✅ Session persistence and automatic refresh
- ✅ Input validation and error handling
- ✅ Rate limiting protection (via NextAuth.js)

## Architecture

### Components

1. **NextAuth.js Configuration** (`src/app/api/auth/[...nextauth]/route.ts`)
   - Handles authentication logic
   - Configures JWT sessions
   - Manages user authorization

2. **User Registration API** (`src/app/api/auth/register/route.ts`)
   - Validates user input
   - Hashes passwords securely
   - Creates users in Sanity database

3. **Sanity User Schema** (`src/sanity/schemaTypes/user.ts`)
   - Defines user data structure
   - Includes profile information fields
   - Supports role-based access

4. **Authentication Pages**
   - Sign In: `/auth/signin`
   - Sign Up: `/auth/signup`
   - Protected Dashboard: `/dashboard`

5. **Authentication Components**
   - `SessionProvider`: Wraps app with NextAuth session context
   - `AuthNav`: Navigation component with auth status
   - `useAuth`: Custom hook for authentication state

## Security Features

### Password Security
- Minimum 8 character requirement
- bcrypt hashing with 12 salt rounds
- Passwords never stored in plain text

### Session Security
- JWT tokens with 24-hour expiration
- HTTP-only cookies (when configured)
- Secure session callbacks
- Automatic token refresh

### Input Validation
- Email format validation
- Password strength requirements
- Duplicate email prevention
- SQL injection protection via Sanity

### Route Protection
- Middleware-based route protection
- Automatic redirect to sign-in for protected routes
- Public route configuration

## Environment Variables

Required environment variables in `.env.local`:

```env
# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secure-secret-key-here

# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
```

## Usage Examples

### Using the Authentication Hook

```tsx
import { useAuth } from "@/hooks/useAuth"

function MyComponent() {
  const { user, isAuthenticated, isLoading, signOut } = useAuth()
  
  if (isLoading) return <div>Loading...</div>
  
  if (isAuthenticated) {
    return (
      <div>
        <p>Welcome, {user?.name}!</p>
        <button onClick={signOut}>Sign Out</button>
      </div>
    )
  }
  
  return <a href="/auth/signin">Sign In</a>
}
```

### Protecting API Routes

```tsx
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return new Response("Unauthorized", { status: 401 })
  }
  
  // Protected API logic here
}
```

### Creating Protected Pages

```tsx
"use client"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/signin")
    }
  }, [isAuthenticated, isLoading, router])
  
  if (isLoading) return <div>Loading...</div>
  if (!isAuthenticated) return null
  
  return <div>Protected content</div>
}
```

## Testing

### Automated Testing
Visit `/test-auth` to run automated tests for:
- User registration
- Duplicate email handling
- Input validation
- Error handling

### Manual Testing
1. Register a new user at `/auth/signup`
2. Sign in at `/auth/signin`
3. Visit protected routes like `/dashboard`
4. Test sign out functionality
5. Verify session persistence across page refreshes

## Database Schema

The user schema in Sanity includes:

```typescript
{
  _type: 'user',
  name: string,
  email: string,
  hashedPassword: string,
  role: 'user' | 'admin',
  createdAt: datetime,
  profile: {
    firstName?: string,
    lastName?: string,
    phone?: string,
    address?: {
      street: string,
      city: string,
      state: string,
      postalCode: string,
      country: string
    }
  }
}
```

## Security Best Practices Implemented

1. **Password Hashing**: Using bcrypt with high salt rounds
2. **Input Validation**: Server-side validation for all inputs
3. **Session Management**: Secure JWT tokens with expiration
4. **Route Protection**: Middleware-based access control
5. **Error Handling**: No information leakage in error messages
6. **Rate Limiting**: Built-in protection via NextAuth.js
7. **CSRF Protection**: Automatic CSRF token handling
8. **Secure Headers**: NextAuth.js handles security headers

## Future Enhancements

- [ ] Email verification for new accounts
- [ ] Password reset functionality
- [ ] Two-factor authentication (2FA)
- [ ] OAuth providers (Google, GitHub, etc.)
- [ ] Account lockout after failed attempts
- [ ] Password strength meter
- [ ] Remember me functionality
- [ ] Admin user management interface

## Troubleshooting

### Common Issues

1. **"Invalid credentials" error**: Check email/password combination
2. **Session not persisting**: Verify NEXTAUTH_SECRET is set
3. **Registration failing**: Check Sanity API token permissions
4. **Redirect loops**: Verify middleware configuration

### Debug Mode

Set `debug: true` in NextAuth configuration for detailed logging:

```typescript
export default NextAuth({
  debug: process.env.NODE_ENV === 'development',
  // ... other config
})
```

## Support

For issues or questions about the authentication system:
1. Check the console for error messages
2. Verify environment variables are set correctly
3. Test with the `/test-auth` page
4. Review NextAuth.js documentation for advanced configuration 