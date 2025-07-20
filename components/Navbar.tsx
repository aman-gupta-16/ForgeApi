"use client";

import { Button } from '@/components/ui/button';
import { Code, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    // Check for accessToken or refreshToken in cookies
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    setIsAuthenticated(!!accessToken || !!refreshToken);
  }, []);

  const handleSignIn = () => router.push('/login');
  const handleGetStarted = () => router.push('/signup');

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold text-white">ForgeAPI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
              How it Works
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Docs
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated && (
              <>
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-gray-800"
                  onClick={handleSignIn}
                >
                  Sign In
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleGetStarted}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900 border-t border-gray-800">
              <a
                href="#features"
                className="block px-3 py-2 text-gray-300 hover:text-white"
                onClick={toggleMenu}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block px-3 py-2 text-gray-300 hover:text-white"
                onClick={toggleMenu}
              >
                How it Works
              </a>
              <a
                href="#pricing"
                className="block px-3 py-2 text-gray-300 hover:text-white"
                onClick={toggleMenu}
              >
                Pricing
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-300 hover:text-white"
                onClick={toggleMenu}
              >
                Docs
              </a>
              {!isAuthenticated && (
                <div className="pt-4 pb-2 space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full text-gray-300 hover:text-white hover:bg-gray-800"
                    onClick={() => {
                      toggleMenu();
                      handleSignIn();
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => {
                      toggleMenu();
                      handleGetStarted();
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}