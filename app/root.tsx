import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { Analytics } from '@vercel/analytics/react';
import { NuqsAdapter } from "nuqs/adapters/remix";
import { useSWEffect } from '@remix-pwa/sw'

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  useSWEffect()
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="canonical" href="https://logjs.vercel.app/" />
        <link as="font" rel="preload" crossOrigin="anonymous" href="/fonts/CascadiaCodePL.woff2" />
        <meta
          name="keywords"
          content="Playground, VSCode, JavaScript, Typescript, Node, React, Logjs, Runjs, Felipe Ossandon"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="log.js" />
        <meta
          property="og:description"
          content="A beautiful web playground for JavaScript and TypeScript"
        />
        <meta
          name="image"
          property="og:image"
          content="https://logjs.vercel.app/og.png"
        />
        <meta property="og:image:width" content="1600" />
        <meta property="og:image:height" content="1067" />
        <meta property="og:url" content="https://logjs.vercel.app/" />
        <meta property="og:site_name" content="log.js" />
        <meta name="author" content="@fe_ossandon" />
        <meta
          name="twitter:image"
          content="https://logjs.vercel.app/og.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@fe_ossandon" />
        <meta name="twitter:site" content="@fe_ossandon" />
        <meta name="twitter:title" content="log.js" />
        <Meta />
        <Links />
      </head>
      <body className="overflow-hidden bg-[#282A36]">
        {children}
        <ScrollRestoration />
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <NuqsAdapter>
      <Outlet />
    </NuqsAdapter>
  );
}
