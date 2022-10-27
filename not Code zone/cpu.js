const boxes = document.querySelectorAll(".inner-style");
const resetButton = document.querySelector(".reset-button");
const switchXo = document.getElementById("switch");
const counterX = document.getElementById("counter-x");
const counterTies = document.getElementById("counter-ties");
const counterO = document.getElementById("counter-o");
const pickX = document.getElementById("x-picker");
const pickO = document.getElementById("o-picker");
const newGameMulti = document.getElementById("new-game-player");
const newGameCpu = document.getElementById("new-game-cpu");
const firstPage = document.getElementById("first-page");
const mainPlay = document.getElementById("main-play");
const whichOneWon = document.getElementById("which-one-won");
const mainContainer = document.getElementsByClassName("main-container");
const nextRound = document.getElementsByClassName("next-round");
const quit = document.getElementsByClassName("quit");
const generalChangeWhoWon = document.getElementById("general-change-who-won");
const ohNo = document.getElementById("oh-no");

let boxesArray = Array.from(boxes);

// console.log(boxesArray);

let mainBoard;
let oPlayer = "0";
let xPlayer = "X";
let xCounter = 0;
let oCounter = 0;
let tiesCounter = 0;
let plus = 0;
let winX = false;
let winO = false;

let makeEverything;
let makeEverythingCpu;

/*
export function doSo(){
    console.log("hello");
}
*/

/* პირვლი გვერდის JS ნაწილი */

pickX.addEventListener("click", function () {
  pickX.style.backgroundColor = "#A8BFC9";
  pickX.style.color = "#1A2A33";
  pickO.style.backgroundColor = "#1A2A33";
  pickO.style.color = "#A8BFC9";
});

pickO.addEventListener("click", function () {
  pickX.style.backgroundColor = "#1A2A33";
  pickX.style.color = "#A8BFC9";
  pickO.style.backgroundColor = "#A8BFC9";
  pickO.style.color = "#1A2A33";
});

newGameMulti.addEventListener("click", function () {
  firstPage.style.display = "none";
  mainPlay.style.display = "initial";
  mainContainer[0].style.pointerEvents = "auto";
});

newGameCpu.addEventListener("click", function () {
  firstPage.style.display = "none";
  mainPlay.style.display = "initial";
  for (let i = 0; i < boxesArray.length; i++) {
    // let box = boxesArray[i].getAttribute("id");

    boxesArray[i].removeEventListener("click", makeEverything);
    boxesArray[i].addEventListener("click", makeEverythingCpu);
  }
});

/* როდესა მომხმარებელი next-round ს დააწვება */

nextRound[0].addEventListener("click", function () {
  whichOneWon.style.display = "none";
  mainContainer[0].style.pointerEvents = "auto";

  /* იგივე რაღაცას ჩვება, რასაც reset Btn- ს შემთხვევაში შვებოდა*/
  boxesArray.forEach((item) => {
    item.innerHTML = " ";
    item.classList.remove("winner-style");
    item.classList.remove("winner-style-second");

    for (let i = 0; i < 3; i++) {
      for (let k = 0; k < 3; k++) {
        mainBoard[i][k] = " ";
      }
    }
  });

  currentPlayer = oPlayer;
  switchXo.innerText = "X";
  console.log(mainBoard);
  plus = 0;

  ohNo.innerText = "OH NO, YOU LOST…";
  generalChangeWhoWon.innerHTML = "X TAKES THE ROUND";
  generalChangeWhoWon.style.color = "#31C3BD";
  winX = false;
  winO = false;
});

/* როდესა მომხმარებელი quit ს დააწვება */

quit[0].addEventListener("click", function () {
  whichOneWon.style.display = "none";
  mainPlay.style.display = "none";
  firstPage.style.display = "initial";

  /* იგივე რაღაცას ჩვება, რასაც reset Btn- ს შემთხვევაში შვებოდა*/

  boxesArray.forEach((item) => {
    item.innerHTML = " ";
    item.classList.remove("winner-style");

    for (let i = 0; i < 3; i++) {
      for (let k = 0; k < 3; k++) {
        mainBoard[i][k] = " ";
      }
    }
  });

  currentPlayer = oPlayer;
  switchXo.innerText = "X";
  console.log(mainBoard);

  xCounter = 0;
  oCounter = 0;
  tiesCounter = 0;
  plus = 0;
  counterTies.innerText = tiesCounter;
  winX = false;
  winO = false;
});

/* პირვლი გვერდის JS ნაწილი */

let currentPlayer = oPlayer;

let gameFinished = false;

mainBoard = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "]
];

makeEverything = (event) => {
  // console.log(boxesArray[i]);

  if (currentPlayer == 0) {
    event.target.innerText = "X";
    currentPlayer = "X";
    event.target.style.color = "#31C3BD";
    switchXo.innerText = "O";
  } else {
    event.target.innerText = "0";
    currentPlayer = "0";
    event.target.style.color = "#F2B137";
    switchXo.innerText = "X";
  }

  /* with this code, we getting attribute in order to
  save that for future array which is created above, named --> board */

  let eachId = event.target.getAttribute("id");
  // console.log(eachId);

  /* split just getting apart id initials away
  for exmaple id="1-2" id.split("-") --> [1, 2] and create array */

  let coordinates = eachId.split("-");
  // console.log(coordinates);

  let firstCoord = parseInt(coordinates[0]); // gives coordinates' arrays first element
  let secondCoord = parseInt(coordinates[1]); // gives coordinates' arrays second element

  /* ახლა იდეაშ ჩვენი მთავარი მიზანია როდესაც ელემენტი და ბოარდი
  დავუკავშიროთ ერთმანეთს ამისთვის კი კოორდინატების მიხედვით
  X და Y -ს ჩავწერ ბორდში. მაგ თუ 0-1 გვაქვს, მაშინ პირველი ხაზის
  მორე წევრი იქნება ბოარდში ეს ელემენტი.
  */

  /* ამ ფორმულით კი უკვე ჩავანაცვლებთ array -ში იმ
  X და Y, რომლიც მოთამაშე იქნება */

  mainBoard[firstCoord][secondCoord] = currentPlayer;

  console.log(mainBoard);

  /* ყოველი ჩაწერის მერე კი გვინდა შევამოწმოთ გაიმარჯვა თუ
  არა რომელიმე მათგანმა. ანისთვის შევქმნათ ფუნქცია */
};

for (let i = 0; i < boxesArray.length; i++) {
  // let box = boxesArray[i].getAttribute("id");

  boxesArray[i].addEventListener("click", makeEverything);
}

for (let i = 0; i < boxesArray.length; i++) {
  boxesArray[i].addEventListener("click", detectWinner);
}

function detectWinner() {
  for (let i = 0; i < 3; i++) {
    if (
      mainBoard[i][0] == mainBoard[i][1] &&
      mainBoard[i][1] == mainBoard[i][2] &&
      mainBoard[i][0] != " "
    ) {
      boxesArray.forEach((item) => {
        /*  შეცვლა უნდა ამას */
        if (item.innerText == currentPlayer) {
          item.classList.add("winner-style");
        }
      });

      if (currentPlayer == "X") {
        xCounter++;
        counterX.innerText = xCounter;
        whichOneWon.style.display = "initial";
        mainContainer[0].style.pointerEvents = "none";
        generalChangeWhoWon.innerHTML = "X TAKES THE ROUND";
        generalChangeWhoWon.style.color = "#31C3BD";
        winX = true;
      } else {
        oCounter++;
        counterO.innerText = oCounter;
        whichOneWon.style.display = "initial";
        mainContainer[0].style.pointerEvents = "none";
        generalChangeWhoWon.innerHTML = "O TAKES THE ROUND";
        generalChangeWhoWon.style.color = "#F2B137";
        winO = true;
      }
    } else if (
      mainBoard[0][i] == mainBoard[1][i] &&
      mainBoard[1][i] == mainBoard[2][i] &&
      mainBoard[0][i] != " "
    ) {
      boxesArray.forEach((item) => {
        if (item.innerText == currentPlayer) {
          item.classList.add("winner-style");
        }
      });

      if (currentPlayer == "X") {
        xCounter++;
        counterX.innerText = xCounter;
        whichOneWon.style.display = "initial";
        mainContainer[0].style.pointerEvents = "none";
        generalChangeWhoWon.innerHTML = "X TAKES THE ROUND";
        generalChangeWhoWon.style.color = "#31C3BD";
        winX = true;
      } else {
        oCounter++;
        counterO.innerText = oCounter;
        whichOneWon.style.display = "initial";
        mainContainer[0].style.pointerEvents = "none";
        generalChangeWhoWon.innerHTML = "O TAKES THE ROUND";
        generalChangeWhoWon.style.color = "#F2B137";
        winO = true;
      }
    }
  }

  if (
    mainBoard[0][0] == mainBoard[1][1] &&
    mainBoard[1][1] == mainBoard[2][2] &&
    mainBoard[0][0] != " "
  ) {
    boxesArray.forEach((item) => {
      if (item.innerText == currentPlayer) {
        item.classList.add("winner-style");
      }
    });

    if (currentPlayer == "X") {
      xCounter++;
      counterX.innerText = xCounter;
      whichOneWon.style.display = "initial";
      mainContainer[0].style.pointerEvents = "none";
      generalChangeWhoWon.innerHTML = "X TAKES THE ROUND";
      generalChangeWhoWon.style.color = "#31C3BD";
      winX = true;
    } else {
      oCounter++;
      counterO.innerText = oCounter;
      whichOneWon.style.display = "initial";
      mainContainer[0].style.pointerEvents = "none";
      generalChangeWhoWon.innerHTML = "O TAKES THE ROUND";
      generalChangeWhoWon.style.color = "#F2B137";
      winO = true;
    }
  } else if (
    mainBoard[2][0] == mainBoard[1][1] &&
    mainBoard[1][1] == mainBoard[0][2] &&
    mainBoard[2][0] != " "
  ) {
    boxesArray.forEach((item) => {
      if (item.innerText == currentPlayer) {
        item.classList.add("winner-style");
      }
    });

    if (currentPlayer == "X") {
      xCounter++;
      counterX.innerText = xCounter;
      whichOneWon.style.display = "initial";
      mainContainer[0].style.pointerEvents = "none";
      generalChangeWhoWon.innerHTML = "X TAKES THE ROUND";
      generalChangeWhoWon.style.color = "#31C3BD";
      winX = true;
    } else {
      oCounter++;
      counterO.innerText = oCounter;
      whichOneWon.style.display = "initial";
      mainContainer[0].style.pointerEvents = "none";
      generalChangeWhoWon.innerHTML = "O TAKES THE ROUND";
      generalChangeWhoWon.style.color = "#F2B137";
      winO = true;
    }
  }

  /* მოკლედ ამაში როდესაც შედის ყოველ დაჭერაზე ამოწმებს
    რამდენზეა Plus ცვლადი ასული, ხოდა როგორც კი ავა 45(ამ ციფრზე 
        ასვლისას ხვდება რომ ყველა შეივსო), მაშინ გამოაქვს გათანაბრების 
        გვერდი */

  for (let i = 0; i < 3; i++) {
    for (let m = 0; m < 3; m++) {
      if (mainBoard[i][m] == "X" || mainBoard[i][m] == "0") {
        plus = plus + 1;
        if (plus == 45 && winX == false && winO == false) {
          whichOneWon.style.display = "initial";
          generalChangeWhoWon.innerHTML = "ROUND TIED";
          ohNo.innerText = " ";
          generalChangeWhoWon.style.color = "#A8BFC9";
          tiesCounter++;
          counterTies.innerText = tiesCounter;
        }
      }
    }
  }
}

resetButton.addEventListener("click", resetGame);

function resetGame() {
  boxesArray.forEach((item) => {
    item.innerHTML = "";
    item.classList.remove("winner-style");
    item.classList.remove("winner-style-second");

    for (let i = 0; i < 3; i++) {
      for (let k = 0; k < 3; k++) {
        mainBoard[i][k] = " ";
      }
    }
  });

  currentPlayer = oPlayer;
  switchXo.innerText = "X";
  console.log(mainBoard);

  xCounter = 0;
  oCounter = 0;
  tiesCounter = 0;
  plus = 0;

  counterTies.innerText = tiesCounter;
  counterO.innerText = oCounter;
  counterX.innerText = xCounter;

  winX = false;
  winO = false;

  randomArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
}

// CPU LOGIC

/* როდესაც მოგების ლოგიკას ხსნის, იმ შემთხვევაში შედის, როდესაც 
მოგების მომენტი მოხდება, თუმცაღა მანდ მნიშვნელოვანია გავიაზროთ, რომ მთელი
ლოგიკა მოგებისა აწყობილია currentPlayer ცვლადზე, შესაბამისად, აუცილებელია მისი
ცვლა როდესაც მოხდება რენდომის მიერ ჩასმა. 
ამასთან ყოველი რანდომის მერე დაგვჭირდება აუცილებლად detectWinner ის გამოძახება*/

let aiPlayer;
let randomNumberZeroNine;
let randomArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let randomNew;

// arr.splice(i, 1);

//randomArray.splice()

for (var i = 0; i < 9; i++) {
  boxesArray[i].value = i;
}

if (currentPlayer == "X") {
  aiPlayer = "0";
} else {
  aiPlayer = "X";
}

makeEverythingCpu = (event) => {
  if (currentPlayer == "0") {
    currentPlayer = "X";
    event.target.innerText = currentPlayer;

    randomArray.splice(randomArray.indexOf(event.target.value), 1);
    console.log(randomArray);

    let eachId = event.target.getAttribute("id");
    let coordinates = eachId.split("-");
    let firstCoord = parseInt(coordinates[0]); // gives coordinates' arrays first element
    let secondCoord = parseInt(coordinates[1]); // gives coordinates' arrays second element
    mainBoard[firstCoord][secondCoord] = currentPlayer;
    console.log(mainBoard);
    detectWinner();

    if (winX == true || winO == true) {
      return; // ამით იდეაში ვეუბნებით რომ winX უკვე გამართლდა შესაბამისად
      // ამ კოდის გაგრძელებას აზრი არ აქვს და აქამდე მოცემული შედეგი დაგვიბრუნოს
      // ეს დამჭირდა, ვინაიდან currentPlayer-ს რენდომი სულ თავისთან მიყავდა და
      // შესაბამისად რენდომზე თამაშისას X -ის მოგების ინსტრუქცია არ ვარდებოდა
      // ამის მერე გასწორდა
    }
    //  რენდომის მხარის გაკეთება

    randomNew = randomArray[Math.floor(Math.random() * randomArray.length)];
    // დაარენდომებს რანდომ ერეიდან უკვე არსებული ელემენტების მიხედვით
    randomArray.splice(randomArray.indexOf(randomNew), 1);
    // ეს კიდევ იმ დარენდომებულს როგორც მაღლა ვქენით, ევენთის შემთხვევაში
    // ამოჭრის რენდომ ერეიდან

    currentPlayer = "0";
    // randomNumberZeroNine = Math.floor(Math.random() * 9);
    /*
      while(boxesArray[randomNumberZeroNine].innerHTML != ""){
        randomNumberZeroNine = Math.floor(Math.random() * 9); // Returns a random integer from 0 to 8
        // ამას გასწორება უნდა ბოლოს ვაილ ციკლში შედის ხოლმე და იჭედება
        // გვინდა საშულება, რომლითაც შევძლებთ 
      }
      */

    boxesArray[randomNew].innerHTML = currentPlayer;
    event.target.style.color = "#31C3BD"; // blue
    boxesArray[randomNew].style.color = "#F2B137"; //golden
    let eachIdRandom = boxesArray[randomNew].getAttribute("id");
    let coordinatesCpu = eachIdRandom.split("-");
    let firstCoordCpu = parseInt(coordinatesCpu[0]); // gives coordinates' arrays first element
    let secondCoordCpu = parseInt(coordinatesCpu[1]); // gives coordinates' arrays second element
    mainBoard[firstCoordCpu][secondCoordCpu] = currentPlayer;
    console.log(mainBoard);
    detectWinner();
  } else {
    randomNumberZeroNine = Math.floor(Math.random() * 10); // Returns a random integer from 0 to 9
    boxesArray[randomNumberZeroNine].innerHTML = "X";
    event.target.innerText = "0";
    event.target.style.color = "#F2B137"; //golden
    boxesArray[randomNumberZeroNine].style.color = "#31C3BD"; //blue
  }

  /*with this code, we getting attribute in order to
  save that for future array which is created above, named --> board */

  // console.log(eachId);
  // console.log(eachIdRandom);

  /* split just getting apart id initials away
  for exmaple id="1-2" id.split("-") --> [1, 2] and create array */

  // console.log(coordinates);

  /* ახლა იდეაშ ჩვენი მთავარი მიზანია როდესაც ელემენტი და ბოარდი
  დავუკავშიროთ ერთმანეთს ამისთვის კი კოორდინატების მიხედვით
  X და Y -ს ჩავწერ ბორდში. მაგ თუ 0-1 გვაქვს, მაშინ პირველი ხაზის
  მორე წევრი იქნება ბოარდში ეს ელემენტი.
  */

  /* ამ ფორმულით კი უკვე ჩავანაცვლებთ array -ში იმ
  X და Y, რომლიც მოთამაშე იქნება */
};


