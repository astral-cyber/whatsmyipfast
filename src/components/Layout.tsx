import { useState, useEffect, createContext, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Wifi, Sun, Moon, Menu, X, ChevronRight } from "lucide-react";

interface ThemeContextType {
  dark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({ dark: true, toggleTheme: () => {} });
export const useTheme = () => useContext(ThemeContext);

const navLinks = [
  { label: "Home", href: "/" },
  { label: "IP Lookup", href: "/ip-lookup" },
  { label: "Privacy & VPN", href: "/privacy" },
  { label: "Tools", href: "/tools" },
  { label: "Blog", href: "/blog" },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [dark, setDark] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const toggleTheme = () => setDark((d) => !d);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      <div className={dark ? "dark" : ""}>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
              <Link to="/" className="flex items-center gap-2 text-primary font-bold text-lg" style={{ fontFamily: "var(--font-heading)" }}>
                <Wifi className="w-5 h-5" />
                <span>IP Checker</span>
              </Link>
              <nav className="hidden md:flex items-center gap-1">
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    to={l.href}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${location.pathname === l.href ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {l.label}
                  </Link>
                ))}
                <button onClick={toggleTheme} className="ml-2 p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Toggle theme">
                  {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </nav>
              <div className="flex md:hidden items-center gap-2">
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Toggle theme">
                  {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Menu">
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
            {mobileOpen && (
              <nav className="md:hidden border-t border-border bg-background px-4 py-3 space-y-1">
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    to={l.href}
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors ${location.pathname === l.href ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            )}
          </header>

          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer className="border-t border-border mt-8">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                <div>
                  <Link to="/" className="flex items-center gap-2 text-primary font-bold text-lg mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                    <Wifi className="w-4 h-4" /> IP Checker
                  </Link>
                  <p className="text-xs text-muted-foreground leading-relaxed">Free tools to check your IP address, lookup any IP, and learn about online privacy.</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-3">Tools</h3>
                  <div className="space-y-2">
                    <Link to="/" className="block text-xs text-muted-foreground hover:text-foreground transition-colors">What Is My IP</Link>
                    <Link to="/ip-lookup" className="block text-xs text-muted-foreground hover:text-foreground transition-colors">IP Address Lookup</Link>
                    <Link to="/tools" className="block text-xs text-muted-foreground hover:text-foreground transition-colors">All Network Tools</Link>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-3">Resources</h3>
                  <div className="space-y-2">
                    <Link to="/privacy" className="block text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy & VPN Guide</Link>
                    <Link to="/blog" className="block text-xs text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
                    <Link to="/blog/ipv4-vs-ipv6" className="block text-xs text-muted-foreground hover:text-foreground transition-colors">IPv4 vs IPv6</Link>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-3">Pages</h3>
                  <div className="space-y-2">
                    {navLinks.map(l => (
                      <Link key={l.href} to={l.href} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                        <ChevronRight className="w-3 h-3" />{l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} What Is My IP Address. All rights reserved.</p>
                <div className="flex items-center gap-4">
                  <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
                  <Link to="/tools" className="hover:text-foreground transition-colors">Tools</Link>
                  <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};
