import {
  Illustration,
  IllustrationBadge,
} from "@/shared/components/illustrations/illustration";

/** Three people standing together: the club itself. */
export function TeamIllustration({ className }: { className?: string }) {
  return (
    <Illustration className={className}>
      <rect
        x="286"
        y="96"
        width="72"
        height="72"
        rx="18"
        className="fill-brand-accent"
      />

      <circle cx="112" cy="128" r="19" className="fill-background" />
      <circle cx="98" cy="112" r="10" className="fill-ink" />
      <path d="M78 252v-58a34 34 0 0 1 68 0v58" className="fill-background" />
      <path d="M146 208h22" />

      <circle cx="206" cy="100" r="21" className="fill-background" />
      <path d="M185 100a21 21 0 0 1 42 0" className="fill-ink" />
      <path d="M168 252v-72a38 38 0 0 1 76 0v72" className="fill-primary" />

      <circle cx="300" cy="136" r="17" className="fill-background" />
      <circle cx="314" cy="122" r="9" className="fill-ink" />
      <path d="M270 252v-50a30 30 0 0 1 60 0v50" className="fill-background" />
      <path d="M270 204h-20" />

      <IllustrationBadge x={54} y={78} r={20}>
        <circle cx="54" cy="78" r="20" />
        <circle cx="54" cy="78" r="7.5" className="fill-primary" />
      </IllustrationBadge>

      <IllustrationBadge x={356} y={198} r={16}>
        <circle cx="356" cy="198" r="16" />
        <path
          d="M353.6 191.4a3 3 0 0 1 4.8 0l5 8.6a3 3 0 0 1-2.4 4.5h-10a3 3 0 0 1-2.4-4.5Z"
          className="fill-primary"
          strokeWidth={2}
        />
      </IllustrationBadge>
    </Illustration>
  );
}
