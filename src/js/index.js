const MARKED_PETS = [];
const PET_OPTIONS = document.querySelectorAll('.pet-option');
const BELOVED_PETS = {
    cat: false,
    dog: false,
};

const popupClickListener = () => {
    MARKED_PETS.forEach(el => el.addEventListener('click', e => {
        const selectedPet = Object.keys(BELOVED_PETS).find(key => BELOVED_PETS[key] === true);

        e.preventDefault();
        e.stopPropagation();

        preparePopupToOpen(selectedPet);
    }));
};

PET_OPTIONS.forEach((el) => el.addEventListener('change', () => {
    BELOVED_PETS[el.value] = el.checked;
    searchPet();
}));

const searchPet = () => {
    let context = window.document.querySelector('body');
    let instance = new Mark(context);

    if ((BELOVED_PETS.cat && BELOVED_PETS.dog) || (!BELOVED_PETS.cat && !BELOVED_PETS.dog)) {
        instance.unmark();
        return;
    }

    const pet = Object.keys(BELOVED_PETS).find(key => BELOVED_PETS[key] === true);

    instance.mark(pet);

    MARKED_PETS.push(...document.querySelectorAll('mark'));
    popupClickListener();
}

const preparePopupToOpen = pet => {
    const reqUrl = pet === 'cat'
        ? 'https://api.thecatapi.com/v1/images/search'
        : 'https://dog.ceo/api/breeds/image/random';

    fetch(reqUrl)
        .then((response) => response.json())
        .then(response => {
            const imgUrl = pet === 'cat' ? response[0].url : response.message;
            if (!imgUrl) {
                return;
            }
            createPopup(pet, imgUrl);
        })
}

const destroyPopup = () => {
    const popupClose = document.querySelector('.popup__close');

    popupClose.addEventListener('click', () => {
        popupClose.closest('.popup').remove();
    })
}

const createPopup = (pet, petImg) => {
    const div = document.createElement('div');

    div.className = 'popup';
    div.innerHTML = `
            <div class="popup__header">
                <p><strong>Look!</strong> It’s a ${pet}!</p>
                <a href="#" class="popup__close">
                    <img src="./assets/close.svg" alt="close">
                </a>
            </div>
        `
    div.style.backgroundImage = `url("${petImg}")`

    document.querySelector('.meowoof').appendChild(div);

    destroyPopup();
}
