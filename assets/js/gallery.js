document.addEventListener("DOMContentLoaded",()=>{

    const images=document.querySelectorAll(".gallery-grid img");

    images.forEach(img=>{
        img.addEventListener("click",()=>{

            const lightbox=document.createElement("div");
            lightbox.classList.add("lightbox");

            const full=document.createElement("img");
            // Load from data-full attribute if available, otherwise fall back to src
            full.src=img.dataset.full||img.src;

            lightbox.appendChild(full);

            document.body.appendChild(lightbox);

            lightbox.addEventListener("click",()=>{
                lightbox.remove();
            });
        });
    });
});