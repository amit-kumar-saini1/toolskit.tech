import { Link } from "react-router-dom";
import { Wrench, Heart, Linkedin, Github } from "lucide-react";
import { useState } from "react";
import donateQr from "@/assets/donate-qr.png";

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SocialLinks = () => {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <a 
        href="https://www.linkedin.com/in/amit-kumar-saini-38b6143a0/" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Visit our LinkedIn profile"
        className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#0077B5] text-white hover:opacity-80 transition-opacity"
      >
        <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
      </a>
      <a 
        href="https://x.com/AmitSaini184544" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Visit our X (Twitter) profile"
        className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-black text-white hover:opacity-80 transition-opacity"
      >
        <XIcon />
      </a>
      <a 
        href="https://github.com/amit-kumar-saini" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Visit our GitHub profile"
        className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#333] text-white hover:opacity-80 transition-opacity"
      >
        <Github className="w-4 h-4 sm:w-5 sm:h-5" />
      </a>
    </div>
  );
};

const DonateSection = () => {
  const [liked, setLiked] = useState(false);

  return (
    <div id="donate" className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-primary/20">
      <div className="flex items-center gap-3 sm:flex-col sm:items-start">
        <div className="bg-white rounded-lg p-1.5 sm:p-3 shrink-0 shadow-md sm:mx-0">
          <img src={donateQr} alt="Donate QR Code" className="w-20 h-20 sm:w-36 sm:h-36 rounded" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm sm:text-lg flex items-center gap-1.5 sm:gap-2">
            <Heart
              className={`w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors ${liked ? 'text-red-500 fill-red-500' : 'text-destructive'} animate-pulse`}
              onClick={() => setLiked(!liked)}
            /> Support Us
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mb-4">
            Help us keep this free & secure!
          </p>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 sm:mt-3 flex items-center gap-1">
            📱 Scan QR to donate via UPI
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-3 sm:mt-4 flex-wrap">
        <a 
          href="#donate" 
          className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 bg-primary text-primary-foreground rounded-full font-medium text-xs sm:text-sm hover:opacity-90 transition-opacity shadow-md"
        >
          <Heart className="w-3 h-3 sm:w-4 sm:h-4" /> Donate Now
        </a>
        <SocialLinks />
      </div>
    </div>
  );
};

const Footer = () => {
  const toolCategories = [
    { name: "Image Tools", path: "/tools?category=image" },
    { name: "PDF Tools", path: "/tools?category=pdf" },
    { name: "Calculators", path: "/tools?category=calculator" },
    { name: "Utilities", path: "/tools?category=utility" },
  ];

  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-card border-t border-border mt-8 sm:mt-16" role="contentinfo">
      <div className="container px-3 sm:px-4 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-2 md:col-span-1 space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
              </div>
              <span className="text-lg sm:text-xl font-bold gradient-text">ToolsKit.tech</span>
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Your all-in-one toolkit for everyday tasks. Fast, free, and easy to use.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Tool Categories</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {toolCategories.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <DonateSection />
          </div>
        </div>

        <div className="border-t border-border mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © 2024 ToolsKit.tech. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-destructive" /> for productivity
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
