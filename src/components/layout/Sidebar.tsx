import Link from "next/link";
import { LucideLayoutDashboard, LucideClock, LucideFolder, LucideListChecks, LucideBarChart2, LucideUsers, Calendar } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LucideLayoutDashboard },
  { href: "/time-tracking", label: "Time Tracking", icon: LucideClock },
  { href: "/calendar", label: "Calendario", icon: Calendar },
  { href: "/projects", label: "Proyectos", icon: LucideFolder },
  { href: "/tasks", label: "Tareas", icon: LucideListChecks },
  { href: "/reports", label: "Reportes", icon: LucideBarChart2 },
  { href: "/users", label: "Usuarios", icon: LucideUsers },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-card border-r h-screen flex flex-col p-4">
      <div className="mb-8">
        <Logo />
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="flex items-center gap-3 px-3 py-2 rounded hover:bg-muted transition-colors">
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
} 