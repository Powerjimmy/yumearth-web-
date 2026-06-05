import { Button } from "@/components/ui/button"

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Background shapes */}
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent/30 rounded-full blur-2xl" />
              
              {/* Main image container */}
              <div className="relative z-10 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 h-full flex items-center justify-center">
                <div className="text-center space-y-6">
                  <div className="flex justify-center gap-4 flex-wrap">
                    <span className="text-7xl">🍭</span>
                    <span className="text-7xl">🍬</span>
                    <span className="text-7xl">🐻</span>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-lg inline-block">
                    <p className="text-4xl font-bold text-primary">Since 2007</p>
                    <p className="text-muted-foreground">Making candy better</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-8">
            <div>
              <span className="text-primary font-bold text-sm tracking-widest uppercase">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
                Born from a Dad&apos;s 
                <span className="text-primary"> Simple Wish</span>
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              It all started when our founder couldn&apos;t find candy that was safe for his allergic children. 
              So he made his own — organic, allergen-free, and delicious enough to share with the world.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Today, we&apos;re proud to make candy that everyone can enjoy. Made with real fruit juice, 
              organic sweeteners, and absolutely no artificial colors or flavors. Because everyone 
              deserves a little sweetness in their life.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">100+</p>
                <p className="text-sm text-muted-foreground">Countries</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-secondary">50M+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-accent">17</p>
                <p className="text-sm text-muted-foreground">Years of Yum</p>
              </div>
            </div>

            <Button size="lg" variant="outline" className="rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Learn More About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
