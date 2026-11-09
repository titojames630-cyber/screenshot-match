import { createFileRoute, redirect } from "@tanstack/react-router";

// Kits were retired: send old links to the shop.
export const Route = createFileRoute("/kits")({
  beforeLoad: () => {
    throw redirect({ to: "/shop" });
  },
});
