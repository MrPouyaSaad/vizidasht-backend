export async function getRating(sellerUserId) {
  console.log(`[INFO] Fetch rating for seller=${sellerUserId}`);
  return {
    average: 4.4,
    count: 138,
    distribution: { 5: 80, 4: 40, 3: 12, 2: 4, 1: 2 }
  };
}
