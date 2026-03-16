async function loadTemplate(id, file) {

  const response = await fetch(file);
  const data = await response.text();

  document.getElementById(id).innerHTML = data;

}

document.addEventListener("DOMContentLoaded", () => {

  loadTemplate("header", "/assets/html/header.html");
  loadTemplate("footer", "/assets/html/footer.html");

});