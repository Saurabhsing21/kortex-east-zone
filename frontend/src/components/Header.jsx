import { useUser, UserButton } from '@clerk/clerk-react'
import { Video, ShieldCheck, UserCircle } from 'lucide-react'

function Header({ userRole }) {
    const { user } = useUser()
    const isAdmin = userRole === 'admin'

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo and Title */}
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-2 rounded-lg">
                            <Video className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                Kortex East Zone
                            </h1>
                            <p className="text-xs text-gray-500">Video Portal</p>
                        </div>
                    </div>

                    {/* User Info and Actions */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                            {isAdmin ? (
                                <ShieldCheck className="w-5 h-5 text-blue-600" />
                            ) : (
                                <UserCircle className="w-5 h-5 text-gray-600" />
                            )}
                            <span className="text-sm font-semibold text-gray-700">
                                {isAdmin ? 'Admin' : 'User'}
                            </span>
                        </div>
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
