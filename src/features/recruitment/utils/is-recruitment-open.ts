type RecruitmentWindow = {
  opensAt?: string | null;
  closesAt?: string | null;
};

/** Derived on each request rather than stored, so nobody has to close it by hand. */
export function isRecruitmentOpen(
  { opensAt, closesAt }: RecruitmentWindow,
  now: Date,
) {
  if (!opensAt || !closesAt) return false;

  return now >= new Date(opensAt) && now <= new Date(closesAt);
}
