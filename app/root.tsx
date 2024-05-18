import {
    Links,
    Meta,
    Outlet,
    Scripts,
  } from "@remix-run/react";
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";


export default function App() {
  return (
    <PrimeReactProvider>
      <html>
        <head>
          <link rel="icon" href="data:image/x-icon;base64,AA" />
          <Meta />
          <Links />
        </head>
        <body>
          <h1>Hello world!</h1>
          <Outlet />

          <Scripts />
        </body>
      </html>
    </PrimeReactProvider>
  );
}
