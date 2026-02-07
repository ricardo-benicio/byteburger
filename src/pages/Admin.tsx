import AdminLayout from "@/components/AdminLayout";

/**
 * Admin Page Component
 *
 * Entry point for the admin workspace at route /admin.
 * This component delegates layout to AdminLayout and provides
 * the main admin content area.
 *
 * Route: http://localhost:5173/admin
 *
 * Children components (will be added in future stories):
 * - AdminMenuOverview (Story 3-2)
 * - AdminMenuForm (Story 4-1)
 * - EditFlow (Story 5-1)
 * - DeleteDialog (Story 6-1)
 */
export default function Admin() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Menu Management
          </h2>
          <p className="mt-2 text-slate-600">
            Welcome to the menu management panel. Add, edit, and delete menu items.
            All changes appear instantly in the customer ordering interface.
          </p>
        </div>

        {/* 
          Story 3-2: AdminMenuOverview will go here
          <AdminMenuOverview />
        */}
      </div>
    </AdminLayout>
  );
}
