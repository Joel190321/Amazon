import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play } from 'lucide-react'

const  PrimeVideoPromo = () => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <Image
            src="/prime-video.webp"
            alt="Prime Video Banner"
            width={1200}
            height={400}
            className="w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
            <div className="p-6 md:p-12 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Descubre Prime Video
              </h2>
              <p className="text-lg text-white mb-6">
                Disfruta de series y películas exclusivas, incluyendo Amazon Originals, con tu membresía Prime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://www.primevideo.com/?&tag=picksmartshop-21" target='_blank'>
                <Button size="lg" className="w-full sm:w-auto">
                  <Play className="mr-2 h-4 w-4" /> Ver ahora
                </Button>
                </a>
                
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PrimeVideoPromo

