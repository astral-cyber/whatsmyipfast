import { Shield, Eye, EyeOff, Lock, Globe, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";

const faqs = [
  { q: "Does a VPN hide my IP address?", a: "Yes, a VPN (Virtual Private Network) encrypts your internet connection and routes it through a server in another location. This replaces your real IP address with the VPN server's IP, effectively hiding your true IP from websites, advertisers, and potential attackers." },
  { q: "Can my ISP see what I do online?", a: "Without a VPN, your ISP can see which websites you visit, when you visit them, and how much data you transfer. With a VPN, your ISP can only see that you're connected to a VPN server — the actual content of your browsing is encrypted." },
  { q: "Is using a VPN legal?", a: "In most countries, using a VPN is completely legal. However, some countries restrict or ban VPN usage. It's important to check your local laws. Even where VPNs are legal, using one to conduct illegal activities is still illegal." },
  { q: "What's the difference between a VPN and a proxy?", a: "A proxy server routes your web traffic through an intermediary server, changing your visible IP address. However, unlike a VPN, a proxy typically doesn't encrypt your traffic. VPNs provide both IP masking and encryption, offering much stronger privacy protection." },
];

const features = [
  { icon: <Eye className="w-5 h-5" />, title: "What Your IP Reveals", desc: "Your IP address exposes your approximate location, ISP, and can be used to track your browsing habits across websites." },
  { icon: <AlertTriangle className="w-5 h-5" />, title: "Risks of IP Exposure", desc: "Exposed IPs can lead to targeted ads, geo-restrictions, potential DDoS attacks, and reduced online anonymity." },
  { icon: <Lock className="w-5 h-5" />, title: "VPN Protection", desc: "A VPN encrypts your connection and masks your IP, making it virtually impossible for third parties to track your online activity." },
  { icon: <EyeOff className="w-5 h-5" />, title: "Browse Anonymously", desc: "With your real IP hidden, you can browse the web without leaving a trail that can be traced back to your physical location." },
];

const Privacy = () => {
  return (
    <>
      <SEOHead
        title="IP Privacy & VPN Guide | Protect Your IP Address Online"
        description="Learn how your IP address can be tracked, what it reveals about you, and how to protect your privacy with VPNs and other tools. Complete guide to IP privacy."
        keywords="ip privacy, vpn guide, hide ip address, ip tracking, online privacy, protect ip address, vpn explained"
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <section className="py-12 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
            <Shield className="w-3.5 h-3.5" /> Privacy Guide
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            IP Privacy & VPN Guide
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Understand how your IP address can be used to track you online and learn how to protect your digital privacy.
          </p>
        </section>

        {/* Feature Grid */}
        <section className="pb-12 sm:pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={i} className="p-5 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors">
                <div className="text-primary mb-3">{f.icon}</div>
                <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 sm:py-16 border-t border-border">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>How IP Tracking Works</h2>
          <div className="space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
            <p>
              Every time you connect to the internet, your device is assigned a public <strong className="text-foreground">IP address</strong> by your Internet Service Provider. This address is visible to every website and online service you interact with. It's a fundamental part of how the internet works — but it also means that your online activities can be linked to your approximate physical location.
            </p>
            <p>
              Websites, advertisers, and analytics companies use IP addresses to build profiles about users. They can determine your country, city, and sometimes even your neighborhood. Combined with browser fingerprinting and cookies, your IP address becomes one piece of a detailed digital footprint that tracks your behavior across the web.
            </p>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground pt-4" style={{ fontFamily: "var(--font-heading)" }}>Why You Should Protect Your IP Address</h3>
            <p>
              There are several compelling reasons to hide your IP address. First, <strong className="text-foreground">privacy</strong> — without protection, any website can log your IP and associate it with your browsing patterns. Second, <strong className="text-foreground">security</strong> — malicious actors who obtain your IP could launch targeted attacks. Third, <strong className="text-foreground">freedom</strong> — many online services restrict content based on geographic location determined by your IP.
            </p>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground pt-4" style={{ fontFamily: "var(--font-heading)" }}>How VPNs Protect You</h3>
            <p>
              A Virtual Private Network (VPN) creates an encrypted tunnel between your device and a VPN server. When you use a VPN, websites see the VPN server's IP address instead of your real one. This effectively masks your location and identity from anyone monitoring your traffic. Modern VPNs use military-grade encryption (AES-256) that makes it practically impossible to intercept your data.
            </p>
            <p>
              To check what your current IP address reveals, use our <Link to="/" className="text-primary hover:underline">What Is My IP tool</Link>. You can also <Link to="/ip-lookup" className="text-primary hover:underline">look up any IP address</Link> to see what information it exposes. For more network tools, visit our <Link to="/tools" className="text-primary hover:underline">tools page</Link>.
            </p>
          </div>
        </section>

        <FAQSection faqs={faqs} />
      </div>
    </>
  );
};

export default Privacy;
