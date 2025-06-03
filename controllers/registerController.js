export function register(req, res) {
  res.render("register");
}

export async function handleRegister(req, res) {
  let { email, password } = req.body;

  console.log(email, password);
  res.redirect("login");
}
