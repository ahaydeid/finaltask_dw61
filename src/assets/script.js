const toggleButtons = document.querySelectorAll(".togglePassword");

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-target");
    const input = document.getElementById(targetId);
    const type = input.getAttribute("type") === "password" ? "text" : "password";
    input.setAttribute("type", type);
    button.textContent = type === "password" ? "🙈" : "🙉";
  });
});