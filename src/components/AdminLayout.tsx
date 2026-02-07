import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

/**
 * AdminLayout Component
 *
 * Provides the base layout structure for the admin workspace.
 *
 * Structure:
 * - Header: Branding and page title
 * - Main: Content area (flex: 1 to fill available space)
 * - Footer: Footer links and copyright
 *
 * Note: Story 3-1 will expand this with sidebar navigation,
 * menu toggles, and a more sophisticated layout structure.
 *
 * For now, this is a minimal placeholder focused on:
 * - Responsive design (mobile + desktop)
 * - Consistent styling with customer interface
 * - Clean component structure for expansion
 */
export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* ============================================ */}
      {/* HEADER - Branding and Navigation */}
      {/* ============================================ */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-full px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Branding Section */}
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                ByteBurger
              </h1>
              <p className="text-sm text-slate-600">
                Admin Panel
              </p>
            </div>

            {/* Right Side: Placeholder for user menu */}
            <div className="text-sm text-slate-600">
              {/* Future: Add user profile dropdown here */}
            </div>
          </div>
        </div>
      </header>

      {/* ============================================ */}
      {/* MAIN CONTENT AREA - Flex: 1 to fill space */}
      {/* ============================================ */}
      <main className="flex-1 w-full max-w-full">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* ============================================ */}
      {/* FOOTER - Copyright and links */}
      {/* ============================================ */}
      <footer className="border-t border-slate-200 bg-white py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">
              ByteBurger © 2026 | Admin Panel v1.0
            </p>
            {/* Future: Add footer links */}
          </div>
        </div>
      </footer>

      {/* Story 3-1: Add sidebar with navigation menu here */}
    </div>
  );
}
