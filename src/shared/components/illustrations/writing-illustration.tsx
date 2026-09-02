import {
  Illustration,
  IllustrationBadge,
} from "@/shared/components/illustrations/illustration";

/** An open notebook on a table: what the blog is. */
export function WritingIllustration({ className }: { className?: string }) {
  return (
    <Illustration className={className}>
      <path d="M96 214v38" />
      <path d="M304 214v38" />
      <rect x="80" y="196" width="240" height="18" rx="9" />

      <path
        d="M200 116c-20-14-46-20-72-17a8 8 0 0 0-7 8v70a8 8 0 0 0 9 8c25-3 50 3 70 16Z"
        className="fill-background"
      />
      <path
        d="M200 116c20-14 46-20 72-17a8 8 0 0 1 7 8v70a8 8 0 0 1-9 8c-25-3-50 3-70 16Z"
        className="fill-primary"
      />
      <path d="M200 116v85" />
      <path d="M140 132h40" strokeWidth={2.5} />
      <path d="M140 152h44" strokeWidth={2.5} />
      <path d="M140 172h30" strokeWidth={2.5} />

      <path d="M312 196V96a12 12 0 0 1 24 0v100" className="fill-background" />
      <path d="M312 122h24" />
      <path
        d="M324 60a12 12 0 0 1 12 12v24h-24V72a12 12 0 0 1 12-12Z"
        className="fill-brand-accent"
      />

      <IllustrationBadge x={62} y={92} r={21}>
        <circle cx="62" cy="92" r="21" />
        <rect
          x="54"
          y="84"
          width="16"
          height="16"
          rx="4.5"
          className="fill-primary"
          strokeWidth={2}
        />
      </IllustrationBadge>

      <IllustrationBadge x={104} y={54} r={14}>
        <circle cx="104" cy="54" r="14" />
        <circle cx="104" cy="54" r="5.5" className="fill-primary" />
      </IllustrationBadge>
    </Illustration>
  );
}
