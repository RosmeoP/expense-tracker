import React from 'react';
import SideBar from './sideBar';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <SideBar />
      
      <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
        <main className="flex-1 overflow-y-auto">
          <div className="w-full max-w-6xl mx-auto px-6 py-6 pb-24 md:pb-6">
            {(title || subtitle) && (
              <div className="mb-6 text-center">
                {title && (
                  <h1 className="text-2xl font-bold text-gray-900">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-sm text-gray-600 mt-1">
                    {subtitle}
                  </p>
                )}
              </div>
            )}
            
            {children}
          </div>
        </main>
      </div>
      
      <SideBar mobileOnly />
    </div>
  );
};

export default Layout;