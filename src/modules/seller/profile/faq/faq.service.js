export async function getAllFAQs() {
  console.log("[INFO] Fetching all FAQs");
  return [
    {
      id: 1,
      question: "چگونه محصول اضافه کنم؟",
      answer: "از منوی محصولات → افزودن",
      category: { id: 1, title: "مدیریت محصولات" }
    }
  ];
}

export async function createFAQ(data) {
  console.log("[INFO] Creating new FAQ", data);
  return { id: 999, ...data, createdAt: new Date() };
}
