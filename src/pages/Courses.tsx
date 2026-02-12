import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import threeJsImage from "@/assets/Three.js 3D Mastery.png";
import gsapImage from "@/assets/GSAP Animation Pro.png";
import reactFramerImage from "@/assets/React + Framer Magic.png";
import animeImage from "@/assets/Anime.js Visual Learning.png";
import webglImage from "@/assets/WebGL Shaders Deep Dive.png";
import reactThreeFiberImage from "@/assets/React Three Fiber Complete.png";
import jsAnimationImage from "@/assets/JavaScript Animation Fundamentals.webp";
import nextJsThreeImage from "@/assets/Next.js + Three.js Integration.webp";
import canvasImage from "@/assets/Canvas API Masterclass.png";

const Courses = () => {
  const navigate = useNavigate();
  const [itemsToShow, setItemsToShow] = useState(6);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"]);

  const handleViewCourse = (courseId: string) => {
    // Map course titles to IDs for navigation
    const courseIdMap: { [key: string]: string } = {
      "WebGL Shaders Deep Dive": "webgl-shaders",
      "React + Framer Magic": "react-framer",
      "Anime.js Visual Learning": "anime-js",
      "React Three Fiber Complete": "react-three-fiber",
      "JavaScript Animation Fundamentals": "js-animation",
      "Next.js + Three.js Integration": "next-three",
      "Canvas API Masterclass": "canvas-api",
      "Three.js 3D Mastery": "three-js-mastery",
      "GSAP Animation Pro": "gsap-pro"
    };

    const id = courseIdMap[courseId] || courseId.toLowerCase().replace(/\s+/g, '-');
    navigate(`/course/${id}`);
  };

  const courses = [
    {
      title: "WebGL Shaders Deep Dive",
      description: "Master GLSL and create stunning visual effects. From basics to advanced techniques.",
      level: "Advanced",
      duration: "15 hours",
      students: "890",
      rating: "4.9",
      category: "WebGL",
      image: webglImage,
      creator: "nthxdev",
    },
    {
      title: "React + Framer Magic",
      description: "Build interactive React animations with Framer Motion. Create delightful user experiences.",
      level: "Intermediate",
      duration: "10 hours",
      students: "1,890",
      rating: "4.7",
      category: "React",
      image: reactFramerImage,
      creator: "Alex Chen",
    },
    {
      title: "Anime.js Visual Learning",
      description: "Learn Anime.js through practical examples. Create beautiful animations with ease.",
      level: "Beginner",
      duration: "6 hours",
      students: "1,560",
      rating: "4.6",
      category: "Animation",
      image: animeImage,
      creator: "Sarah Kim",
    },
    {
      title: "React Three Fiber Complete",
      description: "Combine React with Three.js. Build 3D React applications with modern tools.",
      level: "Intermediate",
      duration: "14 hours",
      students: "1,230",
      rating: "4.8",
      category: "React",
      image: reactThreeFiberImage,
      creator: "Marcus Rodriguez",
    },
    {
      title: "JavaScript Animation Fundamentals",
      description: "Learn animation principles using vanilla JavaScript. Build a solid foundation.",
      level: "Beginner",
      duration: "7 hours",
      students: "4,560",
      rating: "4.7",
      category: "JavaScript",
      image: jsAnimationImage,
      creator: "Emma Thompson",
    },
    {
      title: "Next.js + Three.js Integration",
      description: "Build performant 3D websites with Next.js. Server-side rendering for 3D content.",
      level: "Advanced",
      duration: "11 hours",
      students: "670",
      rating: "4.8",
      category: "Next.js",
      image: nextJsThreeImage,
      creator: "David Park",
    },
    {
      title: "Canvas API Masterclass",
      description: "Master the HTML5 Canvas API. Create games, visualizations, and interactive art.",
      level: "Intermediate",
      duration: "9 hours",
      students: "2,100",
      rating: "4.6",
      category: "Canvas",
      image: canvasImage,
      creator: "Lisa Wong",
    },
        {
      title: "Three.js 3D Mastery",
      description: "Create stunning 3D web experiences from scratch. Learn WebGL, shaders, and advanced 3D techniques.",
      level: "Intermediate",
      duration: "12 hours",
      students: "2,340",
      rating: "4.8",
      category: "3D Graphics",
      image: threeJsImage,
      creator: "James Mitchell",
    },
    {
      title: "GSAP Animation Pro",
      description: "Master web animations with GSAP. Build smooth, performant animations for modern websites.",
      level: "Beginner",
      duration: "8 hours",
      students: "3,120",
      rating: "4.9",
      category: "Animation",
      image: gsapImage,
      creator: "Rachel Green",
    },
  ];

  const categories = ["All", "JavaScript", "React", "3D Graphics", "Animation", "WebGL"];

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

  const filteredCourses = selectedCategories.includes("All")
    ? courses
    : courses.filter(course => selectedCategories.includes(course.category));

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Explore Our <span className="bg-gradient-hero bg-clip-text text-transparent">Courses</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn from industry experts and master the skills you need to build amazing web experiences
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

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.slice(0, itemsToShow).map((course, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group"
            >
              {/* Course Thumbnail */}
              <div className="aspect-video bg-gradient-hero overflow-hidden group-hover:scale-105 transition-transform">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Course Content */}
              <div className="p-6 space-y-4">
                <div className="flex gap-2">
                  <Badge variant="secondary">{course.level}</Badge>
                  <Badge variant="outline">{course.category}</Badge>
                </div>

                <div>
                  <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {course.description}
                  </p>
                  {course.creator && (
                    <p className="text-sm text-muted-foreground mt-1">
                      by <Link to={`/profile/${course.creator.toLowerCase()}`} className="hover:text-primary transition-colors font-medium">
                        {course.creator}
                      </Link>
                    </p>
                  )}
                </div>

                {/* Course Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => handleViewCourse(course.title)}
                >
                  View Course
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {itemsToShow < filteredCourses.length && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setItemsToShow(prev => prev + 3)}
            >
              Load More Courses
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
