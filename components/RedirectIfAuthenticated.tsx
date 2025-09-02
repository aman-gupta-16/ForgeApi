"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import BrandLoader from '@/components/BrandLoader';

interface RedirectIfAuthenticatedProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function RedirectIfAuthenticated({ 
  children, 
  redirectTo = "/dashboard" 
}: RedirectIfAuthenticatedProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      console.log("🔄 User already authenticated, redirecting...");
      router.replace(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-950 to-purple-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <BrandLoader size={64} />
          <p className="text-slate-400 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if authenticated
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-950 to-purple-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <BrandLoader size={64} />
          <p className="text-slate-400 text-lg">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  // Render auth form if not authenticated
  return <>{children}</>;
}