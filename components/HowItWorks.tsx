"use client";

import { FileCode, Zap, Code, ArrowRight, CheckCircle, Timer, Database } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HowItWorks() {
  const steps = [
    {
      icon: FileCode,
      step: "01",
      title: "Define Your Schema",
      description: "Use our intuitive visual builder to create your data structure with 30+ field types and validation rules.",
      features: ["Visual schema builder", "30+ data types", "Custom validation"],
      color: "from-blue-500 to-indigo-500",
      bgColor: "from-blue-500/10 to-indigo-500/10",
      delay: "0s"
    },
    {
      icon: Zap,
      step: "02", 
      title: "Generate API Endpoint",
      description: "Get a live, production-ready API endpoint instantly with your custom data structure and full documentation.",
      features: ["Instant deployment", "Auto documentation", "Rate limiting"],
      color: "from-indigo-500 to-purple-500",
      bgColor: "from-indigo-500/10 to-purple-500/10",
      delay: "0.2s"
    },
    {
      icon: Code,
      step: "03",
      title: "Start Building",
      description: "Make HTTP requests immediately with full CRUD support, real-time data, and comprehensive analytics.",
      features: ["Full CRUD operations", "Real-time sync", "Usage analytics"],
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-500/10 to-pink-500/10",
      delay: "0.4s"
    }
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
      </div>
      
      <div className="content-max-width container-padding relative">
        {/* Enhanced header section */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-6 py-3 text-sm font-medium text-slate-300 mb-6">
            <Timer className="w-4 h-4 text-blue-400" />
            <span>From idea to API in under 60 seconds</span>
          </div>
          
          <h2 className="text-heading text-gradient-secondary mb-6">
            How It Works
          </h2>
          <p className="text-subheading max-w-3xl mx-auto">
            Our streamlined process gets you from concept to working API faster than traditional development. 
            <br className="hidden md:block" />
            No complex setup, no infrastructure management—just pure productivity.
          </p>
        </div>

        {/* Enhanced steps with connecting lines */}
        <div className="relative">
          {/* Connection lines for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 transform -translate-y-1/2" />
          
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mb-20">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="relative group animate-slide-up" 
                style={{ animationDelay: step.delay }}
              >
                {/* Enhanced step card */}
                <div className="card-professional p-8 text-center hover:scale-105 transform transition-all duration-500 group">
                  {/* Step number badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg z-10`}>
                      {step.step}
                    </div>
                  </div>
                  
                  {/* Icon container */}
                  <div className={`w-24 h-24 bg-gradient-to-br ${step.bgColor} rounded-3xl flex items-center justify-center mx-auto mb-8 mt-4 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className={`w-12 h-12 bg-gradient-to-r ${step.color} bg-clip-text text-transparent`} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-gradient-primary transition-all duration-300">
                    {step.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                    {step.description}
                  </p>
                  
                  {/* Features list */}
                  <div className="space-y-3">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3 text-slate-400 justify-center">
                        <CheckCircle className={`w-4 h-4 bg-gradient-to-r ${step.color} bg-clip-text text-transparent flex-shrink-0`} />
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Arrow connector for mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-8 mb-8">
                    <ArrowRight className="w-6 h-6 text-slate-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced stats section */}
        <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-16 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gradient-primary">60s</div>
              <div className="text-slate-400 text-sm font-medium">Average setup time</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gradient-primary">99.9%</div>
              <div className="text-slate-400 text-sm font-medium">API uptime</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gradient-primary">10K+</div>
              <div className="text-slate-400 text-sm font-medium">Happy developers</div>
            </div>
          </div>
        </div>

        {/* Enhanced CTA section */}
        <div className="text-center animate-scale-in" style={{ animationDelay: '0.8s' }}>
          <div className="card-professional p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Database className="w-8 h-8 text-blue-400" />
              <h3 className="text-2xl font-bold text-white">Ready to Build?</h3>
            </div>
            <p className="text-slate-300 mb-8 text-lg leading-relaxed">
              Join thousands of developers who are building faster with ForgeAPI. 
              Start with our free tier and scale as you grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button className="btn-primary text-lg px-8 py-4 rounded-xl group">
                  <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Start Building Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button className="btn-secondary text-lg px-8 py-4 rounded-xl">
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}