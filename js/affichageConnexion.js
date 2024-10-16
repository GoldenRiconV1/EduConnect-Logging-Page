document.addEventListener('DOMContentLoaded', function () {
    let profilExistant = sessionStorage.getItem('profilEduConnect');
    if (profilExistant) {
        selectionProfil(profilExistant);
    }
    else {
        selectionProfil('choix');
    }
});

function selectionProfil(typeConnexion) {
    // les éléments à afficher sur la page de sélection de profil
    let elems_choix_profil = ['header_profil', 'div_profil', 'sidebar_responsable', 'sidebar_responsable_small'];
    // les éléments communs aux pages de connexion Responsable et Elève
    let elems_choix_connexion = ['header_connexion', 'div_connexion'];
    // les éléments à afficher sur la page de connexion pour Responsable
    let elems_eleve = ['titre_eleve', 'identifiant_perdu_eleve', 'password_perdu_eleve', 'sidebar_eleve', 'sidebar_eleve_small'];
    // les éléments à afficher sur la page de connexion pour Elève
    let elems_responsable = ['div_franceconnect', 'titre_responsable', 'identifiant_perdu_responsable', 'password_perdu_responsable', 'div_pas_compte', 'sidebar_responsable', 'sidebar_responsable_small'];

    masquerTout(elems_choix_profil);
    masquerTout(elems_choix_connexion);
    masquerTout(elems_eleve);
    masquerTout(elems_responsable);
    document.body.classList.remove('fr-header-padding-top--minimized');
    document.body.classList.remove('fr-header-padding-top');
    sessionStorage.setItem('profilEduConnect', typeConnexion); // astuce pour savoir d'où on venait après refresh de la page
    document.getElementById('btn_menu').setAttribute('data-fr-opened', 'false'); //bouton Sélection du profil réduit

    switch (typeConnexion) {
        case 'responsable':
            document.title = 'Connexion responsable  - ÉduConnect';
            document.body.classList.add('fr-header-padding-top--minimized');
            afficherTout(elems_choix_connexion);
            afficherTout(elems_responsable);
            break;
        case 'eleve':
            document.title = 'Connexion élève - ÉduConnect';
            document.body.classList.add('fr-header-padding-top--minimized');
            afficherTout(elems_choix_connexion);
            afficherTout(elems_eleve);
            break;
        default:
            document.title = 'Sélection du profil - ÉduConnect';
            document.body.classList.add('fr-header-padding-top');
            afficherTout(elems_choix_profil);
            resetMessagesErreurs();
            break;
    }
}

function masquerTout(elems) {
    for (let id of elems) {
        document.getElementById(id)?.classList.add('hidden-item');
    }
}

function afficherTout(elems) {
    for (let id of elems) {
        document.getElementById(id)?.classList.remove('hidden-item');
    }
}

function resetMessagesErreurs() {
    document.getElementById('erreurMdp').setAttribute("hidden", true);
    document.getElementById('erreurIdentifiant').setAttribute("hidden", true);
    document.getElementById('erreurMdp').classList.remove("fr-error-text");
    document.getElementById('erreurIdentifiant').classList.remove("fr-error-text");
}