type RecruitmentWindow = {
  opensAt?: string | null;
  closesAt?: string | null;
};

/**
 * Derived from the dates on every request rather than stored, so nobody has to
 * remember to close the window. A window with no dates is closed.
 */
export function isRecruitmentOpen(
  { opensAt, closesAt }: RecruitmentWindow,
  now: Date,
) {
  if (!opensAt || !closesAt) return false;

  return now >= new Date(opensAt) && now <= new Date(closesAt);
}
