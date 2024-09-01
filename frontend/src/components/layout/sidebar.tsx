import { Link } from 'react-router-dom';
import { Hospital, LucideIcon, UserPlus, Users } from 'lucide-react';
import useSecureStorage from '@/hooks/useSecureStorage';
import { FC } from 'react';

interface SidebarLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
}
// SidebarLink component with type annotations
const SidebarLink: FC<SidebarLinkProps> = ({ to, icon: Icon, label }) => (
  <Link
    to={to}
    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
  >
    <Icon />
    {label}
  </Link>
);

const Sidebar = () => {
  const { get } = useSecureStorage();
  const isSuperAdmin = get('auth-type') === 'super-admin';

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span>Client Management System</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-4">
            <SidebarLink to="/" icon={Hospital} label="Clients" />
            {isSuperAdmin && (
              <>
                <SidebarLink to="/admins" icon={Users} label="Admins" />
                <SidebarLink to="/admins/add" icon={UserPlus} label="Add Admin" />
              </>
            )}
          </nav>
        </div>
        <div className="mt-auto p-4">
          {/* Additional content or actions for the sidebar's footer */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
