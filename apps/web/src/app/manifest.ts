import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kya Khana",
    short_name: "Kya Khana",
    description: "Meal planning for shared households",
    start_url: "/",
    display: "standalone",
    background_color: "#FFF8F1",
    theme_color: "#E65100",
    icons: [],
  };
}
