"use client";
import { ProtectedRoute } from "@/components/ui/ProtectedRoute";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { DashboardCards } from "@/components/ui/DashboardCards";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-4">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DashboardCards />
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
} 