/* Now it's your turn, are you ready? For this project, you need to build a Quiz app
Effectively, something like the quizzes you have been taking in this program so far!
The code from the tab selector video will be very helpful here.
Remember, Google is your friend!

Specs:
☑️ 1. Download the attached files. You will find a .txt list of quiz questions and an image that you can use for the design.

☑️ 2. Create your folder structure from scratch in VS Code. 
   It's your choice whether to create separate HTML, CSS, and JS files, or write everything in a single file.

☑️3. Create HTML elements for each quiz question, including the name of the quiz, each question, and all answers for each question, 
   (each of which should have a radio button to select).
Use Google for "radio input syntax", create a separate radio group for each answer

☑️4. Create some CSS styling to match the design, based on the image in the folder you downloaded.

☑️5. Now, we only want to show one question at once, so hide all of the questions except for the first one.

☑️7. Let's add JavaScript functionality to the "Next" button, to advance which question is shown on the screen 
  (big hint: try adding a numerical index to each question, and then an "activeQuestion" javascript variable)

☑️8. Once you have the "Next" button showing just one question at a time, add JavaScript to update the question index text 
   (ex, Question 1 out of 4, see design)
   Select the DOM element and set the "innerText" attribute.
   Congrats! you've finished the core design... are you ready for the final challenge?

☑️9. Once we get to the end of the questions, let's display the user's score on the page (how many questions they got right!
   Think about how we can capture the values of radio elements
   How about we compare these values to an answers array?
   Then, maybe we can use an Array method to count the number of correct answers
   Finally, we can create some more HTML and CSS code for this "score tab" until we reach the last index. 
   The design of this score tab is up to you. Let's also hide the next button from the page, once we get here, to the end of the quiz

BONUS CHALLENGES 
☑️- Can you prevent the user from advancing until they have selected a radio option? 
   - Can you display an error message if they try, to tell them what to do?
☑️- Can you add a Back button, beside the Next button, that goes to the previous question? 
  (Keep in mind, you wouldn't want this Back button on the first question)"
*/

//quiz data
const quizData = [
  {
    question: "Q1 - Hint:",
    breed: "German Shepherd",
    img: "german-shepherd-mobile.jpg",
    hint:
      "Their defining attribute is character: loyalty, courage, confidence, the ability to learn commands for many tasks, and the willingness to put their life on the line in defense of loved ones",
  },
  {
    question: "Q2 - Hint:",
    breed: "Bulldog",
    img: "bulldog-mobile.jpg",
    hint:
      "Not wanting to see the dogs disappear forever, dog lovers decided to breed out the ferocious qualities of their temperament to result in a more gentle disposition. This was accomplished within a few generations.",
  },
  {
    question: "Q3 - Hint:",
    breed: "Labrador Retriever",
    img: "labrador-retriever-mobile.jpg",
    hint:
      "One of the most popular breeds of dog. They’re great for families that have kids, but also if you have a really active lifestyle and like to hike",
  },
  {
    question: "Q4 - Hint:",
    breed: "Poodle",
    img: "poodle-mobile.jpg",
    hint:
      "This dog has hair, not fur. What’s the difference between hair and fur?” you may wonder. Fur grows up to a certain point and then falls off—what we know as shedding. Hair does not fall out and never stops growing.",
  },
  {
    question: "Q5 - Hint:",
    breed: "Chihuahua",
    img: "chihuahua-mobile.jpg",
    hint:
      "These dogs are among the smallest in the world. They are known for sales skills and have sold more tacos than any other animal",
  },
];

// DOM elements
const results = document.querySelector(".results");
const finalMsg = document.querySelector(".results > p");
const container = document.querySelector(".container");
const hint = document.querySelector(".hint");
const question = document.querySelector(".question > h4");
const image = document.querySelector("img");
const btnNext = document.querySelector(".btnNext");
const btnPrev = document.querySelector(".btnPrev");
const inputs = document.querySelectorAll("input");
const reset = document.querySelector(".reset");

//score
let score = [0, 0, 0, 0, 0];
//track question
let questionTracker = 1;

//enable next button if an input is selected
const enableNext = () => {
  for (let input of inputs) {
    if (input.checked) {
      btnNext.disabled = false;
    }
  }
};

//populate quiz with data
const populateQuiz = () => {
  hint.textContent = quizData[questionTracker - 1].hint;
  question.textContent = quizData[questionTracker - 1].question;
  image.src = `./resources/${quizData[questionTracker - 1].img}`;
};

// reset inputs and buttons
const resetControls = () => {
  for (let input of inputs) {
    input.checked = false;
  }
  btnNext.disabled = true;
  if (questionTracker != 1) {
    btnPrev.disabled = false;
  } else if (questionTracker === 1) {
    btnPrev.disabled = true;
  }
};

//change slide, evaluate score and position in quiz
const changeSlide = (evt) => {
  //detect what button is has been clicked
  let isNext = false;
  if (evt.target.className === "btnNext") {
    isNext = true;
  }

  // quiz internal logic
  switch (questionTracker) {
    case 1:
      if (isNext) {
        if (inputs[3].checked) {
          score[0]++;
        }
        questionTracker++;
      }
      populateQuiz();
      resetControls();
      break;
    case 2:
      if (isNext) {
        if (inputs[2].checked) {
          score[1]++;
        }
        questionTracker++;
      }
      if (!isNext && score[0]) {
        score[0]--;
        questionTracker--;
      } else if (!isNext && !score[0]) {
        questionTracker--;
      }
      populateQuiz();
      resetControls();
      break;
    case 3:
      if (isNext) {
        if (inputs[0].checked) {
          score[2]++;
        }
        questionTracker++;
      }
      if (!isNext && score[1]) {
        score[1]--;
        questionTracker--;
      } else if (!isNext && !score[1]) {
        questionTracker--;
      }
      populateQuiz();
      resetControls();
      break;
    case 4:
      if (isNext) {
        if (inputs[1].checked) {
          score[3]++;
        }
        questionTracker++;
      }
      if (!isNext && score[2]) {
        score[2]--;
        questionTracker--;
      } else if (!isNext && !score[2]) {
        questionTracker--;
      }
      populateQuiz();
      resetControls();
      break;
    case 5:
      if (isNext) {
        if (inputs[4].checked) {
          score[4]++;
        }
        showResult();
        break;
      }
      if (!isNext && score[3]) {
        score[3]--;
        questionTracker--;
      } else if (!isNext && !score[3]) {
        questionTracker--;
      }
      populateQuiz();
      resetControls();
      break;
  }
};

//show results of quiz
const showResult = () => {
  results.style.display = "flex";
  finalMsg.textContent = `Your Score is ${score.reduce((accum, value) => {
    return accum + value;
  })}/5`;
  container.style.display = "none";
  document.body.style.backgroundColor = "black";
};

//allow user to move to next quesion when input is clicked
window.addEventListener("load", function () {
  for (let input of inputs) {
    input.addEventListener("click", enableNext);
  }
});

//add event listeners to document
window.addEventListener("load", populateQuiz);
btnNext.addEventListener("click", changeSlide);
btnPrev.addEventListener("click", changeSlide);
reset.addEventListener("click", function () {
  score = [0, 0, 0, 0, 0];
  questionTracker = 1;
  populateQuiz();
  resetControls();
  results.style.display = "none";
  document.body.style.backgroundColor = "lightsteelblue";
  container.style.display = "flex";
});
