const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', startQuiz);
const questionContainerElement = document.getElementById('question-container');
const nextBtn = document.getElementById('next-btn');
nextBtn.addEventListener('click', changeCard);
let currentQuestionIndex;
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
let totalArmsScore = 0;

function startQuiz() {
	console.log('started');
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

	if ($('.fadeOutRight')[0]) {
		setTimeout(function() {
			card.classList.remove('fadeOutRight');
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
function showQuestion(question) {
	questionElement.innerText = question.question;
	question.answers.forEach(answer => {
		const button = document.createElement('button');
		button.innerText = answer.text;
		button.classList.add('btn', 'quiz-zone');
		button.addEventListener('click' , selectAnswer);
		answerButtonsElement.appendChild(button);
	})
}

function resetState() {
	while (answerButtonsElement.firstChild) {
		answerButtonsElement.removeChild(answerButtonsElement.firstChild);
	}
}

function selectAnswer(e) {
	const selectedButton = e.target;
	

}

const questions = [
{
	question: 'Locate Upper Arm Position:',
	answers: [

	{ text: '20 to 20 degrees', armsScore: +1 },
	{ text: '20 degrees in extension', armsScore: +2 },
	{ text: '20 to 45 degress', armsScore: +2 },
	{ text: '45 to 90 degrees', armsScore: +3 },
	{ text: '90 degrees', armsScore: +4 },
	{ text: 'Adjust', armsScore: +1 }

	]
}
]
//accesses armsScore and adds it to total
function setTotalArmsScore() {
	
	let setArmsScore = questions[0].answers[1]['armsScore'];
	totalArmsScore += setArmsScore;
	console.log(totalArmsScore);
}
setTotalArmsScore();