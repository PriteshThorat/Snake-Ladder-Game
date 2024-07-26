const board = document.getElementById("board");
const output = document.getElementById("output");
const diceBtn = document.getElementById("dice-button");
const chance = document.getElementById("chance");
const aiPlay = document.getElementById("ai-play");
const player2Play = document.getElementById("player2-play");
const player3Play = document.getElementById("player3-play");
const player4Play = document.getElementById("player4-play");
const playGotiDiv = document.getElementById("play-goti-div");

let isAtOne = true;
let count = 0;
let isAI = false;
let limit;
let win = false;
let currentPosition = [1, 1, 1, 1];
let clearGotiArr = {
  ai: [],
  user2: [],
  user3: [],
  user4: []
};


const img = {
  snakes: [
    "https://i.imgur.com/7T4OhUP.png",
    "https://i.imgur.com/jd9Yyzb.png",
    "https://i.imgur.com/MpnLWfh.png",
    "https://i.imgur.com/d2smbyU.png",
    "https://i.imgur.com/F5RGO5f.png",
    "https://i.imgur.com/wnJ6o8q.png",
    "https://i.imgur.com/KkNf83g.png"
  ],
  ladders: [
    "https://i.imgur.com/QG3D6GN.png",
    "https://i.imgur.com/tcsPFxg.png",
    "https://i.imgur.com/KuvTnPc.png",
    "https://i.imgur.com/pACpfOj.png",
    "https://i.imgur.com/8AH9osG.png",
    /*"https://i.imgur.com/bkFi8sY.png",
    "https://i.imgur.com/QUQYRzQ.png",
    "https://i.imgur.com/V4NsWHb.png",
    "https://i.imgur.com/wpyMjJE.png",
    "https://i.imgur.com/qFNmH1X.png",
    "https://i.imgur.com/XIpkvf1.png"*/
  ],
  dice: [
    "https://i.imgur.com/dEFZ7QJ.png",
    "https://i.imgur.com/D6mHQqM.png",
    "https://i.imgur.com/KP90EHT.png",
    "https://i.imgur.com/jE71XKK.png",
    "https://i.imgur.com/iZFe5T7.png",
    "https://i.imgur.com/ZwBT23j.png"
  ],
  gotiSrc: [
    "https://i.imgur.com/M78bYNR.png",
    "https://i.imgur.com/nkleeOi.png",
    "https://i.imgur.com/OpeB2RM.png",
    "https://i.imgur.com/1TLAx2w.png"
  ]
};

const snakeObj = {
  inSnake: [21, 30, 39, 76, 89, 92, 99],
  outSnake: [2, 9, 19, 37, 48, 47, 59]
};
const ladderObj = {
  inLadder: [3, 14, 16, 56, 78],
  outLadder: [58, 32, 25, 95, 97]
};

const boardNo = () => {
    let number = 100;
    let boardColor = 0;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement("div");
        cell.className = `color-${boardColor} cells`;
      if (i % 2 === 0) {
        cell.textContent = number - j;
        cell.id = `${number - j}`
      } else {
        cell.textContent = number - (10 - 1 - j);
        cell.id = `${number - (10 - 1 - j)}`
      }
      board.appendChild(cell);
      boardColor = 1 - boardColor;
      }
      boardColor = 1 - boardColor;
      number -= 10;
  }
};

const boardArray = () => {
  boardNo();
  snakesFn();
  ladderFn();
  defaultDice();
  flagPosition();
  defaultPosition(0);
};

const tryFn = (limit) => {
  if (limit === 0) {
    isAI = true;
  }
};

const flagPosition = () => {
  const flagImg = document.getElementById("100");
  flagImg.innerHTML = `
  <img class="goti-img" src="https://i.imgur.com/3bIFcKs.png">
  `;
};

const snakesFn = () => {
  const { snakes } = img;
  snakes.forEach((element, index) => {
    board.innerHTML += `
    <img class="img" id="snake-${index}" src="${element}">
    `;
  });
};

const ladderFn = () => {
  const { ladders } = img;
  ladders.forEach((element, index) => {
    board.innerHTML += `
    <img class="img" id="ladder-${index}" src="${element}">
    `;
  });
};

const defaultPosition = (index) => {
  const { gotiSrc } = img;
  console.log(gotiSrc[index]);
  const gotiImg = document.getElementById("1");
  gotiImg.innerHTML = `
  <img class="goti-img" src="${gotiSrc[index]}">
  `;
}

const defaultDice = () => {
  diceBtn.innerHTML = `
  <img class="default-dice" src="https://i.imgur.com/j0WJPVJ.png">
  `;
};

const diceFn = (index) => {
  const diceNo = Math.ceil(Math.random() * 6);
  if (diceNo <= 100 - currentPosition[index]) {
    clearCurrImg(currentPosition[index]);
    currentPosition[index] += diceNo;
  } 
  
  console.log(`Dice: ${diceNo}`);
  diceImgFn(diceNo);
  const { inSnake } = snakeObj;
  const { inLadder } = ladderObj;
  const cellArray = document.querySelectorAll(".cells");
  cellArray.forEach((element) => {
    if (currentPosition[index] === parseInt(element.id)) {
      
      
      const { ai, user2, user3, user4 } = clearGotiArr;
      if (index === 0) {
        clearGotiImg(ai);
      } else if (index === 1) {
        clearGotiImg(user2);
      } else if (index === 2) {
        clearGotiImg(user3);
      } else if (index === 3) {
        clearGotiImg(user4);
      }
      
      console.log(`Position: ${currentPosition[index]}`);

      if (inSnake.includes(currentPosition[index])) {
    const indexOfPos = inSnake.indexOf(currentPosition[index]);
    snake(indexOfPos, index);
  } else if (inLadder.includes(currentPosition[index])) {
    const indexOfPos = inLadder.indexOf(currentPosition[index]);
    ladder(indexOfPos, index);
  } else {

    const currentGotiPosition = document.getElementById(`${parseInt(element.id)}`);
    console.log(parseInt(element.id));
    const { gotiSrc } = img;
    currentGotiPosition.innerHTML = `
    <img src="${gotiSrc[index]}" class="goti-img">
    `;
  }
    }
  });
  if ((currentPosition[0] === 100 && 
      limit !== 0) ||
      currentPosition[1] === 100 || 
      currentPosition[2] === 100 ||
      currentPosition[3] === 100) {
    //win = true;
    alert(`Congrats!, Player${index + 1} Win`);
    reset();
  } else if (currentPosition[0] === 100 && limit === 0) {
    //win = false;
    alert("Ohh!, You Lost");
    reset();
  }
};

const reset = () => {
  const mainContainer = document.querySelector(".main-container");
  const playDiv = document.querySelector(".play-div");

  mainContainer.style.display = "none";
  playDiv.style.display = "flex";

  isAtOne = true;
  count = 0;
  isAI = false;

  board.innerText = "";
  boardArray();

  clearGotiImg(clearGotiArr.ai);
  clearGotiImg(clearGotiArr.user2);
  clearGotiImg(clearGotiArr.user3);
  clearGotiImg(clearGotiArr.user4);
  currentPosition = [1, 1, 1, 1];
  defaultDice();
  defaultPosition(3);
  defaultPosition(2);
  defaultPosition(1);
  defaultPosition(0);
  const flagImg = document.getElementById("100");
  flagImg.innerHTML = `
  <img class="goti-img" src="https://i.imgur.com/3bIFcKs.png">
  `;
};

const clearCurrImg = (el) => {
  const currImg = document.getElementById(`${el}`);
  currImg.textContent = `${el}`;
  console.log(`CurrImg: ${el}`);
};

const clearGotiImg = (gotiArr) => {
  console.log(`gotiArr: ${gotiArr}`);
  for (let i = 0; i <= gotiArr.length; i++){
    if (i === 0) {
      const gotiImg = document.getElementById("1");
      gotiImg.textContent = "1";
    } else {
      const gotiImg = document.getElementById(`${gotiArr[i - 1]}`);
      gotiImg.textContent = `${gotiArr[i - 1]}`;
      console.log(`clearGoti: ${gotiArr[i - 1]}`);
    }
  }
  gotiArr.length = 0;
};

const snake = (index, tryIndex) => {
  const { outSnake } = snakeObj;
  outSnake.forEach((el, i) => {
    if (index === i) {
      currentPosition[tryIndex] = el;
      console.log(`el: ${el}`);
      const { gotiSrc } = img;
      let currentGotiPos = document.getElementById(`${el}`);
      currentGotiPos.innerHTML = `
      <img src="${gotiSrc[tryIndex]}" class="goti-img">
      `;
    }
  });
};

const ladder = (index, tryIndex) => {
  const { outLadder } = ladderObj;
  const el = outLadder[index];
  clearCurrImg(currentPosition[tryIndex]);
  currentPosition[tryIndex] = el;
  console.log(`el: ${el}`);
  const { gotiSrc } = img;
  let currentGotiPos = document.getElementById(`${el}`);
  currentGotiPos.innerHTML = `
    <img src="${gotiSrc[tryIndex]}" class="goti-img">
  `;
  return;
};

const showBoard = () => {
  const mainContainer = document.querySelector(".main-container");
  const playDiv = document.querySelector(".play-div");
  mainContainer.style.display = "none";
  playDiv.style.display = "none";
  playGotiDiv.style.display = "flex";
}

const diceImgFn = (arr) => {
  const { dice } = img;
  dice.forEach((element, index) => {
    if (arr === index + 1) {
      diceBtn.innerHTML = `
  <img class="default-dice" src="${element}">
  `;
    }
  });
};

const playerGotiFn = () => {
  if (limit !== 0) {
    for (let i = 0; i <= limit; i++) {
    playGotiDiv.innerHTML += `
    <div>
      <img class="goti-img" src="${img.gotiSrc[i]}">
      <span>Player ${i + 1}</span>
    </div>
  `;
  }
  } else {
    playGotiDiv.innerHTML = `
    <div>
      <img class="goti-img" src="${img.gotiSrc[0]}">
      <span>You</span>
    </div>
    <div>
      <img class="goti-img" src="${img.gotiSrc[1]}">
      <span>AI</span>
    </div>
  `;
  }
};

window.addEventListener('load', () => {
    boardArray();
});

aiPlay.addEventListener("click" , () => {
  limit = 0;
  console.log(`limit: ${limit}`);
  playerGotiFn();
  showBoard();
  tryFn(limit);
});

player2Play.addEventListener("click" , () => {
  limit = 1;

  playerGotiFn();
  showBoard();
  tryFn(limit);
});

player3Play.addEventListener("click" , () => {
  limit = 2;

  playerGotiFn();
  showBoard();
  tryFn(limit);
});

player4Play.addEventListener("click" , () => {
  limit = 3;

  playerGotiFn();
  showBoard();
  tryFn(limit);
});

diceBtn.addEventListener("click", () => {
  if (isAI) {
    diceFn(limit);
    chance.textContent = "AI's Try!";
    if (isAtOne) {
      isAtOne = false;
      
      defaultPosition(limit + 1);
    }
    setTimeout( function() {
      diceFn(limit + 1);
      chance.textContent = "Your Try!"
    }, 1000);
  } else {
    console.log(`count: ${count}`);
    console.log(`limit: ${limit}`);
    if (count === 0 && count < limit) {
      diceFn(count);
      count++;
      chance.textContent = "2nd Player Try!";
    } else if (count === 1 && count < limit) {
      diceFn(count);
      count++;
      chance.textContent = "3rd Player Try!";
    } else if (count === 2 && count < limit) {
      diceFn(count);
      count++;
      chance.textContent = "4th Player Try!";
    } else {
      isAtOne = false;

      diceFn(count);
      count = 0;
      chance.textContent = "1st Player Try!";
    }
  }
  if (isAtOne && limit !== 0) {
    defaultPosition(count);
  }
});

playGotiDiv.addEventListener("click", () => {
  playGotiDiv.style.display = "none";
  const mainContainer = document.querySelector(".main-container");
  mainContainer.style.display = "flex";
  if (limit === 0) {
    console.log(`limit: ${limit}`);
    chance.textContent = "Your Try!";
  } else {
    console.log(`limit: ${limit}`);
    chance.textContent = "1st Player Try!";
  }
});
