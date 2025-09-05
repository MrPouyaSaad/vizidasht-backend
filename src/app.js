// src/app.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { swaggerDocs } from "./config/swagger.js";
import authRouter from './modules/auth/auth.routes.js';    
import adminRouter from './modules/admin/admin.routes.js';  
import superAdminRouter from './modules/admin/superAdmin.routes.js';
import dashboardRouter from './modules/seller/dashboard/dashboard.routes.js';
import sellerOrdersRouter from './modules/seller/orders/order.routes.js';
import productsRouter from './modules/seller/products/product.routes.js'
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
swaggerDocs(app);

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

// health check
app.get('/health', (req, res) => res.json({ ok: true }));

// routes
app.use('/api/auth', authRouter); 
app.use('/api/admin', adminRouter); 
app.use('/api/super-admin', superAdminRouter);
app.use('/api/seller/dashboard', dashboardRouter);
app.use('/api/seller/orders', sellerOrdersRouter);
app.use('/api/seller/products', productsRouter);


// global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server listening on port ${PORT}`);
  console.log("\n🌐 Url => http://localhost:4000/api/**");

});
