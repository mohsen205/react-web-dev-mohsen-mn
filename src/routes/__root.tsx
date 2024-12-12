import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <main className="py-8">
      <Outlet />
      <TanStackRouterDevtools />
    </main>
  ),
});
