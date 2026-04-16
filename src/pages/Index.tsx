import { useState, useEffect, useCallback } from "react";
import {
  Copy,
  Check,
  Globe,
  MapPin,
  Shield,
  Wifi,
  RefreshCw,
  Sun,
  Moon,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

interface IpInfo {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  org?: string;
  timezone?: string;
  loc?: string;
}

const Index = () => {
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [dark, setDark] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const fetchIp = useCallback(() => {
    setLoading(true);
    fetch("https://ipinfo.io/json?token=")
      .then((res) => res.json())
      .then((data) => {
        setIpInfo(data);
        setLoading(false);
      })
      .catch(() => {
        fetch("https://api.ipify.org?format=json")
          .then((res) => res.json())
          .then((data) => {
            setIpInfo({ ip: data.ip });
            setLoading(false);
          })
          .catch(() => setLoading(false));
      });
  }, []);

  useEffect(() => {
    fetchIp();
  }, [fetchIp]);

  const handleCopy = () => {
    if (!ipInfo?.ip) return;
    navigator.clipboard.writeText(ipInfo.ip);
    setCopied(true);
    toast.success("IP address copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleTheme = () => setDark((d) => !d);

  const faqs = [
    {
      q: "What is an IP address?",
      a: "An IP (Internet Protocol) address is a unique numerical label assigned to every device connected to the internet. It serves as an identifier that allows devices to communicate with each other across networks. Think of it like a mailing address for your computer.",
    },
    {
      q: "Can someone track me with my IP address?",
      a: "An IP address can reveal your approximate location (city or region level) and your Internet Service Provider, but it cannot pinpoint your exact physical address or identity. However, law enforcement agencies can request your ISP to provide more details with a court order.",
    },
    {
      q: "Is my IP address private?",
      a: "Your public IP address is visible to every website and online service you connect to — it is not private by default. To mask your IP and enhance privacy, you can use a VPN (Virtual Private Network) or a proxy service.",
    },
    {
      q: "Why does my IP address change?",
      a: "Most residential internet connections use dynamic IP addresses assigned by your ISP. These can change when your router restarts, when your ISP rotates addresses, or when your DHCP lease expires. Businesses often use static IPs that don't change.",
    },
  ];

  const navLinks = [
    { label: "Your IP", href: "#ip-details" },
    { label: "About IP", href: "#about-ip" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
            <a href="/" className="flex items-center gap-2 text-primary font-bold text-lg" style={{ fontFamily: "var(--font-heading)" }}>
              <Wifi className="w-5 h-5" />
              <span className="hidden sm:inline">IP Checker</span>
            </a>
            <nav className="flex items-center gap-1 sm:gap-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="px-2 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md"
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={toggleTheme}
                className="ml-2 p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label="Toggle theme"
              >
                {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Hero */}
          <section className="py-12 sm:py-20 text-center" id="ip-details">
            <h1
              className="text-3xl sm:text-5xl font-bold tracking-tight mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              What Is My IP Address
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-10">
              Instantly find your public IP address, location, and ISP details — free and secure.
            </p>

            {/* IP Card */}
            <div className="mx-auto max-w-lg bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xl">
              <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-medium">
                Your IP Address
              </h2>
              {loading ? (
                <div className="flex flex-col items-center gap-3 py-6">
                  <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  <p className="text-muted-foreground text-sm">Detecting your IP…</p>
                </div>
              ) : ipInfo ? (
                <>
                  <p
                    className="text-2xl sm:text-4xl font-bold tracking-tight mb-6"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {ipInfo.ip}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium transition-all hover:brightness-110 active:scale-95"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? "Copied" : "Copy IP"}
                    </button>
                    <button
                      onClick={fetchIp}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium transition-all hover:brightness-110 active:scale-95"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Refresh
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground py-6">Unable to detect IP address. Please try again.</p>
              )}
            </div>

            {/* Location Details */}
            {ipInfo && (ipInfo.city || ipInfo.org) && (
              <div className="mx-auto max-w-lg mt-6">
                <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-medium text-center">
                  IP Location Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ipInfo.city && (
                    <InfoCard
                      icon={<MapPin className="w-4 h-4" />}
                      label="Location"
                      value={[ipInfo.city, ipInfo.region, ipInfo.country].filter(Boolean).join(", ")}
                    />
                  )}
                  {ipInfo.org && (
                    <InfoCard icon={<Shield className="w-4 h-4" />} label="ISP" value={ipInfo.org} />
                  )}
                  {ipInfo.timezone && (
                    <InfoCard icon={<Globe className="w-4 h-4" />} label="Timezone" value={ipInfo.timezone} />
                  )}
                  {ipInfo.loc && (
                    <InfoCard icon={<MapPin className="w-4 h-4" />} label="Coordinates" value={ipInfo.loc} />
                  )}
                </div>
              </div>
            )}
          </section>

          {/* About IP */}
          <section className="py-12 sm:py-16 border-t border-border" id="about-ip">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              What Is an IP Address?
            </h2>
            <div className="prose-custom space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed max-w-none">
              <p>
                An <strong className="text-foreground">IP address</strong> (Internet Protocol address) is a unique string of numbers separated by periods (IPv4) or colons (IPv6) that identifies each device using the Internet Protocol to communicate over a network. Every device that connects to the internet — whether it's a smartphone, laptop, or smart TV — is assigned an IP address by its network.
              </p>
              <p>
                There are two main versions of IP addresses in use today. <strong className="text-foreground">IPv4</strong> addresses look like <code className="bg-secondary px-1.5 py-0.5 rounded text-xs" style={{ fontFamily: "var(--font-mono)" }}>192.168.1.1</code> and are the most common format. <strong className="text-foreground">IPv6</strong> addresses are longer and were created to handle the growing number of devices online.
              </p>

              <h3 className="text-lg sm:text-xl font-semibold text-foreground pt-4" style={{ fontFamily: "var(--font-heading)" }}>
                Why Your IP Address Matters
              </h3>
              <p>
                Your IP address is essential for online communication. Without it, websites wouldn't know where to send the data you request. When you visit a website, your browser sends your IP address to the server so it can send the webpage back to you.
              </p>
              <p>
                However, your IP address also reveals information about you. It can show your approximate geographic location, your Internet Service Provider (ISP), and can be used by websites for analytics, personalization, and sometimes geo-restrictions. This is why many privacy-conscious users choose to use a <strong className="text-foreground">VPN</strong> to mask their real IP address.
              </p>
              <p>
                Understanding your IP address is the first step to better online privacy. Use our free <strong className="text-foreground">IP address checker</strong> tool above to instantly find your public IP, see your location details, and learn what information your IP reveals to the websites you visit. Our IP lookup tool works on any device — desktop, tablet, or mobile — and requires no installation or sign-up.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-12 sm:py-16 border-t border-border" id="faq">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-8"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between p-4 sm:p-5 text-left font-medium text-sm sm:text-base hover:bg-secondary/50 transition-colors"
                  >
                    {faq.q}
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 ml-2 transition-transform duration-200 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-muted-foreground text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-border mt-8">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} What Is My IP Address. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#ip-details" className="hover:text-foreground transition-colors">Your IP</a>
              <a href="#about-ip" className="hover:text-foreground transition-colors">About</a>
              <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-secondary/50 border border-border/50">
    <div className="text-primary mt-0.5">{icon}</div>
    <div className="min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground truncate" style={{ fontFamily: "var(--font-mono)" }}>
        {value}
      </p>
    </div>
  </div>
);

export default Index;
