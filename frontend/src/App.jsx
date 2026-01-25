import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route
                    path="/dashboard"
                    element={
                        <>
                            <SignedIn>
                                <Dashboard />
                            </SignedIn>
                            <SignedOut>
                                <Navigate to="/" replace />
                            </SignedOut>
                        </>
                    }
                />
            </Routes>
        </Router>
    )
}

export default App
