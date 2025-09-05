// src/schemas/authSchemas.js
import Joi from "joi";

const phoneSchema = Joi.string()
  .pattern(/^09\d{9}$/)
  .messages({ "string.pattern.base": "شماره موبایل معتبر نیست." });

const codeSchema = Joi.string()
  .length(6)
  .pattern(/^\d{6}$/)
  .messages({
    "string.length": "کد تأیید باید ۶ رقمی باشد.",
    "string.pattern.base": "کد تأیید فقط شامل اعداد است.",
  });

export const buyerRequestCodeSchema = Joi.object({
  phone: phoneSchema.required().messages({ "any.required": "شماره موبایل الزامی است." }),
});

export const buyerVerifySchema = Joi.object({
  phone: phoneSchema.required(),
  code: codeSchema.required(),
});

export const sellerRegisterSchema = Joi.object({
  phone: phoneSchema.required(),
  companyName: Joi.string().min(2).required().messages({
    "any.required": "نام فروشگاه الزامی است.",
    "string.min": "نام فروشگاه حداقل باید ۲ کاراکتر باشد.",
  }),
  documentsUrl: Joi.string().uri().allow(null, "").optional(),
});

export const sellerRequestCodeSchema = Joi.object({
  phone: phoneSchema.required(),
});

export const sellerVerifySchema = Joi.object({
  phone: phoneSchema.required(),
  code: codeSchema.required(),
});

export const driverRequestCodeSchema = Joi.object({
  phone: phoneSchema.required(),
});

export const driverVerifySchema = Joi.object({
  phone: phoneSchema.required(),
  code: codeSchema.required(),
});

export const refreshSchema = Joi.object({
  token: Joi.string().required().messages({
    "any.required": "رفرش توکن ارسال نشده است.",
  }),
});

export const logoutSchema = Joi.object({
  token: Joi.string().required(),
});
