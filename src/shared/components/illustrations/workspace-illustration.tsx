import {
  Illustration,
  IllustrationBadge,
} from "@/shared/components/illustrations/illustration";

/** A desk mid-session: the hero of the home page. */
export function WorkspaceIllustration({ className }: { className?: string }) {
  return (
    <Illustration className={className}>
      <path d="M60 186v66" />
      <path d="M96 186v66" />
      <path
        d="M50 186v-56a12 12 0 0 1 12-12h32a12 12 0 0 1 12 12v56"
        className="fill-primary"
      />
      <rect x="38" y="170" width="78" height="17" rx="8.5" />

      <path d="M132 190v62" />
      <path d="M286 190v62" />
      <rect x="122" y="172" width="174" height="18" rx="9" />

      <rect
        x="152"
        y="76"
        width="120"
        height="80"
        rx="12"
        className="fill-primary"
      />
      <path d="M212 156v16" />
      <path d="M192 172h40" />

      <rect x="248" y="150" width="20" height="22" rx="5" />
      <path d="M268 155h6a6 6 0 0 1 0 12h-6" />

      <path
        d="M330 214h32a5 5 0 0 1 5 5.6l-4 27a6 6 0 0 1-6 5.4h-22a6 6 0 0 1-6-5.4l-4-27a5 5 0 0 1 5-5.6Z"
        className="fill-background"
      />
      <path
        d="M346 214c0-24 8-40 24-46 4 19-5 39-24 46Z"
        className="fill-primary"
      />
      <path d="M346 214c-17-8-24-25-20-42 15 8 22 23 20 42Z" />

      <IllustrationBadge x={62} y={54} r={22}>
        <circle cx="62" cy="54" r="22" />
        <circle cx="62" cy="54" r="8" className="fill-primary" />
      </IllustrationBadge>

      <IllustrationBadge x={330} y={66} r={19}>
        <circle cx="330" cy="66" r="19" />
        <path
          d="M327.4 58.6a3 3 0 0 1 5.2 0l5.6 9.7a3 3 0 0 1-2.6 4.5h-11.2a3 3 0 0 1-2.6-4.5Z"
          className="fill-brand-accent"
          strokeWidth={2}
        />
      </IllustrationBadge>

      <IllustrationBadge x={302} y={116} r={14}>
        <circle cx="302" cy="116" r="14" />
        <rect
          x="296"
          y="110"
          width="12"
          height="12"
          rx="3.5"
          className="fill-primary"
          strokeWidth={2}
        />
      </IllustrationBadge>
    </Illustration>
  );
}
