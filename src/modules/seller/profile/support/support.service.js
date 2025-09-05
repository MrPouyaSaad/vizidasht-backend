// ---------- Support Service ----------

// تیکت‌ها (هاردکد برای تست)
let tickets = [
  { id: 1, userId: 10, title: "مشکل در ثبت سفارش", description: "سفارش من ثبت نمی‌شود", status: "OPEN", createdAt: new Date().toISOString() },
  { id: 2, userId: 10, title: "درخواست راهنمایی", description: "چگونه محصول جدید اضافه کنم؟", status: "CLOSED", createdAt: new Date().toISOString() },
];

export async function createSupportTicket(userId, { title, description }) {
  console.log(`[INFO] Creating support ticket userId=${userId}`, { title, description });
  const newTicket = {
    id: tickets.length + 1,
    userId,
    title,
    description,
    status: "OPEN",
    createdAt: new Date().toISOString(),
  };
  tickets.push(newTicket);
  return newTicket;
}

export async function listSupportTickets(userId) {
  console.log(`[INFO] Listing tickets userId=${userId}`);
  return tickets.filter(t => t.userId === userId);
}

export async function getSupportTicket(userId, id) {
  console.log(`[INFO] Fetching ticket id=${id} userId=${userId}`);
  const ticket = tickets.find(t => t.id === Number(id) && t.userId === userId);
  if (!ticket) throw new Error("تیکت پیدا نشد");
  return ticket;
}

export async function updateTicketStatus(userId, id, status) {
  console.log(`[INFO] Updating ticket status id=${id} userId=${userId} => ${status}`);
  const ticket = tickets.find(t => t.id === Number(id) && t.userId === userId);
  if (!ticket) throw new Error("تیکت پیدا نشد");
  ticket.status = status;
  return ticket;
}

// تماس مستقیم
export async function getSupportPhone() {
  console.log("[INFO] Fetching direct support phone");
  return { phone: "021-91000000" };
}

// دلایل غیرفعال‌سازی
export async function getDeactivationReasons() {
  console.log("[INFO] Fetching deactivation reasons list");
  return [
    { code: "TEMP_LEAVE", title: "مرخصی موقت" },
    { code: "STOCK_ISSUES", title: "مشکل موجودی" },
    { code: "PERSONAL", title: "دلایل شخصی" },
    { code: "OTHER", title: "سایر" },
  ];
}

// تغییر وضعیت حساب
export async function changeAccountStatus(userId, { toActive, reasonCode, note }) {
  console.log(`[INFO] Account status change userId=${userId}`, { toActive, reasonCode, note });
  return {
    fromActive: true,
    toActive,
    reasonCode,
    note: note || null,
    createdAt: new Date().toISOString(),
  };
}
