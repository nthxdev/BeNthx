import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [signinForm, setSigninForm] = useState({
    username: '',
    password: ''
  });

  const [signupForm, setSignupForm] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showPassword, setShowPassword] = useState(false);

  // Email validation regex for @gmail.com
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  // Password validation: at least 6 chars, one uppercase
  const passwordRegex = /^(?=.*[A-Z]).{6,}$/;

  const handleGoogleAuth = () => {
    alert("This service is not active at this moment. Please use email authentication.");
  };

  const validateEmail = (email: string) => {
    if (!emailRegex.test(email)) {
      return "Email must end with @gmail.com and contain no additional domains after .com";
    }
    return "";
  };

  const validatePassword = (password: string) => {
    if (!passwordRegex.test(password)) {
      return "Password must be at least 6 characters long and contain at least one uppercase letter";
    }
    return "";
  };

  const validateUsername = (username: string) => {
    if (username.length < 3) {
      return "Username must be at least 3 characters long";
    }
    return "";
  };

  // Load users from localStorage or initialize with JSON data
  const getUsers = () => {
    const users = localStorage.getItem('users');
    if (users) {
      return JSON.parse(users);
    } else {
      // Load initial data from JSON file
      try {
        const response = fetch('/src/data/users.json');
        // For now, initialize with hardcoded data (since fetch won't work in this context)
        const initialUsers = [
          {
            id: "nthxdev123",
            name: "nthxdev",
            username: "nthxdev",
            email: "nthxdev@gmail.com",
            password: "@Nthx1211",
            createdAt: "2024-01-01T00:00:00.000Z",
            verified: true,
            bio: "write conscious??",
            location: "India",
            website: "https://nthxdev.com",
            social: {
              instagram: "https://www.instagram.com/nthxdev/",
              github: "https://github.com/nthxdev",
              twitter: "https://x.com/nthxdev"
            },
            courses: [
              {
                id: "webgl-shaders",
                title: "WebGL Shaders Deep Dive",
                description: "Master WebGL shaders and create stunning visual effects for the web",
                duration: "8 hours",
                level: "Advanced",
                category: "WebGL",
                createdAt: "2024-06-15T10:00:00.000Z",
                image: "/assets/WebGL Shaders Deep Dive.png",
                likes: 1250,
                views: 15400,
                downloads: 890
              },
              {
                id: "product-showcase",
                title: "Product Showcase 3D",
                description: "Create interactive 3D product showcases that engage customers",
                duration: "6 hours",
                level: "Intermediate",
                category: "Three.js",
                createdAt: "2024-07-20T14:30:00.000Z",
                image: "/assets/Product Showcase 3D.mp4",
                likes: 980,
                views: 12300,
                downloads: 650
              },
              {
                id: "parallax-scroll",
                title: "Parallax Scroll Story",
                description: "Build immersive storytelling experiences with parallax scrolling",
                duration: "5 hours",
                level: "Intermediate",
                category: "Animation",
                createdAt: "2024-08-10T09:15:00.000Z",
                image: "/assets/Parallax Scroll Story.mp4",
                likes: 750,
                views: 9200,
                downloads: 420
              },
              {
                id: "fluid-typography",
                title: "Fluid Typography Animation",
                description: "Create fluid, responsive typography animations that adapt to any screen",
                duration: "4 hours",
                level: "Beginner",
                category: "Typography",
                createdAt: "2024-09-05T16:45:00.000Z",
                image: "/assets/Fluid Typography Animation.mp4",
                likes: 620,
                views: 7800,
                downloads: 380
              }
            ],
            followers: "2.1k",
            following: "4",
            skills: ["Three.js", "WebGL", "React", "TypeScript", "GSAP", "Shaders", "3D Design", "Animation"]
          },
          {
            id: "sample123",
            name: "John Doe",
            username: "johndoe",
            email: "johndoe@gmail.com",
            password: "Password123",
            createdAt: "2025-01-15T10:30:00.000Z",
            verified: false,
            bio: "",
            location: "",
            website: "",
            followers: "0",
            following: "0",
            courses: [],
            designs: [],
            assets: [],
            posts: []
          },
          {
            id: "sample456",
            name: "Jane Smith",
            username: "janesmith",
            email: "janesmith@gmail.com",
            password: "SecurePass456",
            createdAt: "2025-01-16T14:20:00.000Z",
            verified: false,
            bio: "",
            location: "",
            website: "",
            followers: "0",
            following: "0",
            courses: [],
            designs: [],
            assets: [],
            posts: []
          }
        ];
        localStorage.setItem('users', JSON.stringify(initialUsers));
        return initialUsers;
      } catch (error) {
        console.error('Error loading initial users:', error);
        return [];
      }
    }
  };

  // Save users to localStorage
  const saveUsers = (users: any[]) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  const handleSignin = () => {
    const newErrors: {[key: string]: string} = {};

    // Validate inputs
    if (!signinForm.username.trim()) {
      newErrors.signinUsername = "Username is required";
    }

    if (!signinForm.password) {
      newErrors.signinPassword = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    // Check credentials
    const users = getUsers();
    const user = users.find((u: any) =>
      u.username === signinForm.username.trim() &&
      u.password === signinForm.password
    );

    if (user) {
      login(user);
      navigate('/profile');
    } else {
      setErrors({ signinGeneral: "Invalid username or password" });
    }
  };

  const handleSignup = () => {
    const newErrors: {[key: string]: string} = {};

    // Validate inputs
    const nameError = validateUsername(signupForm.name.trim());
    if (nameError) newErrors.signupName = nameError;

    const usernameError = validateUsername(signupForm.username.trim());
    if (usernameError) newErrors.signupUsername = usernameError;

    const emailError = validateEmail(signupForm.email.trim());
    if (emailError) newErrors.signupEmail = emailError;

    const passwordError = validatePassword(signupForm.password);
    if (passwordError) newErrors.signupPassword = passwordError;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    // Check if user already exists
    const users = getUsers();
    const existingUser = users.find((u: any) =>
      u.email === signupForm.email.trim() ||
      u.username === signupForm.username.trim()
    );

    if (existingUser) {
      if (existingUser.email === signupForm.email.trim()) {
        setErrors({ signupEmail: "An account with this email already exists" });
      } else {
        setErrors({ signupUsername: "This username is already taken" });
      }
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: signupForm.name.trim(),
      username: signupForm.username.trim(),
      email: signupForm.email.trim(),
      password: signupForm.password,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    login(newUser);
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card className="p-8 bg-white/95 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">
                Sign in to your account or create a new one to get started
              </p>
            </div>

            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4">
                <Button
                  onClick={handleGoogleAuth}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or sign in with username
                    </span>
                  </div>
                </div>

                {errors.signinGeneral && (
                  <div className="text-red-500 text-sm text-center">{errors.signinGeneral}</div>
                )}

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-username">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-username"
                        type="text"
                        placeholder="Enter your username"
                        className="pl-10"
                        value={signinForm.username}
                        onChange={(e) => setSigninForm({...signinForm, username: e.target.value})}
                      />
                    </div>
                    {errors.signinUsername && (
                      <div className="text-red-500 text-sm">{errors.signinUsername}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                        value={signinForm.password}
                        onChange={(e) => setSigninForm({...signinForm, password: e.target.value})}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.signinPassword && (
                      <div className="text-red-500 text-sm">{errors.signinPassword}</div>
                    )}
                  </div>

                  <Button onClick={handleSignin} className="w-full" size="lg">
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <div className="text-center">
                  <Link
                    to="/auth"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <Button
                  onClick={handleGoogleAuth}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign up with Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or create account with email
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Enter your full name"
                        className="pl-10"
                        value={signupForm.name}
                        onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                      />
                    </div>
                    {errors.signupName && (
                      <div className="text-red-500 text-sm">{errors.signupName}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-username">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-username"
                        type="text"
                        placeholder="Choose a username"
                        className="pl-10"
                        value={signupForm.username}
                        onChange={(e) => setSignupForm({...signupForm, username: e.target.value})}
                      />
                    </div>
                    {errors.signupUsername && (
                      <div className="text-red-500 text-sm">{errors.signupUsername}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={signupForm.email}
                        onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                      />
                    </div>
                    {errors.signupEmail && (
                      <div className="text-red-500 text-sm">{errors.signupEmail}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="pl-10 pr-10"
                        value={signupForm.password}
                        onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.signupPassword && (
                      <div className="text-red-500 text-sm">{errors.signupPassword}</div>
                    )}
                    <div className="text-red-500 text-xs">
                      Password must be at least 6 characters long and contain at least one uppercase letter
                    </div>
                  </div>

                  <Button onClick={handleSignup} className="w-full" size="lg">
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                ← Back to Home
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
