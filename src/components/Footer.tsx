import { Globe, Link2, Mail, Heart } from "lucide-react";

const socials = [
  { icon: Globe, href: "#", label: "Website" },
  { icon: Link2, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "#", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border-subtle">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-text-muted text-sm flex items-center gap-1">
          © {new Date().getFullYear()} Ferdy. Made with
          <Heart size={14} className="text-primary fill-primary" />
          and AI.
        </p>
        <div className="flex items-center gap-4">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="w-9 h-9 rounded-full border border-border-subtle flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-all duration-300"
            >
              <social.icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
