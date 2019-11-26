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
let radioValue = 0;
let checkboxValuesSum = 0;
let checkboxValues = [];
let armsTotal = 0;


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
	
	setScores();
	countTotals();
	resetState();
	//showQuestion(currentQuestionIndex);
}

function countTotals() {

		armsTotal += radioValue; 
		console.log(armsTotal);
	}


	function setScores() {

		if (currentQuestionIndex >= 0) {

			radioValue = parseInt(document.querySelector('input[name="radio"]:checked').value);

		//console.log(radioValue);

		$('input[name="customCheck"]:checked').each(function() {
			checkboxValues.push($(this).val());
		});

		checkboxValuesSum = 0;

		for (let i = 0; i < checkboxValues.length; i++) {

			checkboxValuesSum += parseInt(checkboxValues[i]);
		}

		//console.log(checkboxValuesSum);
	}
}
//generates questions using questions array
function showQuestion(question) {
	//sets the question

	titleElement.innerText = question.title;
	questionElement.innerHTML = question.question;
	question.answers.forEach(answer => {

		const questionDiv = document.createElement('span');
		questionDiv.setAttribute("id", answer.armsScore);

		questionDiv.addEventListener('click' , selectAnswer);
		questionDiv.innerHTML = answer.text;

		answerButtonsElement.appendChild(questionDiv);

	})

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
	// console.log(selectedAreaScore);

	if (isNaN(selectedAreaScore) === false && selectedAreaScore != 0) {

		document.getElementById('optional-fields').classList.add('animated', 'fadeIn');

		// console.log(currentQuestionIndex.length)
		// console.log(currentQuestionIndex)

		if (currentQuestionIndex >= 2) {
		//end of questions
		nextBtn.classList.add('hide');
	} else {
		nextBtn.classList.remove('hide'); }
		document.getElementById('optional-fields').classList.remove('hide');
		nextBtn.classList.add('animated', 'fadeIn');
	}

}

const questions = [
{
	title: 'Complete Assessment of Left & Right Sides',
	question: '1. Locate Upper Arm Position:',
	answers: [

	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="1" id="radio1"><label for="radio1" class="radioImg img" value="1"><img src="./media/Q1/manikin_upperarm1.jpg" alt="manikin_upperarm" id="1" class="img"></label></span>'},
	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="2" id="radio2"><label for="radio2" class="radioImg img" value="2"><img src="./media/Q1/manikin_upperarm2.jpg" alt="manikin_upperarm" id="2" class="img"></label></span>'},
	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="2" id="radio3"><label for="radio3" class="radioImg img" value="2"><img src="./media/Q1/manikin_upperarm3.jpg" alt="manikin_upperarm" id="3" class="img"></label></span>'},
	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="3" id="radio4"><label for="radio4" class="radioImg img" value="3"><img src="./media/Q1/manikin_upperarm4.jpg" alt="manikin_upperarm" id="4" class="img"></label></span>'},
	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="4" id="radio5"><label for="radio5" class="radioImg img" value="4"><img src="./media/Q1/manikin_upperarm5.jpg" alt="manikin_upperarm" id="5" class="img"></label></span>'},

	],
	optional: 'Also tick the following boxes if appropriate:',
	optionalAnswers: [

	{ field: '<input type="checkbox" class="custom-control-input" name="customCheck" id="customCheck1" value="1"><label class="custom-control-label" for="customCheck1">Shoulder is raised.</label>'},
	{ field: '<input type="checkbox" class="custom-control-input" name="customCheck" id="customCheck2" value="1"><label class="custom-control-label" for="customCheck2">Upper Arm is abducted (away from the side of the body).</label>'},
	{ field: '<input type="checkbox" class="custom-control-input" name="customCheck" id="customCheck3" value="-1"><label class="custom-control-label" for="customCheck3">Leaning or supporting the weight of the arm.</label>'},


	]

},

{
	title: 'Complete Assessment of Left & Right Sides',
	question: '2. Locate Lower Arm Position:',
	answers: [

	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="1" id="radio1"><label for="radio1" class="radioImg img" value="1"><img src="./media/Q2/manikin_lowerarm1.jpg" alt="manikin lowerarm 60 to 100 degrees" id="1" class="img" height="150px"></label></span>', armsScore: 2 },
	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="2" id="radio2"><label for="radio2" class="radioImg img" value="2"><img src="./media/Q2/manikin_lowerarm2.jpg" alt="manikin lowerarm 0 to 60 degrees" id="2" class="img" height="150px"></label></span>', armsScore: 2 },
	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="2" id="radio3"><label for="radio3" class="radioImg img" value="2"><img src="./media/Q2/manikin_lowerarm3.jpg" alt="manikin lowerarm 100 degrees or more" id="3" class="img" height="150px"></label></span>', armsScore: 3 },

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

	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="1" id="radio1"><label for="radio1" class="radioImg img" value="1"><img src="./media/Q3/manikin_wrist1.jpg" alt="wrist 0 degrees" id="1" class="img"></label></span>', armsScore: 2 },
	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="2" id="radio2"><label for="radio2" class="radioImg img" value="2"><img src="./media/Q3/manikin_wrist2.jpg" alt="wrist 15 down to 15 up degrees" id="2" class="img"></label></span>', armsScore: 2 },
	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="2" id="radio3"><label for="radio3" class="radioImg img" value="2"><img src="./media/Q3/manikin_wrist3.jpg" alt="wrist 15 degrees down" id="3" class="img"></label></span>', armsScore: 2 },
	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="3" id="radio4"><label for="radio4" class="radioImg img" value="3"><img src="./media/Q3/manikin_wrist4.jpg" alt="wrist 15 degrees up" id="4" class="img"></label></span>', armsScore: 2 },

	],

	optional: "Also tick the following box if appropriate:",
	optionalAnswers: [

	{ field: '<input type="checkbox" class="custom-control-input" id="customCheck1" value="12"><label class="custom-control-label" for="customCheck1"><img src="./media/Q3/manikin_wrist5.jpg" alt="lowerarm midline or out to side" id="5" class="img" height="150px">Is wrist bent away from midline?</label>'},

	]

}

]

// 	let setArmsScore = questions[0].answers[1]['armsScore']