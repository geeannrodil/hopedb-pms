import React from 'react';

export default function ProductListPage() {
  return (
    <div className="p-4 sm:p-2">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
        Products
      </h1>
      
      {/* Placeholder Content Area */}
      <div className="bg-white/70 backdrop-blur-md border border-white/40 shadow-sm rounded-3xl p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
        </div>
        <h2 className="text-lg font-bold text-slate-700">Product List Coming Soon</h2>
        <p className="text-slate-500 text-sm mt-2 text-center max-w-md">
          This is where the main data table and CRUD operations will live in Sprint 2.
        </p>
      </div>
    </div>
  );
}