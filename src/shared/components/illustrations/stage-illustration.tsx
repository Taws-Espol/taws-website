import {
  Illustration,
  IllustrationBadge,
} from "@/shared/components/illustrations/illustration";

/** A talk in progress: screen, speaker and an audience seen from behind. */
export function StageIllustration({ className }: { className?: string }) {
  return (
    <Illustration className={className}>
      <rect
        x="112"
        y="34"
        width="196"
        height="116"
        rx="14"
        className="fill-primary"
      />
      <path d="M150 150l-16 38" />
      <path d="M270 150l16 38" />

      <circle cx="66" cy="150" r="16" className="fill-background" />
      <path d="M42 208v-30a24 24 0 0 1 48 0v30" className="fill-background" />
      <rect x="40" y="208" width="52" height="44" rx="10" />

      <circle cx="150" cy="212" r="15" className="fill-background" />
      <path d="M126 252v-18a24 24 0 0 1 48 0v18" className="fill-background" />

      <circle cx="234" cy="206" r="15" className="fill-primary" />
      <path d="M210 252v-22a24 24 0 0 1 48 0v22" className="fill-primary" />

      <circle cx="318" cy="212" r="15" className="fill-background" />
      <path d="M294 252v-18a24 24 0 0 1 48 0v18" className="fill-background" />

      <IllustrationBadge x={356} y={92} r={19}>
        <circle cx="356" cy="92" r="19" />
        <rect
          x="349"
          y="85"
          width="14"
          height="14"
          rx="4"
          className="fill-brand-accent"
          strokeWidth={2}
        />
      </IllustrationBadge>

      <IllustrationBadge x={62} y={62} r={16}>
        <circle cx="62" cy="62" r="16" />
        <circle cx="62" cy="62" r="6" className="fill-primary" />
      </IllustrationBadge>
    </Illustration>
  );
}
