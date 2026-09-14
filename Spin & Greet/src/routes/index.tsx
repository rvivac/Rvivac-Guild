import { createFileRoute } from "@tanstack/react-router";
import { AnimatedLogo } from "@/components/AnimatedLogo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RVIVAC GUILD" },
      {
        name: "description",
        content: "RVIVAC GUILD — identidade em movimento.",
      },
      { property: "og:title", content: "RVIVAC GUILD" },
      {
        property: "og:description",
        content: "RVIVAC GUILD — identidade em movimento.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="brand-intro" aria-label="RVIVAC GUILD">
      <h1 className="sr-only">RVIVAC GUILD</h1>
      <AnimatedLogo />
    </main>
  );
}
