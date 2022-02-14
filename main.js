const header = document.getElementById("main-head");
const resetButton = document.getElementById("btn-reset");
const tryagain = document.getElementById("try-again");
const rgbElement = document.getElementById("rgb");
const easyButton = document.getElementById("btn-easy");
const hardButton = document.getElementById("btn-hard");
const Canvas = document.getElementById("canvas");

const opts = [];

for(let i = 1; i <= 6; i++) // creating button instances for pallete
{
    opts.push(document.getElementById(`opt-${i}`));
}

const topLeftx = document.documentElement.clientWidth/2.5;
const topLefty = 20;
const boxSize = 100;
const space = 120;
let right;

const new_rgb = () => {
    let nrgb = [];
    for(let i = 0; i < 3; i++){
        nrgb.push(Math.floor(Math.random()*1000)%256)
    }
    return nrgb;
}

function normalise(colour) // when called, makes everything the colour
{
    let count;
    
    header.style.backgroundColor = `rgb(${colour[0]},${colour[1]},${colour[2]})`;

    if(umode === 'easy')
    {
        count = 3;
    } else if (umode === 'hard') {
        count = 6;
    }
    for(let i = 0; i < count; i++)
    {
        opts[i].style.backgroundColor = `rgb(${colour[0]},${colour[1]},${colour[2]})`;
    }
}

function buildPallete(mode, correctRGB)
{
    if(mode === 'easy')
    {
        right = (Math.floor(Math.random()*100))%3;
        for(let i = 0; i < 3; i++)
        {
            if(i === right)
            {
                opts[i].style.backgroundColor = `rgb(${correctRGB[0]}, ${correctRGB[1]}, ${correctRGB[2]})`;
            } else {
                let nrgb = new_rgb();
                opts[i].style.backgroundColor = `rgb(${nrgb[0]}, ${nrgb[1]}, ${nrgb[2]})`;
            }
        }
        for(let i = 3; i < 6; i++)
        {
            opts[i].style.backgroundColor = 'transparent';
        }
    } else if (mode === 'hard') {
        right = (Math.floor(Math.random()*100))%6;
        for(let i = 0; i < 6; i++)
        {
            if(i === right)
            {
                opts[i].style.backgroundColor = `rgb(${correctRGB[0]}, ${correctRGB[1]}, ${correctRGB[2]})`;
            } else {
                let nrgb = new_rgb();
                opts[i].style.backgroundColor = `rgb(${nrgb[0]}, ${nrgb[1]}, ${nrgb[2]})`;
            }
        }                                                       
    }
}

for(let i = 1; i <= 3; i++)
{
    const but = document.getElementById(`opt-${i}`);
    but.style.left = `${topLeftx + (i-2) * (space) - 2}px`;
    but.style.height = `${boxSize + 4}px`;
    but.style.width = `${boxSize + 4}px`;
}
for(let i = 1; i <= 3; i++)
{
    const but = document.getElementById(`opt-${i+3}`);
    but.style.left = `${topLeftx + (i-2) * (space) - 2}px`;
    but.style.height = `${boxSize + 4}px`;
    but.style.width = `${boxSize + 4}px`;
}

let RGBC = new_rgb(); // init target
let umode = 'easy';
easyButton.style.backgroundColor = 'white';
easyButton.style.color = 'black';

rgbElement.innerHTML = `rgb(${RGBC[0]},${RGBC[1]},${RGBC[2]})`;

// init

buildPallete(umode,RGBC);

// Reset

resetButton.addEventListener("click", () => {
    RGBC = new_rgb();

    rgbElement.innerHTML = `rgb(${RGBC[0]},${RGBC[1]},${RGBC[2]})`;
    
    buildPallete(umode,RGBC);

    tryagain.innerHTML = '';

    header.style.backgroundColor = 'rgb(31, 94, 94)'; // reset banner

    resetButton.innerHTML = 'Reset Colours';

})


// choose game mode

easyButton.addEventListener("click", () => {
    umode = 'easy';
    easyButton.style.backgroundColor = 'white'; // highlighting game mode
    easyButton.style.color = 'black';
    hardButton.style.backgroundColor = 'transparent';
    hardButton.style.color = 'antiquewhite';
    resetButton.click()
})

hardButton.addEventListener("click", () => {
    umode = 'hard';
    hardButton.style.backgroundColor = 'white'; // highlighting game mode
    hardButton.style.color = 'black';
    easyButton.style.backgroundColor = 'transparent';
    easyButton.style.color = 'antiquewhite';
    resetButton.click()
})

for(let i = 0; i < 6; i++) // final checking logic
{
    opts[i].addEventListener("click", () => {
        if(i === right){
            tryagain.innerHTML = 'Correct!';
            normalise(RGBC);
            resetButton.innerHTML = 'Play again!';
        } else if (resetButton.innerHTML === 'Play again!') {
            ;
        } else {
            opts[i].style.backgroundColor = 'white';
            tryagain.innerHTML = 'Try again';
        }
    })
}