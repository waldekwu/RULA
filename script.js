const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const titleElement = document.getElementById('title');
const answerButtonsElement = document.getElementById('answer-buttons');
const answerBoxesElement = document.getElementById('checkbox');


let currentQuestionIndex;
let checkId = 0;
let total = 0;
let selectedAreaScore = 0;
// let totalArmsScore = 0;
// let allArmsScores = [];

startBtn.addEventListener('click', startQuiz);

nextBtn.addEventListener('click', () => {
	currentQuestionIndex++;
	setNextQuestion();
	changeCard();

})

function startQuiz() {
	setNextQuestion();
	changeCard();
	currentQuestionIndex = 0;
	let armsScore = 0;

}
//animate
const card =  document.querySelector('.card');
card.classList.add('animated', 'fadeInLeft');

function changeCard() {

	const card =  document.querySelector('.card');
	var delayInMilliseconds = 500;
	card.classList.remove('fadeInLeft');
	card.classList.add('animated', 'fadeOutRight');
	resetState();
//if fadeOutRight animation is still there, do this
if ($('.fadeOutRight')[0]) {
		//delay all actions
		setTimeout(function() {
			//remove animation
			card.classList.remove('fadeOutRight');
			//ad new animation
			card.classList.add('animated','fadeInLeft');

			startBtn.classList.add('hide');
			// nextBtn.classList.remove('hide');
			questionContainerElement.classList.remove('hide');
			showQuestion(questions[currentQuestionIndex]);
		}, delayInMilliseconds);
	}
}

function setNextQuestion() {
	
	resetState();
	if (currentQuestionIndex >= 0) {
		console.log(total += selectedAreaScore);
	}

	//showQuestion(currentQuestionIndex);
}
//generates questions using questions array
function showQuestion(question) {

	//sets the question
	titleElement.innerText = question.title;
	questionElement.innerText = question.question;
	question.answers.forEach(answer => {

		const button = document.createElement('span');
		button.classList.add('btn', 'quiz-zone');
		button.setAttribute("id", answer.armsScore);
		button.setAttribute("id", answer.armsScore);

		let input = document.createElement('input');
		input.type = "radio";
		input.name = "radio";
		input.className = "radio"; // set the CSS class
		input.setAttribute("value", answer.armsScore); 
		button.appendChild(input);

		let label = document.createElement('label');
		label.setAttribute("for", "radioImg");
		label.classList.add('radioImg', 'img');
		label.setAttribute("value", answer.armsScore); //if changed, radios will stop working
		button.appendChild(label);
		label.innerHTML = answer.text;

		button.addEventListener('click' , selectAnswer);
		//appends button to the 'answer-buttons' element
		answerButtonsElement.appendChild(button);

	})
	setRadioId();
}

function resetState() {
	nextBtn.classList.add('hide');
	answerBoxesElement.classList.add('hide');

	while (answerButtonsElement.firstChild) {
		answerButtonsElement.removeChild(answerButtonsElement.firstChild);
	}
}

function selectAnswer(elem) {
	selectedAreaScore = parseInt(elem.target.value);

	if (isNaN(selectedAreaScore) === true) {
		selectedAreaScore = 0;
	}
	console.log(selectedAreaScore);

	// const radioValue = document.getElementById(('radio')+score).value;
	// let radioValue = document.getElementById(('radio')+checkId).value;
	// console.log(radioValue);
	// console.log(checkId);
	// if (document.getElementById(('radio')+checkId).value === checkId) {
			 // for (var i = 0; i < document.getElementById('answer-buttons').childNodes.length; i++) {
			 // 	document.getElementById('radio'+[i+1]).setAttribute('checked', false);
			 // }

			//  for (var i = document.getElementById('answer-buttons').childNodes.length - 1; i >= 0; i--) {
			//  	document.getElementById('radio'+[i+1]).setAttribute('checked', false);
			//  }

			// // console.log(document.getElementById('radio'+checkId));

			//  document.getElementById('radio'+checkId).setAttribute('checked', true);
			// } 
	//probably useless code?
	// const correct = selectedButton.dataset.correct;
	//set body status class
	// setStatusClass(document.body)
	if (isNaN(selectedAreaScore) === false && selectedAreaScore != 0) {

		answerBoxesElement.classList.add('animated', 'fadeIn');
		nextBtn.classList.remove('hide');
		nextBtn.classList.add('animated', 'fadeIn');

		if (currentQuestionIndex.length < currentQuestionIndex) {
		//end of questions
		nextBtn.classList.add('hide');
	} 
	if (currentQuestionIndex === 0) {
		answerBoxesElement.classList.remove('hide');
	}
}
}

function setRadioId() {
	let inputClass = document.getElementsByClassName('radio');
	let labelFor = document.getElementsByClassName('radioImg');
	for (var i = 0; i < document.getElementById('answer-buttons').childNodes.length; i++) {
		inputClass[i].setAttribute("id", "radio"+[i+1]);
		labelFor[i].setAttribute("for", "radio"+[i+1]);
	}	
}

const questions = [
{
	title: 'Complete Assessment of Left & Right Sides',
	question: '1. Locate Upper Arm Position:',
	answers: [

	{ text: document.getElementsByClassName("radioImg").innerHTML='<img src="./media/Q1/manikin_upperarm1.jpg" alt="manikin_upperarm" id="1" class="img" height="150px">', armsScore: 1 },
	{ text: document.getElementsByClassName("radioImg").innerHTML='<img src="./media/Q1/manikin_upperarm2.jpg" alt="manikin_upperarm" id="2" class="img" height="150">', armsScore: 2 },
	{ text: document.getElementsByClassName("radioImg").innerHTML='<img src="./media/Q1/manikin_upperarm3.jpg" alt="manikin_upperarm" id="3" class="img" height="150">', armsScore: 2 },
	{ text: document.getElementsByClassName("radioImg").innerHTML='<img src="./media/Q1/manikin_upperarm4.jpg" alt="manikin_upperarm" id="4" class="img" height="150">', armsScore: 3 },
	{ text: document.getElementsByClassName("radioImg").innerHTML='<img src="./media/Q1/manikin_upperarm5.jpg" alt="manikin_upperarm" id="5" class="img" height="150">', armsScore: 4 },

	]
},

{
	title: 'Complete Assessment of Left & Right Sides',
	question: '2. Locate Lower Arm Position:',
	answers: [

	{ text: document.getElementsByClassName("btn").innerHTML='<p class="questionTxt" id="1">60 to 100 degrees</p>', armsScore: 1 },
	{ text: document.getElementsByClassName("btn").innerHTML='<p class="questionTxt" id="2">0 to 60 degrees</p>', armsScore: 2 },
	{ text: document.getElementsByClassName("btn").innerHTML='<p class="questionTxt" id="3">100 degrees or more</p>', armsScore: 3 },

	]
},

{
	title: 'Full Upper Body Assessment',
	question: 'Locate Wrist Position:',
	answers: [

	{ text: '<p class="questionTxt">0 degrees</p>', armsScore: 10 },
	{ text: '<p class="questionTxt">-15 to 15 degrees</p>', armsScore: 20 },
	{ text: '<p class="questionTxt">15 degrees or more</p>', armsScore: 20 },
	{ text: '<p class="questionTxt">-15 degrees or more</p>', armsScore: 30 },

	]
}

]

// 	let setArmsScore = questions[0].answers[1]['armsScore'];