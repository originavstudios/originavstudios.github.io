function loadTemplate(templateId, targetElementId) {
    fetch(`../html/${templateId}.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById(targetElementId).innerHTML = data;
        })
        .catch(error => console.error('Error fetching template:', error));
}

// Load header and footer
loadTemplate('header', 'header');
loadTemplate('footer', 'footer');