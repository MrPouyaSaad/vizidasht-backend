import {
  getProfile,
  updateAddress,
  updateStorePhone,
  updatePhoneRequiresVerify,
  updateStoreNameRequiresVerify,
  getRating,
  createSupportTicket,
  getSupportPhone,
  getDeactivationReasons,
  changeAccountStatus,
  getFaqs,
  listBankCards,
  addBankCard,
  editBankCard,
  deleteBankCard,
  setDefaultBankCard,
  listMessages,
  markMessageRead,
  listReviews,
  replyReview,
  listTutorials,
  listPenalties,
} from "./profile.service.js";

// -------- Profile ----------
export async function me(req, res) {
  try {
    const sellerUserId = req.user.id;
    const data = await getProfile(sellerUserId);
    res.json(data);
  } catch (e) {
    console.error("[ERR] profile.me:", e);
    res.status(500).json({ message: "خطا در دریافت پروفایل" });
  }
}

export async function editAddress(req, res) {
  try {
    const sellerUserId = req.user.id;
    const { storeAddress } = req.body;
    if (!storeAddress) return res.status(400).json({ message: "آدرس الزامی است" });
    const data = await updateAddress(sellerUserId, storeAddress);
    res.json({ message: "آدرس با موفقیت بروزرسانی شد", ...data });
  } catch (e) {
    console.error("[ERR] profile.editAddress:", e);
    res.status(500).json({ message: "خطا در بروزرسانی آدرس" });
  }
}

export async function editStorePhone(req, res) {
  try {
    const sellerUserId = req.user.id;
    const { storePhone } = req.body;
    if (!storePhone) return res.status(400).json({ message: "شماره ثابت الزامی است" });
    const data = await updateStorePhone(sellerUserId, storePhone);
    res.json({ message: "شماره ثابت بروزرسانی شد", ...data });
  } catch (e) {
    console.error("[ERR] profile.editStorePhone:", e);
    res.status(500).json({ message: "خطا در بروزرسانی شماره ثابت" });
  }
}

export async function requestChangePhone(req, res) {
  try {
    const sellerUserId = req.user.id;
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: "شماره موبایل الزامی است" });
    const data = await updatePhoneRequiresVerify(sellerUserId, phone);
    res.json({ message: "تایید مجدد لازم است", ...data });
  } catch (e) {
    console.error("[ERR] profile.requestChangePhone:", e);
    res.status(500).json({ message: "خطا در ثبت درخواست تغییر موبایل" });
  }
}

export async function requestChangeStoreName(req, res) {
  try {
    const sellerUserId = req.user.id;
    const { storeName } = req.body;
    if (!storeName) return res.status(400).json({ message: "نام فروشگاه الزامی است" });
    const data = await updateStoreNameRequiresVerify(sellerUserId, storeName);
    res.json({ message: "تایید مجدد لازم است", ...data });
  } catch (e) {
    console.error("[ERR] profile.requestChangeStoreName:", e);
    res.status(500).json({ message: "خطا در ثبت درخواست تغییر نام فروشگاه" });
  }
}

// -------- Rating ----------
export async function rating(req, res) {
  try {
    const data = await getRating(req.user.id);
    res.json(data);
  } catch (e) {
    console.error("[ERR] profile.rating:", e);
    res.status(500).json({ message: "خطا در دریافت امتیاز" });
  }
}

// -------- Support ----------
export async function supportCreate(req, res) {
  try {
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).json({ message: "عنوان و توضیح الزامی است" });
    const data = await createSupportTicket(req.user.id, { title, description });
    res.json({ message: "درخواست پشتیبانی ثبت شد", ticket: data });
  } catch (e) {
    console.error("[ERR] support.create:", e);
    res.status(500).json({ message: "خطا در ثبت درخواست پشتیبانی" });
  }
}

export async function supportPhone(req, res) {
  try {
    const data = await getSupportPhone();
    res.json(data);
  } catch (e) {
    console.error("[ERR] support.phone:", e);
    res.status(500).json({ message: "خطا در دریافت شماره پشتیبانی" });
  }
}

export async function statusReasons(req, res) {
  try {
    const data = await getDeactivationReasons();
    res.json(data);
  } catch (e) {
    console.error("[ERR] status.reasons:", e);
    res.status(500).json({ message: "خطا در دریافت دلایل" });
  }
}

export async function changeStatus(req, res) {
  try {
    const { toActive, reasonCode, note } = req.body;
    if (typeof toActive !== "boolean" || !reasonCode) {
      return res.status(400).json({ message: "اطلاعات وضعیت معتبر نیست" });
    }
    const data = await changeAccountStatus(req.user.id, { toActive, reasonCode, note });
    res.json({ message: "وضعیت حساب بروزرسانی شد", log: data });
  } catch (e) {
    console.error("[ERR] status.change:", e);
    res.status(500).json({ message: "خطا در تغییر وضعیت حساب" });
  }
}

// -------- FAQ ----------
export async function listFAQs(req, res) {
  try {
    const faqs = await faqService.getAllFAQs();
    console.log('[FAQ] list success');
    res.json(faqs);
  } catch (err) {
    console.error('[FAQ] list error:', err);
    res.status(500).json({ message: 'خطا در دریافت سوالات' });
  }
}

// افزودن سوال
export async function addFAQ(req, res) {
  try {
    const faq = await faqService.createFAQ(req.body);
    console.log('[FAQ] create success:', faq.id);
    res.status(201).json(faq);
  } catch (err) {
    console.error('[FAQ] create error:', err);
    res.status(500).json({ message: 'خطا در ثبت سوال' });
  }
}

// دریافت سوال
export async function getFAQById(req, res) {
  try {
    const { id } = req.params;
    const faq = await faqService.getFAQById(Number(id));
    if (!faq) {
      return res.status(404).json({ message: 'سوال یافت نشد' });
    }
    console.log('[FAQ] fetch success:', id);
    res.json(faq);
  } catch (err) {
    console.error('[FAQ] fetch error:', err);
    res.status(500).json({ message: 'خطا در دریافت سوال' });
  }
}

// حذف سوال
export async function deleteFAQ(req, res) {
  try {
    const { id } = req.params;
    await faqService.deleteFAQ(Number(id));
    console.log('[FAQ] delete success:', id);
    res.json({ message: 'سوال با موفقیت حذف شد' });
  } catch (err) {
    console.error('[FAQ] delete error:', err);
    res.status(500).json({ message: 'خطا در حذف سوال' });
  }
}

// -------- Bank Cards ----------
export async function bankCardsList(req, res) {
  try {
    const data = await listBankCards(req.user.id);
    res.json(data);
  } catch (e) {
    console.error("[ERR] bank.list:", e);
    res.status(500).json({ message: "خطا در دریافت کارت‌ها" });
  }
}

export async function bankCardAdd(req, res) {
  try {
    const { holderName, cardNumber, iban } = req.body;
    const data = await addBankCard(req.user.id, { holderName, cardNumber, iban });
    res.json({ message: "کارت اضافه شد", card: data });
  } catch (e) {
    console.error("[ERR] bank.add:", e);
    res.status(400).json({ message: e.message || "خطا در افزودن کارت" });
  }
}

export async function bankCardEdit(req, res) {
  try {
    const { id } = req.params;
    const data = await editBankCard(req.user.id, id, req.body);
    res.json({ message: "کارت بروزرسانی شد", card: data });
  } catch (e) {
    console.error("[ERR] bank.edit:", e);
    res.status(400).json({ message: "خطا در بروزرسانی کارت" });
  }
}

export async function bankCardDelete(req, res) {
  try {
    const { id } = req.params;
    await deleteBankCard(req.user.id, id);
    res.json({ message: "کارت حذف شد" });
  } catch (e) {
    console.error("[ERR] bank.delete:", e);
    res.status(400).json({ message: "خطا در حذف کارت" });
  }
}

export async function bankCardSetDefault(req, res) {
  try {
    const { id } = req.params;
    const data = await setDefaultBankCard(req.user.id, id);
    res.json({ message: "کارت پیش‌فرض شد", card: data });
  } catch (e) {
    console.error("[ERR] bank.default:", e);
    res.status(400).json({ message: "خطا در تنظیم پیش‌فرض" });
  }
}

// -------- Messages ----------
export async function messagesList(req, res) {
  try {
    const data = await listMessages(req.user.id);
    res.json(data);
  } catch (e) {
    console.error("[ERR] messages.list:", e);
    res.status(500).json({ message: "خطا در دریافت پیام‌ها" });
  }
}

export async function messageRead(req, res) {
  try {
    const { id } = req.params;
    const data = await markMessageRead(req.user.id, id);
    res.json({ message: "پیام خوانده شد", ...data });
  } catch (e) {
    console.error("[ERR] messages.read:", e);
    res.status(400).json({ message: "خطا در بروزرسانی پیام" });
  }
}

// -------- Reviews ----------
export async function reviewsList(req, res) {
  try {
    const data = await listReviews(req.user.id);
    res.json(data);
  } catch (e) {
    console.error("[ERR] reviews.list:", e);
    res.status(500).json({ message: "خطا در دریافت نظرات" });
  }
}

export async function reviewsReply(req, res) {
  try {
    const { id } = req.params;
    const { replyText } = req.body;
    if (!replyText) return res.status(400).json({ message: "پاسخ الزامی است" });
    const data = await replyReview(req.user.id, id, replyText);
    res.json({ message: "پاسخ ثبت شد", ...data });
  } catch (e) {
    console.error("[ERR] reviews.reply:", e);
    res.status(400).json({ message: "خطا در ثبت پاسخ" });
  }
}

// -------- Tutorials ----------
export async function tutorialsList(req, res) {
  try {
    const data = await listTutorials();
    res.json(data);
  } catch (e) {
    console.error("[ERR] tutorials.list:", e);
    res.status(500).json({ message: "خطا در دریافت آموزش‌ها" });
  }
}

// -------- Penalties ----------
// لیست همه جریمه‌ها
export async function listPenalties(req, res) {
  try {
    const penalties = await penaltyService.getAllPenalties();
    console.log('[Penalty] list success');
    res.json(penalties);
  } catch (err) {
    console.error('[Penalty] list error:', err);
    res.status(500).json({ message: 'خطا در دریافت لیست جریمه‌ها' });
  }
}

// ثبت جریمه جدید
export async function addPenalty(req, res) {
  try {
    const penalty = await penaltyService.createPenalty(req.body);
    console.log('[Penalty] create success:', penalty.id);
    res.status(201).json(penalty);
  } catch (err) {
    console.error('[Penalty] create error:', err);
    res.status(500).json({ message: 'خطا در ثبت جریمه' });
  }
}

// دریافت جریمه با شناسه
export async function getPenaltyById(req, res) {
  try {
    const { id } = req.params;
    const penalty = await penaltyService.getPenaltyById(Number(id));
    if (!penalty) {
      return res.status(404).json({ message: 'جریمه یافت نشد' });
    }
    console.log('[Penalty] fetch success:', id);
    res.json(penalty);
  } catch (err) {
    console.error('[Penalty] fetch error:', err);
    res.status(500).json({ message: 'خطا در دریافت جریمه' });
  }
}

// حذف جریمه
export async function deletePenalty(req, res) {
  try {
    const { id } = req.params;
    await penaltyService.deletePenalty(Number(id));
    console.log('[Penalty] delete success:', id);
    res.json({ message: 'جریمه با موفقیت حذف شد' });
  } catch (err) {
    console.error('[Penalty] delete error:', err);
    res.status(500).json({ message: 'خطا در حذف جریمه' });
  }
}
