import { NextUIProvider } from "@nextui-org/react";
import { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css?url";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesheet }];

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <NextUIProvider>
          <h1>Hello world!</h1>
          <div className="container lg mx-auto">
            <Outlet />
          </div>

          <Scripts />
        </NextUIProvider>
      </body>
    </html>
  );
}
