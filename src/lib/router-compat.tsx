/**
 * Compatibility shim: react-router-dom -> @tanstack/react-router
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

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, children, replace, state: _state, ...rest }, ref) => {
    const Anchor = TanstackLink as unknown as React.ForwardRefExoticComponent<
      React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        to: string;
        replace?: boolean;
        ref?: React.Ref<HTMLAnchorElement>;
      }
    >;
    return (
      <Anchor ref={ref} to={to} replace={replace} {...rest}>
        {children}
      </Anchor>
    );
  }
);
Link.displayName = "Link";

export function useLocation() {
  const loc = useTanstackLocation();
  return {
    pathname: loc.pathname,
    search: (loc as unknown as { searchStr?: string }).searchStr ?? "",
    hash: loc.hash ?? "",
    state: loc.state ?? null,
    key: "default",
  };
}

export function useNavigate() {
  const navigate = useTanstackNavigate();
  return (to: string | number, options?: { replace?: boolean }) => {
    if (typeof to === "number") {
      if (typeof window !== "undefined") window.history.go(to);
      return;
    }
    (navigate as unknown as (opts: { to: string; replace?: boolean }) => void)({
      to,
      replace: options?.replace,
    });
  };
}

export function useParams<
  T extends Record<string, string | undefined> = Record<string, string | undefined>,
>() {
  const params = (useTanstackParams as unknown as (opts: { strict: false }) => T)({
    strict: false,
  });
  return (params ?? ({} as T)) as T;
}

export function Navigate({ to, replace }: { to: string; replace?: boolean }) {
  const navigate = useTanstackNavigate();
  useEffect(() => {
    (navigate as unknown as (opts: { to: string; replace?: boolean }) => void)({
      to,
      replace: replace ?? true,
    });
  }, [to, replace, navigate]);
  return null;
}
