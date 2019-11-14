const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', startQuiz);
const questionContainerElement = document.getElementById('question-container');
const nextBtn = document.getElementById('next-btn');
nextBtn.addEventListener('click', changeCard);
let currentQuestionIndex;
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
let totalArmsScore = 0;
let allArmsScores = [];

function startQuiz() {
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
			nextBtn.classList.remove('hide');
			questionContainerElement.classList.remove('hide');
			showQuestion(questions[0]);
		}, delayInMilliseconds);
	}
}

function setNextQuestion() {
	
}
//generates questions using questions array
function showQuestion(question) {
	//sets the question
	questionElement.innerText = question.question;
	question.answers.forEach(answer => {
		//creates buttons
		const button = document.createElement('button');
		//sets text to buttons
		button.innerText = answer.text;
		//adds classes to buttons
		button.classList.add('btn', 'quiz-zone');
		//adds id to buttons according to their armsScore
		button.setAttribute("id", answer.armsScore);
		//adds click eventlistener to each button
		button.addEventListener('click' , selectAnswer);
		//appends button to the 'answer-buttons' element
		answerButtonsElement.appendChild(button);

		//saves scores to array - probably useless, did this just to check
		/*allArmsScores.push(answer.armsScore);
		console.log(allArmsScores);*/
	})
}

function resetState() {
	while (answerButtonsElement.firstChild) {
		answerButtonsElement.removeChild(answerButtonsElement.firstChild);
	}
}

function selectAnswer(e) {
	const selectedButton = e.target;
	//
	const scoreX = selectedButton.id;
	console.log(scoreX);
}

const questions = [
{
	question: 'Locate Upper Arm Position:',
	answers: [

	{ text: '20 to 20 degrees', armsScore: 1 },
	{ text: '20 degrees in extension', armsScore: 2 },
	{ text: '20 to 45 degress', armsScore: 2 },
	{ text: '45 to 90 degrees', armsScore: 3 },
	{ text: '90 degrees', armsScore: 4 },
	{ text: 'Adjust', armsScore: 1 }

	]
}
]
//accesses armsScore and adds it to total
// function setTotalArmsScore() {
	
// 	let setArmsScore = questions[0].answers[1]['armsScore'];
// 	totalArmsScore += setArmsScore;
// 	console.log(totalArmsScore);
// }
// setTotalArmsScore();
