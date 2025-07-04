import { DashboardCards } from "@/components/ui/DashboardCards";

export default function DashboardPage() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <DashboardCards />
    </section>
  );
} 