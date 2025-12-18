import { cloneElement } from 'react';

import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { NavLink } from 'react-router';

function SidebarItem({ title, icon, href }) {
  const styledIcon = cloneElement(icon, { className: 'size-full!' });

  console.log(styledIcon);

  return (
    <SidebarMenuItem>
      <SidebarMenuItem>
        <NavLink to={href}>
          {({ isActive }) => (
            <SidebarMenuButton
              isActive={isActive}
              className="h-9 px-3 transition-colors text-neutral-300 data-[active=true]:bg-blue-500"
            >
              <span className="size-5">{styledIcon}</span>
              <span>{title}</span>
            </SidebarMenuButton>
          )}
        </NavLink>
      </SidebarMenuItem>
    </SidebarMenuItem>
  );
}

export default SidebarItem;
