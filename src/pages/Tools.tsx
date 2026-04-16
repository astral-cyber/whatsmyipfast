import { Globe, Search, Shield, Wifi, MapPin, Lock, Zap, Server } from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { FAQSection } from "@/components/FAQSection";

const tools = [
  { icon: <Globe className="w-5 h-5" />, title: "What Is My IP", desc: "Instantly see your public IP address, location, and ISP details.", link: "/", tag: "Popular" },
  { icon: <Search className="w-5 h-5" />, title: "IP Address Lookup", desc: "Look up any IP address to find its location and network information.", link: "/ip-lookup", tag: "Popular" },
  { icon: <Shield className="w-5 h-5" />, title: "Privacy & VPN Guide", desc: "Learn how to protect your IP address and browse securely.", link: "/privacy", tag: "Guide" },
  { icon: <MapPin className="w-5 h-5" />, title: "IP Geolocation", desc: "Map any IP address to its geographic coordinates and location.", link: "/ip-lookup", tag: "Tool" },
  { icon: <Lock className="w-5 h-5" />, title: "DNS Leak Test", desc: "Check if your DNS requests are leaking outside your VPN tunnel.", link: "#", tag: "Coming Soon" },
  { icon: <Zap className="w-5 h-5" />, title: "Speed Test", desc: "Test your internet connection speed, latency, and bandwidth.", link: "#", tag: "Coming Soon" },
  { icon: <Server className="w-5 h-5" />, title: "Port Scanner", desc: "Scan for open ports on any IP address or hostname.", link: "#", tag: "Coming Soon" },
  { icon: <Wifi className="w-5 h-5" />, title: "Ping Test", desc: "Measure the round-trip time to any server or IP address.", link: "#", tag: "Coming Soon" },
];

const faqs = [
  { q: "What network tools do you offer?", a: "We currently offer a free IP checker (What Is My IP), IP address lookup with geolocation, and a comprehensive privacy and VPN guide. We're actively developing additional tools including DNS leak test, speed test, port scanner, and ping test." },
  { q: "Are these tools free to use?", a: "Yes, all our network tools are completely free to use. There's no sign-up required, no software to install, and no usage limits. We believe everyone should have access to tools that help them understand and protect their online presence." },
  { q: "How accurate are your tools?", a: "Our IP detection is 100% accurate — we show the exact public IP address your device is using. Geolocation accuracy is typically within the city level (about 80% accuracy). Country-level detection is 95-99% accurate." },
];

const Tools = () => {
  return (
    <>
      <SEOHead
        title="Free Network Tools | IP Checker, Lookup, DNS Test & More"
        description="Collection of free network tools: IP address checker, IP lookup, geolocation, DNS leak test, speed test, and more. No sign-up required."
        keywords="network tools, ip tools, dns test, speed test, port scanner, ping test, ip checker tools"
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <section className="py-12 sm:py-20 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Free Network Tools
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-12">
            A growing collection of free, fast, and secure network diagnostic and lookup tools. No sign-up required.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {tools.map((tool, i) => {
              const isActive = tool.link !== "#";
              const cls = `p-5 rounded-xl border border-border bg-card transition-all ${isActive ? "hover:border-primary/50 hover:bg-primary/5 cursor-pointer" : "opacity-60 cursor-default"}`;
              const inner = (
                <>
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-primary">{tool.icon}</div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${tool.tag === "Popular" ? "bg-primary/10 text-primary" : tool.tag === "Coming Soon" ? "bg-secondary text-muted-foreground" : "bg-accent/10 text-accent"}`}>
                      {tool.tag}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{tool.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tool.desc}</p>
                </>
              );
              return isActive ? (
                <Link key={i} to={tool.link} className={cls}>{inner}</Link>
              ) : (
                <div key={i} className={cls}>{inner}</div>
              );
            })}
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 sm:py-16 border-t border-border">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>Why Use Network Tools?</h2>
          <div className="space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
            <p>
              <strong className="text-foreground">Network diagnostic tools</strong> are essential for understanding your internet connection, troubleshooting issues, and maintaining online security. Whether you're a network administrator, security researcher, or everyday internet user, having access to reliable network tools helps you stay informed about your digital presence.
            </p>
            <p>
              Our <Link to="/" className="text-primary hover:underline">IP checker</Link> instantly reveals your public IP address and location — information that every website you visit can see. The <Link to="/ip-lookup" className="text-primary hover:underline">IP lookup tool</Link> lets you investigate any IP address, useful for identifying suspicious connections or verifying server locations. Our <Link to="/privacy" className="text-primary hover:underline">privacy guide</Link> explains how to protect your IP and browse safely.
            </p>
            <p>
              All tools on this page are free, require no installation, and work directly in your browser. We're constantly adding new tools to help you better understand and manage your network connectivity. Check our <Link to="/blog" className="text-primary hover:underline">blog</Link> for the latest updates and network security tips.
            </p>
          </div>
        </section>

        <FAQSection faqs={faqs} />
      </div>
    </>
  );
};

export default Tools;
