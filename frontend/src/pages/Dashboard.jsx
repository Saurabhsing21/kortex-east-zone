import { useUser } from '@clerk/clerk-react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import VideoCard from '../components/VideoCard'
import VideoUpload from '../components/VideoUpload'
import VideoPlayer from '../components/VideoPlayer'
import { Search, Video } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL

function Dashboard() {
    const { user } = useUser()
    const [videos, setVideos] = useState([])
    const [filteredVideos, setFilteredVideos] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(true)
    const [selectedVideo, setSelectedVideo] = useState(null)
    const [showUpload, setShowUpload] = useState(false)

    // Determine user role from metadata
    const userRole = user?.publicMetadata?.role || user?.unsafeMetadata?.role || 'user'
    const isAdmin = userRole === 'admin'

    useEffect(() => {
        fetchVideos()
    }, [])

    useEffect(() => {
        // Filter videos based on search query
        if (searchQuery.trim()) {
            const filtered = videos.filter(video =>
                video.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            setFilteredVideos(filtered)
        } else {
            setFilteredVideos(videos)
        }
    }, [searchQuery, videos])

    const fetchVideos = async () => {
        try {
            setLoading(true)
            const token = await user.getToken()
            const response = await axios.get(`${API_URL}/videos`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setVideos(response.data)
            setFilteredVideos(response.data)
        } catch (error) {
            console.error('Error fetching videos:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleVideoUploaded = () => {
        setShowUpload(false)
        fetchVideos()
    }

    const handleDeleteVideo = async (publicId) => {
        if (!confirm('Are you sure you want to delete this video?')) return

        try {
            const token = await user.getToken()
            await axios.delete(`${API_URL}/videos/${publicId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            fetchVideos()
        } catch (error) {
            console.error('Error deleting video:', error)
            alert('Failed to delete video')
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <Header userRole={userRole} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Welcome, {user?.firstName || user?.username || 'User'}
                    </h2>
                    <p className="text-gray-600">
                        {isAdmin ? 'Admin Dashboard - Manage your video library' : 'Browse and watch videos'}
                    </p>
                </div>

                {/* Search and Upload Section */}
                <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="relative flex-1 max-w-md w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search videos..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-field pl-10"
                        />
                    </div>

                    {isAdmin && (
                        <button
                            onClick={() => setShowUpload(!showUpload)}
                            className="btn-primary flex items-center gap-2"
                        >
                            <Video className="w-5 h-5" />
                            Upload Video
                        </button>
                    )}
                </div>

                {/* Upload Section */}
                {isAdmin && showUpload && (
                    <div className="mb-8">
                        <VideoUpload onVideoUploaded={handleVideoUploaded} />
                    </div>
                )}

                {/* Video Player Modal */}
                {selectedVideo && (
                    <VideoPlayer
                        video={selectedVideo}
                        onClose={() => setSelectedVideo(null)}
                    />
                )}

                {/* Videos Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
                    </div>
                ) : filteredVideos.length === 0 ? (
                    <div className="text-center py-20">
                        <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 text-lg">
                            {searchQuery ? 'No videos found matching your search' : 'No videos uploaded yet'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredVideos.map((video) => (
                            <VideoCard
                                key={video.id}
                                video={video}
                                isAdmin={isAdmin}
                                onPlay={() => setSelectedVideo(video)}
                                onDelete={() => handleDeleteVideo(video.public_id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard
