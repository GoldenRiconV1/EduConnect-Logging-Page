document.addEventListener('DOMContentLoaded', function () {
    fetch("/idp-static/logos.json")
        .then((response) => response.json())
        .then((logos) => {
            let copyright = document.getElementById("copyright");
            if (copyright) {
                copyright.innerText = logos.copyright;
            }

            let marianne = document.getElementById("logo-marianne");
            if (marianne) {
                marianne.src = logos.logo_marianne;
                marianne.alt = logos.copyright;
            }

            let marianneChoix = document.getElementById("logo-marianne-choix");
            if (marianneChoix) {
                marianneChoix.src = logos.logo_marianne;
                marianneChoix.alt = logos.copyright;
            }

            let ministere = document.getElementById("logo-ministere");
            if (ministere) {
                ministere.src = logos.logo_ministere;
                ministere.alt = logos.copyright;
            }

            let ministereTop = document.getElementById("logo-ministere-top");
            if (ministereTop) {
                ministereTop.src = logos.logo_ministere;
                ministereTop.alt = logos.copyright;
            }
        });
});