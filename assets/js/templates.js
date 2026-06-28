async function loadTemplate(id, file) {
  const response = await fetch(file);
  const data = await response.text();
  document.getElementById(id).innerHTML = data;
}

async function initTemplates() {
  await Promise.all([
    loadTemplate("header", "/assets/html/header.html"),
    loadTemplate("footer", "/assets/html/footer.html"),
  ]);
  document.dispatchEvent(new CustomEvent("templatesLoaded"));
}

document.addEventListener("DOMContentLoaded", initTemplates);