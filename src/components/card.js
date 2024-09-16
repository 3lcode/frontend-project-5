// Функция создания карточки
import { openPopup } from "./modal.js";

let cardTemplate;
let popupImageImage;
let popupImageCaption

export function setCardTemplate(card, imageImage, imageCaption) {
    cardTemplate = card;
    popupImageImage = imageImage;
    popupImageCaption = imageCaption;
}

export function createCard(title, imageLink, imagePopup) {
    const card = cardTemplate.cloneNode(true);
    
    card.querySelector(".card__title").textContent = title;
    const image = card.querySelector(".card__image");
    image.src = imageLink;
    image.alt = title;

    image.addEventListener('click', () => {
        popupImageImage.src = imageLink;
        popupImageImage.alt = title;
        popupImageCaption.textContent = title;
        openPopup(imagePopup);
    });

    const likeButton = card.querySelector(".card__like-button");
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle("card__like-button_is-active");
    });

    const cardDelete = card.querySelector(".card__delete-button");
    cardDelete.addEventListener('click', () => {
        card.remove();
    });


    return card;
}

