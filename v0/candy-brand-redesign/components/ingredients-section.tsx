export function IngredientsSection() {
  const ingredients = [
    {
      icon: "🍓",
      title: "Real Fruit Juice",
      description: "Made with organic fruit juice for natural, authentic flavor.",
    },
    {
      icon: "🍯",
      title: "Organic Sweeteners",
      description: "Cane sugar and rice syrup — no high fructose corn syrup.",
    },
    {
      icon: "🌈",
      title: "Natural Colors",
      description: "Colors from vegetables, fruits, and plants only.",
    },
    {
      icon: "🍃",
      title: "Organic Ingredients",
      description: "USDA certified organic, non-GMO verified.",
    },
    {
      icon: "❌",
      title: "No Artificial Anything",
      description: "Zero artificial flavors, colors, or preservatives.",
    },
    {
      icon: "🥜",
      title: "Allergen Friendly",
      description: "Free from top 8 allergens. Safe for everyone.",
    },
  ]

  return (
    <section id="ingredients" className="py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 text-primary-foreground">
          <span className="font-bold text-sm tracking-widest uppercase opacity-80">What&apos;s Inside</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-balance">
            Simple, Clean Ingredients
          </h2>
          <p className="mt-4 text-lg opacity-80 max-w-2xl mx-auto">
            We believe you should be able to pronounce everything in your candy.
          </p>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ingredients.map((item) => (
            <div
              key={item.title}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-colors"
            >
              <span className="text-5xl mb-6 block">{item.icon}</span>
              <h3 className="text-xl font-bold text-primary-foreground mb-2">{item.title}</h3>
              <p className="text-primary-foreground/80">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
