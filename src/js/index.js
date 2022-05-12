setTimeout(() => {
    const MARKED_PETS = [];
    const APP_OPTIONS = document.querySelectorAll('.app-option');
    const PET_OPTIONS = document.querySelectorAll('.pet-option');
    const BELOVED_PETS = {
        cat: false,
        dog: false,
    };
    const APP_SETTINGS = {
        extEn: false,
        pageEn: false,
    }
    const context = window.document.querySelector('body');
    const instance = new Mark(context);

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

    APP_OPTIONS.forEach((el) => el.addEventListener('change', () => {
        APP_SETTINGS[el.value] = el.checked;
        replacePet();
    }));

    const searchPet = () => {
        const isAllSelected = Object.values(BELOVED_PETS).filter(value => value === false).length === 0;
        const isNoneSelected = Object.values(BELOVED_PETS).filter(value => value === true).length === 0;

        if (isAllSelected || isNoneSelected) {
            instance.unmark();
            return;
        }

        const pet = Object.keys(BELOVED_PETS).find(key => BELOVED_PETS[key] === true);

        instance.mark(pet);

        MARKED_PETS.push(...document.querySelectorAll('mark'));
        popupClickListener();
    }

    const replacePet = () => {
        const isAllEnabled = Object.values(APP_SETTINGS).filter(value => value === false).length === 0;
        const isAllSelected = Object.values(BELOVED_PETS).filter(value => value === false).length === 0;
        const isNoneSelected = Object.values(BELOVED_PETS).filter(value => value === true).length === 0;
        const pet = Object.keys(BELOVED_PETS).find(key => BELOVED_PETS[key] === true);

        searchPet();

        if(isAllEnabled && !isAllSelected && !isNoneSelected) {
            MARKED_PETS.forEach(el => el.innerHTML = pet === 'cat' ? 'dog' : 'cat');
            instance.unmark();
        }
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
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.4823 12.1263L8.4823 8.12631L4.4823 12.1263" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M4.48242 4.12646L8.48242 8.12647L12.4824 4.12646" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
            </div>
            <img src="${petImg}" alt="${pet}">
        `
        document.querySelector('.meowoof').appendChild(div);

        destroyPopup();
    }
}, 10)

const meowoofLayout = document.createElement("div");
meowoofLayout.className = 'meowoof';
meowoofLayout.innerHTML = `
    <div class="meowoof__header">
        <img src="https://oshi.at/QPnM/wNKa.png" alt="">
        Meo<strong>woof</strong>
    </div>

    <div class="meowoof__settings">
        <div class="ui-checkbox meowoof__settings-item">
            <input id="extEn" value="extEn" class="ui-checkbox__input app-option" type="checkbox">
            <label for="extEn" class="ui-checkbox__label">Enable the <strong>extension</strong></label>
        </div>
        <div class="ui-checkbox meowoof__settings-item">
            <input id="pageEn" value="pageEn" class="ui-checkbox__input app-option" type="checkbox">
            <label for="pageEn" class="ui-checkbox__label">Enable on <strong>stackowerflow.com</strong></label>
        </div>
    </div>

    <div class="meowoof-selector">
        <div class="meowoof-selector__desc">
            Select the pets you like most — or <span>all of them!</span>
        </div>
        <div class="meowoof-selector__switcher">
            <div class="ui-checkbox meowoof-selector__switcher-item">
                <input id="cat" class="ui-checkbox__input pet-option" type="checkbox" value="cat">
                <label for="cat" class="ui-checkbox__label">I love cats</label>
            </div>
            <div class="ui-checkbox meowoof-selector__switcher-item">
                <input id="dog" class="ui-checkbox__input pet-option" type="checkbox" value="dog">
                <label for="dog" class="ui-checkbox__label">I love dogs</label>
            </div>
        </div>
    </div>
`

my_div = document.querySelector("body");
document.body.appendChild(meowoofLayout);
