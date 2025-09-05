import { prisma } from "../../../prisma/client.js";

const BIN_MAP = {
  "603799": "ملی",
  "589210": "رفاه",
  "627412": "اقتصاد نوین",
  "627381": "انصار",
  "627760": "پست بانک",
  "502229": "پاسارگاد",
};

export function detectBankName(cardNumber16) {
  const bin = (cardNumber16 || "").slice(0, 6);
  return BIN_MAP[bin] || "نامشخص";
}

// ---------- Profile ----------
export async function getProfile(sellerUserId) {
  console.log(`[INFO] Fetching profile for sellerUserId=${sellerUserId}`);
  // هاردکد - داده‌های نمونه
  return {
    id: 10,
    userId: sellerUserId,
    firstName: "علی",
    lastName: "محمدی",
    nationalId: "1234567890",
    phone: "09120000000",
    storePhone: "021123456",
    storeName: "سوپرمارکت بهار",
    businessId: "BIZ-777",
    businessTitle: "پروانه کسب سوپرمارکت",
    storeAddress: "تهران، خیابان مثال، پلاک ۱۲",
    status: "APPROVED",
    step: 4,
    ratingAverage: 4.4,
    ratingCount: 138,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

export async function updateAddress(sellerUserId, storeAddress) {
  console.log(`[INFO] Updating storeAddress for sellerUserId=${sellerUserId} =>`, storeAddress);
  return { storeAddress };
}

export async function updateStorePhone(sellerUserId, storePhone) {
  console.log(`[INFO] Updating storePhone for sellerUserId=${sellerUserId} =>`, storePhone);
  return { storePhone };
}

export async function updatePhoneRequiresVerify(sellerUserId, phone) {
  console.log(`[INFO] Request phone change (needs verify) sellerUserId=${sellerUserId} =>`, phone);
  return { phone, verifyRequired: true };
}

export async function updateStoreNameRequiresVerify(sellerUserId, storeName) {
  console.log(`[INFO] Request storeName change (needs verify) sellerUserId=${sellerUserId} =>`, storeName);
  return { storeName, verifyRequired: true };
}

// ---------- Rating ----------
export async function getRating(sellerUserId) {
  console.log(`[INFO] Fetching rating for sellerUserId=${sellerUserId}`);
  return {
    average: 4.4,
    stars: 5,
    count: 138,
    distribution: {
      5: 80,  // 80 امتیاز 5 ستاره
      4: 40,  // 40 امتیاز 4 ستاره  
      3: 12,  // 12 امتیاز 3 ستاره
      2: 4,   // 4 امتیاز 2 ستاره
      1: 2    // 2 امتیاز 1 ستاره
    }
  };
}

// ---------- Support ----------
export async function createSupportTicket(sellerUserId, { title, description }) {
  console.log(`[INFO] Creating support ticket for sellerUserId=${sellerUserId}`, { title, description });
  return {
    id: 101,
    title,
    description,
    status: "OPEN",
    createdAt: new Date().toISOString(),
  };
}

export async function getSupportPhone() {
  console.log("[INFO] Fetching direct support phone");
  return { phone: "021-91000000" };
}

export async function getDeactivationReasons() {
  console.log("[INFO] Fetching deactivation reasons list");
  return [
    { code: "TEMP_LEAVE", title: "مرخصی موقت" },
    { code: "STOCK_ISSUES", title: "مشکل موجودی" },
    { code: "PERSONAL", title: "دلایل شخصی" },
    { code: "OTHER", title: "سایر" },
  ];
}

export async function changeAccountStatus(sellerUserId, { toActive, reasonCode, note }) {
  console.log(`[INFO] Account status change sellerUserId=${sellerUserId}`, { toActive, reasonCode, note });
  return {
    fromActive: true,
    toActive,
    reasonCode,
    note: note || null,
    createdAt: new Date().toISOString(),
  };
}

// ---------- FAQ ----------
export async function getAllFAQs() {
  console.log("[INFO] Fetching all FAQs");
  return [
    {
      id: 1,
      question: "چگونه محصول جدید اضافه کنم؟",
      answer: "از منوی محصولات گزینه افزودن محصول جدید را انتخاب کنید.",
      category: { id: 1, title: "مدیریت محصولات" },
      createdAt: new Date()
    },
    {
      id: 2, 
      question: "چگونه موجودی محصول را به روز کنم؟",
      answer: "در صفحه ویرایش محصول می‌توانید موجودی را تغییر دهید.",
      category: { id: 1, title: "مدیریت محصولات" },
      createdAt: new Date()
    }
  ];
}

export async function createFAQ(data) {
  console.log("[INFO] Creating new FAQ", data);
  return {
    id: 999,
    ...data,
    createdAt: new Date()
  };
}

// ---------- Bank Cards ----------
export async function listBankCards(sellerUserId) {
  console.log(`[INFO] Listing bank cards sellerUserId=${sellerUserId}`);
  return [
    {
      id: 1,
      holderName: "علی محمدی",
      cardNumber: "6037991234567890",
      bankName: detectBankName("6037991234567890"),
      iban: "IR060120000000000000000001",
      isDefault: true,
      verified: true,
    },
    {
      id: 2,
      holderName: "علی محمدی",
      cardNumber: "5022290000001234",
      bankName: detectBankName("5022290000001234"),
      iban: null,
      isDefault: false,
      verified: false,
    },
  ];
}

export async function addBankCard(sellerUserId, { holderName, cardNumber, iban }) {
  console.log(`[INFO] Adding bank card sellerUserId=${sellerUserId}`, { holderName, cardNumber, iban });
  if (!holderName || !cardNumber) throw new Error("نام دارنده کارت و شماره کارت الزامی است");
  
  return {
    id: 999,
    holderName,
    cardNumber,
    bankName: detectBankName(cardNumber),
    iban: iban || null,
    isDefault: false,
    verified: false,
  };
}

export async function editBankCard(sellerUserId, id, payload) {
  console.log(`[INFO] Editing bank card id=${id} sellerUserId=${sellerUserId}`, payload);
  if (payload.cardNumber) payload.bankName = detectBankName(payload.cardNumber);
  return { id: Number(id), ...payload };
}

export async function deleteBankCard(sellerUserId, id) {
  console.log(`[INFO] Deleting bank card id=${id} sellerUserId=${sellerUserId}`);
  return { success: true };
}

export async function setDefaultBankCard(sellerUserId, id) {
  console.log(`[INFO] Setting default bank card id=${id} sellerUserId=${sellerUserId}`);
  return { id: Number(id), isDefault: true };
}

// ---------- Messages ----------
export async function listMessages(sellerUserId) {
  console.log(`[INFO] Listing messages sellerUserId=${sellerUserId}`);
  return [
    { id: 1, title: "سفارش جدید", body: "شما یک سفارش جدید دارید", read: false, createdAt: "2025-08-29 10:10" },
    { id: 2, title: "تسویه حساب", body: "مبلغ ۳۵۰,۰۰۰ ریال واریز شد", read: true, createdAt: "2025-08-28 12:00" },
  ];
}

export async function markMessageRead(sellerUserId, id) {
  console.log(`[INFO] Mark message read id=${id} sellerUserId=${sellerUserId}`);
  return { id: Number(id), read: true };
}

// ---------- Reviews ----------
export async function listReviews(sellerUserId) {
  console.log(`[INFO] Listing reviews sellerUserId=${sellerUserId}`);
  return [
    {
      id: 11,
      product: { id: 1, title: "ماست سون", imageUrl: "/uploads/products/yogurt.jpg" },
      title: "خیلی خوب بود",
      date: "2025-08-20",
      text: "محصول تازه و باکیفیت.",
      recommend: true,
      replyText: null,
    },
    {
      id: 12,
      product: { id: 2, title: "شیر کم‌چرب", imageUrl: "/uploads/products/milk.jpg" },
      title: "قیمت مناسب",
      date: "2025-08-22",
      text: "ارزش خرید دارد.",
      recommend: true,
      replyText: "ممنون از نظرتون 🙏",
    },
  ];
}

export async function replyReview(sellerUserId, id, replyText) {
  console.log(`[INFO] Reply to review id=${id} sellerUserId=${sellerUserId} reply=`, replyText);
  return { id: Number(id), replyText };
}

// ---------- Tutorials ----------
export async function listTutorials() {
  console.log("[INFO] Listing tutorials");
  return [
    { id: 1, title: "آموزش ثبت محصول", imageUrl: "/uploads/tutorials/t1.jpg", linkUrl: "https://example.com/t1" },
    { id: 2, title: "مدیریت سفارشات", imageUrl: "/uploads/tutorials/t2.jpg", linkUrl: "https://example.com/t2" },
  ];
}

// ---------- Penalties ----------
export async function getAllPenalties() {
  console.log("[INFO] Fetching all penalties");
  return [
    {
      id: 1,
      title: "تأخیر در ارسال",
      description: "تأخیر بیش از 24 ساعت در ارسال سفارش",
      category: { id: 1, title: "تأخیر" },
      createdAt: new Date()
    },
    {
      id: 2,
      title: "کمبود موجودی",
      description: "عدم موجودی محصول پس از ثبت سفارش",
      category: { id: 2, title: "موجودی" },
      createdAt: new Date()
    }
  ];
}

export async function createPenalty(data) {
  console.log("[INFO] Creating new penalty", data);
  return {
    id: 999,
    ...data,
    createdAt: new Date()
  };
}