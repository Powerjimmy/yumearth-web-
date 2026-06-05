"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "Sarah M.",
    role: "Verified Buyer",
    text: "Finally, candy I can feel good about giving my kids! The organic lollipops are a huge hit, and I love that they are made with real fruit juice.",
    rating: 5,
    image: "👩",
  },
  {
    name: "Mike T.",
    role: "Health-conscious Dad",
    text: "As someone with food allergies, finding safe candy was always a challenge. YumEarth changed everything — delicious AND allergen-free!",
    rating: 5,
    image: "👨",
  },
  {
    name: "Jennifer L.",
    role: "Verified Buyer",
    text: "The sour bears are addictive! I love that they are vegan and gluten-free. My whole family is obsessed.",
    rating: 5,
    image: "👩‍🦰",
  },
  {
    name: "David K.",
    role: "Nutritionist",
    text: "I recommend YumEarth to all my clients looking for healthier candy alternatives. Real ingredients, great taste!",
    rating: 5,
    image: "👨‍⚕️",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 bg-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-secondary font-bold text-sm tracking-widest uppercase">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-balance">
            What Our 
            <span className="text-secondary"> Fans Say</span>
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[0, 1].map((offset) => {
              const index = (currentIndex + offset) % testimonials.length
              const testimonial = testimonials[index]
              return (
                <div
                  key={`${testimonial.name}-${index}`}
                  className="bg-card rounded-3xl p-8 shadow-lg"
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                      {testimonial.image}
                    </div>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full border-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full border-2"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
