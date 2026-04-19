import { Link } from "@tanstack/react-router";
import { Wrench, Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

/**
 * NOTE (Phase 1): Tools/Blog/About routes Phase 2 me banenge. Tab tak
 * non-home links plain <a> hain (full page nav). Phase 2 me ye <Link to="...">
 * me convert ho jayenge with type-safe routes.
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkClass = "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors";

  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b border-border/50">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
            <Wrench className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold gradient-text">ToolsKit.tech</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          <Link to="/" className={linkClass}>Home</Link>
          <a href="/tools" className={linkClass}>All Tools</a>
          <a href="/blog" className={linkClass}>Blog</a>
          <a href="/about" className={linkClass}>About</a>
          <a href="#donate" className="flex items-center gap-1.5 text-sm font-medium text-destructive hover:text-destructive/80 transition-colors">
            <Heart className="w-4 h-4" />
            Donate
          </a>
          <Button variant="gradient" size="sm">Get Started</Button>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 glass-card border-b border-border/50 p-4 animate-slide-up">
          <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
            <Link to="/" className={linkClass} onClick={() => setIsMenuOpen(false)}>Home</Link>
            <a href="/tools" className={linkClass} onClick={() => setIsMenuOpen(false)}>All Tools</a>
            <a href="/blog" className={linkClass} onClick={() => setIsMenuOpen(false)}>Blog</a>
            <a href="/about" className={linkClass} onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#donate" className="flex items-center gap-1.5 text-sm font-medium text-destructive hover:text-destructive/80 transition-colors" onClick={() => setIsMenuOpen(false)}>
              <Heart className="w-4 h-4" />
              Donate
            </a>
            <Button variant="gradient" size="sm" className="w-full">Get Started</Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
