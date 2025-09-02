"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import BrandLoader from '@/components/BrandLoader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallbackPath?: string;
}

export default function ProtectedRoute({ 
  children, 
  fallbackPath = "/login" 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, validateAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.warn("🔒 User not authenticated, redirecting to login...");
      router.replace(fallbackPath);
    }
  }, [isAuthenticated, isLoading, router, fallbackPath]);

  // Re-validate auth on mount and periodically
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const checkAuthPeriodically = async () => {
      const isValid = await validateAuth();
      if (!isValid) {
        router.replace(fallbackPath);
      }
    };

    if (isAuthenticated) {
      // Check auth every 5 minutes
      intervalId = setInterval(checkAuthPeriodically, 5 * 60 * 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAuthenticated, validateAuth, router, fallbackPath]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-950 to-purple-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <BrandLoader size={64} />
          <p className="text-slate-400 text-lg">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-950 to-purple-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <BrandLoader size={64} />
          <p className="text-slate-400 text-lg">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Render protected content
  return <>{children}</>;
}