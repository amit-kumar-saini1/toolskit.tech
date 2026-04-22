import { Link, type LinkProps } from "@tanstack/react-router";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<LinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        className={className}
        activeProps={activeClassName ? { className: cn(className, activeClassName) } : undefined}
        {...(props as LinkProps)}
      />
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
