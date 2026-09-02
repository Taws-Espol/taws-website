import { connection } from "next/server";

import { getRecruitmentWindow } from "@/features/recruitment/queries/get-recruitment-window";
import { isRecruitmentOpen } from "@/features/recruitment/utils/is-recruitment-open";

import { ApplicationCtaLink } from "@/shared/components/application-cta-link";

/**
 * The only part of the header that depends on data. It is suspended on its own
 * so the navigation links render immediately: making every link wait on the
 * recruitment window to decide whether one button exists is a bad trade.
 */
export async function ApplicationCta({ className }: { className?: string }) {
  await connection();

  const window = await getRecruitmentWindow();

  if (!isRecruitmentOpen(window, new Date())) return null;

  return <ApplicationCtaLink className={className} />;
}
