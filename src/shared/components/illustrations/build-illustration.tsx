import {
  Illustration,
  IllustrationBadge,
} from "@/shared/components/illustrations/illustration";

/** Something being built: a window of work and the pieces it is made of. */
export function BuildIllustration({ className }: { className?: string }) {
  return (
    <Illustration className={className}>
      <rect
        x="120"
        y="44"
        width="224"
        height="158"
        rx="16"
        className="fill-background"
      />
      <path d="M120 80h224" />
      <circle cx="142" cy="62" r="4.5" className="fill-ink" />
      <circle cx="160" cy="62" r="4.5" className="fill-background" />
      <circle cx="178" cy="62" r="4.5" className="fill-background" />

      <rect
        x="144"
        y="104"
        width="92"
        height="14"
        rx="7"
        className="fill-primary"
        strokeWidth={0}
      />
      <rect
        x="144"
        y="132"
        width="146"
        height="14"
        rx="7"
        className="fill-surface"
        strokeWidth={0}
      />
      <rect
        x="144"
        y="160"
        width="62"
        height="14"
        rx="7"
        className="fill-brand-accent"
        strokeWidth={0}
      />

      <path d="M232 202v28" />
      <path d="M188 244h88a8 8 0 0 0 0-14h-88a8 8 0 0 0 0 14Z" />

      <rect
        x="40"
        y="212"
        width="44"
        height="40"
        rx="12"
        className="fill-primary"
      />
      <rect
        x="52"
        y="168"
        width="44"
        height="44"
        rx="12"
        className="fill-background"
      />
      <path
        d="M71.4 128.6a3 3 0 0 1 5.2 0l16 27.7a3 3 0 0 1-2.6 4.5H58a3 3 0 0 1-2.6-4.5Z"
        className="fill-background"
      />

      <IllustrationBadge x={356} y={172} r={19}>
        <circle cx="356" cy="172" r="19" />
        <circle cx="356" cy="172" r="7" className="fill-primary" />
      </IllustrationBadge>
    </Illustration>
  );
}
