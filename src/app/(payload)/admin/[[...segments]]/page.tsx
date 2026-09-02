/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */

import config from "@payload-config";
import { generatePageMetadata, RootPage } from "@payloadcms/next/views";
import type { Metadata } from "next";
import { connection } from "next/server";

import { importMap } from "../importMap";

/**
 * Payload titles each admin view from the URL, so generateMetadata reads params
 * and cannot be prerendered. That is correct for an auth gated route; saying so
 * keeps the dev overlay quiet without giving every view the same title.
 *
 * The admin also reads the clock while rendering, which prerendering rejects as
 * an unstable value, so the page waits on connection() before handing over. It
 * is auth gated and reads cookies on every request, so it was never going to be
 * prerendered anyway.
 *
 * Payload generated this file and may rewrite it; if the notices come back,
 * these lines are what went missing.
 */
export const instant = false;

type Args = {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
};

export const generateMetadata = ({
  params,
  searchParams,
}: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams });

const Page = async ({ params, searchParams }: Args) => {
  await connection();

  return RootPage({ config, params, searchParams, importMap });
};

export default Page;
