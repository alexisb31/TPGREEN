document.addEventListener("DOMContentLoaded", async function () {
    const API_URL_ARTICLES = "http://localhost:3000/api/content/articles";
    const API_URL_PRESTATIONS = "http://localhost:3000/api/content/prestations";
    const API_URL_CONTACT = "http://localhost:3000/api/content/contact";
    const API_URL_MENTIONS = "http://localhost:3000/api/content/mentions";

    try {
        // Récupération des articles
        const responseArticles = await fetch(API_URL_ARTICLES);
        if (!responseArticles.ok) throw new Error("Erreur lors du chargement des articles");
        const articles = await responseArticles.json();
        console.log("Articles reçus :", articles);

        // Affichage des articles
        const articlesContainer = document.getElementById("articles-container");
        articles.forEach(article => {
            const articleElem = document.createElement("article");
            articleElem.innerHTML = `<h3>${article.title}</h3><p>${article.content}</p>`;
            articlesContainer.appendChild(articleElem);
        });

        // Récupération des prestations
        const responsePrestations = await fetch(API_URL_PRESTATIONS);
        if (!responsePrestations.ok) throw new Error("Erreur lors du chargement des prestations");
        const prestations = await responsePrestations.json();
        console.log("Prestations reçues :", prestations);

        // Affichage des prestations dans la section dédiée
        const prestationsContainer = document.getElementById("prestations-container");
        prestations.forEach(prestation => {
            const prestationElem = document.createElement("div");
            prestationElem.classList.add("prestation-item");
            prestationElem.innerHTML = `
                <img src="assets/prestation${prestation.id}.webp" alt="${prestation.title}" loading="lazy">
                <div class="prestation-content">
                    <h3>${prestation.title}</h3>
                    <p>${prestation.description}</p>
                </div>
            `;
            prestationsContainer.appendChild(prestationElem);
        });

        // Récupération des informations de contact
        const responseContact = await fetch(API_URL_CONTACT);
        if (!responseContact.ok) throw new Error("Erreur lors du chargement des informations de contact");
        const contact = await responseContact.json();
        console.log("Contact reçu :", contact);

        // Affichage des informations de contact
        const contactInfo = document.getElementById("contact-info");
        contactInfo.innerHTML = `
            <p>Email: ${contact.email}</p>
            <p>Téléphone: ${contact.phone}</p>
            <p>Adresse: ${contact.address}</p>
        `;

        // Récupération des mentions légales
        const responseMentions = await fetch(API_URL_MENTIONS);
        if (!responseMentions.ok) throw new Error("Erreur lors du chargement des mentions légales");
        const mentions = await responseMentions.json();
        console.log("Mentions légales reçues :", mentions);

        // Affichage des mentions légales
        const mentionsContent = document.getElementById("mentions-content");
        mentionsContent.textContent = mentions;

    } catch (error) {
        console.error("Erreur dans script.js :", error);
    }

    // Gestion du carrousel
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;

    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.style.display = (i === index) ? 'block' : 'none';
        });
    };

    document.getElementById('prev').addEventListener('click', () => {
        currentSlide = (currentSlide > 0) ? currentSlide - 1 : totalSlides - 1;
        showSlide(currentSlide);
    });

    document.getElementById('next').addEventListener('click', () => {
        currentSlide = (currentSlide < totalSlides - 1) ? currentSlide + 1 : 0;
        showSlide(currentSlide);
    });

    showSlide(currentSlide);
});