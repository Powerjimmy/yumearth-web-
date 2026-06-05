import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { BenefitsBar } from "@/components/benefits-bar"
import { ProductShowcase } from "@/components/product-showcase"
import { TestimonialsSection } from "@/components/testimonials-section"
import { AboutSection } from "@/components/about-section"
import { IngredientsSection } from "@/components/ingredients-section"
import { RetailersSection } from "@/components/retailers-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <BenefitsBar />
      <ProductShowcase />
      <TestimonialsSection />
      <AboutSection />
      <IngredientsSection />
      <RetailersSection />
      <NewsletterSection />
      <Footer />
    </main>
  )
}
