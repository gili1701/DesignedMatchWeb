import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import Button from '../components/common/Button';

const Home: React.FC = () => {
  return (
    <div className="space-y-24 py-12">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-primary-100/30 -z-10"></div>
        <div className="absolute top-0 right-0 w-full h-full opacity-10 -z-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
            <defs>
              <pattern id="hearts" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20 5 Q20 0 25 0 Q30 0 30 5 Q30 10 20 20 Q10 10 10 5 Q10 0 15 0 Q20 0 20 5" fill="#9D174D" fillOpacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hearts)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-6">
            <span className="block">Find Your Perfect</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-900">
              Match For Life
            </span>
          </h1>
          <p className="text-xl text-neutral-700 max-w-2xl mx-auto mb-10">
            Experience the magic of meaningful connections with our expert matchmakers who understand your desires, values, and aspirations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center p-4 bg-white/80 rounded-lg shadow-sm">
              <p className="text-3xl font-bold text-primary-700">1000+</p>
              <p className="text-neutral-600">Successful Matches</p>
            </div>
            <div className="text-center p-4 bg-white/80 rounded-lg shadow-sm">
              <p className="text-3xl font-bold text-primary-700">24</p>
              <p className="text-neutral-600">Expert Matchmakers</p>
            </div>
            <div className="text-center p-4 bg-white/80 rounded-lg shadow-sm">
              <p className="text-3xl font-bold text-primary-700">98%</p>
              <p className="text-neutral-600">Satisfaction Rate</p>
            </div>
            <div className="text-center p-4 bg-white/80 rounded-lg shadow-sm">
              <p className="text-3xl font-bold text-primary-700">5</p>
              <p className="text-neutral-600">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">How HeartMatch Works</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Our thoughtful process helps you find meaningful connections that last a lifetime
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="relative p-6 bg-neutral-50 rounded-lg border border-neutral-100 text-center">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white h-10 w-10 rounded-full flex items-center justify-center text-lg font-bold">1</div>
              <div className="pt-6">
                <Search className="w-12 h-12 mx-auto text-primary-600 mb-4" />
                <h3 className="text-xl font-medium mb-2">Create Your Profile</h3>
                <p className="text-neutral-600">
                  Share your background, interests, and preferences to help us understand what you're looking for.
                </p>
              </div>
            </div>
            
            <div className="relative p-6 bg-neutral-50 rounded-lg border border-neutral-100 text-center">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white h-10 w-10 rounded-full flex items-center justify-center text-lg font-bold">2</div>
              <div className="pt-6">
                <Sparkles className="w-12 h-12 mx-auto text-primary-600 mb-4" />
                <h3 className="text-xl font-medium mb-2">Receive Match Proposals</h3>
                <p className="text-neutral-600">
                  Expert matchmakers review your profile and suggest compatible matches based on shared values and goals.
                </p>
              </div>
            </div>
            
            <div className="relative p-6 bg-neutral-50 rounded-lg border border-neutral-100 text-center">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white h-10 w-10 rounded-full flex items-center justify-center text-lg font-bold">3</div>
              <div className="pt-6">
                <Heart className="w-12 h-12 mx-auto text-primary-600 mb-4" />
                <h3 className="text-xl font-medium mb-2">Connect & Build Relationships</h3>
                <p className="text-neutral-600">
                  When you accept a match, we facilitate introductions so you can begin your journey together.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/register">
              <Button size="lg">Get Started Today</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Success Stories</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Hear from couples who found their perfect match through our service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Sarah and Michael"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Sarah & Michael</h3>
                  <p className="text-neutral-500">Married 2 years</p>
                </div>
              </div>
              <p className="text-neutral-600 italic">
                "Our matchmaker understood exactly what we were both looking for. We connected instantly on our first date and have been inseparable ever since!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/3869396/pexels-photo-3869396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="David and Lisa"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium">David & Lisa</h3>
                  <p className="text-neutral-500">Engaged after 1 year</p>
                </div>
              </div>
              <p className="text-neutral-600 italic">
                "After trying several dating apps with no success, HeartMatch introduced me to my fiancée. The personalized approach made all the difference in the world."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/4557876/pexels-photo-4557876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Jennifer and Robert"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Jennifer & Robert</h3>
                  <p className="text-neutral-500">Dating for 6 months</p>
                </div>
              </div>
              <p className="text-neutral-600 italic">
                "Our matchmaker saw something between us that we might have overlooked on our own. Six months in and we're already discussing our future together!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Why Choose HeartMatch</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We combine the personal touch of traditional matchmaking with modern technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="flex bg-neutral-50 p-6 rounded-lg">
              <div className="flex-shrink-0 mr-4">
                <div className="bg-primary-100 text-primary-600 p-3 rounded-full">
                  <ShieldCheck size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Verified Profiles</h3>
                <p className="text-neutral-600">
                  Every profile is thoroughly reviewed by our team to ensure authenticity and maintain a safe community.
                </p>
              </div>
            </div>
            
            <div className="flex bg-neutral-50 p-6 rounded-lg">
              <div className="flex-shrink-0 mr-4">
                <div className="bg-primary-100 text-primary-600 p-3 rounded-full">
                  <Heart size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Expert Matchmakers</h3>
                <p className="text-neutral-600">
                  Our professional matchmakers have years of experience in bringing compatible people together.
                </p>
              </div>
            </div>
            
            <div className="flex bg-neutral-50 p-6 rounded-lg">
              <div className="flex-shrink-0 mr-4">
                <div className="bg-primary-100 text-primary-600 p-3 rounded-full">
                  <Search size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Personalized Matching</h3>
                <p className="text-neutral-600">
                  We consider your personality, values, and lifestyle to find truly compatible partners.
                </p>
              </div>
            </div>
            
            <div className="flex bg-neutral-50 p-6 rounded-lg">
              <div className="flex-shrink-0 mr-4">
                <div className="bg-primary-100 text-primary-600 p-3 rounded-full">
                  <Sparkles size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Privacy Focus</h3>
                <p className="text-neutral-600">
                  Control who sees your profile and share information only when you're ready.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Ready to Find Your Match?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Join thousands of successful matches on HeartMatch today. Your perfect partnership is waiting.
          </p>
          <Link to="/register">
            <Button 
              size="lg" 
              className="bg-white text-primary-700 hover:bg-neutral-100 group"
            >
              Get Started Now
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;