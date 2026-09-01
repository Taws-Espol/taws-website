import { TICKER_ITEMS } from "@/features/landing/constants/ticker";
import { Eyebrow } from "@/shared/components/ui/typography";

/** The list is rendered twice so the translation loops seamlessly. */
export function TickerBand() {
  return (
    <div className="bg-surface-inverted text-on-inverted overflow-hidden py-4">
      <div className="motion-safe:animate-ticker flex w-max gap-8 motion-reduce:flex-wrap motion-reduce:justify-center">
        {[false, true].map((isDuplicate) => (
          <ul
            key={String(isDuplicate)}
            aria-hidden={isDuplicate || undefined}
            className="flex shrink-0 items-center gap-8"
          >
            {TICKER_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-8">
                <Eyebrow className="opacity-90">{item}</Eyebrow>
                <span aria-hidden="true" className="text-secondary">
                  ◆
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
