
function checkLoginMdp() {
    let identifiantValide = false;
    let passwordValide = false;
    let captchaValide = false;
    if (document.getElementById('username').value == "") {
        document.getElementById('erreurIdentifiantVide').setAttribute("hidden", false);
        document.getElementById('erreurIdentifiantVide').classList.add("fr-error-text");
        document.getElementById('erreurIdentifiant').setAttribute("hidden", true);
        document.getElementById('erreurIdentifiant').classList.remove("fr-error-text");
    } else {
        identifiantValide = true;
        document.getElementById('erreurIdentifiantVide').setAttribute("hidden", true);
        document.getElementById('erreurIdentifiantVide').classList.remove("fr-error-text");
    }
    if (document.getElementById('password').value == "") {
        document.getElementById('erreurMdpVide').setAttribute("hidden", false);
        document.getElementById('erreurMdpVide').classList.add("fr-error-text");
        document.getElementById('erreurMdp').setAttribute("hidden", true);
        document.getElementById('erreurMdp').classList.remove("fr-error-text");

    } else {
        passwordValide = true;
        document.getElementById('erreurMdpVide').setAttribute("hidden", true);
        document.getElementById('erreurMdpVide').classList.remove("fr-error-text");
    }
    if(!(document.getElementById('captchaFormulaireExtInput') === null) && document.getElementById('captchaFormulaireExtInput').value =="")
    {
        document.getElementById('erreurCaptchaVide').setAttribute("hidden", false);
        document.getElementById('erreurCaptchaVide').classList.add("fr-error-text");
        document.getElementById('erreurCaptcha').setAttribute("hidden", true);
        document.getElementById('erreurCaptcha').classList.remove("fr-error-text");
    } else {
        captchaValide = true;
        document.getElementById('erreurCaptchaVide').setAttribute("hidden", true);
        document.getElementById('erreurCaptchaVide').classList.remove("fr-error-text");
    }
    return (identifiantValide && passwordValide && captchaValide);
}