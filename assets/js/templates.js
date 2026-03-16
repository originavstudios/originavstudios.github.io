async function loadTemplate(id, file) {
  const response = await fetch(file);
  const data = await response.text();

  document.getElementById(id).innerHTML = data;

  if (id === "header") {
    window.dispatchEvent(new Event("headerLoaded"));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadTemplate("header", "/assets/html/header.html");
  loadTemplate("footer", "/assets/html/footer.html");
});

window.addEventListener("headerLoaded", () => {
  console.log("template: header loaded");
});