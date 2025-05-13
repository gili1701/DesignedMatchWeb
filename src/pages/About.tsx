import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Shield, Star } from 'lucide-react';
import Button from '../components/common/Button';

const About: React.FC = () => {
  return (
    <div className="space-y-16 py-12">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h1 className="text-4xl font-serif font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-900">
                  About HeartMatch
                </span>
              </h1>
              <p className="text-lg text-neutral-700 mb-8">
                At HeartMatch, we believe that finding a life partner should be a thoughtful, intentional process. 
                We blend traditional matchmaking wisdom with modern technology to create meaningful connections that lead to lasting relationships.
              </p>
              <div className="flex gap-4">
                <Link to="/register">
                  <Button>Join Now</Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="aspect-video bg-neutral-100 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.pexels.com/photos/3785424/pexels-photo-3785424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="About HeartMatch" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center gap-3">
                  <Heart className="text-primary-600" size={28} />
                  <div>
                    <p className="text-2xl font-bold text-primary-800">1000+</p>
                    <p className="text-sm text-neutral-600">Successful Matches</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-6">Our Story</h2>
            <p className="text-lg text-neutral-700">
              HeartMatch was founded in 2020 by relationship experts who saw a need for a more personal and authentic approach to matchmaking. Frustrated with the superficial nature of dating apps, they combined their expertise in psychology, relationship counseling, and technology to create a service that prioritizes compatibility and long-term happiness.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-primary-100 text-primary-600 p-3 w-fit rounded-full mb-4">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-medium mb-3">Our Mission</h3>
              <p className="text-neutral-600">
                To create meaningful connections that lead to lasting relationships by understanding each individual's unique values, aspirations, and personality.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-primary-100 text-primary-600 p-3 w-fit rounded-full mb-4">
                <Star size={24} />
              </div>
              <h3 className="text-xl font-medium mb-3">Our Values</h3>
              <p className="text-neutral-600">
                Integrity, empathy, and dedication guide everything we do. We believe in the power of human connection and the importance of compatibility beyond surface-level attributes.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-primary-100 text-primary-600 p-3 w-fit rounded-full mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-medium mb-3">Our Promise</h3>
              <p className="text-neutral-600">
                We're committed to providing a safe, respectful environment where people can be authentic and vulnerable in their search for love.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">Meet Our Expert Matchmakers</h2>
            <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
              Our team combines decades of experience in psychology, relationship counseling, and personal coaching to help you find your perfect match.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mb-4 aspect-square rounded-full overflow-hidden mx-auto w-40 h-40 border-4 border-primary-100">
                <img 
                  src="https://images.pexels.com/photos/5792641/pexels-photo-5792641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Sarah Johnson" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mb-1">Sarah Johnson</h3>
              <p className="text-neutral-600 mb-2">Founder & Lead Matchmaker</p>
              <p className="text-sm text-neutral-500">
                15+ years in relationship psychology
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 aspect-square rounded-full overflow-hidden mx-auto w-40 h-40 border-4 border-primary-100">
                <img 
                  src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="David Chen" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mb-1">David Chen</h3>
              <p className="text-neutral-600 mb-2">Senior Matchmaker</p>
              <p className="text-sm text-neutral-500">
                Family therapist with 10+ years experience
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 aspect-square rounded-full overflow-hidden mx-auto w-40 h-40 border-4 border-primary-100">
                <img 
                  src="https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Maya Patel" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mb-1">Maya Patel</h3>
              <p className="text-neutral-600 mb-2">Cultural Specialist</p>
              <p className="text-sm text-neutral-500">
                Expert in cross-cultural relationships
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 aspect-square rounded-full overflow-hidden mx-auto w-40 h-40 border-4 border-primary-100">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="James Wilson" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mb-1">James Wilson</h3>
              <p className="text-neutral-600 mb-2">Profile Specialist</p>
              <p className="text-sm text-neutral-500">
                Helps candidates showcase their authentic selves
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">Our Matchmaking Process</h2>
            <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
              We take a thoughtful, personalized approach to matching compatible partners
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-primary-200 transform md:translate-x-[-50%]"></div>
              
              {/* Timeline items */}
              <div className="space-y-12">
                {/* Item 1 */}
                <div className="relative flex flex-col md:flex-row">
                  <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                    <h3 className="text-xl font-medium mb-2">Complete Profile</h3>
                    <p className="text-neutral-600">
                      Create a detailed profile that captures your personality, values, lifestyle, and what you're looking for in a partner.
                    </p>
                  </div>
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 z-10 order-1 md:order-none">
                    <div className="bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-medium">1</div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 pb-12 md:pb-0 order-3">
                    {/* Empty for alignment */}
                  </div>
                </div>
                
                {/* Item 2 */}
                <div className="relative flex flex-col md:flex-row">
                  <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-3">
                    {/* Empty for alignment */}
                  </div>
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 z-10 order-1 md:order-none">
                    <div className="bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-medium">2</div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 pb-12 md:pb-0 order-3 md:order-1">
                    <h3 className="text-xl font-medium mb-2">Matchmaker Review</h3>
                    <p className="text-neutral-600">
                      Our expert matchmakers review your profile to understand your preferences and identify potential compatible matches.
                    </p>
                  </div>
                </div>
                
                {/* Item 3 */}
                <div className="relative flex flex-col md:flex-row">
                  <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                    <h3 className="text-xl font-medium mb-2">Receive Proposals</h3>
                    <p className="text-neutral-600">
                      Review match proposals from our matchmakers, each accompanied by the reasoning behind the potential connection.
                    </p>
                  </div>
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 z-10 order-1 md:order-none">
                    <div className="bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-medium">3</div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 pb-12 md:pb-0 order-3">
                    {/* Empty for alignment */}
                  </div>
                </div>
                
                {/* Item 4 */}
                <div className="relative flex flex-col md:flex-row">
                  <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-3">
                    {/* Empty for alignment */}
                  </div>
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 z-10 order-1 md:order-none">
                    <div className="bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-medium">4</div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 order-3 md:order-1">
                    <h3 className="text-xl font-medium mb-2">Connect & Build Relationships</h3>
                    <p className="text-neutral-600">
                      When both parties accept a match, we facilitate introductions and provide guidance as you begin your journey together.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">What Our Members Say</h2>
            <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
              Don't just take our word for it. Hear from people who found love through HeartMatch.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-neutral-50 p-6 rounded-lg relative">
              <div className="text-6xl text-primary-200 absolute top-4 left-4">"</div>
              <div className="relative z-10">
                <p className="italic text-neutral-700 mb-6">
                  After years of dating apps that led nowhere, HeartMatch helped me find someone who shares my values and vision for the future. The matchmakers really listened to what was important to me.
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Emma L." 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-medium">Emma L.</p>
                    <p className="text-sm text-neutral-500">Member since 2021</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-50 p-6 rounded-lg relative">
              <div className="text-6xl text-primary-200 absolute top-4 left-4">"</div>
              <div className="relative z-10">
                <p className="italic text-neutral-700 mb-6">
                  As a busy professional, I didn't have time to sort through countless profiles. HeartMatch understood my lifestyle and introduced me to my now-wife, who complements me perfectly.
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Thomas R." 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-medium">Thomas R.</p>
                    <p className="text-sm text-neutral-500">Member since 2022</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-50 p-6 rounded-lg relative">
              <div className="text-6xl text-primary-200 absolute top-4 left-4">"</div>
              <div className="relative z-10">
                <p className="italic text-neutral-700 mb-6">
                  I appreciated the thoughtful approach to matchmaking. My matchmaker took the time to understand my cultural background and family values, which led to an incredible connection.
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Priya K." 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-medium">Priya K.</p>
                    <p className="text-sm text-neutral-500">Member since 2020</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-lg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">Start Your Journey Today</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Join HeartMatch and take the first step toward finding a meaningful, lasting relationship.
          </p>
          <Link to="/register">
            <Button 
              size="lg" 
              className="bg-white text-primary-700 hover:bg-neutral-100"
            >
              Create Your Profile
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;