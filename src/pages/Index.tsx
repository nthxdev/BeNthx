import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  Boxes,
  Sparkles,
  Video,
  ArrowRight,
  Star,
  TrendingUp,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";
import threeJsImage from "@/assets/Three.js 3D Mastery.png";
import gsapImage from "@/assets/GSAP Animation Pro.png";
import reactFramerImage from "@/assets/React + Framer Magic.png";

const Index = () => {
  const technologies = [
    { name: "JavaScript", icon: Code2, color: "bg-yellow-500/10 text-yellow-600" },
    { name: "React", icon: Code2, color: "bg-blue-500/10 text-blue-600" },
    { name: "Three.js", icon: Boxes, color: "bg-purple-500/10 text-purple-600" },
    { name: "GSAP", icon: Sparkles, color: "bg-green-500/10 text-green-600" },
    { name: "Framer Motion", icon: Sparkles, color: "bg-pink-500/10 text-pink-600" },
    { name: "FFMPEG", icon: Video, color: "bg-red-500/10 text-red-600" },
  ];

  const featuredCourses = [
    {
      title: "Three.js 3D Mastery",
      description: "Create stunning 3D web experiences",
      duration: "12 hours",
      level: "Intermediate",
      image: threeJsImage,
    },
    {
      title: "GSAP Animation Pro",
      description: "Master web animations with GSAP",
      duration: "8 hours",
      level: "Beginner",
      image: gsapImage,
    },
    {
      title: "React + Framer Magic",
      description: "Build interactive React animations",
      duration: "10 hours",
      level: "Intermediate",
      image: reactFramerImage,
    },
  ];

  const stats = [
    { icon: Users, label: "Active Learners", value: "10,000+" },
    { icon: Code2, label: "Courses", value: "50+" },
    { icon: Star, label: "Projects Shared", value: "5,000+" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-radial opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <Badge className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
              <Sparkles className="h-3 w-3 mr-1" />
              Learn. Create. Inspire.
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight">
              Master Frontend
              <br />
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                Development & Design
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Learn cutting-edge technologies, share your creative designs, and join a community of passionate developers and designers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/auth">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Explore Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/inspiration">
                <Button size="lg" variant="outline" className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20">
                  View Inspiration
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary-foreground/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-4 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-3 bg-primary/10 rounded-lg">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <Badge variant="outline" className="border-primary text-primary">
              Technologies
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Learn Modern Frontend Stack
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Master the most in-demand technologies used by top companies and creative studios worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {technologies.map((tech, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center ${tech.color} group-hover:scale-110 transition-transform`}>
                  <tech.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-sm">{tech.name}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div className="space-y-2">
              <Badge variant="outline" className="border-primary text-primary">
                <TrendingUp className="h-3 w-3 mr-1" />
                Popular Courses
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Start Your Journey</h2>
            </div>
            <Link to="/auth">
              <Button variant="ghost" className="hidden md:flex">
                View All Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCourses.map((course, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group"
              >
                <div className="aspect-video bg-gradient-hero rounded-lg mb-4 overflow-hidden group-hover:scale-105 transition-transform">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Badge variant="secondary">{course.level}</Badge>
                    <Badge variant="outline">{course.duration}</Badge>
                  </div>
                  <h3 className="font-bold text-xl">{course.title}</h3>
                  <p className="text-muted-foreground">{course.description}</p>
                  <Link to="/auth">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link to="/auth">
              <Button variant="outline">
                View All Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-hero p-8 md:p-12 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
                Ready to Start Creating?
              </h2>
              <p className="text-lg text-primary-foreground/90">
                Join thousands of developers and designers learning, creating, and sharing amazing projects.
              </p>
              <Link to="/auth">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
