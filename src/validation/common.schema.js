export function error(res, status, code, message, details) {
  return res.status(status).json({
    success: false,
    error: { code, message, details },
  });
}

export function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

export function isInt(v) {
  return Number.isInteger(v);
}