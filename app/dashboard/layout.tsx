import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col">
      <header className="border-b px-6 py-4">Header</header>
      <div className="flex flex-1">
        <aside className="w-64 border-r px-6 py-4">Sidebar</aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
