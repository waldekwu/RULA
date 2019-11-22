const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const titleElement = document.getElementById('title');
const answerButtonsElement = document.getElementById('answer-buttons');
const answerBoxesElement = document.getElementById('checkbox');
const optionalQuestionElement = document.getElementById('optional-question');

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
			showOptionalQuestion(questions[currentQuestionIndex]);
		}, delayInMilliseconds);
	}
}

function setNextQuestion() {
	startBtn.classList.add('hide');
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
		button.classList.add('btn','quiz-zone');
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
		answerBoxesElement.addEventListener('click' , selectCheckbox);
		//appends button to the 'answer-buttons' element
		answerButtonsElement.appendChild(button);

	})
	setRadioId();

}

function showOptionalQuestion(optionalQuestion) {

	if (optionalQuestion.optionalAnswers) {

	optionalQuestionElement.innerText = optionalQuestion.optional;

	optionalQuestion.optionalAnswers.forEach(optionalAnswer => {

		const checkboxDiv = document.createElement('div');
		checkboxDiv.classList.add('custom-control', 'custom-checkbox');
		answerBoxesElement.appendChild(checkboxDiv);
		checkboxDiv.innerHTML = optionalAnswer.field;
	})
} else {
	optionalQuestionElement.innerText = "";
}

}




function resetState() {
	nextBtn.classList.add('hide');
	document.getElementById('optional-fields').classList.add('hide');
	document.getElementById('question-container').classList.add('hide');
	//answerBoxesElement.classList.add('hide');

	while (answerButtonsElement.firstChild) {
		answerButtonsElement.removeChild(answerButtonsElement.firstChild);
	}
	while (answerBoxesElement.firstChild) {
		answerBoxesElement.removeChild(answerBoxesElement.firstChild);

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

		document.getElementById('optional-fields').classList.add('animated', 'fadeIn');

		console.log(currentQuestionIndex.length)
		console.log(currentQuestionIndex)
		if (currentQuestionIndex >= 2) {
		//end of questions
		nextBtn.classList.add('hide');
	} else {
		nextBtn.classList.remove('hide'); }
		document.getElementById('optional-fields').classList.remove('hide');
		nextBtn.classList.add('animated', 'fadeIn');

		 
	// if (currentQuestionIndex === 0) {
	// 	document.getElementById('optional-fields').classList.remove('hide');
	// }
}

}

	function selectCheckbox(event) {
	console.log(event.target.value);
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

	{ text: '<img src="./media/Q1/manikin_upperarm1.jpg" alt="manikin_upperarm" id="1" class="img" height="150px">', armsScore: 1 },
	{ text: '<img src="./media/Q1/manikin_upperarm2.jpg" alt="manikin_upperarm" id="2" class="img" height="150">', armsScore: 2 },
	{ text: '<img src="./media/Q1/manikin_upperarm3.jpg" alt="manikin_upperarm" id="3" class="img" height="150">', armsScore: 2 },
	{ text: '<img src="./media/Q1/manikin_upperarm4.jpg" alt="manikin_upperarm" id="4" class="img" height="150">', armsScore: 3 },
	{ text: '<img src="./media/Q1/manikin_upperarm5.jpg" alt="manikin_upperarm" id="5" class="img" height="150">', armsScore: 4 },

	],
	optional: 'Also tick the following boxes if appropriate:',
	optionalAnswers: [

	{ field: '<input type="checkbox" class="custom-control-input" id="customCheck1" value="1"><label class="custom-control-label" for="customCheck1">Shoulder is raised.</label>'},
	{ field: '<input type="checkbox" class="custom-control-input" id="customCheck2" value="1"><label class="custom-control-label" for="customCheck2">Upper Arm is abducted (away from the side of the body).</label>'},
	{ field: '<input type="checkbox" class="custom-control-input" id="customCheck3" value="-1"><label class="custom-control-label" for="customCheck3">Leaning or supporting the weight of the arm.</label>'},
	

	]
	
},

{
	title: 'Complete Assessment of Left & Right Sides',
	question: '2. Locate Lower Arm Position:',
	answers: [

	{ text: '<img src="./media/Q2/manikin_lowerarm1.jpg" alt="manikin lowerarm 60 to 100 degrees" id="1" class="img" height="150px">', armsScore: 2 },
	{ text: '<img src="./media/Q2/manikin_lowerarm2.jpg" alt="manikin lowerarm 0 to 60 degrees" id="2" class="img" height="150px">', armsScore: 2 },
	{ text: '<img src="./media/Q2/manikin_lowerarm3.jpg" alt="manikin lowerarm 100 degrees or more" id="3" class="img" height="150px">', armsScore: 3 },

	],
		optional: "Also tick the following box if appropriate:",
		optionalAnswers: [

	{ field: '<input type="checkbox" class="custom-control-input" id="customCheck1" value="12"><label class="custom-control-label" for="customCheck1"><img src="./media/Q2/manikin_lowerarm4.jpg" alt="lowerarm midline or out to side" id="3" class="img" height="150px">Is either arm working across midline or out to side of body?</label>'},

	

	]
},

{
	title: 'Complete Assessment of Left & Right Sides',
	question: '3. Locate Wrist Position:',
	answers: [

	{ text: '<img src="./media/Q3/manikin_wrist1.jpg" alt="wrist 0 degrees" id="1" class="img">', armsScore: 2 },
	{ text: '<img src="./media/Q3/manikin_wrist2.jpg" alt="wrist 15 down to 15 up degrees" id="2" class="img">', armsScore: 2 },
	{ text: '<img src="./media/Q3/manikin_wrist3.jpg" alt="wrist 15 degrees down" id="3" class="img">', armsScore: 2 },
	{ text: '<img src="./media/Q3/manikin_wrist4.jpg" alt="wrist 15 degrees up" id="4" class="img">', armsScore: 2 },

	],

optional: "Also tick the following box if appropriate:",
		optionalAnswers: [

	{ field: '<input type="checkbox" class="custom-control-input" id="customCheck1" value="12"><label class="custom-control-label" for="customCheck1"><img src="./media/Q3/manikin_wrist5.jpg" alt="lowerarm midline or out to side" id="5" class="img" height="150px">Is wrist bent away from midline?</label>'},

	]

}

]

// 	let setArmsScore = questions[0].answers[1]['armsScore'];