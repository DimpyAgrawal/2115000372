// src/pages/Home.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';
import { Container, Typography, TextField, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';

const companies = ["AMZ", "FLP", "SMP", "HYN", "AZO"];
const categories = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const fetchProducts = useCallback(() => {
    const queryParams = [];
    if (searchTerm) queryParams.push(`search=${searchTerm}`);
    if (selectedCompany) queryParams.push(`company=${selectedCompany}`);
    if (selectedCategory) queryParams.push(`category=${selectedCategory}`);
    if (minPrice) queryParams.push(`minPrice=${minPrice}`);
    if (maxPrice) queryParams.push(`maxPrice=${maxPrice}`);

    const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
    console.log(queryString, selectedCategory);

    axios.get(`http://localhost:8080/categories/${selectedCategory}/products${queryString}`)
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, [searchTerm, selectedCompany, selectedCategory, minPrice, maxPrice]);

  // src/utils/debounce.js
 const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

  const debouncedFetchProducts = useCallback(debounce(fetchProducts, 2000), [fetchProducts]);

  useEffect(() => {
    debouncedFetchProducts();
  }, [searchTerm, selectedCompany, selectedCategory, minPrice, maxPrice, debouncedFetchProducts]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom className="text-center mt-5">
        Top Products
      </Typography>
      <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
        <TextField
          className="mb-4 md:mb-0"
          label="Search"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FormControl className="mb-4 md:mb-0" variant="outlined" fullWidth>
          <InputLabel>Company</InputLabel>
          <Select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            label="Company"
          >
            {companies.map((company) => (
              <MenuItem key={company} value={company}>
                {company}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="mb-4 md:mb-0" variant="outlined" fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Category"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
        <TextField
          className="mb-4 md:mb-0"
          label="Min Price"
          variant="outlined"
          type="number"
          fullWidth
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <TextField
          className="mb-4 md:mb-0"
          label="Max Price"
          variant="outlined"
          type="number"
          fullWidth
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <Button variant="contained" color="primary" onClick={fetchProducts}>
        Search
      </Button>
      <ProductList products={products} />
    </Container>
  );
};

export default Home;
