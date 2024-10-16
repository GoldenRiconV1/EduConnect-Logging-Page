let flag_clic = 0;

function checkModeLecture(form) {
    if (flag_clic === 0) {
        fetch("/api/LECTURE")
            .then((response) => response.json())
            .then((feature) => {
                if (feature.enabled) {
                    showModal(
                        "modalMaintenance",
                        form.getAttribute("titreModale"),
                        form.getAttribute("corpsModale")
                    );
                } else {
                    flag_clic = 1;
                    document.getElementById("pas_de_compte").click();
                }
            });
    }
}

let elements = document.querySelectorAll("a[hrefcible]");

elements.forEach((element) => {
    element.onclick = function () {
        fetch("/api/LECTURE")
            .then((response) => response.json())
            .then((feature) => {
                if (feature.enabled) {
                    showModal(
                        "modalMaintenance",
                        this.getAttribute("titreModale"),
                        this.getAttribute("corpsModale")
                    );
                } else {
                    window.location.href = this.getAttribute("hrefcible");
                }
            });
        return false;
    };
});

/**
* Fonction permettant d'afficher une modal
*/
function showModal(id, titre, corps) {
    let modal = document.getElementById(id);
    document.getElementById("modalMaintenance-title").innerText = titre;
    document.getElementById("texteMaintenance").innerHTML = corps;
    modal.classList.add("fr-modal--opened");
}

/**
* Fonction permettant de fermer une modal
*/
function hideModal(id) {
    let modal = document.getElementById(id);
    modal.classList.remove("fr-modal--opened");
}