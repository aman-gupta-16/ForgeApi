"use client";

import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-16 bg-slate-950 mt-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-blue-600/5 to-slate-950" />
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Generate Fake APIs
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent block">
            Instantly
          </span>
        </h1>
        
        {/* Subtext */}
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
          Create mock endpoints with your custom schema in seconds — no backend needed.
          Perfect for frontend development, testing, and prototyping.
        </p>
        
        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button 
            size="lg" 
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            Get Started for Free
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-6 text-lg rounded-lg"
          >
            <Play className="mr-2 w-5 h-5" />
            View Demo
          </Button>
        </div>

        {/* Code Example */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden shadow-2xl">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-sm text-slate-400 ml-4">forgeapi.dev/api/users</div>
            </div>
            
            {/* Code content */}
            <div className="p-6 text-left">
              <pre className="text-sm text-slate-300 leading-relaxed">
                <code>{`{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "developer"
    },
    {
      "id": 2,
      "name": "Jane Smith", 
      "email": "jane@example.com",
      "role": "designer"
    }
  ]
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}