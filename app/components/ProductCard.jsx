import Link from 'next/link';
import { Star, Award, TrendingUp, ThumbsUp } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ProductCard({ product }) {
  return (
    <Card className="group hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <CardHeader className="relative p-0">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
          {product.bestSeller && (
            <Badge className="absolute top-4 right-4 bg-yellow-500/90">
              <Award className="h-3 w-3 mr-1" />
              Más Vendido
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
          <Badge variant="secondary" className="ml-2">
            {product.category}
          </Badge>
        </div>
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-muted-foreground">
            ({product.reviewCount} reseñas)
          </span>
        </div>
        <p className="text-muted-foreground line-clamp-3 mb-4">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {product.trending && (
              <div className="flex items-center text-sm text-green-500">
                <TrendingUp className="h-4 w-4 mr-1" />
                Tendencia
              </div>
            )}
            {product.recommended && (
              <div className="flex items-center text-sm text-blue-500">
                <ThumbsUp className="h-4 w-4 mr-1" />
                Recomendado
              </div>
            )}
          </div>
          <p className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full">
          <Link href={`/producto/${product.id}`}>
            Descubre la Magia
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

