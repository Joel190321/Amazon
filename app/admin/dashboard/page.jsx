'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../../firebase/firestore'

export default function AdminDashboard() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts()
    setProducts(fetchedProducts)
    setFilteredProducts(fetchedProducts)
    const uniqueCategories = [...new Set(fetchedProducts.map(p => p.category))]
    setCategories(uniqueCategories)
  }

  const handleCategoryChange = (value) => {
    setSelectedCategory(value)
    if (value === 'all') {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter(p => p.category === value))
    }
  }

  const handleAddProduct = async (product) => {
    await addProduct(product)
    setIsAddDialogOpen(false)
    fetchProducts()
  }

  const handleEditProduct = async (product) => {
    await updateProduct(product.id, product)
    setIsEditDialogOpen(false)
    fetchProducts()
  }

  const handleDeleteProduct = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      await deleteProduct(id)
      fetchProducts()
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Productos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrar por categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Agregar Producto
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar Nuevo Producto</DialogTitle>
                </DialogHeader>
                <ProductForm onSubmit={handleAddProduct} />
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map(product => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setCurrentProduct(product)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Editar Producto</DialogTitle>
                          </DialogHeader>
                          <ProductForm product={currentProduct} onSubmit={handleEditProduct} />
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function ProductForm({ product, onSubmit }) {
  const [formData, setFormData] = useState(product || {
    name: '',
    category: '',
    price: '',
    description: '',
    imageUrl: '',
    rating: 0,
    reviewCount: 0,
    features: [],
    bestSeller: false,
    trending: false,
    recommended: false,
    featured: false,
    affiliateLink: '' // Cambiamos amazonProductId por affiliateLink
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
      rating: parseInt(formData.rating),
      reviewCount: parseInt(formData.reviewCount),
      features: formData.features.filter(f => f !== '')
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 overflow-hidden overflow-y-auto max-h-[80vh]">
      <div>
        <Label htmlFor="name">Nombre del Producto</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="category">Categoría</Label>
        <Input id="category" name="category" value={formData.category} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="price">Precio</Label>
        <Input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="description">Descripción</Label>
        <Input id="description" name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="imageUrl">URL de la Imagen</Label>
        <Input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="rating">Calificación (0-5)</Label>
        <Input id="rating" name="rating" type="number" min="0" max="5" value={formData.rating} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="reviewCount">Número de Reseñas</Label>
        <Input id="reviewCount" name="reviewCount" type="number" value={formData.reviewCount} onChange={handleChange} required />
      </div>
      <div>
        <Label>Características (hasta 4)</Label>
        {[0, 1, 2, 3].map(index => (
          <Input
            key={`feature-input-${index}`}
            name={`features[${index}]`}
            value={formData.features[index] || ''}
            onChange={(e) => {
              const newFeatures = [...formData.features]
              newFeatures[index] = e.target.value
              setFormData(prev => ({ ...prev, features: newFeatures }))
            }}
            className="mt-2"
          />
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="bestSeller"
          name="bestSeller"
          checked={formData.bestSeller}
          onChange={handleChange}
        />
        <Label htmlFor="bestSeller">Más Vendido</Label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="trending"
          name="trending"
          checked={formData.trending}
          onChange={handleChange}
        />
        <Label htmlFor="trending">Tendencia</Label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="recommended"
          name="recommended"
          checked={formData.recommended}
          onChange={handleChange}
        />
        <Label htmlFor="recommended">Recomendado</Label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
        />
        <Label htmlFor="featured">Destacado</Label>
      </div>
      <div>
        <Label htmlFor="affiliateLink">Enlace de Afiliado</Label>
        <Input 
          id="affiliateLink" 
          name="affiliateLink" 
          value={formData.affiliateLink} 
          onChange={handleChange} 
          required 
        />
      </div>
      <Button type="submit">Guardar Producto</Button>
    </form>
  )
}
