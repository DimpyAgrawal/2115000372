// src/pages/ProductPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductDetails from '../components/ProductDetails';
import { Container } from '@mui/material';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/categories/categoryname/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  return (
    <Container>
      {product ? <ProductDetails product={product} /> : 'Loading...'}
    </Container>
  );
};

export default ProductPage;
