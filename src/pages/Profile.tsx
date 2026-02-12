import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  MapPin,
  Link as LinkIcon,
  Calendar,
  Github,
  Twitter,
  Globe,
  Heart,
  Eye,
  Package,
  CheckCircle,
  MessageCircle,
  ExternalLink,
  Send,
  Instagram,
  BookOpen
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Import nthxdev's course image, design videos, and asset images
import webglShadersImage from "@/assets/WebGL Shaders Deep Dive.png";
import immersive3dVideo from "@/assets/Immersive 3D Portfolio.mp4";
import particleSystemVideo from "@/assets/Particle System Background.mp4";
import dataVisualizationVideo from "@/assets/Interactive Data Visualization.mp4";
import reactComponentsImage from "@/assets/React Form Components.png";
import shaderCollectionImage from "@/assets/WebGL Shaders Deep Dive.png";

const Profile = () => {
  const { user: currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    bio: "",
    location: "",
    website: "",
  });
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  // Helper function to parse follower counts with k notation
  const parseFollowerCount = (count: string): number => {
    if (!count) return 0;
    if (count.includes('k')) {
      const num = parseFloat(count.replace('k', ''));
      return Math.round(num * 1000);
    }
    return parseInt(count) || 0;
  };

  // Helper function to format follower counts for display
  const formatFollowerCount = (count: number): string => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1).replace('.0', '') + 'k';
    }
    return count.toString();
  };

  useEffect(() => {
    // If no username param, show current user's profile (requires auth)
    if (!username) {
      if (!isAuthenticated || !currentUser) {
        navigate('/auth');
        return;
      }
      setProfileUser(currentUser);
      setEditForm({
        name: currentUser.name || "",
        bio: currentUser.bio || "",
        location: currentUser.location || "",
        website: currentUser.website || "",
      });
      setLoading(false);
      return;
    }

    // If username param exists, try to find that user
    const getUsers = () => {
      const users = localStorage.getItem('users');
      return users ? JSON.parse(users) : [];
    };

    const users = getUsers();
    const foundUser = users.find((u: any) => u.username === username);

    if (foundUser) {
      // Update nthxdev's stats if needed (for permanent user updates)
      if (foundUser.username === 'nthxdev' && (foundUser.followers !== '2.1k' || foundUser.following !== '4')) {
        foundUser.followers = '2.1k';
        foundUser.following = '4';

        // Update in localStorage
        const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = allUsers.findIndex((u: any) => u.username === 'nthxdev');
        if (userIndex !== -1) {
          allUsers[userIndex] = foundUser;
          localStorage.setItem('users', JSON.stringify(allUsers));

          // Also update currentUser if it's nthxdev
          const currentUserData = localStorage.getItem('currentUser');
          if (currentUserData) {
            const current = JSON.parse(currentUserData);
            if (current.username === 'nthxdev') {
              localStorage.setItem('currentUser', JSON.stringify(foundUser));
            }
          }
        }
      }

      setProfileUser(foundUser);
      setFollowerCount(parseFollowerCount(foundUser.followers || "0"));
      if (foundUser.username === currentUser?.username) {
        setEditForm({
          name: foundUser.name || "",
          bio: foundUser.bio || "",
          location: foundUser.location || "",
          website: foundUser.website || "",
        });
      }
    } else {
      navigate('/notfound');
      return;
    }
    setLoading(false);
  }, [username, currentUser, isAuthenticated, navigate]);

  const handleEditProfile = () => {
    if (!currentUser) return;

    // Update user data in localStorage
    const getUsers = () => {
      const users = localStorage.getItem('users');
      return users ? JSON.parse(users) : [];
    };

    const users = getUsers();
    const userIndex = users.findIndex((u: any) => u.id === currentUser.id);

    if (userIndex !== -1) {
      users[userIndex] = {
        ...users[userIndex],
        name: editForm.name,
        bio: editForm.bio,
        location: editForm.location,
        website: editForm.website,
      };

      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));

      // Update the profile display
      setProfileUser(users[userIndex]);

      // Close modal
      setEditDialogOpen(false);

      // Show success message
      alert('Profile updated successfully!');
    }
  };

  const handleFollow = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowerCount(prev => prev - 1);
    } else {
      setIsFollowing(true);
      setFollowerCount(prev => prev + 1);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!profileUser) {
    return <div>Profile not found</div>;
  }

  const isOwnProfile = currentUser && currentUser.username === profileUser.username;
  const isNthxdev = profileUser.username === 'nthxdev';

  // Get user-specific data or use defaults
  const userDesigns = profileUser.designs || [];
  const userAssets = profileUser.assets || [];
  const userCourses = profileUser.courses || [];
  const userPosts = profileUser.posts || [];

  // nthxdev specific content (limited items)
  const nthxdevCourses = isNthxdev ? [{
    ...profileUser.courses?.[0],
    image: webglShadersImage
  }].filter(Boolean) : []; // Only first course with imported image

  const nthxdevDesigns = isNthxdev ? [
    {
      title: "Immersive 3D Portfolio",
      creator: "nthxdev",
      likes: "1.2k",
      views: "15k",
      tags: ["Three.js", "WebGL", "Portfolio"],
      image: immersive3dVideo,
    },
    {
      title: "Particle System Background",
      creator: "nthxdev",
      likes: "980",
      views: "11k",
      tags: ["WebGL", "Shaders", "Animation"],
      image: particleSystemVideo,
    },
    {
      title: "Interactive Data Visualization",
      creator: "nthxdev",
      likes: "1.8k",
      views: "22k",
      tags: ["Three.js", "Data", "Visualization"],
      image: dataVisualizationVideo,
    },
  ] : userDesigns;

  const nthxdevAssets = isNthxdev ? [
    {
      title: "3D Component Library",
      downloads: "3.2k",
      type: "React Components",
      image: reactComponentsImage
    },
    {
      title: "Shader Collection",
      downloads: "1.8k",
      type: "GLSL Shaders",
      image: shaderCollectionImage
    },
  ] : userAssets;

  const profile = {
    name: profileUser.name,
    username: `@${profileUser.username}`,
    bio: profileUser.bio || "Frontend developer passionate about creating amazing web experiences. Join me on this creative journey!",
    location: profileUser.location || "Not specified",
    website: profileUser.website || "",
    joined: `Joined ${new Date(profileUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
    followers: profileUser.followers || "0",
    following: profileUser.following || "0",
    skills: profileUser.skills || ["JavaScript", "React", "TypeScript", "Web Development"],
    verified: profileUser.verified || false
  };

  const designs = [
    { title: "Immersive 3D Portfolio", likes: "1.2k", views: "15k" },
    { title: "Product Showcase 3D", likes: "2.1k", views: "24k" },
    { title: "Particle System Background", likes: "980", views: "11k" },
  ];

  const assets = [
    { title: "3D Component Library", downloads: "3.2k" },
    { title: "Shader Collection", downloads: "1.8k" },
  ];

  // Default posts only for nthxdev
  const defaultPosts = isNthxdev ? [
    { title: "Building 3D Experiences with Three.js", date: "Dec 10, 2024" },
    { title: "WebGL Performance Tips", date: "Nov 28, 2024" },
  ] : [];

  const posts = userPosts.length > 0 ? userPosts : defaultPosts;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Profile Header */}
        <Card className="p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-gradient-hero flex items-center justify-center">
                <User className="h-16 w-16 text-primary-foreground" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-3xl font-bold">{profile.name}</h1>
                    {profile.verified && (
                      <svg
                        className="h-6 w-6 text-blue-500"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    )}
                  </div>
                  <p className="text-muted-foreground">{profile.username}</p>
                </div>
                <div className="flex gap-2">
                  {isOwnProfile ? (
                    <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline">Edit Profile</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit Profile</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-name">Full Name</Label>
                            <input
                              id="edit-name"
                              type="text"
                              placeholder="Enter your full name"
                              value={editForm.name}
                              onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-bio">Bio</Label>
                            <Textarea
                              id="edit-bio"
                              placeholder="Tell us about yourself"
                              value={editForm.bio}
                              onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                              rows={3}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-location">Location</Label>
                            <input
                              id="edit-location"
                              type="text"
                              placeholder="Where are you located?"
                              value={editForm.location}
                              onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-website">Website</Label>
                            <input
                              id="edit-website"
                              type="url"
                              placeholder="https://yourwebsite.com"
                              value={editForm.website}
                              onChange={(e) => setEditForm({...editForm, website: e.target.value})}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            />
                          </div>
                          <div className="flex gap-2 justify-end">
                            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleEditProfile}>
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <>
                      <Button
                        className={`hover:opacity-90 ${isFollowing ? 'bg-muted text-muted-foreground hover:bg-muted' : 'bg-primary hover:bg-primary/90'}`}
                        onClick={handleFollow}
                      >
                        {isFollowing ? 'Following' : 'Follow'}
                      </Button>
                      <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Send Message to {profileUser.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="message">Your Message</Label>
                            <textarea
                              id="message"
                              placeholder={`Write a message to ${profileUser.name}...`}
                              value={messageText}
                              onChange={(e) => setMessageText(e.target.value)}
                              rows={4}
                              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            />
                            </div>
                            <div className="flex gap-2 justify-end">
                              <Button variant="outline" onClick={() => setMessageDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button
                                onClick={() => {
                                  if (messageText.trim()) {
                                    alert(`Message sent to ${profileUser.name}: "${messageText}"`);
                                    setMessageText("");
                                    setMessageDialogOpen(false);
                                  }
                                }}
                                disabled={!messageText.trim()}
                              >
                                <Send className="h-4 w-4 mr-2" />
                                Send Message
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      {isNthxdev && (
                        <Button
                          variant="outline"
                          onClick={() => {
                            // Scroll to courses section
                            const coursesTab = document.querySelector('[value="courses"]') as HTMLElement;
                            if (coursesTab) {
                              coursesTab.click();
                              setTimeout(() => {
                                coursesTab.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }, 100);
                            }
                          }}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          See Work
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>

              <p className="text-foreground">{profile.bio}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.location}</span>
                </div>
                {profile.website && (
                  <div className="flex items-center gap-1">
                    <LinkIcon className="h-4 w-4" />
                    <a
                      href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      {profile.website.replace('https://', '').replace('http://', '')}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{profile.joined}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-6 text-sm pt-2 border-t">
                <div>
                  <span className="font-bold">{formatFollowerCount(followerCount)}</span>
                  <span className="text-muted-foreground ml-1">Followers</span>
                </div>
                <div>
                  <span className="font-bold">{profile.following}</span>
                  <span className="text-muted-foreground ml-1">Following</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {profileUser.social?.github && (
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => window.open(profileUser.social.github, '_blank')}
                  >
                    <Github className="h-5 w-5" />
                  </Button>
                )}
                {profileUser.social?.twitter && (
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => window.open(profileUser.social.twitter, '_blank')}
                  >
                    <Twitter className="h-5 w-5" />
                  </Button>
                )}
                {profileUser.social?.instagram && (
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => window.open(profileUser.social.instagram, '_blank')}
                  >
                    <Instagram className="h-5 w-5" />
                  </Button>
                )}
                {profile.website && (
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => window.open(profile.website.startsWith('http') ? profile.website : `https://${profile.website}`, '_blank')}
                  >
                    <Globe className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Subscription Section - Only for nthxdev */}
        {isNthxdev && (
          <Card className="p-6 mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-800">Unlock Premium Content</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Subscribe to access all my premium courses, exclusive tutorials, and early access to new projects.
                  Get lifetime access to advanced 3D development techniques and personal mentorship.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">$9.99/month</div>
                  <div className="text-sm text-gray-500">or $99/year (save 17%)</div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2">
                  Subscribe Now
                </Button>
              </div>
              <div className="text-sm text-gray-500">
                ✓ Access to all premium courses and tutorials<br/>
                ✓ Exclusive 3D assets and shader collections<br/>
                ✓ Priority support and code reviews<br/>
                ✓ Early access to new releases<br/>
                ✓ Cancel anytime, no hidden fees
              </div>
            </div>
          </Card>
        )}

        {/* Content Tabs */}
        <Tabs defaultValue={nthxdevDesigns.length > 0 ? "designs" : (nthxdevCourses.length > 0 ? "courses" : (userPosts.length > 0 ? "posts" : "designs"))} className="w-full">
          <TabsList className={`grid w-full ${isNthxdev ? (nthxdevCourses.length > 0 ? 'grid-cols-3' : 'grid-cols-2') : (nthxdevCourses.length > 0 ? 'grid-cols-4' : 'grid-cols-3')}`}>
            {nthxdevCourses.length > 0 && <TabsTrigger value="courses">Courses</TabsTrigger>}
            <TabsTrigger value="designs">Designs</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            {!isNthxdev && <TabsTrigger value="posts">Posts</TabsTrigger>}
          </TabsList>

          {/* Courses Tab */}
          {nthxdevCourses.length > 0 && (
            <TabsContent value="courses" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {nthxdevCourses.length > 0 ? nthxdevCourses.map((course: any, index: number) => (
                  <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                    <div className="aspect-video bg-gradient-hero relative overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback if image fails to load
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-2">
                            {course.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                            {course.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary">{course.level}</Badge>
                        <Badge variant="outline">{course.duration}</Badge>
                        <Badge variant="outline">{course.category}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{course.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{course.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="h-4 w-4" />
                          <span>{course.downloads}</span>
                        </div>
                      </div>
                      <Button
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={() => navigate('/course/webgl-shaders')}
                      >
                        {isNthxdev ? 'Buy Course' : 'View Course'}
                      </Button>
                    </div>
                  </Card>
                )) : (
                  <div className="col-span-full text-center py-12">
                    <div className="text-muted-foreground">
                      <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">No courses yet</p>
                      <p className="text-sm">Share your knowledge by creating courses</p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          )}

          {/* Posts Tab - Hidden for nthxdev */}
          {!isNthxdev && (
            <TabsContent value="posts" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userPosts.length > 0 ? userPosts.map((post: any, index: number) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                  <div className="aspect-video bg-gradient-hero" />
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Card>
              )) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No posts yet</p>
                    <p className="text-sm">Share your thoughts and ideas with the community</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          )}

          {/* Designs Tab */}
          <TabsContent value="designs" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nthxdevDesigns.length > 0 ? nthxdevDesigns.map((design, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                  <div className="aspect-video bg-gradient-hero relative overflow-hidden">
                    {'image' in design && design.image && (
                      <video
                        src={design.image}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        muted
                        loop
                        playsInline
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => e.currentTarget.pause()}
                      />
                    )}
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold group-hover:text-primary transition-colors">
                      {design.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
              )) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-muted-foreground">
                    <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No designs yet</p>
                    <p className="text-sm">Share your creative work with the community</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Assets Tab */}
          <TabsContent value="assets" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nthxdevAssets.length > 0 ? nthxdevAssets.map((asset, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                  <div className="aspect-video bg-gradient-accent relative overflow-hidden">
                    {asset.image ? (
                      <img
                        src={asset.image}
                        alt={asset.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback to icon if image fails to load
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`${asset.image ? 'hidden' : ''} absolute inset-0 flex items-center justify-center`}>
                      <Package className="h-12 w-12 text-accent-foreground opacity-80" />
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold group-hover:text-primary transition-colors">
                      {asset.title}
                    </h3>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Package className="h-4 w-4" />
                        <span>{asset.downloads} downloads</span>
                      </div>
                      {'type' in asset && asset.type && (
                        <Badge variant="secondary" className="text-xs">
                          {asset.type}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    View Asset
                  </Button>
                </Card>
              )) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No assets yet</p>
                    <p className="text-sm">Share your tools and resources with the community</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Posts Tab */}
          <TabsContent value="posts" className="mt-6">
            <div className="space-y-4">
              {posts.map((post, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{post.date}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Read More
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
