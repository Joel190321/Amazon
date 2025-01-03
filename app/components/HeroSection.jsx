import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background overflow-hidden bg-hero">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-6">
            Descubre el Futuro Hoy
          </h1>
          <p className="mt-6 text-xl leading-8 text-muted-foreground max-w-2xl mx-auto text-white">
            Sumérgete en un mundo de innovación y calidad. Nuestras recomendaciones 
            expertas te guiarán hacia productos que no solo cumplen, sino que superan 
            tus expectativas. Prepárate para transformar tu vida con tecnología de vanguardia.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="text-lg px-6 py-3" asChild>
              <a href="#featured">
                Explora Nuestras Joyas Tecnológicas
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  )
}

