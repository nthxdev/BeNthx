import { Code2, Github, Twitter, Youtube, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gray-900 rounded-lg">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Be<span className="font-serif italic text-gray-600">nthx</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Learn frontend development, share designs, and inspire the creative community.
            </p>
          </div>

          {/* Learn */}
          <div>
            <h3 className="font-semibold mb-4">Learn</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/courses" className="hover:text-primary transition-colors">Courses</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Tutorials</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Resources</a></li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/inspiration" className="hover:text-primary transition-colors">Design Inspiration</Link></li>
              <li><Link to="/assets" className="hover:text-primary transition-colors">UI Assets</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Creators</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Showcase</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-card hover:bg-card-hover rounded-lg transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-card hover:bg-card-hover rounded-lg transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-card hover:bg-card-hover rounded-lg transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-card hover:bg-card-hover rounded-lg transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 BeNthx. All rights reserved. Built for educational purposes.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
