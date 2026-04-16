import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQ {
  q: string;
  a: string;
}

export const FAQSection = ({ faqs, title = "Frequently Asked Questions" }: { faqs: FAQ[]; title?: string }) => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-12 sm:py-16 border-t border-border" id="faq">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ fontFamily: "var(--font-heading)" }}>
        {title}
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between p-4 sm:p-5 text-left font-medium text-sm sm:text-base hover:bg-secondary/50 transition-colors"
            >
              {faq.q}
              <ChevronDown className={`w-4 h-4 shrink-0 ml-2 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && (
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-muted-foreground text-sm leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
