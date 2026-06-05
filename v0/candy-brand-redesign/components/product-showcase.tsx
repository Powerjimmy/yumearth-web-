"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star, ArrowRight } from "lucide-react"

const products = [
  {
    name: "Organic Lollipops",
    description: "8 delicious flavors",
    price: "$5.99",
    rating: 4.9,
    reviews: 2847,
    color: "from-red-200 to-orange-200",
    emoji: "🍭",
    badge: "Best Seller",
  },
  {
    name: "Fruit Snacks",
    description: "Real fruit juice",
    price: "$6.49",
    rating: 4.8,
    reviews: 1923,
    color: "from-yellow-200 to-orange-200",
    emoji: "🍬",
    badge: "New",
  },
  {
    name: "Sour Bears",
    description: "Tangy & sweet",
    price: "$5.49",
    rating: 4.7,
    reviews: 1456,
    color: "from-green-200 to-lime-200",
    emoji: "🐻",
    badge: null,
  },
  {
    name: "Gummy Worms",
    description: "Classic favorite",
    price: "$5.99",
    rating: 4.8,
    reviews: 1872,
    color: "from-pink-200 to-purple-200",
    emoji: "🪱",
    badge: null,
  },
]

export function ProductShowcase() {
  return (
    <section id="products" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-sm tracking-widest uppercase">Our Products</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-balance">
            Sweet Treats,
            <span className="text-primary"> Made Right</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Every piece is crafted with organic ingredients, real fruit juice, and a whole lot of love.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card
              key={product.name}
              className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card"
            >
              {/* Badge */}
              {product.badge && (
                <span className="absolute top-4 left-4 z-10 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  {product.badge}
                </span>
              )}

              {/* Product Image */}
              <div className={`aspect-square bg-gradient-to-br ${product.color} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                <span className="text-8xl">{product.emoji}</span>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString()})</span>
                </div>
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">{product.price}</span>
                  <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            View All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
