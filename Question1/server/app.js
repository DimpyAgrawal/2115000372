const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({credentials: true}));


const TEST_SERVER_URL = 'http://20.244.56.144/test/companies';
const COMPANY_NAMES = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
const PAGE_SIZE = 10;
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNzczNzAwLCJpYXQiOjE3MjA3NzM0MDAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6Ijc4MWEwMDRiLWU0OWYtNGQ1Ny05MDRlLTc0MTEzM2RmNTE3MSIsInN1YiI6ImRpbXB5LmFncmF3YWxfY3MyMUBnbGEuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJHTEEgVW5pdmVyc2l0eSIsImNsaWVudElEIjoiNzgxYTAwNGItZTQ5Zi00ZDU3LTkwNGUtNzQxMTMzZGY1MTcxIiwiY2xpZW50U2VjcmV0IjoielBPbHloa3FkcVBzSnRVWCIsIm93bmVyTmFtZSI6IkRpbXB5IEFncmF3YWwiLCJvd25lckVtYWlsIjoiZGltcHkuYWdyYXdhbF9jczIxQGdsYS5hYy5pbiIsInJvbGxObyI6IjIxMTUwMDAzNzIifQ.tW3-c-6HQud3wdE98bybTEa-RBMhN6ZDASQX2UQPvus";

// Helper function to generate unique product IDs
const generateUniqueId = () => uuidv4();

// Helper function to fetch products from the test server
const fetchProducts = async (company, category) => {
  try {
    const response = await axios.get(
      `${TEST_SERVER_URL}/${company}/categories/${category}/products`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`
        }
      }
    );
    return response.data;
} catch (error) {
    console.error(`Error fetching products from ${company}:`, error.message);
    return [];
}
};
console.log(fetchProducts("AMZ","Tablet"));

// Endpoint to retrieve top "n" products within a category
// Endpoint to retrieve top "n" products within a category
app.get('/categories/:category/products', async (req, res) => {
    const { category } = req.params;
    const { top, page = 1, sort, order = 'asc', minPrice, maxPrice } = req.query;

    console.log("/categories/:category/products", req.params, req.query);

    const topParsed = parseInt(top);
    if (isNaN(topParsed) || topParsed <= 0) {
        return res.status(400).json({ error: 'Invalid "top" parameter' });
    }

    const limit = topParsed;
    const offset = (page - 1) * limit;

    let products = [];

    // Fetch products from all companies
    for (const company of COMPANY_NAMES) {
        const companyProducts = await fetchProducts(company, category);
        products = products.concat(companyProducts);
    }

    // Filter products by price range if specified
    if (minPrice || maxPrice) {
        products = products.filter(product => {
            const price = product.price;
            return (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice);
        });
    }

    // Assign unique IDs to products
    products = products.map(product => ({ ...product, id: generateUniqueId() }));

    // Apply sorting if specified
    if (sort) {
        products.sort((a, b) => {
            if (order === 'asc') {
                return a[sort] > b[sort] ? 1 : -1;
            } else {
                return a[sort] < b[sort] ? 1 : -1;
            }
        });
    }

    // Paginate results
    const paginatedProducts = products.slice(offset, offset + limit);

    res.json(paginatedProducts);
});


// Endpoint to retrieve details of a specific product by ID
app.get('/categories/:category/products/:productId', async (req, res) => {
  const { category, productId } = req.params;

  let product = null;

  // Fetch products from all companies to find the product with the given ID
  for (const company of COMPANY_NAMES) {
    const companyProducts = await fetchProducts(company, category);
    const foundProduct = companyProducts.find(p => p.id === productId);
    if (foundProduct) {
      product = foundProduct;
      break;
    }
  }

  if (product) {
    res.json(product);
  } else {
    console.log(error);
    res.status(404).json({ error: 'Product not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
