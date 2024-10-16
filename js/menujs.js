/* Fixed header */
const fixedHeader = document.querySelector(".scrolled");
if (fixedHeader) {
  window.addEventListener("scroll", function () {
    var scrollPosition = window.scrollY;
    if (scrollPosition > 167) {
      fixedHeader.classList.add("scroll");
    } else {
      fixedHeader.classList.remove("scroll");
    }
  });
}

/* Toast */
const closePopUp = document.querySelector(".toast__close");
if (closePopUp) {
  closePopUp.addEventListener("click", (event) => {
    closePopUp.closest("div").remove();
  });
}

/* Show password */
const showPwd = document.querySelectorAll(".showPwd");
if (showPwd) {
  showPwd.forEach((el) => {
    let ariaLabel = el.getAttribute("aria-label");
    let dataPwd = el.dataset.input;
    el.addEventListener("click", (event) => {
      let x = document.getElementById(dataPwd);
      if (x.type === "password") {
        x.type = "text";
        el.setAttribute("aria-label", "Cacher le mot de passe");
      } else {
        x.type = "password";
        el.setAttribute("aria-label", ariaLabel);
      }
    });
  });
}

/* Check password */
const SELECTOR_INPUT_PASSWORD = "input[type='password']";
const SELECTOR_INPUT_GROUP = ".fr-input-group";
const SELECTOR_PASSWORD_MESSAGE = ".password-errors";
const SELECTOR_PASSWORD_METER = ".password-meter";
const SELECTOR_PASSWORD_METER_TEXT = ".password-meter__text";

const CLASS_VALID = "valid";
const CLASS_PASSWORD_MESSAGE = "password-errors";
const CLASS_INPUT_GROUP_ERROR = "fr-input-group--error";

const PASSWORD_REQUIREMENTS = {
  uppercase: false,
  lowercase: false,
  number: false,
  special: false,
  length: false,
};

const PASSWORD_STRENGTH = {
  0: " ",
  20: "Faible",
  40: "Faible",
  60: "Moyen",
  80: "Moyen",
  100: "Fort",
};

class passwordChecker {
  constructor(element) {
    this._element = element;
    this._password = "";
    this._password_min_length = (element?.attributes["data-min-size"]?.value ?? 12);
    
    //1er replace pour enlever les espaces. 2nd replace pour echapper les caracteres spéciaux
    this._caracteres_speciaux_string = (element?.attributes["data-caracteres-speciaux"]?.value?.replace(/\s+/g, '').replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') ?? ""); 
    this._caracteres_speciaux = new RegExp("["+ this._caracteres_speciaux_string + "]","g");
    this._caracteres_speciaux_min = (element?.attributes["data-caracteres-speciaux-min"]?.value ?? "1");

    this._majuscules_string = (element?.attributes["data-majuscules"]?.value?.replace(/\s+/g, '') ?? "");
    this._majuscules = new RegExp("["+ this._majuscules_string + "]","g");
    this._majuscules_min = (element?.attributes["data-majuscules-min"]?.value ?? "1");

    this._minuscules_string = (element?.attributes["data-minuscules"]?.value?.replace(/\s+/g, '') ?? "");
    this._minuscules = new RegExp("["+ this._minuscules_string + "]","g");
    this._minuscules_min = (element?.attributes["data-minuscules-min"]?.value ?? "1");

    this._chiffres_string = (element?.attributes["data-chiffres"]?.value?.replace(/\s+/g, '') ?? "");
    this._chiffres = new RegExp("["+ this._chiffres_string + "]","g");
    this._chiffres_min = (element?.attributes["data-chiffres-min"]?.value ?? "1");

    this._setListeners();

    let parentElement = this._element.parentElement.parentElement;
    this._checkerElement = parentElement.nextElementSibling;
  }

  _setListeners() {
    this._element.addEventListener("input", (event) => {
      this._password = this._element.value;
      this._onChange();
    });
  }

  _onChange() {
    if (this._password.length > 0) {
      this._checkerElement.style.display = "block";
      this._checkPassword();
    } else {
      this._checkerElement.style.display = "none";
      this._removeAriaAndErrorClass();
    }
  } 

  _checkPassword() {
    //Recuperation de la taille minimale du password
    let passwordRequirements = PASSWORD_REQUIREMENTS;

    this._password.match(this._majuscules)?.length >= this._majuscules_min ? (passwordRequirements.uppercase = true) : (passwordRequirements.uppercase = false);
    this._password.match(this._minuscules)?.length >= this._minuscules_min ? (passwordRequirements.lowercase = true) : (passwordRequirements.lowercase = false);
    this._password.match(this._chiffres)?.length >= this._chiffres_min ? (passwordRequirements.number = true) : (passwordRequirements.number = false);
    this._password.match(this._caracteres_speciaux)?.length >= this._caracteres_speciaux_min ? (passwordRequirements.special = true) : (passwordRequirements.special = false);

    this._password.length < this._password_min_length ? (passwordRequirements.length = false) : (passwordRequirements.length = true);

    this._updateErrorMessagesStatus(passwordRequirements);
    this._addAriaAndErrorClass(passwordRequirements);
    this._updateStrengthMeter(passwordRequirements);
  }

  _updateErrorMessagesStatus(pwdRequirements) {
    for (let key in PASSWORD_REQUIREMENTS) {
      let selector = `${SELECTOR_PASSWORD_MESSAGE}__${key}`;
      PASSWORD_REQUIREMENTS[key] === true ? this._checkerElement.querySelector(selector).classList.add(CLASS_VALID) : this._checkerElement.querySelector(selector).classList.remove(CLASS_VALID);
    }
  }

  _updateStrengthMeter(pwdRequirements) {
    let validInputPercentage = 0;
    for (let key in pwdRequirements) {
      if (pwdRequirements[key] === true) validInputPercentage += 20;
    }
    this._checkerElement.querySelector(SELECTOR_PASSWORD_METER).dataset.percent = validInputPercentage;
    this._checkerElement.querySelector(SELECTOR_PASSWORD_METER_TEXT).style.visibility = "visible";
    this._checkerElement.querySelector(SELECTOR_PASSWORD_METER_TEXT).textContent = PASSWORD_STRENGTH[validInputPercentage];
  }

  _addAriaAndErrorClass(pwdRequirements) {
    let validInput = true;
    for (let key in pwdRequirements) {
      if (pwdRequirements[key] === false) validInput = false;
    }
    this._element.setAttribute("aria-invalid", !validInput);

    //!validInput ? this._element.parentElement.classList.add(CLASS_INPUT_GROUP_ERROR) : this._element.parentElement.classList.remove(CLASS_INPUT_GROUP_ERROR);
  }

  _removeAriaAndErrorClass() {
    this._element.removeAttribute("aria-invalid");
    //this._element.parentElement.classList.remove(CLASS_INPUT_GROUP_ERROR);
  }
}

const inputPasswordElements = document.querySelectorAll(SELECTOR_INPUT_PASSWORD);

if (inputPasswordElements) {
  inputPasswordElements.forEach((element) => {
    let parentElement = element.parentElement.parentElement;
    let nextSiblingElement = parentElement.nextElementSibling;
    if (nextSiblingElement && nextSiblingElement.classList.contains(CLASS_PASSWORD_MESSAGE)) {
      new passwordChecker(element);
    }
  });
}

/* Focus trap */

// add all the elements inside modal which you want to make focusable
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
const modal = document.querySelector(".fr-modal"); // select the modal by it's id

if (modal) {
  const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
  const focusableContent = modal.querySelectorAll(focusableElements);
  const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

  document.addEventListener("keydown", function (e) {
    let isTabPressed = e.key === "Tab" || e.keyCode === 9;

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) {
      // if shift key pressed for shift + tab combination
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus(); // add focus for the last focusable element
        e.preventDefault();
      }
    } else {
      // if tab key is pressed
      if (document.activeElement === lastFocusableElement) {
        // if focused has reached to last focusable element then focus first focusable element after pressing tab
        firstFocusableElement.focus(); // add focus for the first focusable element
        e.preventDefault();
      }
    }
  });

  firstFocusableElement.focus();
}
