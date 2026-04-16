import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { Clock, ArrowRight } from "lucide-react";

const posts = [
  {
    slug: "ipv4-vs-ipv6",
    title: "IPv4 vs IPv6: What's the Difference and Why It Matters",
    excerpt: "Understanding the two versions of Internet Protocol addresses, their key differences, and why the transition to IPv6 is important for the future of the internet.",
    date: "2025-04-10",
    readTime: "6 min read",
    category: "Networking",
  },
  {
    slug: "how-vpn-works",
    title: "How Does a VPN Work? A Complete Beginner's Guide",
    excerpt: "Learn how Virtual Private Networks encrypt your traffic, mask your IP address, and protect your online privacy in this comprehensive beginner-friendly guide.",
    date: "2025-04-05",
    readTime: "8 min read",
    category: "Privacy",
  },
  {
    slug: "hide-ip-address",
    title: "5 Ways to Hide Your IP Address in 2025",
    excerpt: "From VPNs to Tor browser, explore the most effective methods to hide your IP address and protect your online identity from tracking and surveillance.",
    date: "2025-03-28",
    readTime: "5 min read",
    category: "Privacy",
  },
  {
    slug: "what-can-someone-do-with-your-ip",
    title: "What Can Someone Do With Your IP Address?",
    excerpt: "Discover the real risks of IP address exposure — from targeted advertising to potential cyberattacks — and learn practical steps to protect yourself.",
    date: "2025-03-20",
    readTime: "7 min read",
    category: "Security",
  },
];

const Blog = () => (
  <>
    <SEOHead
      title="IP Address Blog | Guides on Privacy, Security & Networking"
      description="Expert articles on IP addresses, online privacy, VPNs, and network security. Stay informed with our latest guides and tutorials."
      keywords="ip address blog, networking guides, vpn guides, online privacy tips, ip security articles"
    />
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <section className="py-12 sm:py-20">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-3 text-center" style={{ fontFamily: "var(--font-heading)" }}>
          Blog
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-12 text-center">
          Guides, tutorials, and insights on IP addresses, online privacy, and network security.
        </p>

        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block p-5 sm:p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{post.category}</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" /> {post.readTime}</span>
              </div>
              <h2 className="text-base sm:text-lg font-semibold mb-2 group-hover:text-primary transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{post.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-xs text-primary font-medium group-hover:gap-2 transition-all">
                Read more <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  </>
);

export default Blog;
