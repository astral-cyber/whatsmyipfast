import { useState } from "react";
import { Copy, Check, Globe, MapPin, Shield, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";
import { InfoCard } from "@/components/InfoCard";
import { useIpInfo } from "@/hooks/useIpInfo";

const faqs = [
  { q: "What is an IP address?", a: "An IP (Internet Protocol) address is a unique numerical label assigned to every device connected to the internet. It serves as an identifier that allows devices to communicate with each other across networks. Think of it like a mailing address for your computer." },
  { q: "Can someone track me with my IP address?", a: "An IP address can reveal your approximate location (city or region level) and your Internet Service Provider, but it cannot pinpoint your exact physical address or identity. However, law enforcement agencies can request your ISP to provide more details with a court order." },
  { q: "Is my IP address private?", a: "Your public IP address is visible to every website and online service you connect to — it is not private by default. To mask your IP and enhance privacy, you can use a VPN (Virtual Private Network) or a proxy service." },
  { q: "Why does my IP address change?", a: "Most residential internet connections use dynamic IP addresses assigned by your ISP. These can change when your router restarts, when your ISP rotates addresses, or when your DHCP lease expires. Businesses often use static IPs that don't change." },
];

const Index = () => {
  const { ipInfo, loading, fetchIp } = useIpInfo();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!ipInfo?.ip) return;
    navigator.clipboard.writeText(ipInfo.ip);
    setCopied(true);
    toast.success("IP address copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SEOHead
        title="What Is My IP Address | Free IP Checker Tool"
        description="Instantly check your IP address, location, and ISP details for free. Fast, secure, and mobile-friendly IP lookup tool."
        keywords="ip address, what is my ip, ip checker, ip lookup, my ip location, find my ip address"
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Hero */}
        <section className="py-12 sm:py-20 text-center" id="ip-details">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            What Is My IP Address
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-10">
            Instantly find your public IP address, location, and ISP details — free and secure.
          </p>

          {/* IP Card */}
          <div className="mx-auto max-w-lg bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-medium">Your IP Address</h2>
            {loading ? (
              <div className="flex flex-col items-center gap-3 py-6">
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                <p className="text-muted-foreground text-sm">Detecting your IP…</p>
              </div>
            ) : ipInfo ? (
              <>
                <p className="text-2xl sm:text-4xl font-bold tracking-tight mb-6" style={{ fontFamily: "var(--font-mono)" }}>
                  {ipInfo.ip}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium transition-all hover:brightness-110 active:scale-95">
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied" : "Copy IP"}
                  </button>
                  <button onClick={fetchIp} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium transition-all hover:brightness-110 active:scale-95">
                    <RefreshCw className="w-4 h-4" /> Refresh
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
              <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-medium text-center">IP Location Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ipInfo.city && <InfoCard icon={<MapPin className="w-4 h-4" />} label="Location" value={[ipInfo.city, ipInfo.region, ipInfo.country].filter(Boolean).join(", ")} />}
                {ipInfo.org && <InfoCard icon={<Shield className="w-4 h-4" />} label="ISP" value={ipInfo.org} />}
                {ipInfo.timezone && <InfoCard icon={<Globe className="w-4 h-4" />} label="Timezone" value={ipInfo.timezone} />}
                {ipInfo.loc && <InfoCard icon={<MapPin className="w-4 h-4" />} label="Coordinates" value={ipInfo.loc} />}
              </div>
            </div>
          )}
        </section>

        {/* Internal Links CTA */}
        <section className="py-8 border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/ip-lookup" className="p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group">
              <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">IP Address Lookup</h3>
              <p className="text-xs text-muted-foreground">Look up any IP address and get detailed location and ISP information.</p>
            </Link>
            <Link to="/privacy" className="p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group">
              <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">Privacy & VPN Guide</h3>
              <p className="text-xs text-muted-foreground">Learn how to protect your IP address and browse the internet safely.</p>
            </Link>
            <Link to="/tools" className="p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group">
              <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">Network Tools</h3>
              <p className="text-xs text-muted-foreground">Explore our collection of free network diagnostic and lookup tools.</p>
            </Link>
          </div>
        </section>

        {/* About IP */}
        <section className="py-12 sm:py-16 border-t border-border" id="about-ip">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>What Is an IP Address?</h2>
          <div className="space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed max-w-none">
            <p>
              An <strong className="text-foreground">IP address</strong> (Internet Protocol address) is a unique string of numbers separated by periods (IPv4) or colons (IPv6) that identifies each device using the Internet Protocol to communicate over a network. Every device that connects to the internet — whether it's a smartphone, laptop, or smart TV — is assigned an IP address by its network.
            </p>
            <p>
              There are two main versions of IP addresses in use today. <strong className="text-foreground">IPv4</strong> addresses look like <code className="bg-secondary px-1.5 py-0.5 rounded text-xs" style={{ fontFamily: "var(--font-mono)" }}>192.168.1.1</code> and are the most common format. <strong className="text-foreground">IPv6</strong> addresses are longer and were created to handle the growing number of devices online.
            </p>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground pt-4" style={{ fontFamily: "var(--font-heading)" }}>Why Your IP Address Matters</h3>
            <p>
              Your IP address is essential for online communication. Without it, websites wouldn't know where to send the data you request. When you visit a website, your browser sends your IP address to the server so it can send the webpage back to you.
            </p>
            <p>
              However, your IP address also reveals information about you. It can show your approximate geographic location, your Internet Service Provider (ISP), and can be used by websites for analytics, personalization, and sometimes geo-restrictions. This is why many privacy-conscious users choose to use a <strong className="text-foreground">VPN</strong> to mask their real IP address. Learn more in our <Link to="/privacy" className="text-primary hover:underline">Privacy & VPN guide</Link>.
            </p>
            <p>
              Understanding your IP address is the first step to better online privacy. Use our free <strong className="text-foreground">IP address checker</strong> tool above to instantly find your public IP, see your location details, and learn what information your IP reveals. You can also use our <Link to="/ip-lookup" className="text-primary hover:underline">IP lookup tool</Link> to check any IP address. Our tools work on any device — desktop, tablet, or mobile — and require no installation or sign-up.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection faqs={faqs} />
      </div>
    </>
  );
};

export default Index;
