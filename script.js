// Exécute le script une fois que le DOM est chargé
document.addEventListener("DOMContentLoaded", () => {
    const itemList = document.getElementById("item-list"); // Conteneur pour les articles
    const addItemButton = document.getElementById("add-item"); // Bouton pour ajouter un article
    const itemNameInput = document.getElementById("item-name"); // Champ de saisie pour le nom de l'article
    const itemLinkInput = document.getElementById("item-link"); // Champ de saisie pour le lien de l'article

    // Ajouter un nouvel article à la liste
    addItemButton.addEventListener("click", () => {
        const itemName = itemNameInput.value.trim();
        const itemLink = itemLinkInput.value.trim();

        // Vérifie si les champs sont remplis
        if (!itemName || !itemLink) {
            alert("Veuillez renseigner le nom et le lien de l'article.");
            return;
        }

        // Crée un élément de liste pour l'article
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = itemLink;
        link.textContent = itemName;
        link.target = "_blank"; // Ouvre le lien dans un nouvel onglet

        // Bouton pour réserver ou annuler la réservation de l'article
        const reserveButton = document.createElement("button");
        reserveButton.textContent = "Réserver";
        reserveButton.addEventListener("click", () => toggleReservation(li, reserveButton));

        // Bouton pour supprimer l'article
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Supprimer";
        deleteButton.addEventListener("click", () => itemList.removeChild(li));

        // Ajoute les boutons et le lien à l'élément de liste
        li.appendChild(link);
        const controls = document.createElement("div");
        controls.appendChild(reserveButton);
        controls.appendChild(deleteButton);
        li.appendChild(controls);
        itemList.appendChild(li);

        // Réinitialise les champs de saisie
        itemNameInput.value = "";
        itemLinkInput.value = "";
    });

    // Fonction pour basculer entre réservation et annulation
    function toggleReservation(itemElement, reserveButton) {
        if (!itemElement.classList.contains("reserved")) {
            // Si l'article n'est pas réservé, demander le nom et réserver
            const personName = prompt("Qui souhaite réserver cet article ?");
            if (personName && personName.trim() !== "") {
                const reservationInfo = document.createElement("span");
                reservationInfo.textContent = `Réservé par : ${personName}`;
                reservationInfo.classList.add("reservation-info");

                itemElement.classList.add("reserved");
                reserveButton.textContent = "Annuler Réservation";
                itemElement.insertBefore(reservationInfo, itemElement.lastChild);
            } else {
                alert("Réservation annulée.");
            }
        } else {
            // Si l'article est déjà réservé, confirmer l'annulation
            const confirmation = prompt("Tapez 'annuler' pour confirmer l'annulation de la réservation.");
            if (confirmation && confirmation.toLowerCase() === "annuler") {
                itemElement.classList.remove("reserved");
                reserveButton.textContent = "Réserver";

                const reservationInfo = itemElement.querySelector(".reservation-info");
                if (reservationInfo) {
                    reservationInfo.remove();
                }
            } else {
                alert("Annulation non confirmée.");
            }
        }
    }
});
