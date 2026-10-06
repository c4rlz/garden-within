import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Garden Within",
    short_name: "Garden",
    description: "A private space for daily reflection.",
    start_url: "/today",
    display: "standalone",
    background_color: "#F4EFE4",
    theme_color: "#F4EFE4",
    orientation: "portrait",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
