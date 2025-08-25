# Vizidash Seller Backend (Node.js + Express + MongoDB)

این پروژه یک اسکلت‌بندی مینیمال برای پیاده‌سازی بخش فروشنده **ویزی‌دشت** است: احراز هویت، ثبت‌نام سه‌مرحله‌ای، مدیریت محصول، سفارش، مالی، تیکت و نظرات.

## اجرای محلی
1) Node.js 18+ نصب باشد
2) MongoDB محلی اجرا باشد (یا از سرویس ابری استفاده کنید)
3) فایل `.env.example` را به `.env` تغییر نام دهید و مقادیر را تنظیم کنید
4) اجرای پروژه:
```bash
npm install
npm run dev
```
مسیرهای اصلی:
- `POST /api/auth/register` — مرحله اول ثبت‌نام فروشنده
- `POST /api/auth/login` — ورود و دریافت JWT
- `POST /api/seller/admin/verify` — تایید/رد فروشنده توسط ادمین (هدر Authorization با توکن ادمین)
- `PUT /api/seller/profile` — تکمیل پروفایل (مرحله سوم)
- `GET /api/seller/me` — دریافت پروفایل

- `POST /api/products` — افزودن محصول
- `PUT /api/products/:id` — ویرایش محصول
- `GET /api/products?q=` — لیست محصولات با جستجو/مرتب‌سازی بر اساس موجودی

- `GET /api/orders` — لیست سفارش‌ها
- `GET /api/orders/:id` — جزییات سفارش
- `POST /api/orders/:id/cancel` — لغو سفارش یا آیتم مشخص (body: { itemIndex?: number })

- `GET /api/finance/summary` — خلاصه مالی (درآمد کل، برداشت کل، موجودی، واریز نشده)
- `GET /api/finance/transactions` — گردش حساب

- `POST /api/support/tickets` — ثبت تیکت پشتیبانی
- `GET /api/support/tickets` — لیست تیکت‌ها

- `GET /api/reviews` — فهرست نظرات

## نکات امنیتی و بعدی
- در محیط واقعی: OTP برای تایید شماره موبایل، rate limit، لاگین چندمرحله‌ای، لاگ ادمین و ... اضافه شود.
- برای دیپلوی روی لیارا: متغیرهای محیطی (`MONGO_URL`, `JWT_SECRET`, `PORT`) را ست کنید.
- برای داشبورد آمار، endpoint های تجمیعی (aggregation) بیشتری اضافه کنید (سفارشات امروز/هفته/ماه).

