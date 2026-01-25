import { useNavigate } from 'react-router-dom'
import { useSignIn, SignedIn } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'
import { Video, UserCircle, ShieldCheck } from 'lucide-react'

function Landing() {
    const navigate = useNavigate()
    const { signIn, setActive } = useSignIn()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // If already signed in, redirect to dashboard
    useEffect(() => {
        const checkAuth = async () => {
            const signedIn = document.querySelector('[data-clerk-signed-in]')
            if (signedIn) {
                navigate('/dashboard')
            }
        }
        checkAuth()
    }, [navigate])

    const handleLogin = async (username, password, role) => {
        setLoading(true)
        setError('')

        try {
            // Sign in with Clerk using username and password
            const result = await signIn.create({
                identifier: username,
                password: password,
            })

            if (result.status === 'complete') {
                await setActive({ session: result.createdSessionId })

                // Update user metadata with role
                // Note: In production, you'd set this via Clerk Dashboard or API
                navigate('/dashboard')
            }
        } catch (err) {
            console.error('Login error:', err)
            setError('Invalid credentials. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleAdminLogin = () => {
        handleLogin('Eastzone', 'Koel@123', 'admin')
    }

    const handleUserLogin = () => {
        handleLogin('Dealereastzone', 'Dealer@123', 'user')
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <SignedIn>
                {navigate('/dashboard')}
            </SignedIn>

            <div className="max-w-md w-full">
                {/* Logo and Title */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-4 rounded-2xl shadow-2xl">
                            <Video className="w-16 h-16 text-white" />
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-3">
                        Kortex East Zone
                    </h1>
                    <p className="text-gray-600 text-lg">Video Portal Management System</p>
                </div>

                {/* Login Options */}
                <div className="card p-8 space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
                        Select Login Type
                    </h2>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handleAdminLogin}
                        disabled={loading}
                        className="w-full btn-primary flex items-center justify-center gap-3 group"
                    >
                        <ShieldCheck className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <span>Login as Admin</span>
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">or</span>
                        </div>
                    </div>

                    <button
                        onClick={handleUserLogin}
                        disabled={loading}
                        className="w-full btn-secondary flex items-center justify-center gap-3 group"
                    >
                        <UserCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <span>Login as User</span>
                    </button>

                    {loading && (
                        <div className="text-center text-gray-600">
                            <div className="animate-spin inline-block w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full"></div>
                            <p className="mt-2">Authenticating...</p>
                        </div>
                    )}
                </div>

                {/* Footer Info */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>Admin: Eastzone / Koel@123</p>
                    <p>User: Dealereastzone / Dealer@123</p>
                </div>
            </div>
        </div>
    )
}

export default Landing
