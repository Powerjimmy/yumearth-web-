"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
      {/* Floating candy decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-secondary/30 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-primary/20 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4s' }} />
        <div className="absolute bottom-40 left-1/4 w-12 h-12 rounded-full bg-accent/30 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3.5s' }} />
        <div className="absolute top-1/3 right-1/3 w-20 h-20 rounded-full bg-chart-4/20 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '4.5s' }} />
        <div className="absolute bottom-20 right-10 w-14 h-14 rounded-full bg-primary/25 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Certified Organic
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-balance">
              <span className="text-foreground">Less Sugar,</span>
              <br />
              <span className="text-primary">More</span>{" "}
              <span className="text-secondary">Yum!</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              Organic candy made with real fruit juice, natural flavors, and absolutely no artificial ingredients. 
              Better for you, better for the planet.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full border-2 border-foreground/20 hover:bg-foreground/5">
                Our Story
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-lg">🌿</span>
                Non-GMO
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-lg">🌱</span>
                Vegan
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-lg">🥜</span>
                Nut-Free
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-lg">✨</span>
                Gluten-Free
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Background circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-3xl" />
              
              {/* Product showcase */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="grid grid-cols-2 gap-6 p-8">
                  {/* Product cards */}
                  <div className="bg-white rounded-3xl p-6 shadow-xl hover:scale-105 transition-transform">
                    <div className="w-full aspect-square bg-gradient-to-br from-red-100 to-red-200 rounded-2xl mb-4 flex items-center justify-center">
                      <span className="text-6xl">🍭</span>
                    </div>
                    <p className="font-bold text-sm text-center">Lollipops</p>
                  </div>
                  <div className="bg-white rounded-3xl p-6 shadow-xl hover:scale-105 transition-transform mt-8">
                    <div className="w-full aspect-square bg-gradient-to-br from-orange-100 to-yellow-200 rounded-2xl mb-4 flex items-center justify-center">
                      <span className="text-6xl">🍬</span>
                    </div>
                    <p className="font-bold text-sm text-center">Fruit Snacks</p>
                  </div>
                  <div className="bg-white rounded-3xl p-6 shadow-xl hover:scale-105 transition-transform -mt-4">
                    <div className="w-full aspect-square bg-gradient-to-br from-green-100 to-green-200 rounded-2xl mb-4 flex items-center justify-center">
                      <span className="text-6xl">🐻</span>
                    </div>
                    <p className="font-bold text-sm text-center">Gummy Bears</p>
                  </div>
                  <div className="bg-white rounded-3xl p-6 shadow-xl hover:scale-105 transition-transform mt-4">
                    <div className="w-full aspect-square bg-gradient-to-br from-purple-100 to-pink-200 rounded-2xl mb-4 flex items-center justify-center">
                      <span className="text-6xl">🍇</span>
                    </div>
                    <p className="font-bold text-sm text-center">Sour Bites</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
