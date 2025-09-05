import * as service from "./support.service.js";

export async function createTicketCtrl(req, res) {
  try {
    const ticket = await service.createSupportTicket(req.user.id, req.body);
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message || "خطا در ثبت تیکت" });
  }
}

export async function listTicketsCtrl(req, res) {
  try {
    const tickets = await service.listSupportTickets(req.user.id);
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: "خطا در دریافت لیست تیکت‌ها" });
  }
}

export async function getTicketCtrl(req, res) {
  try {
    const ticket = await service.getSupportTicket(req.user.id, req.params.id);
    res.json(ticket);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

export async function updateTicketStatusCtrl(req, res) {
  try {
    const ticket = await service.updateTicketStatus(req.user.id, req.params.id, req.body.status);
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message || "خطا در تغییر وضعیت تیکت" });
  }
}

export async function getSupportPhoneCtrl(req, res) {
  const phone = await service.getSupportPhone();
  res.json(phone);
}

export async function getDeactivationReasonsCtrl(req, res) {
  const reasons = await service.getDeactivationReasons();
  res.json(reasons);
}

export async function changeAccountStatusCtrl(req, res) {
  try {
    const result = await service.changeAccountStatus(req.user.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message || "خطا در تغییر وضعیت حساب" });
  }
}
