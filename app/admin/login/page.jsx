'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LogIn } from 'lucide-react'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../../../firebase/config'
import { useAuth } from '../../../hooks/useAuth'

export default function AdminLogin() {
  const { user, isAdmin, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user && isAdmin) {
      router.push('/admin/dashboard')
    }
  }, [user, isAdmin, loading, router])

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      // La redirección se manejará en el efecto useEffect
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error)
      alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.')
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>
  }

  if (user && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Acceso Denegado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-4 text-muted-foreground">
              Lo sentimos, no tienes permisos de administrador.
            </p>
            <Button onClick={() => router.push('/')} className="w-full" size="lg">
              Volver a la página principal
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Acceso Exclusivo para Administradores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-4 text-muted-foreground">
            Ingresa al centro de control y desata el poder de tu plataforma de afiliados.
          </p>
          <Button onClick={handleGoogleSignIn} className="w-full" size="lg">
            <LogIn className="mr-2 h-4 w-4" /> Iniciar Sesión con Google
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

