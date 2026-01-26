import { BarChart, Eye, Film, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function Analytics({ videos }) {
    const totalViews = videos.reduce((acc, video) => acc + (video.views || 0), 0)
    const totalVideos = videos.length

    // Sort videos by views (descending)
    const topVideos = [...videos].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 3)

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Videos Card */}
            <Card className="bg-white border-purple-100 shadow-md hover:shadow-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-white hover:to-purple-50 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Total Videos</CardTitle>
                    <div className="bg-purple-100 p-2 rounded-full group-hover:bg-purple-200 transition-colors">
                        <Film className="h-4 w-4 text-purple-700" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-gray-900">{totalVideos}</div>
                    <p className="text-xs text-purple-600 font-medium mt-1">
                        +1 from last month
                    </p>
                </CardContent>
            </Card>

            {/* Total Views Card */}
            <Card className="bg-white border-purple-100 shadow-md hover:shadow-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-white hover:to-purple-50 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Total Views</CardTitle>
                    <div className="bg-purple-100 p-2 rounded-full group-hover:bg-purple-200 transition-colors">
                        <Eye className="h-4 w-4 text-purple-700" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-gray-900">{totalViews}</div>
                    <p className="text-xs text-purple-600 font-medium mt-1">
                        Across all videos
                    </p>
                </CardContent>
            </Card>

            {/* Top Performing Card */}
            <Card className="bg-white border-purple-100 shadow-md hover:shadow-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-white hover:to-purple-50 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Top Performing</CardTitle>
                    <div className="bg-purple-100 p-2 rounded-full group-hover:bg-purple-200 transition-colors">
                        <TrendingUp className="h-4 w-4 text-purple-700" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-sm space-y-3 pt-2">
                        {topVideos.map((video, index) => (
                            <div key={video.id} className="flex justify-between items-center p-1 hover:bg-white/50 rounded transition-colors">
                                <span className="truncate max-w-[150px] font-medium text-gray-700" title={video.title}>{video.title}</span>
                                <span className="text-purple-600 font-semibold text-xs bg-purple-50 px-2 py-0.5 rounded-full">{video.views || 0} views</span>
                            </div>
                        ))}
                        {topVideos.length === 0 && (
                            <span className="text-muted-foreground italic">No data yet</span>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Analytics
