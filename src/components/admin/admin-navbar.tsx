
import { Logo } from "@/components/logo";

export function AdminNavbar() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container flex h-16 items-center px-4">
        <Logo />
        <span className="ml-4 text-lg font-medium text-morocco-blue">Admin Panel</span>
      </div>
    </div>
  );
}
