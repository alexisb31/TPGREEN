document.addEventListener("DOMContentLoaded", async function () {
    const API_URL = "http://localhost:3000/api/content";

    async function loadContent() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Erreur lors du chargement des données");
            const data = await response.json();

            // Afficher les articles
            const articlesList = document.getElementById("articles-list");
            articlesList.innerHTML = "";
            data.articles.forEach(article => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <strong>${article.title}</strong>: ${article.content}
                    <button onclick="deleteArticle(${article.id})">Supprimer</button>
                `;
                articlesList.appendChild(li);
            });

            // Afficher les prestations
            const prestationsList = document.getElementById("prestations-list");
            prestationsList.innerHTML = "";
            data.prestations.forEach(prestation => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <strong>${prestation.title}</strong>: ${prestation.description}
                    <button onclick="deletePrestation(${prestation.id})">Supprimer</button>
                `;
                prestationsList.appendChild(li);
            });

        } catch (error) {
            console.error("Erreur :", error);
        }
    }

    // Ajouter un article
    document.getElementById("article-form").addEventListener("submit", async function (e) {
        e.preventDefault();
        const title = document.getElementById("article-title").value;
        const content = document.getElementById("article-content").value;

        try {
            await fetch(`${API_URL}/articles`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content })
            });
            loadContent();
        } catch (error) {
            console.error("Erreur :", error);
        }
    });

    // Ajouter une prestation
    document.getElementById("prestation-form").addEventListener("submit", async function (e) {
        e.preventDefault();
        const title = document.getElementById("prestation-title").value;
        const description = document.getElementById("prestation-description").value;

        try {
            await fetch(`${API_URL}/prestations`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description })
            });
            loadContent();
        } catch (error) {
            console.error("Erreur :", error);
        }
    });

    // Supprimer un article
    window.deleteArticle = async function (id) {
        try {
            await fetch(`${API_URL}/articles/${id}`, { method: "DELETE" });
            loadContent();
        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    // Supprimer une prestation
    window.deletePrestation = async function (id) {
        try {
            await fetch(`${API_URL}/prestations/${id}`, { method: "DELETE" });
            loadContent();
        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    // Charger les contenus au chargement de la page
    loadContent();
});
