"use client";

import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Sparkles, CheckCircle, Zap } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  
  const features = [
    "No backend setup required",
    "Custom schema in seconds", 
    "Full CRUD operations",
    "Real-time data generation"
  ];
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
      </div>
      
      <div className="relative content-max-width container-padding pt-32 pb-16">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Enhanced badge */}
          <div className="inline-flex items-center gap-2 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-full px-6 py-3 text-sm font-medium text-slate-300 animate-scale-in">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Trusted by 10,000+ developers worldwide</span>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          </div>
          
          {/* Enhanced main heading */}
          <div className="space-y-6">
            <h1 className="text-display text-gradient-secondary leading-none">
              Generate
              <span className="block mt-2">
                <span className="text-gradient-primary">Fake APIs</span>
              </span>
              <span className="block mt-2">Instantly</span>
            </h1>
            
            {/* Enhanced description */}
            <p className="text-subheading max-w-3xl mx-auto px-4">
              Create production-ready mock endpoints with custom schemas in seconds. 
              <br className="hidden md:block" />
              Perfect for rapid prototyping, frontend development, and testing workflows.
            </p>
          </div>
          
          {/* Enhanced feature list */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 animate-slide-up">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-slate-300 bg-slate-800/30 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-700/30">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
          
          {/* Enhanced CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button 
              size="lg" 
              className="btn-primary text-lg px-8 py-4 rounded-xl shadow-2xl transform hover:scale-105 active:scale-95 group"
              onClick={() => router.push("/signup")}
            >
              <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Start Building Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              className="btn-secondary text-lg px-8 py-4 rounded-xl backdrop-blur-sm group"
              onClick={() => router.push("/docs")}
            >
              <Code className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              View Documentation
            </Button>
          </div>

          {/* Enhanced code example */}
          <div className="card-professional max-w-4xl mx-auto p-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-left">
              {/* Code header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
                    <Code className="w-4 h-4" />
                    <span>forgeapi.dev/api/users</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span>Live Endpoint</span>
                </div>
              </div>
              
              {/* Enhanced code block */}
              <div className="bg-slate-950/80 rounded-lg p-6 border border-slate-700/50">
                <pre className="text-sm text-slate-200 font-mono leading-relaxed">
                  <code className="block">
                    <span className="text-slate-500">// GET Response</span>
                    <br />
                    <span className="text-blue-400">{`{`}</span>
                    <br />
                    <span className="text-slate-300">  </span><span className="text-emerald-400">"users"</span><span className="text-slate-300">: [</span>
                    <br />
                    <span className="text-slate-300">    </span><span className="text-blue-400">{`{`}</span>
                    <br />
                    <span className="text-slate-300">      </span><span className="text-emerald-400">"id"</span><span className="text-slate-300">: </span><span className="text-yellow-400">1</span><span className="text-slate-300">,</span>
                    <br />
                    <span className="text-slate-300">      </span><span className="text-emerald-400">"name"</span><span className="text-slate-300">: </span><span className="text-orange-400">"John Doe"</span><span className="text-slate-300">,</span>
                    <br />
                    <span className="text-slate-300">      </span><span className="text-emerald-400">"email"</span><span className="text-slate-300">: </span><span className="text-orange-400">"john@example.com"</span><span className="text-slate-300">,</span>
                    <br />
                    <span className="text-slate-300">      </span><span className="text-emerald-400">"role"</span><span className="text-slate-300">: </span><span className="text-orange-400">"developer"</span>
                    <br />
                    <span className="text-slate-300">    </span><span className="text-blue-400">{`}`}</span>
                    <br />
                    <span className="text-slate-300">  ]</span>
                    <br />
                    <span className="text-blue-400">{`}`}</span>
                  </code>
                </pre>
              </div>
              
              {/* Usage stats */}
              <div className="mt-6 pt-6 border-t border-slate-700/50">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span>Generated in 0.3s</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                      <span>99.9% uptime</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">
                    Try it: <code className="bg-slate-800/50 px-2 py-1 rounded">curl forgeapi.dev/api/users</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}