'use client'

import { useAuth } from '../../hooks/useAuth';
import ProductCard from './ProductCard';
import FeaturedCategories from './FeaturedCategory';
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from 'react';
import { getFeaturedProducts, getAllProducts } from '@/firebase/firestore';
import  PrimeVideoPromo  from './PrimeVideoPromo'

export default function HomeContent() {
  const { user, isAdmin, loading } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  if (loading || isLoadingProducts) {
    return <div className="flex items-center justify-center min-h-[200px]">Cargando...</div>;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <PrimeVideoPromo/>
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary m-10">
          Descubre Mundos de Posibilidades
        </h2>
        <FeaturedCategories products={products} onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
      </section>

      <Separator className="my-12" />

      <section id="featured" className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary">
            {selectedCategory ? `Productos en ${selectedCategory}` : "Tesoros Tecnológicos Seleccionados"}
          </h2>
          <p className="text-muted-foreground mt-2">
            Productos que transformarán tu vida diaria
          </p>
        </div>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            No hay productos disponibles en esta categoría.
          </div>
        )}
      </section>

      <section className="bg-primary/5 rounded-lg p-8 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-primary">
            ¿Por qué Confiar en Nuestras Recomendaciones?
          </h2>
          <p className="text-muted-foreground mb-6">
            Nuestro equipo de expertos desentraña el mundo de la tecnología para ti, 
            ofreciendo solo lo mejor de lo mejor. Cada producto es una puerta a nuevas experiencias.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Análisis Profundo",
                description: "Cada detalle cuenta en nuestra búsqueda de la excelencia"
              },
              {
                title: "Experiencias Reales",
                description: "Productos probados en situaciones del mundo real"
              },
              {
                title: "Innovación Constante",
                description: "Siempre a la vanguardia de las últimas tendencias"
              }
            ].map((item) => (
              <div key={item.title} className="text-center">
                <h3 className="font-semibold mb-2 text-primary">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

