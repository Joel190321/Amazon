'use client'

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, LayoutDashboard, LogIn, Menu, X } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from '../../hooks/useAuth';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase/config';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Navbar() {
  const { user, isAdmin } = useAuth();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setIsLoginDialogOpen(false);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavItems = () => (
    <>
      <div className="relative w-full md:w-auto mb-4 md:mb-0">
        <Input type="text" placeholder="Buscar productos..." className="pl-8 pr-4 w-full" />
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
      <Button variant="ghost" asChild className="w-full md:w-auto justify-start">
        <Link href="/">Inicio</Link>
      </Button>
      {isAdmin && (
        <Button variant="ghost" asChild className="w-full md:w-auto justify-start">
          <Link href="/admin/dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </Button>
      )}
      {!user || user.isAnonymous ? (
        <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto justify-start">
              <LogIn className="mr-2 h-4 w-4" />
              Iniciar Sesión
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Iniciar Sesión</DialogTitle>
            </DialogHeader>
            <Button onClick={handleLogin} className="w-full">
              Iniciar Sesión con Google
            </Button>
          </DialogContent>
        </Dialog>
      ) : (
        <span className="w-full md:w-auto">Bienvenido, {user.displayName || user.email}</span>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingCart className="h-6 w-6 text-green-500" />
            <span className="font-bold text-xl">PickSmartShop</span>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <NavItems />
          </div>
          <Button variant="ghost" className="md:hidden" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4">
          <div className="flex flex-col space-y-4">
            <NavItems />
          </div>
        </div>
      )}
    </nav>
  );
}

