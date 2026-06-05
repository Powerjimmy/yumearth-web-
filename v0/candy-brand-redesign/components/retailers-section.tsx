export function RetailersSection() {
  const retailers = [
    { name: "Whole Foods", logo: "🏪" },
    { name: "Target", logo: "🎯" },
    { name: "Walmart", logo: "🛒" },
    { name: "Kroger", logo: "🛍️" },
    { name: "Costco", logo: "📦" },
    { name: "Amazon", logo: "📱" },
  ]

  return (
    <section id="find" className="py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary font-bold text-sm tracking-widest uppercase">Find Us</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            Available at Your Favorite Stores
          </h2>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {retailers.map((retailer) => (
            <div
              key={retailer.name}
              className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <span className="text-4xl">{retailer.logo}</span>
              <span className="text-sm font-medium text-muted-foreground">{retailer.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
