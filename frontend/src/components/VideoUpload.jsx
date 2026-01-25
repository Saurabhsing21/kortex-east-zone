import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { Upload, X } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL

function VideoUpload({ onVideoUploaded }) {
    const { user } = useUser()
    const [title, setTitle] = useState('')
    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState('')

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile) {
            // Validate file type
            if (!selectedFile.type.startsWith('video/')) {
                setError('Please select a valid video file')
                return
            }
            // Validate file size (100MB max)
            if (selectedFile.size > 100 * 1024 * 1024) {
                setError('File size must be less than 100MB')
                return
            }
            setFile(selectedFile)
            setError('')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title.trim()) {
            setError('Please enter a video title')
            return
        }

        if (!file) {
            setError('Please select a video file')
            return
        }

        setUploading(true)
        setProgress(0)
        setError('')

        try {
            const token = await user.getToken()
            const formData = new FormData()
            formData.append('video', file)
            formData.append('title', title)

            await axios.post(`${API_URL}/videos/upload`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    )
                    setProgress(percentCompleted)
                }
            })

            // Reset form
            setTitle('')
            setFile(null)
            setProgress(0)

            // Notify parent component
            onVideoUploaded()
        } catch (err) {
            console.error('Upload error:', err)
            setError(err.response?.data?.error || 'Failed to upload video')
        } finally {
            setUploading(false)
        }
    }

    const removeFile = () => {
        setFile(null)
        setError('')
    }

    return (
        <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Upload New Video</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title Input */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Video Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter video title..."
                        className="input-field"
                        disabled={uploading}
                    />
                </div>

                {/* File Input */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Video File
                    </label>

                    {!file ? (
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-10 h-10 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">Video files only (Max 100MB)</p>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                accept="video/*"
                                onChange={handleFileChange}
                                disabled={uploading}
                            />
                        </label>
                    ) : (
                        <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Upload className="w-5 h-5 text-blue-600" />
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">{file.name}</p>
                                    <p className="text-xs text-gray-500">
                                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>
                            {!uploading && (
                                <button
                                    type="button"
                                    onClick={removeFile}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Progress Bar */}
                {uploading && (
                    <div>
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Uploading...</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={uploading || !title.trim() || !file}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {uploading ? 'Uploading...' : 'Upload Video'}
                </button>
            </form>
        </div>
    )
}

export default VideoUpload
