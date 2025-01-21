import type { WebAppManifest } from '@remix-pwa/dev';
import { data } from '@remix-run/node';


export const loader = () => {
  return data(
    {
      short_name: "log.js 🧪",
      name: "log.js 🧪",
      description: "A beautiful web playground for JavaScript and TypeScript",
      start_url: "/",
      display: "standalone",
      categories: [
        "playground",
        "development",
        "utilities"
      ],
      screenshots: [
        {
          src: "/og.png",
          sizes: "1600x1067",
          type: "image/png",
          platform: "web",
          // @ts-expect-error - remix-pwa should update their types
          form_factor: "wide",
          label: "log.js 🧪"
        }
      ],
      icons: [
        {
          "src": "/logo.svg",
          "sizes": "512x512",
          "type": "image/svg+xml"
        }
      ],
      background_color: "#282A36",
      theme_color: "#F0DB4F"
    } as WebAppManifest,
    {
      headers: {
        'Cache-Control': 'public, max-age=600',
        'Content-Type': 'application/manifest+json',
      },
    }
  );
};
