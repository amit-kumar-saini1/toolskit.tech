/**
 * Compatibility shim: re-exports TanStack Router primitives under
 * `react-router-dom`-compatible names so legacy pages keep working
 * during the gradual migration to file-based routes.
 *
 * Phase 2-5 me actual pages migrate hoke direct `@tanstack/react-router`
 * use karenge, phir ye file delete kar denge.
 */
import {
  Link as TSLink,
  useLocation as tsUseLocation,
  useParams as tsUseParams,
  useNavigate as tsUseNavigate,
  Navigate as TSNavigate,
} from "@tanstack/react-router";
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type LinkProps = {
  to: string;
  children?: ReactNode;
  className?: string;
  replace?: boolean;
  state?: unknown;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

/** Drop-in `Link` replacement that accepts react-router-dom-style `to` strings. */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, children, className, replace, state: _state, ...rest }, ref) => {
    return (
      <TSLink
        ref={ref}
        to={to}
        replace={replace}
        className={className}
        {...(rest as Record<string, unknown>)}
      >
        {children}
      </TSLink>
    );
  }
);
Link.displayName = "Link";

/** NavLink with className/style render-prop support. */
type NavLinkClassFn = (state: { isActive: boolean; isPending: boolean }) => string | undefined;
type NavLinkProps = Omit<LinkProps, "className"> & {
  className?: string | NavLinkClassFn;
  end?: boolean;
};

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ to, className, children, end, ...rest }, ref) => {
    const resolved =
      typeof className === "function"
        ? undefined
        : className;
    return (
      <TSLink
        ref={ref}
        to={to}
        className={resolved}
        activeOptions={end ? { exact: true } : undefined}
        {...(rest as Record<string, unknown>)}
      >
        {({ isActive, isTransitioning }) => {
          const cls =
            typeof className === "function"
              ? className({ isActive, isPending: isTransitioning })
              : cn(className, isActive && "active");
          return (
            <span className={cls}>{children as ReactNode}</span>
          );
        }}
      </TSLink>
    );
  }
);
NavLink.displayName = "NavLink";

/** useLocation — returns { pathname, search, hash, state } */
export function useLocation() {
  const loc = tsUseLocation();
  return {
    pathname: loc.pathname,
    search: loc.searchStr ?? "",
    hash: loc.hash ?? "",
    state: (loc.state as unknown) ?? null,
    key: loc.href ?? loc.pathname,
  };
}

/** useParams — TanStack returns typed params; cast to string record for compat. */
export function useParams<T extends Record<string, string | undefined> = Record<string, string | undefined>>(): T {
  // strict: false so it works inside any route subtree
  return tsUseParams({ strict: false }) as T;
}

/** useNavigate — returns a function compatible with `navigate(to)` and `navigate(-1)`. */
export function useNavigate() {
  const nav = tsUseNavigate();
  return (to: string | number, options?: { replace?: boolean; state?: unknown }) => {
    if (typeof to === "number") {
      // Best-effort browser back/forward fallback.
      if (typeof window !== "undefined") window.history.go(to);
      return;
    }
    nav({ to, replace: options?.replace });
  };
}

/** Navigate component — declarative redirect. */
export function Navigate({ to, replace }: { to: string; replace?: boolean }) {
  return <TSNavigate to={to} replace={replace} />;
}

/** BrowserRouter / Routes / Route — no-ops kept for legacy imports. */
export function BrowserRouter({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
export function Routes({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
export function Route() {
  return null;
}

/** Outlet pass-through. */
export { Outlet } from "@tanstack/react-router";
