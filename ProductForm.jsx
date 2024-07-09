// components/ProductForm.js
import React, { useState, useEffect } from 'react';

function ProductForm({ onSubmit, initialData }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPrice(initialData.price);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(initialData ? initialData.id : null, { name, price: parseFloat(price) });
    setName('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Nombre del producto" 
        required 
      />
      <input 
        type="number" 
        value={price} 
        onChange={(e) => setPrice(e.target.value)} 
        placeholder="Precio" 
        required 
      />
      <button type="submit">{initialData ? 'Actualizar' : 'Agregar'} Producto</button>
    </form>
  );
}

export default ProductForm;