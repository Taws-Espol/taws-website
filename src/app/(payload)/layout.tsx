/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from "@payload-config";
import "@payloadcms/next/css";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import type { ServerFunctionClient } from "payload";
import type React from "react";
import { Suspense } from "react";

import { importMap } from "./admin/importMap.js";
import "./custom.scss";

/**
 * The admin is auth gated and reads cookies on every request, so it can never
 * be prerendered or navigated to instantly. Saying so keeps the dev overlay
 * quiet about a route that is correct as it is.
 *
 * The metadata notice on this route stays: Payload reads params to title each
 * admin view, and the alternatives cost per-view titles. It is expected.
 *
 * Payload generated this file and may rewrite it; if the notice comes back,
 * this line is what went missing.
 */
export const instant = false;

type Args = {
  children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async (args) => {
  "use server";
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

const Layout = async ({ children }: Args) => (
  <Suspense fallback={null}>
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  </Suspense>
);

export default Layout;
