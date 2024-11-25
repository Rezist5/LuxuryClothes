import SignInForm from '@/components/auth/SignInForm'

export default function SignInPage() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8">Sign In</h1>
      <SignInForm />
    </div>
  )
}