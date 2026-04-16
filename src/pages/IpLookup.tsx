import { useState } from "react";
import { Search, Globe, MapPin, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { InfoCard } from "@/components/InfoCard";
import type { IpInfo } from "@/hooks/useIpInfo";

const faqs = [
  { q: "How does IP address lookup work?", a: "IP address lookup works by querying databases that map IP address ranges to geographic locations and network information. These databases are maintained by regional internet registries and commercial providers, and they use a combination of data from ISPs, network operators, and geolocation services." },
  { q: "How accurate is IP geolocation?", a: "IP geolocation is typically accurate to the city level in about 80% of cases. Country-level accuracy is usually 95-99%. However, it cannot pinpoint an exact street address. VPN users, mobile networks, and corporate proxies can reduce accuracy significantly." },
  { q: "Can I look up any IP address?", a: "You can look up any public IP address. Private IP addresses (like 192.168.x.x or 10.x.x.x) are used within local networks and cannot be geolocated. Some IP addresses may have limited information available depending on the database coverage." },
  { q: "What information does an IP lookup reveal?", a: "An IP lookup typically reveals the approximate geographic location (country, region, city), the Internet Service Provider (ISP) or hosting company, the timezone, and sometimes the organization that owns the IP block. It does not reveal personal information like names or exact addresses." },
];

const IpLookup = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLookup = () => {
    const ip = query.trim();
    if (!ip) return;
    setLoading(true);
    setError("");
    setResult(null);
    fetch(`https://ipinfo.io/${ip}/json?token=`)
      .then((res) => {
        if (!res.ok) throw new Error("Invalid IP");
        return res.json();
      })
      .then((data) => { setResult(data); setLoading(false); })
      .catch(() => { setError("Could not find information for that IP address. Please check the format and try again."); setLoading(false); });
  };

  return (
    <>
      <SEOHead
        title="IP Address Lookup | Find Location & ISP for Any IP"
        description="Look up any IP address to find its geographic location, ISP, timezone, and more. Free IP lookup tool with accurate geolocation data."
        keywords="ip address lookup, ip lookup, ip geolocation, find ip location, ip tracker, ip address finder"
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <section className="py-12 sm:py-20 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            IP Address Lookup
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-10">
            Enter any IP address to find its location, ISP, and network details instantly.
          </p>

          <div className="mx-auto max-w-lg">
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLookup()}
                placeholder="Enter an IP address (e.g., 8.8.8.8)"
                className="flex-1 px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                style={{ fontFamily: "var(--font-mono)" }}
              />
              <button
                onClick={handleLookup}
                disabled={loading}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Lookup</span>
              </button>
            </div>

            {loading && (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            )}

            {error && <p className="text-destructive text-sm mt-4">{error}</p>}

            {result && (
              <div className="mt-6 text-left">
                <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-medium">Lookup Results for {result.ip}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.city && <InfoCard icon={<MapPin className="w-4 h-4" />} label="Location" value={[result.city, result.region, result.country].filter(Boolean).join(", ")} />}
                  {result.org && <InfoCard icon={<Shield className="w-4 h-4" />} label="ISP / Org" value={result.org} />}
                  {result.timezone && <InfoCard icon={<Globe className="w-4 h-4" />} label="Timezone" value={result.timezone} />}
                  {result.loc && <InfoCard icon={<MapPin className="w-4 h-4" />} label="Coordinates" value={result.loc} />}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 sm:py-16 border-t border-border">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>How IP Address Lookup Works</h2>
          <div className="space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
            <p>
              An <strong className="text-foreground">IP address lookup</strong> (also called IP geolocation) is the process of determining the geographic location and network information associated with an IP address. When you enter an IP address into our lookup tool, we query comprehensive geolocation databases to retrieve detailed information about that address.
            </p>
            <p>
              Every device connected to the internet is assigned a unique IP address by its Internet Service Provider (ISP). These addresses are allocated in blocks to ISPs and organizations by regional internet registries such as ARIN (North America), RIPE NCC (Europe), and APNIC (Asia-Pacific). By mapping these allocations, geolocation databases can determine the approximate physical location of an IP address.
            </p>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground pt-4" style={{ fontFamily: "var(--font-heading)" }}>What You Can Learn From an IP Lookup</h3>
            <p>
              Our <strong className="text-foreground">IP lookup tool</strong> reveals several pieces of information: the country, region, and city associated with the IP; the ISP or organization that owns the address block; the timezone; and approximate coordinates. This information is useful for network administrators, security researchers, and anyone who wants to verify where an IP address is located.
            </p>
            <p>
              It's important to note that IP geolocation has limitations. It provides approximate locations, typically accurate to the city level. It cannot reveal the exact street address or personal identity of the user behind an IP. For enhanced privacy, users can employ <Link to="/privacy" className="text-primary hover:underline">VPN services</Link> to mask their real IP address. To check your own IP, visit our <Link to="/" className="text-primary hover:underline">What Is My IP</Link> page.
            </p>
          </div>
        </section>

        <FAQSection faqs={faqs} />
      </div>
    </>
  );
};

export default IpLookup;
