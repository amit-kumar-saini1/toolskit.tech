/**
 * Compatibility shim: react-router-dom -> @tanstack/react-router
 *
 * Purpose: Pages purane react-router-dom ke `Link`, `useParams`, `useLocation`,
 * `Navigate`, `useNavigate` use karte hain. Migration ke dauraan har file ko
 * touch karne ke bajaye, hum same naam ke wrappers expose karte hain jo
 * andar TanStack Router primitives use karein. Yeh SSR-safe hai aur build
 * pass karta hai.
 */
import { forwardRef, useEffect } from "react";
import {
  Link as TanstackLink,
  useLocation as useTanstackLocation,
  useNavigate as useTanstackNavigate,
  useParams as useTanstackParams,
} from "@tanstack/react-router";

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export interface LinkProps extends Omit<AnchorProps, "href"> {
  to: string;
  replace?: boolean;
  state?: unknown;
}

/**
 * Drop-in replacement for react-router-dom <Link>. Accepts plain string `to`
 * (e.g. "/tools/age-calculator", "/blog/some-slug"). Internally uses
 * TanStack Router's <Link> with `to={to}` so client-side nav works for any
 * registered route, and falls back to a plain anchor otherwise.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, children, replace, state: _state, ...rest }, ref) => {
    return (
      // @ts-expect-error - we intentionally pass arbitrary string paths
      <TanstackLink ref={ref} to={to} replace={replace} {...rest}>
        {children}
      </TanstackLink>
    );
  }
);
Link.displayName = "Link";

/** react-router-dom useLocation() shim */
export function useLocation() {
  const loc = useTanstackLocation();
  return {
    pathname: loc.pathname,
    search: loc.searchStr ?? "",
    hash: loc.hash ?? "",
    state: loc.state ?? null,
    key: "default",
  };
}

/** react-router-dom useNavigate() shim */
export function useNavigate() {
  const navigate = useTanstackNavigate();
  return (to: string | number, options?: { replace?: boolean }) => {
    if (typeof to === "number") {
      if (typeof window !== "undefined") window.history.go(to);
      return;
    }
    // @ts-expect-error arbitrary string path
    navigate({ to, replace: options?.replace });
  };
}

/** react-router-dom useParams() shim */
export function useParams<T extends Record<string, string | undefined> = Record<string, string | undefined>>() {
  // TanStack returns typed params from current route. We cast loosely.
  const params = useTanstackParams({ strict: false }) as T;
  return params ?? ({} as T);
}

/** react-router-dom <Navigate to="..." replace /> shim */
export function Navigate({ to, replace }: { to: string; replace?: boolean }) {
  const navigate = useTanstackNavigate();
  useEffect(() => {
    // @ts-expect-error arbitrary string path
    navigate({ to, replace: replace ?? true });
  }, [to, replace, navigate]);
  return null;
}
