// بانک‌ها
const BIN_MAP = {
  "603799": "ملی",
  "589210": "رفاه",
  "627412": "اقتصاد نوین",
  "627381": "انصار",
  "627760": "پست بانک",
  "502229": "پاسارگاد",
};

function detectBankName(cardNumber16) {
  const bin = (cardNumber16 || "").slice(0, 6);
  return BIN_MAP[bin] || "نامشخص";
}

// ---------- سرویس‌ها ----------
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
