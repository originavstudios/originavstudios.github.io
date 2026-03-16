document.addEventListener("DOMContentLoaded",()=>{

    const images=document.querySelectorAll(".gallery-grid img");

    images.forEach(img=>{
        img.addEventListener("click",()=>{

            const lightbox=document.createElement("div");
            lightbox.classList.add("lightbox");

            const full=document.createElement("img");
            full.src=img.src;

            lightbox.appendChild(full);

            document.body.appendChild(lightbox);

            lightbox.addEventListener("click",()=>{
                lightbox.remove();
            });
        });
    });
});