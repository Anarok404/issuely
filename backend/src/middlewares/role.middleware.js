export const requireAdmin = (req, res, next) => {
  const adminRoles = ["staff", "lead"];

  if (!adminRoles.includes(req.user.role)) {
    return res.status(403).json({ message: "Admin access required" });
  }

  next();
};
export const requireLead = (req, res, next) => {
  if (req.user.role !== "lead") {
    return res.status(403).json({ message: "Lead access required" });
  }

  next();
};
