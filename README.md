# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

## Products Demo (React + Vite)

### Live Demo

https://test-assignment-project.onrender.com

A test assignment demo that lists products from DummyJSON and shows product details. Built with React, Vite, Tailwind, axios, and react-router.

## Products Demo (React + Vite)

A small e-commerce demo task assignment that pulls products from DummyJSON and shows both listings and details. Built with React, Vite, Tailwind, axios, and react-router.

### What’s here

- Products page with infinite scroll (limit 10, skip pagination) hitting https://dummyjson.com/products
- Product cards that open a dedicated details page per item
- Friendly loading and error states while more items stream in

### Quick start

```bash
npm install
npm run dev
# open the shown localhost URL
```

### How it works

- Data: `fetchProducts(limit, skip)` and `fetchProductById(id)` live in src/api/products.js
- UI: Listing grid and ProductDetails page sit in src/pages, wired via App.jsx routes
- Paging: IntersectionObserver watches the last card and fetches the next 10 when it enters view

### Notes

- Tested with React 19 on Vite; dev server uses HMR
