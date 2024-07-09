jsxCopy// App.js
import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch('http://localhost:5000/api/product');
    const data = await response.json();
    setProducts(data);
  };

  const addProduct = async (product) => {
    const response = await fetch('http://localhost:5000/api/product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    const newProduct = await response.json();
    setProducts([...products, newProduct]);
  };

  const updateProduct = async (id, updatedProduct) => {
    await fetch(`http://localhost:5000/api/product/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    });
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
    setEditingProduct(null);
  };

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/product/${id}`, { method: 'DELETE' });
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div>
      <h1>Producto CRUD</h1>
      <ProductForm 
        onSubmit={editingProduct ? updateProduct : addProduct} 
        initialData={editingProduct} 
      />
      <ProductList 
        products={products} 
        onEdit={setEditingProduct} 
        onDelete={deleteProduct} 
      />
    </div>
  );
}

export default App;