import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Play, Pause, ChevronLeft, ChevronRight, Heart, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import productShowcaseVideo from "@/assets/Product Showcase 3D.mp4";
import immersive3dVideo from "@/assets/Immersive 3D Portfolio.mp4";
import morphingUIVideo from "@/assets/Morphing UI Components.mp4";

// Videos array for Product Showcase 3D
const videos = [
  {
    id: 1,
    title: "3D Product Display",
    src: productShowcaseVideo,
    thumb: productShowcaseVideo,
    duration: "2:34"
  },
  {
    id: 2,
    title: "Immersive 3D Scene",
    src: immersive3dVideo,
    thumb: immersive3dVideo,
    duration: "1:45"
  },
  {
    id: 3,
    title: "Interactive Components",
    src: morphingUIVideo,
    thumb: morphingUIVideo,
    duration: "3:12"
  }
];

const ProductShowcasePortfolio = () => {
  const [activeVideo, setActiveVideo] = useState(videos[0]);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleVideoChange = (video: typeof videos[0]) => {
    setActiveVideo(video);
    setIsPlaying(true);
  };

  const navigateVideo = (direction: 'prev' | 'next') => {
    const currentIndex = videos.findIndex(v => v.id === activeVideo.id);
    let newIndex;

    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? videos.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === videos.length - 1 ? 0 : currentIndex + 1;
    }

    handleVideoChange(videos[newIndex]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Title */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Product Showcase 3D
          </h1>
          <p className="text-muted-foreground text-lg">
            from <Link to="/profile/carlos-silva" className="hover:text-primary transition-colors font-medium">Carlos Silva</Link> – E-commerce 3D Solutions
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Main Layout - Large Center Video with Right Navigation */}
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Main Video - Larger Center Box */}
              <div className="flex-1 relative max-w-6xl mx-auto">
                {/* Gradient Background Blob */}
                <div className="absolute -inset-6 bg-gradient-to-br from-orange-500/20 via-red-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-60" />

                {/* Main Video Card */}
                <Card className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <div className="aspect-video relative">
                    <video
                      key={activeVideo.id} // Force re-render when video changes
                      src={activeVideo.src}
                      className="w-full h-full object-cover"
                      autoPlay={isPlaying}
                      loop={true}
                      muted
                      playsInline
                      controls={false}
                      onLoadedData={() => setIsPlaying(true)}
                    />

                    {/* Navigation Arrows */}
                    <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => navigateVideo('prev')}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center transition-opacity hover:opacity-80"
                      >
                        <ChevronLeft className="h-8 w-8 text-white" />
                      </button>
                      <button
                        onClick={() => navigateVideo('next')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center transition-opacity hover:opacity-80"
                      >
                        <ChevronRight className="h-8 w-8 text-white" />
                      </button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Side Navigation - Square Boxes */}
              <div className="flex flex-col gap-3 lg:ml-12">
                {videos.map((video) => (
                  <Card
                    key={video.id}
                    className={`cursor-pointer transition-all duration-300 overflow-hidden rounded-lg aspect-square w-20 p-1 ${
                      activeVideo.id === video.id
                        ? 'ring-2 ring-gray-800 shadow-lg scale-105'
                        : 'ring-1 ring-gray-300 hover:ring-gray-500 hover:shadow-md hover:scale-102'
                    }`}
                    onClick={() => handleVideoChange(video)}
                  >
                    <div className="w-full h-full relative overflow-hidden rounded-md">
                      <video
                        src={video.src}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Element Description */}
            <div className="mt-20 text-center">
              <p className="text-muted-foreground text-lg mb-8">
                this element was built with...
              </p>

              {/* Tags */}
              <div className="flex justify-center gap-3 mb-16">
                {['react', 'three.js', 'e-commerce', '3d'].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-full text-sm font-medium text-orange-600 hover:bg-orange-500/20 transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-muted-foreground text-base">
                also you can view more elements below..
              </p>
            </div>

            {/* Additional Video Elements */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Video Element 1 */}
              <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
                <div className="relative aspect-video bg-gradient-hero overflow-hidden">
                  <video
                    src={immersive3dVideo}
                    className="w-full h-full object-cover"
                    controls={false}
                    loop={true}
                    autoPlay={true}
                    muted
                    playsInline
                  />

                  {/* Overlay Controls */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                    {/* Bottom Left Text */}
                    <div className="text-white">
                      <p className="text-sm opacity-90">Element</p>
                      <h3 className="font-bold text-lg">3D Environment</h3>
                    </div>

                    {/* Bottom Right Icons */}
                    <div className="flex gap-2">
                      <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Heart className="h-5 w-5 text-white" />
                      </button>
                      <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Bookmark className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Video Element 2 */}
              <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
                <div className="relative aspect-video bg-gradient-hero overflow-hidden">
                  <video
                    src={morphingUIVideo}
                    className="w-full h-full object-cover"
                    controls={false}
                    loop={true}
                    autoPlay={true}
                    muted
                    playsInline
                  />

                  {/* Overlay Controls */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                    {/* Bottom Left Text */}
                    <div className="text-white">
                      <p className="text-sm opacity-90">Element</p>
                      <h3 className="font-bold text-lg">Interactive Showcase</h3>
                    </div>

                    {/* Bottom Right Icons */}
                    <div className="flex gap-2">
                      <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Heart className="h-5 w-5 text-white" />
                      </button>
                      <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Bookmark className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* More Inspiration Section */}
            <div className="mt-32">
              {/* Text Section */}
              <div className="text-left mb-12">
                <p className="text-sm text-muted-foreground mb-2">more inspiration</p>
                <p className="text-2xl font-bold text-black">see more work of <Link to="/profile/carlos-silva" className="hover:text-primary transition-colors">Carlos Silva</Link></p>
              </div>

              {/* Video Box */}
              <div className="flex justify-start">
                <Card className="overflow-hidden rounded-2xl shadow-2xl max-w-md">
                  <div className="aspect-video relative">
                    <video
                      src={productShowcaseVideo}
                      className="w-full h-full object-cover"
                      controls={false}
                      loop={true}
                      autoPlay={true}
                      muted
                      playsInline
                    />
                  </div>
                </Card>
              </div>
            </div>

            {/* Mobile Layout - Thumbnails Below */}
            <div className="lg:hidden mt-8">
              <div className="flex justify-center gap-3">
                {videos.map((video) => (
                  <Card
                    key={video.id}
                    className={`cursor-pointer transition-all duration-300 overflow-hidden rounded-lg aspect-square w-16 p-1 ${
                      activeVideo.id === video.id
                        ? 'ring-2 ring-gray-800 shadow-lg scale-105'
                        : 'ring-1 ring-gray-300 hover:ring-gray-500 hover:shadow-md hover:scale-102'
                    }`}
                    onClick={() => handleVideoChange(video)}
                  >
                    <div className="w-full h-full relative overflow-hidden rounded-md">
                      <video
                        src={video.src}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductShowcasePortfolio;
