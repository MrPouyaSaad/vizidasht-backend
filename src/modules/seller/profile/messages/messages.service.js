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
