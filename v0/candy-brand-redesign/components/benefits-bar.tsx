export function BenefitsBar() {
  const benefits = [
    { icon: "🌿", label: "USDA Organic" },
    { icon: "🚫", label: "No High Fructose Corn Syrup" },
    { icon: "🌱", label: "Vegan Friendly" },
    { icon: "🥜", label: "Top Allergen Free" },
    { icon: "✨", label: "Gluten Free" },
    { icon: "🍃", label: "Non-GMO" },
  ]

  return (
    <section className="bg-primary py-6 overflow-hidden">
      <div className="flex animate-scroll">
        <div className="flex gap-12 px-6 shrink-0">
          {[...benefits, ...benefits].map((benefit, index) => (
            <div key={index} className="flex items-center gap-3 text-primary-foreground whitespace-nowrap">
              <span className="text-2xl">{benefit.icon}</span>
              <span className="font-bold text-sm tracking-wider">{benefit.label}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-12 px-6 shrink-0">
          {[...benefits, ...benefits].map((benefit, index) => (
            <div key={`dup-${index}`} className="flex items-center gap-3 text-primary-foreground whitespace-nowrap">
              <span className="text-2xl">{benefit.icon}</span>
              <span className="font-bold text-sm tracking-wider">{benefit.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
