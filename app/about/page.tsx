"use client";

import { Users, Target, Zap, Code, Github, Twitter, Mail, ArrowRight, Heart, Globe, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import profileImage from "@/assets/aman_gupta.jpeg"

export default function AboutPage() {
  const values = [
    {
      icon: Zap,
      title: "Speed & Simplicity",
      description: "We believe developers shouldn't waste time on complex setups. Our platform gets you from idea to production in minutes, not hours."
    },
    {
      icon: Shield,
      title: "Reliability First",
      description: "Built with enterprise-grade infrastructure to ensure your APIs are always available when your users need them most."
    },
    {
      icon: Heart,
      title: "Developer Experience",
      description: "Every feature is designed with developers in mind. Intuitive interfaces, comprehensive docs, and responsive support."
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "Deploy globally with edge computing and CDN integration. Your APIs perform fast anywhere in the world."
    }
  ];

  const stats = [
    { number: "10K+", label: "Happy Developers" },
    { number: "1M+", label: "API Requests Daily" },
    { number: "99.9%", label: "Uptime SLA" },
    { number: "50+", label: "Countries Served" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-950 to-purple-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/6 to-cyan-500/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="relative z-10 section-padding">
        <div className="content-max-width container-padding">
          {/* Hero Section */}
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-6 py-3 text-sm font-medium text-slate-300 mb-6">
              <Users className="w-4 h-4 text-blue-400" />
              <span>Built by developers, for developers</span>
            </div>
            
            <h1 className="text-display text-gradient-secondary mb-6">
              About ForgeAPI
            </h1>
            <p className="text-subheading max-w-4xl mx-auto">
              We're on a mission to democratize API development. ForgeAPI was born from the frustration of 
              spending countless hours setting up basic CRUD APIs instead of building amazing products.
            </p>
          </div>

          {/* Mission Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24 animate-slide-up">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-heading text-white">Our Mission</h2>
              </div>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                To eliminate the complexity and time-consuming setup traditionally required for API development. 
                We believe every developer should be able to focus on building unique features rather than 
                reinventing the same backend infrastructure over and over.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                ForgeAPI provides instant, production-ready APIs with just a few clicks, allowing developers 
                to ship faster and iterate more freely.
              </p>
            </div>
            <div className="card-professional p-8">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-gradient-primary mb-2">{stat.number}</div>
                    <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-24">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-heading text-gradient-secondary mb-6">
                Our Values
              </h2>
              <p className="text-subheading max-w-3xl mx-auto">
                These principles guide everything we build and every decision we make.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card 
                    key={index}
                    className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 hover:border-slate-600/50 hover:bg-slate-900/90 transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-blue-300" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                      <p className="text-slate-300 leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Founder Section */}
          <div className="text-center mb-24 animate-slide-up">
            <div className="card-professional p-12 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Code className="w-8 h-8 text-blue-400" />
                <h2 className="text-heading text-white">Meet the Founder</h2>
              </div>
              
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-400/30 overflow-hidden">
                {/* Your photo from local assets folder */}
                <img 
                  src="/aman_gupta.jpeg"
                  alt="Aman Gupta - Founder & Lead Developer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to icon if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <Users className="w-16 h-16 text-blue-300 hidden" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">Aman Gupta</h3>
              <p className="text-blue-400 mb-6 text-lg">Founder & Lead Developer</p>
              
              <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-3xl mx-auto">
                A passionate full-stack developer with a vision to simplify API development for everyone. 
                After years of building repetitive backend infrastructure, Aman created ForgeAPI to help 
                developers focus on what matters most - building amazing products.
              </p>
              
              <div className="flex justify-center gap-4">
                <Link href="https://github.com/aman-gupta-16" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="bg-slate-800/50 border-slate-600/50 hover:bg-slate-700/50 text-white">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                </Link>
                <Link href="https://x.com/AmanGup52727388" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="bg-slate-800/50 border-slate-600/50 hover:bg-slate-700/50 text-white">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                </Link>
                <Link href="mailto:aman.gupta.work.16@gmail.com">
                  <Button variant="outline" size="sm" className="bg-slate-800/50 border-slate-600/50 hover:bg-slate-700/50 text-white">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center animate-scale-in">
            <div className="card-professional p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Join Our Journey</h3>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Be part of the API revolution. Start building faster, ship sooner, and focus on what makes your product unique.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button className="btn-primary text-lg px-8 py-4 rounded-xl group">
                    <Zap className="w-5 h-5 mr-2" />
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button className="btn-secondary text-lg px-8 py-4 rounded-xl">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}