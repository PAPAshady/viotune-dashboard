import { cloneElement } from 'react';

import { SidebarMenuItem, SidebarMenuButton, useSidebar } from '@/components/ui/sidebar';
import { NavLink } from 'react-router';

function SidebarItem({ title, icon, href }) {
  const styledIcon = cloneElement(icon, { className: 'size-full!' });
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarMenuItem>
      <NavLink to={href}>
        {({ isActive }) => (
          <SidebarMenuButton
            isActive={isActive}
            className="h-9 px-3 text-neutral-300 transition-colors data-[active=true]:bg-blue-500"
            onClick={() => setOpenMobile(false)}
          >
            <span className="size-5">{styledIcon}</span>
            <span>{title}</span>
          </SidebarMenuButton>
        )}
      </NavLink>
    </SidebarMenuItem>
  );
}

export default SidebarItem;
