import React from 'react';
import { AuthProvider } from './AuthContext';
import { ToastProvider } from './ToastContext';
import { LoadingProvider } from './LoadingContext';
import { ProvidersProvider } from './ProvidersContext';

export default function AppProvider({ children }) {
  return (
    <LoadingProvider>
      <ToastProvider>
        <AuthProvider>
          <ProvidersProvider>{children}</ProvidersProvider>
        </AuthProvider>
      </ToastProvider>
    </LoadingProvider>
  );
}
