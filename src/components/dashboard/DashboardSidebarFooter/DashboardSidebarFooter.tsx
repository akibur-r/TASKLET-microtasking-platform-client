import { ModeToggle } from "@/components/root/ModeToggle/ModeToggle";
import ProfileDropdown from "@/components/shared/ProfileDropdown/ProfileDropdown";
import { useSidebar } from "@/components/ui/sidebar";

const DashboardSidebarFooter = () => {
  const { open } = useSidebar();
  return (
    <div className="flex gap-2 items-center justify-end">
      <div className={`${!open && "hidden"}`}>
        <ModeToggle />
      </div>
      <div>
        <ProfileDropdown setDrawerOpen={(v) => v} />
      </div>
    </div>
  );
};

export default DashboardSidebarFooter;
