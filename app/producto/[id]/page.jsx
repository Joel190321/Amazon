import Navbar from '../../components/Navbar';
import { Star, ShoppingCart, Check, Package, Award, ThumbsUp } from 'lucide-react';
import { getProductById } from '../../../firebase/firestore';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  const affiliateId = process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_ID || 'your-affiliate-id';

  // Función para generar el enlace de Amazon
  const generateAmazonLink = (productId) => {
    if (!productId) return '#'; // Si no hay ID de producto, devolvemos un enlace vacío
    return `https://www.amazon.com/dp/${productId}?tag=${affiliateId}`;
  };

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  const benefits = [
    "Envío rápido y gratuito con Amazon Prime",
    "Garantía de devolución de 30 días",
    "Producto verificado y de alta calidad",
    "Soporte post-venta garantizado"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Columna de imagen */}
          <div className="space-y-6">
            <div className="relative">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full rounded-lg shadow-lg" 
              />
              {product.bestSeller && (
                <Badge className="absolute top-4 right-4 bg-yellow-500/90">
                  <Award className="h-4 w-4 mr-2" />
                  Producto Más Vendido
                </Badge>
              )}
            </div>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Beneficios del Producto
                </h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Columna de información */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary">{product.category}</Badge>
                {product.trending && (
                  <Badge variant="outline" className="text-green-500">Tendencia</Badge>
                )}
              </div>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 ${
                      i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-muted-foreground">
                  ({product.reviewCount} reseñas verificadas)
                </span>
              </div>
              <div className="flex items-center gap-4 mb-8">
                <p className="text-3xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </p>
                {product.originalPrice && (
                  <p className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </p>
                )}
              </div>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4">¿Por qué recomendamos este producto?</h2>
              <p className="text-muted-foreground mb-4">
                {product.description}
              </p>
              <div className="grid grid-cols-2 gap-4 my-6">
                {product.features?.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <ThumbsUp className="h-5 w-5 text-primary mr-2 mt-1" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Button size="lg" className="w-full text-lg" asChild>
                <a
                  href={generateAmazonLink(product.amazonProductId)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Ver Precio en Amazon
                </a>
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                *Los precios pueden variar. Última actualización: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

