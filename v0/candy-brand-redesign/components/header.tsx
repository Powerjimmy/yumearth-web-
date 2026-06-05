"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingBag, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm font-medium">
        <span>🌱 Free shipping on orders over $35 — Shop organic candy today!</span>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-primary">YUM</span>
            <span className="text-2xl font-bold tracking-tight text-secondary">EARTH</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#products" className="text-foreground hover:text-primary transition-colors font-medium">
              Products
            </Link>
            <Link href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
              Our Story
            </Link>
            <Link href="#ingredients" className="text-foreground hover:text-primary transition-colors font-medium">
              Ingredients
            </Link>
            <Link href="#find" className="text-foreground hover:text-primary transition-colors font-medium">
              Find Us
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link href="#products" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Products
              </Link>
              <Link href="#about" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Our Story
              </Link>
              <Link href="#ingredients" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Ingredients
              </Link>
              <Link href="#find" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Find Us
              </Link>
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    0
                  </span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
