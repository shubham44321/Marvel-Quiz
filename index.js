const readlineSync = require("readline-sync");
const chalk = require("chalk");
const red = chalk.hex("#e62429");
const yellow = chalk.hex("#FFD700");
const optionsColor = chalk.hex("#64B9E0");
const questionsColor = chalk.hex("#0082A8");
const blue = chalk.blue;
const green = chalk.hex("#A2CD48");
const warning = chalk.hex("#FF8B00");
const lavendar = chalk.hex("#C4A8FF");

function toExit(question) {
  var isUserReady = readlineSync.question(question);
  if (isUserReady.toUpperCase() === "N") {
    clear();
    process.exit();
  } else if (isUserReady.toUpperCase() === "Y") {
    return true;
  } else {
    console.log(warning("please select a valid option "));
    toExit(question);
  }
}

console.log(red("Welcome to the Marvel quiz!"));
var username = readlineSync.question(questionsColor(`What's your name? `));
toExit(questionsColor(`${username} are you ready to begin this quiz? [y/n] `));

var score = 0;
var level = 0;
var highScores = [
  {
    name: "Shubham",
    score: 10,
  },
  {
    name: "Rohit",
    score: 9,
  },
  {
    name: "John",
    score: 8,
  },
];

function printScore() {
  console.log(green(`Your score is ${score}.`));
}

function validateQuestionAndAnswer(question) {
  var userAnswer = readlineSync
    .question(
      `${questionsColor(question.question)}
  ${question.hasOwnProperty("a") ? `${optionsColor(`a.${question.a}`)}` : ``}
  ${question.hasOwnProperty("b") ? `${optionsColor(`b.${question.b}`)}` : ``}
  ${question.hasOwnProperty("c") ? `${optionsColor(`c.${question.c}`)}` : ``}
  ${question.hasOwnProperty("d") ? `${optionsColor(`d.${question.d}`)}` : ``}
${lavendar(`Your answer`)} `
    )
    .toLowerCase();
  if (userAnswer.trim().length == 0) {
    console.log(warning(`Please enter an option`));
    validateQuestionAndAnswer(question);
  } else {
    if (userAnswer.trim().toUpperCase() == "E") {
      clear();
      process.exit();
    }
    if (question.hasOwnProperty(userAnswer.trim())) {
      if (
        question[userAnswer.trim()].toUpperCase() ===
        question.answer.toUpperCase()
      ) {
        score++;
        if (score == 3 || score == 5 || score == 7 || score == 10) {
          level++;
          console.log(green(`Level up: Level ${level}`));
        }
      }
    } else {
      console.log(
        warning("Invalid option selected,please select correct option")
      );
      validateQuestionAndAnswer(question);
    }
  }
}

var questions = [
  {
    question:
      "1. What year was the first Iron Man movie released, kicking off the Marvel Cinematic Universe?",
    a: "2005",
    b: "2008",
    c: "2010",
    d: "2012",
    answer: "2008",
  },
  {
    question: "2.What is the name of Thor’s hammer?",
    a: "Vanir",
    b: "Mjolnir",
    c: "Aesir",
    d: "Norn",
    answer: "Mjolnir",
  },
  {
    question:
      "3.In the Incredible Hulk, what does Tony tell Thaddeus Ross at the end of the film?",
    a: "That he wants to study The Hulk",
    b: "That he knows about S.H.I.E.L.D.",
    c: "That they are putting a team together",
    d: "That Thaddeus owes him money",
    answer: "That they are putting a team together",
  },
  {
    question: "4.What is Captain America’s shield made of?",
    a: "Adamantium",
    b: "Vibranium",
    c: "Promethium",
    d: "Carbonadium",
    answer: "Vibranium",
  },
  {
    question:
      "5. The Flerkens are a race of extremely dangerous aliens that resembles what?",
    a: "Cats",
    b: "Ducks",
    c: "Reptiles",
    d: "Raccoons",
    answer: "Cats",
  },
  {
    question:
      "6. Before becoming Vision, what is the name of Iron Man’s A.I. butler?",
    a: "H.O.M.E.R.",
    b: "J.A.R.V.I.S.",
    c: "A.L.F.R.E.D.",
    d: "M.A.R.V.I.N.",
    answer: "J.A.R.V.I.S.",
  },
  {
    question: "7. What is the real name of the Black Panther?",
    a: "T’Challa",
    b: "M’Baku",
    c: "N’Jadaka",
    d: "N’Jobu",
    answer: `T’Challa`,
  },
  {
    question:
      "8.What is the alien race Loki sends to invade Earth in The Avengers?",
    a: "The Chitauri",
    b: "The Skrulls",
    c: "The Kree",
    d: "The Flerkens",
    answer: "The Chitauri",
  },
  {
    question:
      "9. Who was the last holder of the Space Stone before Thanos claims it for his Infinity Gauntlet?",
    a: "Thor",
    b: "Loki",
    c: "The Collector",
    d: "Tony Stark",
    answer: "Loki",
  },
  {
    question: "10. What fake name does Natasha use when she first meets Tony?",
    a: "Natalie Rushman",
    b: "Natalia Romanoff",
    c: "Nicole Rohan",
    d: "Naya Rabe",
    answer: "Natalie Rushman",
  },
];

function clear() {
  process.stdout.write("\u001B[2J\u001B[0;0f");
}

console.log(blue("Press e to exit any time of the quiz."));
console.log(lavendar("=".repeat(25)));
function play() {
  questions.forEach((question) => {
    validateQuestionAndAnswer(question);
  });

  var isHighScoreBeaten = false;

  function checkForHighScore(score) {
    let result = false;
    var highestScored = highScores.sort((a, b) => b.score - a.score)[0].score;
    if (score >= highestScored) {
      return true;
    }
  }

  function addToLeaderBoard(score) {
    let result = false;
    highScores.map((highScore) => {
      if (score >= highScore.score) {
        result = true;
      }
    });
    return result;
  }
  function checkLevel() {
    if (level == 1 || level == 0) {
      return warning(`Better luck next time.`);
    }
    if (level == 2) {
      return warning(`You can do better.`);
    }
    if (level == 3) {
      return green(`Nice try.`);
    }
    if (level == 4) {
      return green(`Good knowledge about MCU.`);
    }
  }
  clear();
  printScore();
  console.log(green(`You reached till level ${level}, ${checkLevel()} `));
  isHighScoreBeaten = checkForHighScore(parseInt(score));
  if (isHighScoreBeaten) {
    console.log(green(`Congratulations,You have beat the high score.`));
  }

  madeItToLeaderBoard = addToLeaderBoard(parseInt(score));
  if (madeItToLeaderBoard) {
    console.log(green(`Congratulations,You have made it to the leaderboard.`));
    var addToHighScore = {
      name: username,
      score: score,
    };
    highScores = [...highScores, addToHighScore];
    highScores.sort((a, b) => b.score - a.score);
    console.table(highScores);
  }
  if (
    toExit(
      questionsColor(`${username} do yo want to play this quiz again ? [y/n] `)
    )
  ) {
    highScores.splice(
      highScores.findIndex(
        (highScore) =>
          highScore.name === username &&
          parseInt(highScore.score) === parseInt(score)
      ),
      1
    );
    level = 0;
    score = 0;
    clear();
    play();
  } else {
    clear();
    process.exit();
  }
}
play();
