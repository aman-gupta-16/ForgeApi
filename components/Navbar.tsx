"use client";

import { Button } from "@/components/ui/button";
import { Code, Menu, X, User, LogOut, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Debug logging for authentication state changes
  useEffect(() => {
    console.log('📊 Navbar: Auth state changed:', { isAuthenticated, user: user?.userName || user?.email });
  }, [isAuthenticated, user]);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleSignIn = () => router.push("/login");
  const handleGetStarted = () => router.push("/signup");

  const handleLogout = () => {
    logout();
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/60 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Enhanced Logo */}
          <div 
            className="flex items-center gap-3 group cursor-pointer transition-all duration-300 hover:scale-105" 
            onClick={() => router.push("/")}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
              <Code className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-indigo-400 transition-all duration-300">
              ForgeAPI
            </span>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-slate-300 hover:text-white transition-all duration-300 hover:scale-105 relative group ${
                isActive("/") ? "text-white" : ""
              }`}
            >
              Home
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 ${
                isActive("/") ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </Link>
            <Link 
              href="/about" 
              className={`text-slate-300 hover:text-white transition-all duration-300 hover:scale-105 relative group ${
                isActive("/about") ? "text-white" : ""
              }`}
            >
              About
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 ${
                isActive("/about") ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </Link>
            <Link 
              href="/docs" 
              className={`text-slate-300 hover:text-white transition-all duration-300 hover:scale-105 relative group ${
                isActive("/docs") ? "text-white" : ""
              }`}
            >
              Documentation
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 ${
                isActive("/docs") ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </Link>
            <Link 
              href="/contact" 
              className={`text-slate-300 hover:text-white transition-all duration-300 hover:scale-105 relative group ${
                isActive("/contact") ? "text-white" : ""
              }`}
            >
              Contact
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 ${
                isActive("/contact") ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </Link>

            {isAuthenticated && (
              <Link 
                href="/dashboard" 
                className={`text-slate-300 hover:text-white transition-all duration-300 hover:scale-105 relative group ${
                  isActive("/dashboard") ? "text-white" : ""
                }`}
              >
                Dashboard
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 ${
                  isActive("/dashboard") ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </Link>
            )}
          </div>

          {/* Enhanced Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  className="text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300 hover:scale-105 px-4 py-2"
                  onClick={handleSignIn}
                >
                  Sign In
                </Button>
                <Button
                  className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                  onClick={handleGetStarted}
                >
                  <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Get Started
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 text-slate-300 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                    {user?.userName?.[0]?.toUpperCase() || user?.email[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm font-medium group-hover:text-white transition-colors duration-300">
                    {user?.userName || user?.email}
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="text-white border-blue-600/50 bg-blue-600/10 hover:bg-blue-600/20 hover:border-blue-600 transition-all duration-300 hover:scale-105"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="w-12 h-12 p-0 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-300"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-in slide-in-from-top-2 duration-300">
            <div className="px-4 pt-4 pb-6 space-y-2 bg-slate-900/95 border-t border-slate-800/60 backdrop-blur-md">
              <Link
                href="/"
                className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive("/") 
                    ? "text-white bg-blue-600/20 border border-blue-600/30" 
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive("/about") 
                    ? "text-white bg-blue-600/20 border border-blue-600/30" 
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                href="/docs"
                className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive("/docs") 
                    ? "text-white bg-blue-600/20 border border-blue-600/30" 
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
                onClick={toggleMenu}
              >
                Documentation
              </Link>
              <Link
                href="/contact"
                className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive("/contact") 
                    ? "text-white bg-blue-600/20 border border-blue-600/30" 
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
                onClick={toggleMenu}
              >
                Contact
              </Link>

              {isAuthenticated && (
                <Link
                  href="/dashboard"
                  className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive("/dashboard") 
                      ? "text-white bg-blue-600/20 border border-blue-600/30" 
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
              )}

              {!isAuthenticated ? (
                <div className="pt-4 pb-2 space-y-3 border-t border-slate-700/50">
                  <Button
                    variant="ghost"
                    className="w-full text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-300"
                    onClick={() => {
                      toggleMenu();
                      handleSignIn();
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-300"
                    onClick={() => {
                      toggleMenu();
                      handleGetStarted();
                    }}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Get Started
                  </Button>
                </div>
              ) : (
                <div className="pt-4 pb-2 space-y-3 border-t border-slate-700/50">
                  <div className="px-4 py-3 flex items-center space-x-3 text-slate-300 bg-slate-800/30 rounded-lg">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">{user?.userName || user?.email || 'User'}</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full text-white border-blue-600/50 bg-blue-600/10 hover:bg-blue-600/20 hover:border-blue-600 rounded-lg transition-all duration-300"
                    onClick={() => {
                      toggleMenu();
                      handleLogout();
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
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
