let degrades = [];
let avertissements = [];
let informations = [];
let indispos = [];

recupererMessages();

function recupererMessages() {
    try {
        // date au format yyyy-MM-ddTmm:HH:ss.SSS
        let dateIso = new Date().toLocaleString('sv').replace(' ', 'T');
        let params = new URLSearchParams({ application: 'CONNEXION', validAt: dateIso });
        fetch(`/messages?${params.toString()}`)
            .then((response) => response.json())
            .then((messages) => {
                messages.forEach(msg => {
                    switch (msg.typeMessage) {
                        case 'DEGRADE':
                            degrades.push(msg);
                            break;
                        case 'INFORMATION':
                            informations.push(msg);
                            break;
                        case 'AVERTISSEMENT':
                            avertissements.push(msg);
                            break;
                        case 'INDISPONIBILITE':
                            indispos.push(msg);
                            break;
                    }
                });
            })
            .then(afficherMessages)
            .catch(error => {
                console.error(error);
            });

    } catch (err) {
        console.error(err);
    }
}

function afficherMessages() {
    if (indispos.length > 0) {
        afficherMessageIndispo(indispos[0]);
    }
    else {
        afficherMessagesAvertissement();
        // ordre nécessaire car on ajoute au début de la div parente
        afficherMessagesInformation();
        afficherMessagesDegrade();
    }
}

function afficherMessageIndispo(msg) {
    document.title = 'Application indisponible - ÉduConnect';
    document.getElementById('contenu').classList.add('hidden-item');
    document.getElementById('indispo').classList.remove('hidden-item');

    document.getElementById('titreIndispo').querySelector('h1:first-of-type').innerHTML = msg.titre;
    document.getElementById('texteIndispo').innerHTML = msg.detail;

    // on change le header
    document.body.classList.remove('fr-header-padding-top');
    document.body.classList.add('fr-header-padding-top--minimized');
    document.getElementById('header_connexion').classList.remove('hidden-item');
    document.getElementById('header_profil')?.classList.add('hidden-item');
    document.getElementById('bouton_profil')?.classList.add('hidden-item');
}

function afficherMessagesDegrade() {
    let parent = document.getElementById('contenu');
    degrades.forEach((msg) => {
        let divMsg = document.createElement('div');
        let titre = `<div class="bloc-info"><p class="fr-callout__title">${msg.titre}</p>`;
        let detail = `<p class="fr-callout__text">${msg.detail}</p></div>`;
        let date = msg.dateMessage ? ` <span class="date"> ${formatDateAffichage(msg.dateMessage)} </span> ` : '';

        divMsg.innerHTML = date + titre + detail;
        divMsg.setAttribute('class', 'fr-callout fr-fi-information-fill bandeau fr-mb-3v m-auto');
        divMsg.setAttribute('id', `degrade${msg.id}`);
        parent.prepend(divMsg);
    });
}

function afficherMessagesAvertissement() {
    let parent = document.getElementById('sidebar_parent');
    avertissements.forEach((msg) => {
        let divMsg = document.createElement('div');
        let titre = `<p class="fr-callout__title">${msg.titre}</p>`;
        let detail = `<p class="fr-callout__text">${msg.detail}</p>`;
        let date = msg.dateMessage ? ` <span class="date"> ${formatDateAffichage(msg.dateMessage)} </span> ` : '';

        divMsg.innerHTML = date + titre + detail;
        divMsg.setAttribute('class', 'fr-callout fr-fi-information-fill fr-mb-3v');
        divMsg.setAttribute('id', `avertissement${msg.id}`);
        parent.append(divMsg);
    });
}

function afficherMessagesInformation() {
    let parent = document.getElementById('contenu');
    informations.forEach((msg) => {
        let divMsg = document.createElement('div');
        let titre = `<div class="bloc-info"><p class="fr-callout__title texte-blanc">${msg.titre}</p>`;
        let detail = `<p class="fr-callout__text">${msg.detail}</p></div>`;
        let date = msg.dateMessage ? ` <span class="date-info"> ${formatDateAffichage(msg.dateMessage)} </span> ` : '';

        divMsg.innerHTML = date + titre + detail;
        divMsg.setAttribute('class', 'fr-callout fr-fi-information-line bandeau secondary-no-border fr-mb-3v m-auto');
        divMsg.setAttribute('id', `info${msg.id}`);
        parent.prepend(divMsg);
    });
}

function formatDateAffichage(date) {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return new Date(date).toLocaleDateString('fr-FR', options);
}