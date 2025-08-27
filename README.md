

<h1 align="center">Vizidash Seller Backend</h1>
<p align="center">
  <em>Minimal • Modern • Node.js + Express + PostgreSQL</em>
</p>

<p align="center">
  <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/Node.js-18.x-green?logo=node.js" alt="Node.js" />
  </a>
  <a href="https://www.postgresql.org/">
    <img src="https://img.shields.io/badge/PostgreSQL-14-blue?logo=postgresql" alt="PostgreSQL" />
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-orange" alt="License" />
  </a>
</p>

---

## ✨ Features

- 🔐 **Authentication & three-step seller registration**  
- 🛒 **Product management** (add, edit, list)  
- 📦 **Order management** (view, cancel, detailed items)  
- 💰 **Finance tracking** (summary, transaction history)  
- 🎫 **Support tickets system**  
- ⭐ **Reviews & feedback**  
- 🖥 **REST API ready for frontend integration**  

---

## 📡 API Endpoints

### Authentication & Seller
- `POST /api/auth/register` — Step 1: Seller registration  
- `POST /api/auth/login` — Login and receive JWT  
- `POST /api/seller/admin/verify` — Admin approval/rejection (Authorization header required)  
- `PUT /api/seller/profile` — Step 3: Complete profile  
- `GET /api/seller/me` — Get seller profile  

### Products
- `POST /api/products` — Add product  
- `PUT /api/products/:id` — Edit product  
- `GET /api/products?q=` — List products with search/sort  

### Orders
- `GET /api/orders` — List orders  
- `GET /api/orders/:id` — Order details  
- `POST /api/orders/:id/cancel` — Cancel order or item (`body: { itemIndex?: number }`)  

### Finance
- `GET /api/finance/summary` — Revenue, withdrawals, balance, pending payouts  
- `GET /api/finance/transactions` — Transaction history  

### Support & Tickets
- `POST /api/support/tickets` — Create ticket  
- `GET /api/support/tickets` — List tickets  

### Reviews
- `GET /api/reviews` — List reviews  

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/vizidash-backend
cd vizidash-backend
