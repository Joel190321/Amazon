'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Laptop, Smartphone, Home, Headphones, Camera, Watch, Gamepad, Sparkles } from 'lucide-react'

const categoryIcons = {
  "Tecnología": Laptop,
  "Hogar": Home,
  "Audio": Headphones,
  "Móviles": Smartphone,
  "Fotografía": Camera,
  "Wearables": Watch,
  "Gaming": Gamepad,
  "Cuidado Personal": Sparkles // Agregamos la nueva categoría
}

const categoryColors = {
  "Tecnología": "text-blue-500",
  "Hogar": "text-green-500",
  "Audio": "text-purple-500",
  "Móviles": "text-red-500",
  "Fotografía": "text-yellow-500",
  "Wearables": "text-pink-500",
  "Gaming": "text-orange-500",
  "Cuidado Personal": "text-rose-500" // Agregamos el color para la nueva categoría
}

export default function FeaturedCategories({ products, onCategorySelect, selectedCategory }) {
  const categories = products.reduce((acc, product) => {
    if (product.category) {
      acc[product.category] = (acc[product.category] || 0) + 1
    }
    return acc
  }, {})

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {Object.entries(categories).map(([name, count]) => {
        const Icon = categoryIcons[name] || Laptop
        const color = categoryColors[name] || "text-gray-500"
        const isSelected = name === selectedCategory

        return (
          <Card 
            key={name}
            className={`group cursor-pointer hover:shadow-md transition-shadow ${isSelected ? 'ring-2 ring-primary' : ''}`}
            onClick={() => onCategorySelect(name)}
          >
            <CardContent className="p-6 text-center">
              <Icon className={`h-8 w-8 mx-auto mb-2 ${color}`} />
              <h3 className="font-medium mb-1">{name}</h3>
              <p className="text-sm text-muted-foreground">
                {count} producto{count !== 1 ? 's' : ''}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

