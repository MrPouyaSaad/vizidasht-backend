// src/middleware/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;
  let message = "خطایی در سرور رخ داده است. لطفاً بعداً دوباره تلاش کنید.";

  const msg = (err.message || "").toLowerCase();

  if (msg.includes("not found")) message = "موردی یافت نشد.";
  else if (msg.includes("exists")) message = "این مورد قبلاً ثبت شده است.";
  else if (msg.includes("invalid credentials")) message = "اطلاعات ورود صحیح نیست.";
  else if (msg.includes("otp")) message = "کد تأیید نامعتبر یا منقضی است.";
  else if (msg.includes("forbidden")) message = "اجازه دسترسی به این بخش را ندارید.";
  else if (msg.includes("unauthorized")) message = "لطفاً وارد حساب کاربری شوید.";
  else if (msg.includes("seller pending")) message = "حساب فروشنده شما در انتظار تأیید است.";
  else if (msg.includes("seller rejected")) message = "حساب فروشنده شما رد شده است.";
  else if (msg.includes("driver pending")) message = "حساب راننده شما در انتظار تأیید است.";
  else if (msg.includes("driver rejected")) message = "حساب راننده شما رد شده است.";

  res.status(status).json({ message });
};
