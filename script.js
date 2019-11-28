const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
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
let checkboxValuesSum = 0;
let checkboxValues = [];

let tables = [
{ 
  	//Table A
  	//'0123' - 0 is upper arm, 1 is lower arm, 2 is wrist and 3 is wrist twist 
  	//upper arm 0
  	'0111': 1, '0112': 2, '0121': 2, '0122': 2, '0131': 2, '0132': 3, '0141': 3, '0142': 3,
  	'0211': 2, '0212': 2, '0221': 2, '0222': 2, '0231': 3, '0232': 3, '0241': 3, '0242': 3,
  	'0311': 2, '0312': 3, '0321': 3, '0322': 3, '0331': 3, '0332': 3, '0341': 4, '0342': 4,
  	//upper arm 1
  	'1111': 1, '1112': 2, '1121': 2, '1122': 2, '1131': 2, '1132': 3, '1141': 3, '1142': 3, 
  	'1211': 2, '1212': 2, '1221': 2, '1222': 2, '1231': 3, '1232': 3, '1241': 3, '1242': 3,
  	'1311': 2, '1312': 3, '1321': 3, '1322': 3, '1331': 3, '1332': 3, '1341': 4, '1342': 4,
  	//upper arm 2
  	'2111': 2, '2112': 3, '2121': 3, '2122': 3, '2131': 3, '2132': 4, '2141': 4, '2142': 4,
  	'2211': 3, '2212': 3, '2221': 3, '2222': 3, '2231': 3, '2232': 4, '2241': 4, '2242': 4,
  	'2311': 3, '2312': 4, '2321': 4, '2322': 4, '2331': 4, '2332': 4, '2341': 5, '2342': 5,
  	//upper arm 3
  	'3111': 3, '3112': 3, '3121': 4, '3122': 4, '3131': 4, '3132': 4, '3141': 5, '3142': 5,
  	'3211': 3, '3212': 4, '3221': 4, '3222': 4, '3231': 4, '3232': 4, '3241': 5, '3242': 5,
  	'3311': 4, '3312': 4, '3321': 4, '3322': 4, '3331': 4, '3332': 5, '3341': 5, '3342': 5,
  	//upper arm 4
  	'4111': 4, '4112': 4, '4121': 4, '4122': 4, '4131': 4, '4132': 5, '4141': 5, '4142': 5,
  	'4211': 4, '4212': 4, '4221': 4, '4222': 4, '4231': 4, '4232': 5, '4241': 5, '4242': 5,
  	'4311': 4, '4312': 4, '4321': 4, '4322': 5, '4331': 5, '4332': 5, '4341': 6, '4342': 6,
  	//upper arm 5
  	'5111': 5, '5112': 5, '5121': 5, '5122': 5, '5131': 5, '5132': 6, '5141': 6, '5142': 7,
  	'5211': 5, '5212': 6, '5221': 6, '5222': 6, '5231': 6, '5232': 7, '5241': 7, '5242': 7,
  	'5311': 5, '5312': 6, '5321': 6, '5322': 6, '5331': 6, '5332': 7, '5341': 7, '5342': 7,

  	'6111': 7, '6112': 7, '6121': 7, '6122': 7, '6131': 7, '6132': 8, '6141': 8, '6142': 9,
  	'6211': 8, '6212': 8, '6221': 8, '6222': 8, '6231': 8, '6232': 9, '6241': 9, '6242': 9,
  	'6311': 9, '6312': 9, '6321': 9, '6322': 9, '6331': 9, '6332': 9, '6341': 9, '6342': 9,},];


//q1
let upperArmValue = 0;
let armAdjValue = 0;
//q2
let lowerArmValue = 0;
let lowerArmAdjValue = 0;
//q3
let wristValue = 0;
let wristAdjValue = 0;
//q4
let wristTwistValue = 0;
//q5
let forceLoadValue = 0;
let muscleUseValue = 0;
//Part A total
let WristArmScore = 0;

startBtn.addEventListener('click', startQuiz);

nextBtn.addEventListener('click', () => {
	currentQuestionIndex++;
	setNextQuestion();
	changeCard();

})
prevBtn.addEventListener('click', () => {
	currentQuestionIndex--;
	setNextQuestion();
	changeCard();
})

function startQuiz() {
	setNextQuestion();
	changeCard();
	currentQuestionIndex = 0;
	let armsScore = 0;

}

const card =  document.querySelector('.card');
card.classList.add('animated', 'fadeInLeft');

function changeCard() {

	const card =  document.querySelector('.card');
	var delayInMilliseconds = 500;
	card.classList.remove('fadeInLeft');
	card.classList.add('animated', 'fadeOutRight');

	checkboxValues.pop();

	resetState();
//if fadeOutRight animation is still there, do this
if ($('.fadeOutRight')) {
		//delay all actions
		setTimeout(function() {
			card.classList.remove('fadeOutRight', 'fadeOutLeft');
			card.classList.add('animated','fadeInLeft');
			startBtn.classList.add('hide');
			questionContainerElement.classList.remove('hide');

			showQuestion(questions[currentQuestionIndex]);
			showOptionalQuestion(questions[currentQuestionIndex]);

			//put this in final result function:
			// if (currentQuestionIndex === 5) {
			// 	document.getElementById("questionDiv").innerHTML = "Your wrist and arm score is: " + WristArmScore;
			// }
		}, delayInMilliseconds);
	}
}
function setNextQuestion() {
	startBtn.classList.add('hide');
	setScores();
	// countTotals();
	resetState();
	//showQuestion(currentQuestionIndex);
}

function countTotals() {
	AScore = tables[0][totalAValue];
	console.log(AScore); 
}

function countWristArmScore() {
	WristArmScore = AScore + parseInt(forceLoadValue + muscleUseValue);

	console.log(WristArmScore);
}


function setScores() {

	switch (currentQuestionIndex) {
		case 0:
		console.log('zerrrooo');
		break;
		case 1:

		armAdjValue = 0;

		upperArmValue = parseInt(document.querySelector('input[name="radio"]:checked').value);

		$('input[name="customCheck"]:checked').each(function() {
			checkboxValues.push($(this).val());
		});
		for (let i = 0; i < checkboxValues.length; i++) {
			armAdjValue += parseInt(checkboxValues[i]);
		}
		break;

		case 2:
		lowerArmAdjValue = 0;

		lowerArmValue = parseInt(document.querySelector('input[name="radio"]:checked').value);

		$('input[name="customCheck"]:checked').each(function() {
			checkboxValues.push($(this).val());
		});

		for (let i = 0; i < checkboxValues.length; i++) {

			lowerArmAdjValue += parseInt(checkboxValues[i]);
		}
		break;

		case 3:
		wristAdjValue = 0;

		wristValue = parseInt(document.querySelector('input[name="radio"]:checked').value);

		$('input[name="customCheck"]:checked').each(function() {
			checkboxValues.push($(this).val());
		});

		for (let i = 0; i < checkboxValues.length; i++) {

			wristAdjValue += parseInt(checkboxValues[i]);
		}
		break;

		case 3:
		wristAdjValue = 0;

		wristValue = parseInt(document.querySelector('input[name="radio"]:checked').value);

		$('input[name="customCheck"]:checked').each(function() {
			checkboxValues.push($(this).val());
		});

		for (let i = 0; i < checkboxValues.length; i++) {

			wristAdjValue += parseInt(checkboxValues[i]);
		}
		break;

		case 4:

		wristTwistValue = parseInt(document.querySelector('input[name="radio"]:checked').value);
		break;

		case 5:
		muscleUseValue = 0;

		forceLoadValue = parseInt(document.querySelector('input[name="radio"]:checked').value);

		$('input[name="customCheck"]:checked').each(function() {
			checkboxValues.push($(this).val());
		});

		for (let i = 0; i < checkboxValues.length; i++) {

			muscleUseValue += parseInt(checkboxValues[i]);
		}
		break;

		default:
	}	
	totalAValue = (upperArmValue + armAdjValue).toString() + 
	(lowerArmValue + lowerArmAdjValue).toString() + 
	(wristValue + wristAdjValue).toString() +
	wristTwistValue.toString();
	// console.log(totalAValue);

	if (currentQuestionIndex === 4) {
		countTotals();
	} else if (currentQuestionIndex === 5) {
		countWristArmScore();
	}
}
//generates questions using questions array
function showQuestion(question) {

	titleElement.innerText = question.title;
	questionElement.innerHTML = question.question;
	question.answers.forEach(answer => {
		const questionDiv = document.createElement('span');
		questionDiv.setAttribute("id", "questionDiv");

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
		//optionalQuestionElement.classList.add('hide');
	}
}

function resetState() {
	nextBtn.classList.add('hide');
	prevBtn.classList.add('hide');
	document.getElementById('optional-fields').classList.add('hide');
	document.getElementById('question-container').classList.add('hide');

	while (answerButtonsElement.firstChild) {
		answerButtonsElement.removeChild(answerButtonsElement.firstChild);
	}
	while (answerBoxesElement.firstChild) {
		answerBoxesElement.removeChild(answerBoxesElement.firstChild);

	}
}

function selectAnswer() {

	if (document.querySelector('input[name="radio"]:checked')) {

		document.getElementById('optional-fields').classList.add('animated', 'fadeIn');


		if (currentQuestionIndex >= 6) {
		//end of questions
		nextBtn.classList.add('hide');
		prevBtn.classList.remove('hide');


	} else {
		nextBtn.classList.remove('hide');
		prevBtn.classList.remove('hide'); }

		if (currentQuestionIndex === 0) {
			prevBtn.classList.add('hide');
		}

		document.getElementById('optional-fields').classList.remove('hide');
		nextBtn.classList.add('animated', 'fadeIn');
		prevBtn.classList.add('animated', 'fadeIn');
	}

}

const questions = [
{
	title: 'Complete Assessment of Left & Right Sides',
	question: '1. Locate Upper Arm Position:',
	answers: [

	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="1" id="radio1"><label for="radio1" class="radioImg img"><img src="./media/Q1/upperarm1.jpg" alt="upperarm" class="img"></label></span>'},
	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="2" id="radio2"><label for="radio2" class="radioImg img"><img src="./media/Q1/upperarm2.jpg" alt="upperarm" class="img"></label></span>'},
	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="2" id="radio3"><label for="radio3" class="radioImg img"><img src="./media/Q1/upperarm3.jpg" alt="upperarm" class="img"></label></span>'},
	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="3" id="radio4"><label for="radio4" class="radioImg img"><img src="./media/Q1/upperarm4.jpg" alt="upperarm" class="img"></label></span>'},
	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="4" id="radio5"><label for="radio5" class="radioImg img"><img src="./media/Q1/upperarm5.jpg" alt="upperarm" class="img"></label></span>'},

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

	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="1" id="radio1"><label for="radio1" class="radioImg img"><img src="./media/Q2/lowerarm1.jpg" alt="manikin lowerarm 60 to 100 degrees" class="img"></label></span>'},
	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="2" id="radio2"><label for="radio2" class="radioImg img"><img src="./media/Q2/lowerarm2.jpg" alt="manikin lowerarm 0 to 60 degrees" class="img"></label></span>'},
	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="2" id="radio3"><label for="radio3" class="radioImg img"><img src="./media/Q2/lowerarm3.jpg" alt="manikin lowerarm 100 degrees or more" class="img"></label></span>'},

	],
	optional: "Also tick the following box if appropriate:",
	optionalAnswers: [

	{ field: '<input type="checkbox" class="custom-control-input" name="customCheck" id="customCheck1" value="1"><label class="custom-control-label" for="customCheck1">Is either arm working across midline or out to side of body?<br><img src="./media/Q2/lowerarm4.jpg" alt="lowerarm midline or out to side" class="checkbox-img"></label>'},

	]
},

{
	title: 'Complete Assessment of Left & Right Sides',
	question: '3. Locate Wrist Position:',
	answers: [

	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="1" id="radio1"><label for="radio1" class="radioImg img"><img src="./media/Q3/wrist1.jpg" alt="wrist 0 degrees" class="img"></label></span>'},
	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="2" id="radio2"><label for="radio2" class="radioImg img"><img src="./media/Q3/wrist2.jpg" alt="wrist 15 down to 15 up degrees" class="img"></label></span>'},
	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="3" id="radio3"><label for="radio3" class="radioImg img"><img src="./media/Q3/wrist3.jpg" alt="wrist 15 degrees down" class="img"></label></span>'},
	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="3" id="radio4"><label for="radio4" class="radioImg img"><img src="./media/Q3/wrist4.jpg" alt="wrist 15 degrees up" class="img"></label></span>'},

	],

	optional: "Also tick the following box if appropriate:",
	optionalAnswers: [

	{ field: '<input type="checkbox" class="custom-control-input" name="customCheck" id="customCheck1" value="1"><label class="custom-control-label" for="customCheck1">Is wrist bent away from midline?<img src="./media/Q3/wrist5.jpg" alt="lowerarm midline or out to side" class="checkbox-img"></label>'},

	]
},

{
	title: 'Complete Assessment of Left & Right Sides',
	question: '4. Wrist Twist:',
	answers: [

	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="1" id="radio1"><label for="radio1" class="radioImg img"><img src="./media/Q4/wrist_twist1.jpg" alt="" class="img"></label></span>'},
	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="2" id="radio2"><label for="radio2" class="radioImg img"><img src="./media/Q4/wrist_twist2.jpg" alt="" class="img"></label></span>'},

	],
},

{
	title: 'Complete Assessment of Left & Right Sides',
	question: '5. Select the force and load that most reflects the working situation:',
	answers: [

	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="0" id="radio1"><label for="radio1" class="radioImg img"><ul><h5><strong>Score 0</strong></h5><li>No resistance</li><li>Less than 2 kg intermittent load or force</li></ul></label></span>'},
	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="1" id="radio2"><label for="radio2" class="radioImg img"><ul><h5><strong>Score 1</strong></h5><li>2 - 10 kg intermittent load or force</li></ul></label></span>'},
	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="2" id="radio3"><label for="radio3" class="radioImg img"><ul><h5><strong>Score 2</strong></h5><li>2 - 10 kg static load</li><li>2 - 10 kg repeated loads or forces</li><li>10 kg or more, intermittent load or force</li></ul></label></span>'},
	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="3" id="radio4"><label for="radio4" class="radioImg img"><ul><h5><strong>Score 2</strong></h5><li>More than 10 kg static load</li><li>10+ kg repeated loads or forces</li><li>Shock or forces with rapid buildup</li></ul></label></span>'},

	],

	optional: "Select this box if it reflects your muscle use:",
	optionalAnswers: [

	{ field: '<input type="checkbox" class="custom-control-input" name="customCheck" id="customCheck1" value="1"><label class="custom-control-label" for="customCheck1"><ul class="checkBoxList"><h5><strong>Score 1</strong></h5>Posture is mainly static, e.g. held for longer than 1 minute or repeated more than 4 times per minute.</ul></label>'},

	]
},

{
	title: 'Complete Assessment of Left & Right Sides',
	question: '6. Locate Neck Position:',
	answers: [

	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="1" id="radio1"><label for="radio1" class="radioImg img"><img src="./media/Q6/neck1.jpg" alt="upperarm" class="img"></label></span>'},
	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="2" id="radio2"><label for="radio2" class="radioImg img"><img src="./media/Q6/neck2.jpg" alt="upperarm" class="img"></label></span>'},
	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="3" id="radio3"><label for="radio3" class="radioImg img"><img src="./media/Q6/neck3.jpg" alt="upperarm" class="img"></label></span>'},
	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="4" id="radio4"><label for="radio4" class="radioImg img"><img src="./media/Q6/neck4.jpg" alt="upperarm" class="img"></label></span>'},

	],
	optional: 'Also tick the following boxes if appropriate:',
	optionalAnswers: [

	{ field: '<input type="checkbox" class="custom-control-input" name="customCheck" id="customCheck1" value="1"><label class="custom-control-label" for="customCheck1"><img src="./media/Q6/neck5.jpg" alt="lowerarm midline or out to side" class="checkbox-img"></label>'},
	{ field: '<input type="checkbox" class="custom-control-input" name="customCheck" id="customCheck2" value="1"><label class="custom-control-label" for="customCheck2"><img src="./media/Q6/neck6.jpg" alt="lowerarm midline or out to side" class="checkbox-img"></label>'},
	
	]
},

{
	title: 'Complete Assessment of Left & Right Sides',
	question: '7. Locate Trunk Position:',
	answers: [

	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="1" id="radio1"><label for="radio1" class="radioImg img"><img src="./media/Q7/trunk1.jpg" alt="upperarm" class="img"></label></span>'},
	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="2" id="radio2"><label for="radio2" class="radioImg img"><img src="./media/Q7/trunk2.jpg" alt="upperarm" class="img"></label></span>'},
	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="3" id="radio3"><label for="radio3" class="radioImg img"><img src="./media/Q7/trunk3.jpg" alt="upperarm" class="img"></label></span>'},
	{ text: '<span class="btn quiz-zone"><input type="radio" name="radio" class="radio" value="4" id="radio4"><label for="radio4" class="radioImg img"><img src="./media/Q7/trunk4.jpg" alt="upperarm" class="img"></label></span>'},

	],
	optional: 'Also tick the following boxes if appropriate:',
	optionalAnswers: [

	{ field: '<input type="checkbox" class="custom-control-input" name="customCheck" id="customCheck1" value="1"><label class="custom-control-label" for="customCheck1"><img src="./media/Q7/trunk5.jpg" alt="lowerarm midline or out to side" class="checkbox-img"></label>'},
	
	
	]
},

]

// 	let setArmsScore = questions[0].answers[1]['armsScore']