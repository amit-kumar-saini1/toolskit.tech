import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Users, Zap, Shield, Heart } from "lucide-react";
const About = () => {
  return <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold gradient-text mb-6">About Toolskit.tech</h1>
          
          <div className="glass-card rounded-2xl p-8 mb-8">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              AllTool.tech is your go-to destination for free online tools that make your daily tasks easier. 
              We provide a collection of powerful, easy-to-use utilities for image editing, PDF conversion, 
              calculations, and much more.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our mission is to provide high-quality, free tools that are accessible to everyone. 
              No sign-up required, no hidden fees – just powerful tools at your fingertips.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="glass-card rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast & Free</h3>
              <p className="text-muted-foreground">
                All our tools are completely free to use with no limitations. Quick processing right in your browser.
              </p>
            </div>

            <div className="glass-card rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p className="text-muted-foreground">
                Your files are processed locally in your browser. We never upload or store your data on our servers.
              </p>
            </div>

            <div className="glass-card rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">User Friendly</h3>
              <p className="text-muted-foreground">
                Simple and intuitive interface designed for everyone, from beginners to professionals.
              </p>
            </div>

            <div className="glass-card rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Made with Love</h3>
              <p className="text-muted-foreground">
                We continuously improve and add new tools based on user feedback and needs.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default About;