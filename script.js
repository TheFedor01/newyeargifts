const startButton = document.getElementById('startGacha');
const gachaScreen = document.getElementById('gachaScreen');
const menu = document.getElementById('menu');
const resultScreen = document.getElementById('resultScreen');
const itemImage = document.getElementById('itemImage');
const backButton = document.getElementById('backButton');
const gachaMusic = document.getElementById('gachaMusic');
const menuMusic = document.getElementById('menuMusic');

// Items
const itemsB = ['BItem1.png', 'BItem2.png', 'BItem3.png', 'BItem4.png', 'BItem5.png'];
const itemsA = ['AItem1.png', 'AItem2.png', 'AItem3.png', 'AItem4.png', 'AItem5.png'];
const itemsS = ['SItem1.png', 'SItem2.png', 'SItem3.png', 'SItem4.png'];

let pulls = 0;

function getRandomItem() {
    pulls++;
    if (pulls % 90 === 0) return getItemS();
    if (pulls % 10 === 0) return getItemA();

    const roll = Math.random() * 100;
    if (roll < 0.2) return getItemS();
    if (roll < 1.4) return getItemA();
    return getItemB();
}

function getItemB() {
    gachaMusic.src = 'gacha.mp3';
    return itemsB[Math.floor(Math.random() * itemsB.length)];
}

function getItemA() {
    gachaMusic.src = 'gacha.mp3';
    return itemsA[Math.floor(Math.random() * itemsA.length)];
}

function getItemS() {
    gachaMusic.src = 'gachaS.mp3';
    return itemsS[Math.floor(Math.random() * itemsS.length)];
}

startButton.addEventListener('click', () => {
    menu.classList.add('hidden');
    gachaScreen.classList.remove('hidden');
    const animationScreen = document.getElementById('animationScreen');

    setTimeout(() => {
        animationScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
        const item = getRandomItem();
        itemImage.src = item;
        gachaMusic.play();
    }, 7000);
});

backButton.addEventListener('click', () => {
    resultScreen.classList.add('hidden');
    gachaScreen.classList.add('hidden');
    menu.classList.remove('hidden');
    menuMusic.play();
});
