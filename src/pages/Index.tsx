import { useState, useEffect } from "react";
import { Copy, Check, Globe, MapPin, Shield, Wifi } from "lucide-react";
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

  useEffect(() => {
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

  const handleCopy = () => {
    if (!ipInfo?.ip) return;
    navigator.clipboard.writeText(ipInfo.ip);
    setCopied(true);
    toast.success("IP address copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="dark min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6" style={{ fontFamily: "var(--font-mono)" }}>
            <Wifi className="w-3.5 h-3.5" />
            IP Checker
          </div>
          <h1 className="text-4xl font-bold text-foreground tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
            What's my IP?
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">Your public IP address and network details</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl shadow-primary/5">
          {loading ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              <p className="text-muted-foreground text-sm">Detecting your IP...</p>
            </div>
          ) : ipInfo ? (
            <>
              <div className="flex items-center justify-between gap-4 mb-8">
                <div
                  className="text-3xl font-bold text-foreground tracking-tight"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {ipInfo.ip}
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium transition-all hover:brightness-110 active:scale-95"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              {(ipInfo.city || ipInfo.org) && (
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
              )}
            </>
          ) : (
            <p className="text-center text-muted-foreground py-8">Unable to detect IP address</p>
          )}
        </div>

        <p className="text-center text-muted-foreground/50 text-xs mt-8">
          Your IP is fetched client-side. No data is stored.
        </p>
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
