"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Send } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-r from-emerald-600/10 to-cyan-600/10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <Mail className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Get the latest updates, features, and developer tips delivered straight to your inbox.
          </p>
        </div>
        
        {!subscribed ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500"
              required
            />
            <Button 
              type="submit" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 font-semibold rounded-lg"
            >
              <Send className="w-4 h-4 mr-2" />
              Subscribe
            </Button>
          </form>
        ) : (
          <div className="max-w-md mx-auto">
            <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-6">
              <p className="text-green-400 font-semibold">✅ Thanks for subscribing!</p>
              <p className="text-slate-400 mt-2">You'll hear from us soon with updates and tips.</p>
            </div>
          </div>
        )}
        
        <p className="text-sm text-slate-500 mt-6">
        </p>
      </div>
    </section>
  );
}