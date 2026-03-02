require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");
const connectDB = require("../config/db");

/**
 * Seed Script - Populate Database with Sample Products
 *
 * This script:
 * 1. Connects to MongoDB
 * 2. Clears existing products
 * 3. Inserts sample products
 * 4. Closes the connection
 *
 * Usage: npm run seed
 */

// Sample products data
const sampleProducts = [
  // Electronics
  {
    name: "Wireless Bluetooth Headphones",
    description:
      "High-quality over-ear headphones with active noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
    price: 79.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    stock: 50,
  },
  {
    name: "Smart Watch Pro",
    description:
      "Fitness tracker with heart rate monitor, GPS, and smartphone notifications. Water-resistant up to 50 meters.",
    price: 199.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    stock: 30,
  },
  {
    name: "USB-C Fast Charger",
    description:
      "65W fast charging adapter compatible with laptops, tablets, and smartphones. Compact and portable design.",
    price: 29.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1591290619762-c588f4e8a5c1?w=500&q=80",
    stock: 100,
  },
  {
    name: "Wireless Gaming Mouse",
    description:
      "Ergonomic wireless mouse with customizable RGB lighting and 16,000 DPI sensor. Perfect for gaming and productivity.",
    price: 59.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80",
    stock: 45,
  },

  // Clothing
  {
    name: "Classic Cotton T-Shirt",
    description:
      "Premium 100% cotton t-shirt available in multiple colors. Comfortable fit for everyday wear.",
    price: 19.99,
    category: "Clothing",
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    stock: 150,
  },
  {
    name: "Denim Jacket",
    description:
      "Vintage-style denim jacket with classic button closure. Durable and stylish for any season.",
    price: 69.99,
    category: "Clothing",
    imageUrl:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
    stock: 40,
  },
  {
    name: "Running Shoes",
    description:
      "Lightweight running shoes with breathable mesh and cushioned sole. Available in sizes 7-12.",
    price: 89.99,
    category: "Clothing",
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    stock: 60,
  },
  {
    name: "Wool Winter Sweater",
    description:
      "Cozy wool-blend sweater perfect for cold weather. Machine washable and available in multiple sizes.",
    price: 49.99,
    category: "Clothing",
    imageUrl:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80",
    stock: 55,
  },

  // Books
  {
    name: "JavaScript: The Complete Guide",
    description:
      "Comprehensive guide to modern JavaScript programming. Covers ES6+ features, async programming, and best practices.",
    price: 39.99,
    category: "Books",
    imageUrl:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&q=80",
    stock: 75,
  },
  {
    name: "The Art of Web Design",
    description:
      "Learn principles of effective web design, UX/UI best practices, and responsive design techniques.",
    price: 34.99,
    category: "Books",
    imageUrl:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&q=80",
    stock: 50,
  },
  {
    name: "Python for Data Science",
    description:
      "Master data analysis and machine learning with Python. Includes practical examples and exercises.",
    price: 44.99,
    category: "Books",
    imageUrl:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&q=80",
    stock: 40,
  },
  {
    name: "Full Stack Development Handbook",
    description:
      "Complete guide to building modern web applications with React, Node.js, and MongoDB.",
    price: 49.99,
    category: "Books",
    imageUrl:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80",
    stock: 30,
  },

  // Food
  {
    name: "Organic Green Tea (100 bags)",
    description:
      "Premium organic green tea leaves. Rich in antioxidants and perfect for daily wellness.",
    price: 14.99,
    category: "Food",
    imageUrl:
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500&q=80",
    stock: 200,
  },
  {
    name: "Dark Chocolate Bar Collection",
    description:
      "Assorted dark chocolate bars with 70% cocoa. Pack of 6 premium Belgian chocolates.",
    price: 24.99,
    category: "Food",
    imageUrl:
      "https://images.unsplash.com/photo-1481391032119-d89fee407e44?w=500&q=80",
    stock: 120,
  },
  {
    name: "Organic Honey (16 oz)",
    description:
      "Raw unfiltered organic honey from local beekeepers. Natural sweetener with health benefits.",
    price: 18.99,
    category: "Food",
    imageUrl:
      "https://images.unsplash.com/photo-1587049352846-4a222e784aaf?w=500&q=80",
    stock: 80,
  },

  // Sports
  {
    name: "Yoga Mat Premium",
    description:
      "Non-slip yoga mat with extra cushioning. Includes carrying strap. Perfect for home workouts.",
    price: 34.99,
    category: "Sports",
    imageUrl:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80",
    stock: 70,
  },
  {
    name: "Adjustable Dumbbells Set",
    description:
      "Space-saving adjustable dumbbells from 5-52.5 lbs. Perfect for home gym and strength training.",
    price: 299.99,
    category: "Sports",
    imageUrl:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&q=80",
    stock: 25,
  },
  {
    name: "Resistance Bands Set",
    description:
      "Set of 5 resistance bands with different strengths. Includes door anchor and carrying bag.",
    price: 24.99,
    category: "Sports",
    imageUrl:
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500&q=80",
    stock: 90,
  },
  {
    name: "Water Bottle Insulated",
    description:
      "Stainless steel insulated water bottle keeps drinks cold for 24 hours. 32 oz capacity.",
    price: 27.99,
    category: "Sports",
    imageUrl:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80",
    stock: 110,
  },
];

// Main seed function
const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    console.log("🗑️  Clearing existing products...");
    // Delete all existing products
    await Product.deleteMany({});

    console.log("🌱 Seeding products...");
    // Insert sample products
    const products = await Product.insertMany(sampleProducts);

    console.log(`✅ Successfully seeded ${products.length} products!`);
    console.log("📦 Products by category:");

    // Count products by category
    const categories = ["Electronics", "Clothing", "Books", "Food", "Sports"];
    for (const category of categories) {
      const count = products.filter((p) => p.category === category).length;
      console.log(`   - ${category}: ${count} products`);
    }

    console.log("\n✨ Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seed function
seedProducts();
