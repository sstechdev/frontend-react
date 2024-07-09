import React from 'react';

function ProductList({ products, onEdit, onDelete }) {
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name} - ${product.price}
          <button onClick={() => onEdit(product)}>Editar</button>
          <button onClick={() => onDelete(product.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
