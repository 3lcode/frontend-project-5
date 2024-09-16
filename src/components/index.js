import "../pages/index.css";
import { initialCards } from "./cards.js";
import { enableValidation,  } from "./validate.js";
import { createCard, setCardTemplate } from './card.js';
import { openPopup, closePopup, closeByEsc } from "./modal.js";

export const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_state_error',
    errorClass: 'popup__input-error_visible'
};


// Создание объекта с настройками валидации
enableValidation(validationSettings);

const cardContainer = document.querySelector(".places__list");

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content
const cardElement = cardTemplate.querySelector(".card");


// Модальныее окна
const imagePopup = document.querySelector(".popup_type_image");
imagePopup.classList.add("popup_is-animated");
const popupImageImage = imagePopup.querySelector(".popup__image");
const popupImageCaption = imagePopup.querySelector(".popup__caption");
const popupImageCloseButton = imagePopup.querySelector(".popup__close");

setCardTemplate(cardElement, popupImageImage, popupImageCaption);

imagePopup.addEventListener('mousedown', evt => {
    if (evt.target == imagePopup) {
        closePopup(imagePopup);
    }
});

popupImageCloseButton.addEventListener('click', () => {
    closePopup(imagePopup);
});

// Вывести карточки на страницу
initialCards.forEach(element => {
    const card = createCard(element.name, element.link, imagePopup);
    cardContainer.append(card);
});


// Форма редактирования профиля пользователя
const profilePopup = document.querySelector(".popup_type_edit");
profilePopup.classList.add("popup_is-animated");
const profileNameElement =  document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(".profile__description");

const editProfileButton = document.querySelector(".profile__edit-button");
const popupProfileName = profilePopup.querySelector(".popup__input_type_name");
const popupProfileDescription = profilePopup.querySelector(".popup__input_type_description");

editProfileButton.addEventListener('click', () => {
    popupProfileName.value = profileNameElement.textContent;
    popupProfileDescription.value = profileDescriptionElement.textContent;
    openPopup(profilePopup, validationSettings);
});

profilePopup.addEventListener('mousedown', evt => {
    if(evt.target == profilePopup) {
        closePopup(profilePopup);
    }
});

const popupProfileCloseButton = profilePopup.querySelector(".popup__close");
const profileFormElement = profilePopup.querySelector(".popup__form");

popupProfileCloseButton.addEventListener('click', () => {
    closePopup(profilePopup);
});

profileFormElement.addEventListener('submit', e => {
    e.preventDefault();
    const name = popupProfileName.value;
    const description = popupProfileDescription.value;

    profileNameElement.textContent = name;
    profileDescriptionElement.textContent = description;

    closePopup(profilePopup);
});


// Форма добавления карточки
const cardPopup = document.querySelector(".popup_type_new-card");
cardPopup.classList.add("popup_is-animated");
const addCardButton = document.querySelector(".profile__add-button");

const popupCardCloseButton = cardPopup.querySelector(".popup__close");
const popupCardFormElement = cardPopup.querySelector(".popup__form");

const popupCardName = cardPopup.querySelector(".popup__input_type_card-name");
const popupCardLink = cardPopup.querySelector(".popup__input_type_url");


function closeCardPopup() {
    closePopup(cardPopup);
    popupCardName.value = "";
    popupCardLink.value = "";
}

cardPopup.addEventListener('mousedown', evt => {
    if(evt.target == cardPopup) {
        closeCardPopup();
    }
});

addCardButton.addEventListener('click', () => {
    openPopup(cardPopup, validationSettings);
});


popupCardCloseButton.addEventListener('click', closeCardPopup);

popupCardFormElement.addEventListener('submit', e => {
    e.preventDefault();

    const card = createCard(popupCardName.value, popupCardLink.value, imagePopup);
    cardContainer.prepend(card);
    closeCardPopup();
});
