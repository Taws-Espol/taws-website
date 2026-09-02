import { TICKER_ITEMS } from "@/features/landing/constants/ticker";
import { Eyebrow } from "@/shared/components/ui/typography";

export function TickerBand() {
  return (
    <div className="bg-primary text-primary-foreground py-4">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6">
        {TICKER_ITEMS.map((item) => (
          <li key={item} className="flex items-center gap-8">
            <Eyebrow>{item}</Eyebrow>
            <span aria-hidden="true" className="text-primary-foreground/40">
              ◆
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
