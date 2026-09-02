import {
  Illustration,
  IllustrationBadge,
} from "@/shared/components/illustrations/illustration";

/** A way in, with someone taking it: the application page. */
export function DoorIllustration({ className }: { className?: string }) {
  return (
    <Illustration className={className}>
      <path d="M132 252V132a68 68 0 0 1 136 0v120" className="fill-primary" />
      <path d="M160 252V134a40 40 0 0 1 80 0v118" className="fill-background" />

      <circle cx="200" cy="146" r="18" className="fill-background" />
      <circle cx="186" cy="131" r="9" className="fill-ink" />
      <path d="M170 252v-56a30 30 0 0 1 60 0v56" className="fill-background" />
      <path d="M230 214h26" />

      <path d="M290 252v-40a14 14 0 0 1 28 0v40" className="fill-background" />
      <rect
        x="284"
        y="176"
        width="40"
        height="38"
        rx="10"
        className="fill-brand-accent"
      />

      <IllustrationBadge x={64} y={104} r={22}>
        <circle cx="64" cy="104" r="22" />
        <circle cx="64" cy="104" r="8" className="fill-primary" />
      </IllustrationBadge>

      <IllustrationBadge x={100} y={172} r={15}>
        <circle cx="100" cy="172" r="15" />
        <path
          d="M97.4 165.4a3 3 0 0 1 5.2 0l5.4 9.3a3 3 0 0 1-2.6 4.5h-10.8a3 3 0 0 1-2.6-4.5Z"
          className="fill-primary"
          strokeWidth={2}
        />
      </IllustrationBadge>

      <IllustrationBadge x={344} y={92} r={18}>
        <circle cx="344" cy="92" r="18" />
        <rect
          x="337"
          y="85"
          width="14"
          height="14"
          rx="4"
          className="fill-primary"
          strokeWidth={2}
        />
      </IllustrationBadge>
    </Illustration>
  );
}
