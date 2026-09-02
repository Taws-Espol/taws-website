import {
  Illustration,
  IllustrationBadge,
} from "@/shared/components/illustrations/illustration";

/** Prints leaning against a wall, the middle one still wet with colour. */
export function GalleryIllustration({ className }: { className?: string }) {
  return (
    <Illustration className={className}>
      <g transform="rotate(-7 128 178)">
        <rect
          x="70"
          y="112"
          width="116"
          height="132"
          rx="16"
          className="fill-background"
        />
        <path d="M86 206l26-28 20 20 16-16 18 24" />
      </g>

      <g transform="rotate(6 292 182)">
        <rect
          x="234"
          y="118"
          width="116"
          height="126"
          rx="16"
          className="fill-background"
        />
        <circle cx="266" cy="152" r="12" className="fill-brand-accent" />
        <path d="M250 210l28-26 22 22 18-18 16 20" />
      </g>

      <rect
        x="148"
        y="96"
        width="120"
        height="150"
        rx="16"
        className="fill-primary"
      />
      <circle cx="180" cy="132" r="13" className="fill-background" />
      <path
        d="M162 214l30-34 22 24 18-20 26 30"
        className="stroke-background"
      />

      <IllustrationBadge x={56} y={70} r={20}>
        <circle cx="56" cy="70" r="20" />
        <rect
          x="48"
          y="62"
          width="16"
          height="16"
          rx="4.5"
          className="fill-primary"
          strokeWidth={2}
        />
      </IllustrationBadge>

      <IllustrationBadge x={352} y={70} r={16}>
        <circle cx="352" cy="70" r="16" />
        <circle cx="352" cy="70" r="6" className="fill-primary" />
      </IllustrationBadge>
    </Illustration>
  );
}
