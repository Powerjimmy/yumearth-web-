"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")

  return (
    <section className="py-24 bg-gradient-to-br from-secondary/10 via-background to-primary/10 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce" style={{ animationDuration: '4s' }}>🍭</div>
        <div className="absolute top-20 right-20 text-5xl opacity-20 animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>🍬</div>
        <div className="absolute bottom-10 left-1/4 text-4xl opacity-20 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>🐻</div>
        <div className="absolute bottom-20 right-1/3 text-6xl opacity-20 animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '0.3s' }}>🍇</div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="text-secondary font-bold text-sm tracking-widest uppercase">Newsletter</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 text-balance">
          Join Our 
          <span className="text-secondary"> Sweet Community</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Get exclusive access to new flavors, special offers, and sweet updates delivered straight to your inbox.
        </p>

        <form 
          className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          onSubmit={(e) => {
            e.preventDefault()
            // Handle form submission
            console.log("[v0] Newsletter signup:", email)
          }}
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-14 rounded-full px-6 border-2 border-border focus:border-primary"
            required
          />
          <Button 
            type="submit" 
            size="lg" 
            className="h-14 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8"
          >
            Subscribe
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </form>

        <p className="mt-4 text-sm text-muted-foreground">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
