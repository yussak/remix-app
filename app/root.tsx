import type { LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Outlet } from "@remix-run/react";

import globalStylesUrl from "~/styles/global.css"

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: globalStylesUrl },
]

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <title>Remix: So great, it's funny!</title>
        <Links />
      </head>
      <body>
        Hello world
        <LiveReload />
        <Outlet />
      </body>
    </html>
  );
}
