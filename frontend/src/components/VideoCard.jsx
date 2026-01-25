import { Play, Trash2, Clock } from 'lucide-react'

function VideoCard({ video, isAdmin, onPlay, onDelete }) {
    const formatDuration = (duration) => {
        if (!duration) return 'N/A'
        const minutes = Math.floor(duration / 60)
        const seconds = Math.floor(duration % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    return (
        <div className="card group relative">
            {/* Video Thumbnail */}
            <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-xl overflow-hidden">
                <img
                    src={`${video.secure_url.replace('/upload/', '/upload/w_400,h_225,c_fill/')}.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x225/1e293b/ffffff?text=Video'
                    }}
                />

                {/* Play Overlay */}
                <div
                    onClick={onPlay}
                    className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center cursor-pointer"
                >
                    <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
                        <div className="bg-white rounded-full p-4 shadow-2xl">
                            <Play className="w-8 h-8 text-blue-600 fill-blue-600" />
                        </div>
                    </div>
                </div>

                {/* Duration Badge */}
                {video.duration && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDuration(video.duration)}
                    </div>
                )}
            </div>

            {/* Video Info */}
            <div className="p-4">
                <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2">
                    {video.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                    Uploaded on {formatDate(video.createdAt)}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                    <button
                        onClick={onPlay}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                        <Play className="w-4 h-4" />
                        Play
                    </button>

                    {isAdmin && (
                        <button
                            onClick={onDelete}
                            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-200"
                            title="Delete video"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VideoCard
