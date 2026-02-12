import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronRight,
  Play,
  Star,
  Users,
  Clock,
  Award,
  CheckCircle,
  Gift
} from "lucide-react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PaymentModal from "@/components/PaymentModal";

// Import project videos
import planetsVideo from "@/assets/The Planets.mp4";
import zajnoVideo from "@/assets/Zajno.com.webm";
import devebVideo from "@/assets/Deveb.co.mp4";
import blobMixerVideo from "@/assets/Blob Mixer.webm";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [couponScratched, setCouponScratched] = useState(false);
  const [buyOption, setBuyOption] = useState<'course' | 'membership'>('course');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Mock course data - in real app this would come from API
  const getCourseData = (courseId: string) => {
    const courses: { [key: string]: any } = {
      "webgl-shaders": {
        id: "webgl-shaders",
        title: "Introducing Three.js Domination",
        subtitle: "Create web experiences people won't believe",
        description: "Master WebGL shaders and create stunning visual effects for the web. Learn advanced techniques from basics to professional-level implementations.",
        duration: "8 hours",
        level: "Advanced",
        students: "1,250",
        rating: "4.9",
        price: "$99",
        originalPrice: "$199",
        instructor: "nthxdev",
        category: "WebGL"
      },
      "react-framer": {
        id: "react-framer",
        title: "React + Framer Magic",
        subtitle: "Build interactive React animations with Framer Motion",
        description: "Create delightful user experiences with smooth animations and transitions using React and Framer Motion.",
        duration: "10 hours",
        level: "Intermediate",
        students: "1,890",
        rating: "4.7",
        price: "$79",
        originalPrice: "$149",
        instructor: "Alex Chen",
        category: "React"
      },
      "anime-js": {
        id: "anime-js",
        title: "Anime.js Visual Learning",
        subtitle: "Create beautiful animations with ease",
        description: "Learn Anime.js through practical examples and build stunning web animations.",
        duration: "6 hours",
        level: "Beginner",
        students: "1,560",
        rating: "4.6",
        price: "$49",
        originalPrice: "$99",
        instructor: "Sarah Kim",
        category: "Animation"
      }
    };

    return courses[courseId] || courses["webgl-shaders"]; // Default to webgl course
  };

  const course = getCourseData(courseId || "webgl-shaders");

  const syllabusSections = [
    {
      title: "THREE.JS",
      topics: [
        "What is Three.js",
        "Why Three.js",
        "Learn Modeling",
        "Creating Object",
        "Applying Textures",
        "Understanding Shaders",
        "Camera + Lights",
        "Controls + Interactions"
      ]
    },
    {
      title: "The Planets",
      topics: [
        "Solar System Basics",
        "Planet Textures",
        "Orbital Mechanics",
        "Lighting Effects"
      ]
    },
    {
      title: "Zajno",
      topics: [
        "3D Portfolio Setup",
        "Interactive Elements",
        "Performance Optimization",
        "Deployment Strategies"
      ]
    },
    {
      title: "Animating the Scene",
      topics: [
        "Keyframe Animation",
        "Morphing Objects",
        "Particle Systems",
        "Shader Animations"
      ]
    },
    {
      title: "Deployment",
      topics: [
        "Build Optimization",
        "CDN Integration",
        "Performance Monitoring",
        "Cross-browser Testing"
      ]
    }
  ];

  const projects = [
    { name: "The Planets", video: planetsVideo },
    { name: "Zajno.com", video: zajnoVideo },
    { name: "Deveb.co", video: devebVideo },
    { name: "Blob Mixer", video: blobMixerVideo }
  ];

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionTitle)
        ? prev.filter(title => title !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  // Allow all courses for now - in production you'd validate against a database
  const validCourseIds = ["webgl-shaders", "react-framer", "anime-js", "react-three-fiber", "js-animation", "next-three", "canvas-api", "three-js-mastery", "gsap-pro"];

  if (courseId && !validCourseIds.includes(courseId)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-radial opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  {course.category} • {course.level}
                </Badge>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight">
                  {course.title}
                </h1>
                <p className="text-lg md:text-xl text-primary-foreground/90 max-w-xl">
                  {course.subtitle}
                </p>
              </div>

              {/* Course Stats */}
              <div className="flex flex-wrap gap-6 text-primary-foreground/80">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating} rating</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={() => setIsPaymentModalOpen(true)}
                >
                  Buy Now - {course.price}
                  <span className="ml-2 text-sm line-through text-muted-foreground">
                    {course.originalPrice}
                  </span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20"
                  onClick={() => {
                    const syllabusSection = document.getElementById('syllabus-section');
                    if (syllabusSection) {
                      syllabusSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  See Details
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3 pt-4">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Award className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/60">Created by</p>
                  <p className="text-primary-foreground font-medium">{course.instructor}</p>
                </div>
              </div>
            </div>

            {/* Right Side - Empty Placeholder */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border border-primary/20 flex items-center justify-center">
                <div className="text-center text-primary-foreground/40">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <Play className="h-8 w-8" />
                  </div>
                  <p className="text-sm">Course Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus Section */}
      <section id="syllabus-section" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Course Syllabus</h2>
              <p className="text-muted-foreground text-lg">
                Comprehensive curriculum designed to take you from beginner to expert
              </p>
            </div>

            <div className="space-y-4">
              {syllabusSections.map((section, index) => (
                <Card key={index} className="overflow-hidden">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="w-full flex items-center justify-between p-6 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold">{section.title}</h3>
                    </div>
                    {expandedSections.includes(section.title) ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>

                  {expandedSections.includes(section.title) && (
                    <div className="px-6 pb-6">
                      <div className="ml-12 space-y-3">
                        {section.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-center gap-3">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-muted-foreground">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Projects Which Matters
              </h2>
              <p className="text-muted-foreground text-lg">
                Build real-world projects that showcase your skills and get you hired
              </p>
            </div>

            <div className="space-y-8">
              {projects.map((project, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2">
                  <div className="aspect-[16/10] bg-black relative overflow-hidden">
                    <video
                      src={project.video}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls={false}
                      style={{ pointerEvents: 'none' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="p-8">
                    <h3 className="font-bold text-xl mb-3">{project.name}</h3>
                    <p className="text-muted-foreground text-base">
                      Interactive 3D project showcasing advanced WebGL techniques
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              More Value, Less Cost
            </h2>
            <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
              Get lifetime access to premium content, personal mentorship, and exclusive resources.
              Join thousands of developers who've transformed their careers.
            </p>

            {/* Buy Options */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-muted rounded-lg p-1">
                <button
                  onClick={() => {
                    setBuyOption('course');
                    setCouponScratched(false); // Reset coupon when switching to course
                  }}
                  className={`px-6 py-2 rounded-md transition-colors ${
                    buyOption === 'course'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Buy This Course
                </button>
                <button
                  onClick={() => setBuyOption('membership')}
                  className={`px-6 py-2 rounded-md transition-colors ${
                    buyOption === 'membership'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Creator Membership
                </button>
              </div>
            </div>

            <div className={`grid gap-8 mb-12 ${buyOption === 'membership' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
              {/* Pricing Card */}
              <Card className="p-8 text-center">
                <div className="space-y-4">
                  <div>
                    <div className="text-4xl font-bold">
                      {buyOption === 'membership' ? '$99' : '$9'}
                    </div>
                    {buyOption === 'course' && (
                      <div className="text-muted-foreground line-through">$99</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    {buyOption === 'membership' ? (
                      <>
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Access to all creator courses</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Exclusive content & tutorials</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Priority support & mentorship</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Lifetime access to all content</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>8 hours of premium content</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>4 real-world projects</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Lifetime access</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Certificate of completion</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Card>

              {/* Coupon Card - Only show for course purchase */}
              {buyOption === 'course' && (
                <Card className="p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-400/20" />
                  <div
                    className={`relative space-y-4 cursor-pointer select-none transition-all duration-700 ${
                      couponScratched ? 'bg-gradient-to-br from-green-50 to-blue-50' : ''
                    }`}
                    onMouseMove={() => setCouponScratched(true)}
                    onTouchMove={() => setCouponScratched(true)}
                    style={{
                      backgroundImage: couponScratched
                        ? 'none'
                        : 'repeating-linear-gradient(45deg, #9ca3af, #9ca3af 8px, #6b7280 8px, #6b7280 16px)',
                      backgroundSize: '16px 16px'
                    }}
                  >
                    {!couponScratched ? (
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          <div className="w-16 h-16 rounded-full bg-yellow-400/20 flex items-center justify-center">
                            <Gift className="h-8 w-8 text-yellow-600" />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold">Scratch to Reveal</h3>
                        <div className="text-sm text-muted-foreground">
                          Move your cursor over this card to scratch and reveal your discount!
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 animate-in fade-in duration-500">
                        <div className="flex justify-center">
                          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Gift className="h-8 w-8 text-green-600" />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-green-600">Special Coupon!</h3>
                        <div className="text-2xl font-mono font-bold tracking-wider bg-green-50 text-green-800 px-4 py-2 rounded border-2 border-green-200">
                          SAVE50
                        </div>
                        <p className="text-sm text-green-700 font-medium">
                          🎉 Congratulations! You revealed 50% off!
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </div>

            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-12 py-4 text-lg"
              onClick={() => setIsPaymentModalOpen(true)}
            >
              {buyOption === 'membership' ? 'Start Membership' : 'Start Learning Now'}
            </Button>
          </div>
        </div>
      </section>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        title={course.title}
        creator={course.instructor}
        price={course.price}
        originalPrice={course.originalPrice}
        type="course"
      />
    </div>
  );
};

export default CourseDetail;
