/**
 * JavaScript logic for HTML programmes by Vital (Vitaly Pavlovich Ulyanov)
 */

// Stored values and style variables
let storedPrimaryColour =
    localStorage.getItem('--primary-colour') ??
    getComputedStyle(document.body).getPropertyValue('--primary-colour');
let storedSecondaryColour =
    localStorage.getItem('--secondary-colour') ??
    getComputedStyle(document.body).getPropertyValue('--secondary-colour');
let storedAccentColour1 =
    localStorage.getItem('--accent1') ??
    getComputedStyle(document.body).getPropertyValue('--accent1');
let storedAccentColour2 =
    localStorage.getItem('--accent2') ??
    getComputedStyle(document.body).getPropertyValue('--accent2');

document.body.style.setProperty('--primary-colour', storedPrimaryColour);
document.body.style.setProperty('--secondary-colour', storedSecondaryColour);
document.body.style.setProperty('--accent1', storedAccentColour1);
document.body.style.setProperty('--accent2', storedAccentColour2);

/** @type {HTMLDetailsElement} */
let settings = document.getElementById('settings');

// Append settings with unified ones
let fullscreen = settings.parentElement.appendChild(
    document.createElement('button')
);
let font = settings.appendChild(document.createElement('div'));
let setDiv = settings.appendChild(document.createElement('div'));
let primDiv = setDiv.appendChild(document.createElement('div'));
let secDiv = setDiv.appendChild(document.createElement('div'));
let acc1Div = setDiv.appendChild(document.createElement('div'));
let acc2Div = setDiv.appendChild(document.createElement('div'));
let load = settings.appendChild(document.createElement('div'));
let save = settings.appendChild(document.createElement('a'));

setDiv.style.display = 'flex';
setDiv.style.flexWrap = 'wrap';

//#region Fullscreen button
const up = '&#9650;';
const down = '&#9660;';

fullscreen.id = 'fullscreenButton';
fullscreen.innerHTML = up;
fullscreen.style.fontWeight = 600;
fullscreen.style.borderWidth = 0;
fullscreen.style.opacity = '50%';
fullscreen.style.position = 'fixed';
fullscreen.style.top = '5px';
fullscreen.style.right = '5px';
fullscreen.addEventListener('click', function () {
    let page = document.documentElement;
    if (document.fullscreenElement) {
        if (document.exitFullscreen) document.exitFullscreen();
    } else {
        if (page.requestFullscreen) page.requestFullscreen();
    }
});

document.addEventListener('fullscreenchange', function () {
    if (document.fullscreenElement) fullscreen.innerHTML = down;
    else fullscreen.innerHTML = up;
});
//#endregion

//#region Font
let fontDiv = font.appendChild(document.createElement('div'));
fontDiv.style.display = 'flex';
fontDiv.style.alignItems = 'baseline';

let fontLabel = fontDiv.appendChild(document.createElement('label'));
let fontInput = fontDiv.appendChild(document.createElement('input'));

fontLabel.id = 'fontLabel';
fontLabel.htmlFor = 'fontInput';
fontLabel.className = 'preserveFont';
fontLabel.innerText = 'Шрифт';
fontLabel.style.marginRight = '2px';

fontInput.id = 'fontInput';
fontInput.type = 'text';
fontInput.placeholder = 'Введите название шрифта и нажмите Enter';
fontInput.style.width = '100%';
fontInput.addEventListener('change', function () {
    localStorage.setItem('pageFont', this.value);
    loadFont();
});
//#endregion

//#region Primary colour
primDiv.style.display = 'flex';
primDiv.style.minWidth = '50%';
primDiv.style.alignItems = 'center';

let primInput = primDiv.appendChild(document.createElement('input'));
primInput.id = 'primCol';
primInput.type = 'color';
primInput.value = storedPrimaryColour;
primInput.addEventListener('input', function () {
    colourChange('primary', this.value);
});

let primLabel = primDiv.appendChild(document.createElement('label'));
primLabel.htmlFor = primInput.id;
primLabel.innerText = 'Фоновый цвет';
primLabel.style.marginLeft = '2px';
primLabel.style.verticalAlign = 'center';
//#endregion

//#region Secondary colour
secDiv.style.display = 'flex';
secDiv.style.alignItems = 'center';

let secInput = secDiv.appendChild(document.createElement('input'));
secInput.id = 'secCol';
secInput.type = 'color';
secInput.value = storedSecondaryColour;
secInput.addEventListener('input', function () {
    colourChange('secondary', this.value);
});

let secLabel = secDiv.appendChild(document.createElement('label'));
secLabel.htmlFor = secInput.id;
secLabel.innerText = 'Цвет текста';
secLabel.style.marginLeft = '2px';
secLabel.style.verticalAlign = 'center';
//#endregion

//#region Accent colour 1
acc1Div.style.display = 'flex';
acc1Div.style.minWidth = '50%';
acc1Div.style.alignItems = 'center';

let acc1Input = acc1Div.appendChild(document.createElement('input'));
acc1Input.id = 'acc1Col';
acc1Input.type = 'color';
acc1Input.value = storedAccentColour1;
acc1Input.addEventListener('input', function () {
    colourChange('accent1', this.value);
});

let acc1Label = acc1Div.appendChild(document.createElement('label'));
acc1Label.htmlFor = acc1Input.id;
acc1Label.innerText = 'Контрастный цвет 1';
acc1Label.style.marginLeft = '2px';
acc1Label.style.verticalAlign = 'center';
//#endregion

//#region Accent colour 2
acc2Div.style.display = 'flex';
acc2Div.style.alignItems = 'center';

let acc2Input = acc2Div.appendChild(document.createElement('input'));
acc2Input.id = 'acc2Col';
acc2Input.type = 'color';
acc2Input.value = storedAccentColour2;
acc2Input.addEventListener('input', function () {
    colourChange('accent2', this.value);
});

let acc2Label = acc2Div.appendChild(document.createElement('label'));
acc2Label.htmlFor = acc2Input.id;
acc2Label.innerText = 'Контрастный цвет 2';
acc2Label.style.marginLeft = '2px';
acc2Label.style.verticalAlign = 'center';
//#endregion

//#region Load button
load.className = 'box';
load.style.display = 'flex';
load.style.flexWrap = 'wrap';
load.style.alignItems = 'center';
load.style.justifyContent = 'space-between';

let loadLabel = load.appendChild(document.createElement('label'));
loadLabel.htmlFor = 'loadColoursButton';
loadLabel.innerHTML = '&#128193; Загрузить цвета';
loadLabel.style.flexGrow = 1;
loadLabel.style.cursor = 'pointer';

let loadInput = load.appendChild(document.createElement('input'));
loadInput.id = 'loadColoursButton';
loadInput.type = 'file';
loadInput.accept = '.json';
loadInput.style.cursor = 'pointer';
loadInput.addEventListener('change', loadColours);
//#endregion

//#region Save button
save.id = 'saveColoursButton';
save.href = '';
save.download = 'ColourScheme.json';
save.className = 'box';
save.innerHTML = '&#128190; Сохранить цвета';
save.style.textDecoration = 'none';
save.addEventListener('click', saveColours);
//#endregion

function colourChange(colourType, colour) {
    switch (colourType) {
        case 'primary':
            document.body.style.setProperty('--primary-colour', colour);
            localStorage.setItem('--primary-colour', colour);
            break;
        case 'secondary':
            document.body.style.setProperty('--secondary-colour', colour);
            localStorage.setItem('--secondary-colour', colour);
            break;
        case 'accent1':
            document.body.style.setProperty('--accent1', colour);
            localStorage.setItem('--accent1', colour);
            break;
        case 'accent2':
            document.body.style.setProperty('--accent2', colour);
            localStorage.setItem('--accent2', colour);
            break;
        default:
            break;
    }
}

/**
 * @typedef {Object} ColourScheme
 * @property {string} primary
 * @property {string} secondary
 * @property {string} accent1
 * @property {string} accent2
 */

function saveColours() {
    /** @type {ColourScheme}  */
    let colours = {
        primary: document.body.style.getPropertyValue('--primary-colour'),
        secondary: document.body.style.getPropertyValue('--secondary-colour'),
        accent1: document.body.style.getPropertyValue('--accent1'),
        accent2: document.body.style.getPropertyValue('--accent2'),
    };
    let data = encodeURIComponent(JSON.stringify(colours, undefined, 2));
    saveColoursButton.href = `data:text/plain;charset=utf-8,${data}`;
}

async function loadColours() {
    await loadColoursButton.files[0].text().then((content) => {
        try {
            /** @type {ColourScheme} */
            let data = JSON.parse(content);
            if (data) {
                if (data.primary) {
                    colourChange('primary', data.primary);
                    primInput.value = data.primary;
                }
                if (data.secondary) {
                    colourChange('secondary', data.secondary);
                    secInput.value = data.secondary;
                }
                if (data.accent1) {
                    colourChange('accent1', data.accent1);
                    acc1Input.value = data.accent1;
                }
                if (data.accent2) {
                    colourChange('accent2', data.accent2);
                    acc2Input.value = data.accent2;
                }
            }
        } catch (error) {
            alert(
                `Ошибка при чтении файла цветов: ${error}`
            );
        }
    });
}

function loadFont() {
    let font = localStorage.getItem('pageFont');
    document.getElementById('fontInput').value = font;
    document.body.querySelectorAll('*').forEach((e) => {
        if (!e.className.includes('preserveFont')) e.style.fontFamily = font;
    });
}

loadFont();
