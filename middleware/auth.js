export function ensureAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  req.flash("error", "Silakan login terlebih dahulu");
  res.redirect("/login");
}
