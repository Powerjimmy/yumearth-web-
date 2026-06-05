import Link from "next/link"
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold text-primary">YUM</span>
              <span className="text-2xl font-bold text-secondary">EARTH</span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">
              Organic candy made with real fruit juice and simple ingredients. Better for you, better for the planet.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-background/70 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-background/70 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-background/70 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-background/70 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="text-background/70 hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="#" className="text-background/70 hover:text-primary transition-colors">Lollipops</Link></li>
              <li><Link href="#" className="text-background/70 hover:text-primary transition-colors">Fruit Snacks</Link></li>
              <li><Link href="#" className="text-background/70 hover:text-primary transition-colors">Gummy Bears</Link></li>
              <li><Link href="#" className="text-background/70 hover:text-primary transition-colors">Sour Candy</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="text-background/70 hover:text-primary transition-colors">Our Story</Link></li>
              <li><Link href="#" className="text-background/70 hover:text-primary transition-colors">Ingredients</Link></li>
              <li><Link href="#" className="text-background/70 hover:text-primary transition-colors">Store Locator</Link></li>
              <li><Link href="#" className="text-background/70 hover:text-primary transition-colors">Press</Link></li>
              <li><Link href="#" className="text-background/70 hover:text-primary transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="text-background/70 hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="text-background/70 hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="#" className="text-background/70 hover:text-primary transition-colors">Shipping Info</Link></li>
              <li><Link href="#" className="text-background/70 hover:text-primary transition-colors">Returns</Link></li>
              <li><Link href="#" className="text-background/70 hover:text-primary transition-colors">Wholesale</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">
            © 2024 YumEarth. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-background/60">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-primary transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
