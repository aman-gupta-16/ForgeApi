"use client";

import ProtectedRoute from '@/components/ProtectedRoute';

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
}