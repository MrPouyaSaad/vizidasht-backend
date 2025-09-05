export async function getAllPenalties() {
  console.log("[INFO] Fetching all penalties");
  return [
    { id: 1, title: "تأخیر", description: "ارسال با تأخیر" }
  ];
}

export async function createPenalty(data) {
  console.log("[INFO] Creating penalty", data);
  return { id: 999, ...data, createdAt: new Date() };
}
