// src/components/ProductDetails.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const ProductDetails = ({ product }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        alt={product.name}
        height="300"
        image="https://via.placeholder.com/300" // Replace with actual image URLs
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Company: {product.company}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Category: {product.category}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Price: ${product.price}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Rating: {product.rating}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Discount: {product.discount}%
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Availability: {product.availability ? 'In Stock' : 'Out of Stock'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
