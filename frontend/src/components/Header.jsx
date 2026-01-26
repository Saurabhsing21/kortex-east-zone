import { Video, ShieldCheck, UserCircle, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

function Header({ userRole }) {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const isAdmin = userRole === 'admin'

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <header className="bg-white shadow-sm border-b border-purple-100 sticky top-0 z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo and Title */}
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2.5 rounded-xl shadow-md transform hover:rotate-6 transition-transform duration-300">
                            <Video className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                                Kortex East Zone
                            </h1>
                            <p className="text-xs text-purple-600 font-medium">Video Portal</p>
                        </div>
                    </div>

                    {/* User Info and Actions */}
                    <div className="flex items-center gap-4">
                        <Badge className={`gap-1.5 py-1.5 px-3 ${isAdmin ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white border-0' : 'bg-gray-100 text-gray-700'}`}>
                            {isAdmin ? 'Admin' : 'User'}
                        </Badge>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                    <Avatar className="h-10 w-10 border-2 border-purple-100">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user?.username}`} alt={user?.username} />
                                        <AvatarFallback className="bg-purple-50 text-purple-600 font-bold">
                                            {user?.username?.[0]?.toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user?.fullName || user?.username}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user?.username}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
