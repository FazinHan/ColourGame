const header = document.getElementById("main-head");
const resetButton = document.getElementById("btn-reset");
const tryagain = document.getElementById("try-again");
const rgbElement = document.getElementById("rgb");
const easyButton = document.getElementById("btn-easy");
const mediumButton = document.getElementById("btn-medium");
const hardButton = document.getElementById("btn-hard");
const legendButton = document.getElementById("btn-legend");
const Canvas = document.getElementById("canvas");

const MAX_TILES = 9;

const opts = [];

for(let i = 1; i <= MAX_TILES; i++) // creating button instances for pallete
{
    opts.push(document.getElementById(`opt-${i}`));
}

const topLeftx = document.documentElement.clientWidth/2.5;
const topLefty = 20;
const boxSize = 100;
const space = 116;// - 4;
let right;

const new_rgb = () => {
    let nrgb = [];
    for(let i = 0; i < 3; i++){
        nrgb.push(Math.floor(Math.random()*1000)%256)
    }
    return nrgb;
}

let umode = 'easy';

function game_mode_easy()
{
    umode = 'easy';
    easyButton.style.backgroundColor = 'white'; // highlighting game mode
    easyButton.style.color = 'black';
    hardButton.style.backgroundColor = 'transparent';
    hardButton.style.color = 'antiquewhite';
    mediumButton.style.backgroundColor = 'transparent';
    mediumButton.style.color = 'antiquewhite';
    legendButton.style.backgroundColor = 'transparent';
    legendButton.style.color = 'antiquewhite';
    resetButton.click()
}

function game_mode_hard()
{
    umode = 'hard';
    hardButton.style.backgroundColor = 'white'; // highlighting game mode
    hardButton.style.color = 'black';
    easyButton.style.backgroundColor = 'transparent';
    easyButton.style.color = 'antiquewhite';
    mediumButton.style.backgroundColor = 'transparent';
    mediumButton.style.color = 'antiquewhite';
    legendButton.style.backgroundColor = 'transparent';
    legendButton.style.color = 'antiquewhite';
    resetButton.click()
}

function game_mode_medium()
{
    umode = 'medium';
    hardButton.style.backgroundColor = 'transparent'; // highlighting game mode
    hardButton.style.color = 'antiquewhite';
    easyButton.style.backgroundColor = 'transparent';
    easyButton.style.color = 'antiquewhite';
    mediumButton.style.backgroundColor = 'white';
    mediumButton.style.color = 'black';
    legendButton.style.backgroundColor = 'transparent';
    legendButton.style.color = 'antiquewhite';
    resetButton.click()
}

function game_mode_legend()
{
    umode = 'legend';
    hardButton.style.backgroundColor = 'transparent'; // highlighting game mode
    hardButton.style.color = 'antiquewhite';
    easyButton.style.backgroundColor = 'transparent';
    easyButton.style.color = 'antiquewhite';
    mediumButton.style.backgroundColor = 'transparent';
    mediumButton.style.color = 'antiquewhite';
    legendButton.style.backgroundColor = 'white';
    legendButton.style.color = 'black';
    resetButton.click()
}

function normalise(colour, mode) // when called, makes everything the colour
{
    let count;
    
    header.style.backgroundColor = `rgb(${colour[0]},${colour[1]},${colour[2]})`;

    if(mode === 'easy')// || mode === 'legend')
    {
        count = 3;
    } else if (mode === 'hard' || mode === 'medium') {
        count = 6;
    } else if (mode === 'legend') {
        count = 9;
    }
    for(let i = 0; i < count; i++)
    {
        opts[i].style.backgroundColor = `rgb(${colour[0]},${colour[1]},${colour[2]})`;
    }
}

function buildPallete(mode, correctRGB)
{
    if(mode === 'easy' || mode === 'legend')
    {
        let num = 3;
        if(mode === 'legend')
        {
            num = 9;
        }
        right = (Math.floor(Math.random()*100))%num;
        for(let i = 0; i < num; i++)
        {
            if(i === right)
            {
                opts[i].style.backgroundColor = `rgb(${correctRGB[0]}, ${correctRGB[1]}, ${correctRGB[2]})`;
            } else {
                let nrgb = new_rgb();
                if(mode === 'legend'){
                    const common = Math.floor(Math.random()*10)%3;
                    for(let i = 0; i < 3; i++)
                    {
                        if(i === common)
                        {
                            nrgb[i] = correctRGB[i];
                        }
                    }
                }
                opts[i].style.backgroundColor = `rgb(${nrgb[0]}, ${nrgb[1]}, ${nrgb[2]})`;
            }
        }
        if(mode !== 'legend'){
            for(let i = 3; i < MAX_TILES; i++)
            {
                opts[i].style.backgroundColor = 'transparent';
            }
        }
    } else if (mode === 'hard' || mode === 'medium') {
        right = (Math.floor(Math.random()*100))%6;
        for(let i = 0; i < 6; i++)
        {
            if(i === right)
            {
                opts[i].style.backgroundColor = `rgb(${correctRGB[0]}, ${correctRGB[1]}, ${correctRGB[2]})`;
            } else {
                let nrgb = new_rgb();
                if(mode === 'medium'){
                    const common = Math.floor(Math.random()*10)%3;
                    for(let i = 0; i < 3; i++)
                    {
                        if(i === common)
                        {
                            nrgb[i] = correctRGB[i];
                        }
                    }
                }
                opts[i].style.backgroundColor = `rgb(${nrgb[0]}, ${nrgb[1]}, ${nrgb[2]})`;
            }
        }
        for(let i = 6; i < MAX_TILES; i++)
        {
            opts[i].style.backgroundColor = 'transparent';
        }                                              
    }
}

for(let i = 0; i < 3; i++)
{
    const but = opts[i];
    but.style.left = `${topLeftx + (i - 1 + .5) * (space) - 2}px`;
    but.style.height = `${boxSize + 4}px`;
    but.style.width = `${boxSize + 4}px`;
}
for(let i = 3; i < 6; i++)
{
    const but = opts[i];
    but.style.left = `${topLeftx + (i - 4 + .5) * (space) - 2}px`;
    but.style.height = `${boxSize + 4}px`;
    but.style.width = `${boxSize + 4}px`;
}
for(let i = 6; i < 9; i++)
{
    const but = opts[i];
    but.style.left = `${topLeftx + (i - 7 + .5) * (space) - 2}px`;
    but.style.height = `${boxSize + 4}px`;
    but.style.width = `${boxSize + 4}px`;
}

let RGBC = new_rgb(); // init target
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
    game_mode_easy();
})

mediumButton.addEventListener("click", () => {
    game_mode_medium();
})

hardButton.addEventListener("click", () => {
    game_mode_hard();
})

legendButton.addEventListener("click", () => {
    game_mode_legend();
})

for(let i = 0; i < MAX_TILES; i++) // final checking logic
{
    opts[i].addEventListener("click", () => {
        if( (umode === 'easy' && i < 3) || ((umode === 'hard' || umode === 'medium' ) && i < 6) || umode === 'legend' ){
            if(i === right){
                tryagain.innerHTML = 'Correct!';
                normalise(RGBC, umode);
                resetButton.innerHTML = 'Play again!';
            } else if (resetButton.innerHTML === 'Play again!') {
                ;
            } else {
                opts[i].style.backgroundColor = 'transparent';
                tryagain.innerHTML = 'Try again';
            }
        }
    })
}