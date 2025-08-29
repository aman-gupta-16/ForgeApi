"use client";

import { Button } from '@/components/ui/button';
import { ArrowRight, Code } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-20 bg-slate-950">
      <div className="max-w-4xl mx-auto text-center">
        {/* Simple Header */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Generate
          <span className="text-blue-400 block">Fake APIs</span>
          Instantly
        </h1>
        
        {/* Simple Description */}
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Create mock endpoints with custom schemas in seconds. 
          Perfect for development, testing, and prototyping.
        </p>
        
        {/* Simple CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg"
            onClick={() => router.push("/signup")}
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-3 text-lg font-semibold rounded-lg"
            onClick={() => router.push("/docs")}
          >
            View Documentation
          </Button>
        </div>

        {/* Simple Code Example */}
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 max-w-2xl mx-auto">
          <div className="text-left">
            <div className="flex items-center gap-2 mb-3 text-slate-400 text-sm">
              <Code className="w-4 h-4" />
              <span>forgeapi.dev/api/users</span>
            </div>
            <pre className="text-sm text-slate-200 font-mono">
              <code>{`{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  ]
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}