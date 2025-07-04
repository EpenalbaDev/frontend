import { Avatar } from "@/components/ui/avatar";
import { Bell } from "lucide-react";

export function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b bg-background">
      <div className="font-bold text-lg">Dashboard</div>
      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <Avatar>
          <Avatar.Image src="/avatar.png" alt="User" />
          <Avatar.Fallback>U</Avatar.Fallback>
        </Avatar>
      </div>
    </header>
  );
} 