import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Eye, Bookmark, ExternalLink } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import immersive3dVideo from "@/assets/Immersive 3D Portfolio.mp4";
import animatedLandingVideo from "@/assets/Animated Landing Experience.mp4";
import productShowcaseVideo from "@/assets/Product Showcase 3D.mp4";
import dataVisualizationVideo from "@/assets/Interactive Data Visualization.mp4";
import fluidTypographyVideo from "@/assets/Fluid Typography Animation.mp4";
import particleSystemVideo from "@/assets/Particle System Background.mp4";
import morphingUIVideo from "@/assets/Morphing UI Components.mp4";
import cyberpunkVideo from "@/assets/Cyberpunk Dashboard.mp4";
import organicShapeVideo from "@/assets/Organic Shape Loader.mp4";
import parallaxScrollVideo from "@/assets/Parallax Scroll Story.mp4";
import glassmorphismVideo from "@/assets/Glassmorphism UI Kit.mp4";
import gradientGeneratorVideo from "@/assets/AI Gradient Generator.mp4";

const Inspiration = () => {
  const navigate = useNavigate();
  const [itemsToShow, setItemsToShow] = useState(6);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"]);

  const handleCardClick = (design: any) => {
    if (design.title === "Immersive 3D Portfolio") {
      navigate('/portfolio/immersive-3d');
    } else if (design.title === "Animated Landing Experience") {
      navigate('/portfolio/animated-landing');
    } else if (design.title === "Product Showcase 3D") {
      navigate('/portfolio/product-showcase');
    } else if (design.title === "Fluid Typography Animation") {
      navigate('/portfolio/fluid-typography');
    }
    // Add more conditions for other portfolio pages as needed
  };

  const designs = [
    {
      title: "Immersive 3D Portfolio",
      creator: "nthxdev",
      likes: "1.2k",
      views: "15k",
      tags: ["Three.js", "WebGL", "Portfolio"],
      video: immersive3dVideo,
    },
    {
      title: "Animated Landing Experience",
      creator: "Maya Patel",
      likes: "890",
      views: "12k",
      tags: ["GSAP", "Scroll Animation"],
      video: animatedLandingVideo,
    },
    {
      title: "Product Showcase 3D",
      creator: "Carlos Silva",
      likes: "2.1k",
      views: "24k",
      tags: ["React", "Three.js", "E-commerce"],
      video: productShowcaseVideo,
    },
    {
      title: "Interactive Data Visualization",
      creator: "Rajan Kumar",
      likes: "756",
      views: "9k",
      tags: ["D3.js", "Canvas", "Data"],
      video: dataVisualizationVideo,
    },
    {
      title: "Fluid Typography Animation",
      creator: "nthxdev",
      likes: "1.5k",
      views: "18k",
      tags: ["CSS", "Animation", "Typography"],
      video: fluidTypographyVideo,
    },
    {
      title: "Particle System Background",
      creator: "Ansh Bhardwaj",
      likes: "980",
      views: "11k",
      tags: ["Canvas", "Particles", "WebGL"],
      video: particleSystemVideo,
    },
    {
      title: "Morphing UI Components",
      creator: "Vaishnavi Sharma",
      likes: "1.8k",
      views: "21k",
      tags: ["Framer Motion", "React"],
      video: morphingUIVideo,
    },
    {
      title: "Cyberpunk Dashboard",
      creator: "Nisha",
      likes: "2.3k",
      views: "28k",
      tags: ["UI/UX", "Dashboard", "Neon"],
      video: cyberpunkVideo,
    },
    {
      title: "Organic Shape Loader",
      creator: "Ansh Bhardwaj",
      likes: "670",
      views: "8k",
      tags: ["SVG", "Animation", "Loader"],
      video: organicShapeVideo,
    },
    {
      title: "Parallax Scroll Story",
      creator: "nthxdev",
      likes: "1.4k",
      views: "16k",
      tags: ["Scroll", "GSAP", "Storytelling"],
      video: parallaxScrollVideo,
    },
    {
      title: "Glassmorphism UI",
      creator: "Rajan",
      likes: "1.9k",
      views: "23k",
      tags: ["UI Kit", "Glassmorphism"],
      video: glassmorphismVideo,
    },
    {
      title: "Gradient Generator",
      creator: "Rajan",
      likes: "820",
      views: "10k",
      tags: ["Tool", "Gradients", "AI"],
      video: gradientGeneratorVideo,
    },
  ];

  const categories = ["All", "3D", "Animation", "UI/UX", "Experimental", "Tools"];

  const handleCategoryToggle = (category: string) => {
    if (category === "All") {
      setSelectedCategories(["All"]);
    } else {
      let newSelected = selectedCategories.filter(c => c !== "All");
      if (newSelected.includes(category)) {
        newSelected = newSelected.filter(c => c !== category);
      } else {
        newSelected = [...newSelected, category];
      }
      // If no categories selected, default to "All"
      if (newSelected.length === 0) {
        newSelected = ["All"];
      }
      setSelectedCategories(newSelected);
    }
  };

  const filteredDesigns = selectedCategories.includes("All")
    ? designs
    : designs.filter(design =>
        selectedCategories.some(category =>
          design.tags.some(tag =>
            tag.toLowerCase().includes(category.toLowerCase()) ||
            (category === "3D" && (tag.includes("Three.js") || tag.includes("WebGL") || tag.includes("3D"))) ||
            (category === "UI/UX" && (tag.includes("UI") || tag.includes("UX") || tag.includes("Dashboard"))) ||
            (category === "Tools" && (tag.includes("Tool") || tag.includes("Generator")))
          )
        )
      );

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Design <span className="bg-gradient-accent bg-clip-text text-transparent">Inspiration</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover stunning designs, animations, and creative projects from talented developers and designers
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategories.includes(category) ? "default" : "outline"}
              className={selectedCategories.includes(category) ? "bg-primary" : ""}
              onClick={() => handleCategoryToggle(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Design Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDesigns.slice(0, itemsToShow).map((design, index) => (
            <Card
              key={index}
              className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all"
              onClick={() => handleCardClick(design)}
            >
              {/* Design Preview */}
              <div className="relative aspect-video bg-gradient-hero overflow-hidden">
                <video
                  src={design.video}
                  className="w-full h-full object-cover"
                  controls={false}
                  loop={false}
                  autoPlay={true}
                  muted
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <Button size="icon" variant="secondary" className="rounded-full">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="secondary" className="rounded-full">
                    <Bookmark className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="secondary" className="rounded-full">
                    <ExternalLink className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Design Info */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                    {design.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    by <Link to={`/profile/${design.creator.toLowerCase()}`} className="hover:text-primary transition-colors font-medium">
                      {design.creator}
                    </Link>
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {design.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>{design.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{design.views}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {itemsToShow < filteredDesigns.length && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setItemsToShow(prev => prev + 3)}
            >
              Load More Designs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inspiration;
