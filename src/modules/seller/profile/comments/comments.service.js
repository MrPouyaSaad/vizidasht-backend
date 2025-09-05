export async function listReviews(sellerUserId) {
  console.log(`[INFO] Listing reviews for seller=${sellerUserId}`);
  return [
    {
      id: 1,
      product: { id: 1, title: "ماست سون" },
      title: "خیلی خوب بود",
      text: "محصول تازه و باکیفیت",
      recommend: true
    }
  ];
}

export async function replyReview(sellerUserId, id, replyText) {
  console.log(`[INFO] Reply review id=${id}`);
  return { id: Number(id), replyText };
}
