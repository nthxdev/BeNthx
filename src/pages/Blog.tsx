import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import gsapAnimeImage from "@/assets/GSAP vs Anime.js Which Animation Library Should You Use.jpg";
import threeJsReactImage from "@/assets/Building a 3D Website with Three.js and React.png";

const Blog = () => {
  const [itemsToShow, setItemsToShow] = useState(6);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"]);

  const posts = [
    {
      title: "GSAP vs Anime.js: Which Animation Library Should You Use?",
      excerpt: "A comprehensive comparison of the two most popular JavaScript animation libraries and when to use each one.",
      category: "Comparison",
      readTime: "8 min",
      date: "Dec 12, 2024",
      featured: true,
      image: gsapAnimeImage,
      author: "Sarah Kim",
    },
    {
      title: "Building a 3D Website with Three.js and React",
      excerpt: "Learn how to create an immersive 3D web experience using Three.js, React Three Fiber, and modern web technologies.",
      category: "Tutorial",
      readTime: "12 min",
      date: "Dec 15, 2024",
      featured: true,
      image: threeJsReactImage,
      author: "nthxdev",
    },
    {
      title: "React + Three Fiber Setup Guide",
      excerpt: "Step-by-step guide to setting up React Three Fiber in your Next.js project with proper TypeScript configuration.",
      category: "Guide",
      readTime: "10 min",
      date: "Dec 10, 2024",
      featured: false,
      author: "Marcus Rodriguez",
    },
    {
      title: "Creating Smooth Scroll Animations with GSAP ScrollTrigger",
      excerpt: "Master the art of scroll-based animations and create engaging user experiences with GSAP ScrollTrigger.",
      category: "Tutorial",
      readTime: "15 min",
      date: "Dec 8, 2024",
      featured: false,
    },
    {
      title: "WebGL Shaders for Beginners",
      excerpt: "Introduction to GLSL and creating your first custom shaders for stunning visual effects.",
      category: "Tutorial",
      readTime: "20 min",
      date: "Dec 5, 2024",
      featured: false,
    },
    {
      title: "Optimizing Three.js Performance",
      excerpt: "Best practices and techniques to ensure your 3D web applications run smoothly on all devices.",
      category: "Performance",
      readTime: "14 min",
      date: "Dec 3, 2024",
      featured: false,
    },
    {
      title: "Framer Motion Advanced Techniques",
      excerpt: "Deep dive into advanced Framer Motion patterns including layout animations and gesture controls.",
      category: "Tutorial",
      readTime: "18 min",
      date: "Nov 30, 2024",
      featured: false,
    },
    {
      title: "Building Interactive Data Visualizations",
      excerpt: "Create engaging data visualizations using D3.js, Canvas API, and modern JavaScript techniques.",
      category: "Guide",
      readTime: "16 min",
      date: "Nov 28, 2024",
      featured: false,
    },
    {
      title: "The Future of Web Animation",
      excerpt: "Exploring upcoming web animation APIs, tools, and trends shaping the future of interactive web design.",
      category: "Opinion",
      readTime: "7 min",
      date: "Nov 25, 2024",
      featured: false,
    },
  ];

  const categories = ["All", "Tutorial", "Guide", "Comparison", "Performance", "Opinion"];

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

  const filteredRecentPosts = selectedCategories.includes("All")
    ? posts.filter((post) => !post.featured)
    : posts.filter((post) => !post.featured && selectedCategories.includes(post.category));

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Blog & <span className="bg-gradient-hero bg-clip-text text-transparent">Tutorials</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn from detailed tutorials, guides, and insights about modern web development and design
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

        {/* Featured Posts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts
              .filter((post) => post.featured)
              .map((post, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group"
                >
                  <div className="aspect-video bg-gradient-accent overflow-hidden group-hover:scale-105 transition-transform">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <BookOpen className="h-16 w-16 text-accent-foreground opacity-80" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 space-y-4">
                    <Badge variant="secondary">{post.category}</Badge>
                    <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    {post.author && (
                      <p className="text-sm text-muted-foreground">
                        by <Link to={`/profile/${post.author.toLowerCase()}`} className="hover:text-primary transition-colors font-medium">
                          {post.author}
                        </Link>
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
          </div>
        </div>

        {/* All Posts */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecentPosts
              .slice(0, itemsToShow)
              .map((post, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group space-y-4"
                >
                  <div className="space-y-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Card>
              ))}
          </div>
        </div>

        {/* Load More */}
        {itemsToShow < filteredRecentPosts.length && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setItemsToShow(prev => prev + 3)}
            >
              Load More Articles
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
