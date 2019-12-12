// const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const titleElement = document.getElementById('title');
const answerButtonsElement = document.getElementById('answer-buttons');
const answerBoxesElement = document.getElementById('checkbox');
const optionalQuestionElement = document.getElementById('optional-question');
const cardBody = document.getElementById('card-body');
const footerElement = document.getElementById('card-footer');
const submitBtn = document.getElementById("submit-btn");

let currentQuestionIndex;
let checkId = 0;
let total = 0;
let selectedAreaScore = 0;
let checkboxValuesSum = 0;
let checkboxValues = [];

let upperArmValue = 0;
let armAdjValue = 0;

let lowerArmValue = 0;
let lowerArmAdjValue = 0;

let wristValue = 0;
let wristAdjValue = 0;

let wristTwistValue = 0;

let forceLoadValue = 0;
let muscleUseValue = 0;

let neckValue = 0;
let neckAdjValue = 0;

let trunkValue = 0;
let trunkAdjValue = 0;

let legsValue = 0;

let forceLoadB = 0;
let muscleUseB = 0;
//Part A total
let wristArmScore = 0;
//Part B total
let neckTrunkLegsScore = 0;

let finalScore = 0;

let inputEmail;
let inputSubject;
let inputScorer;

let tables = [
{ 
    //Table A
    //'0123' - 0 is upper arm, 1 is lower arm, 2 is wrist and 3 is wrist twist 
    //upper arm 0
    '0111': 1, '0112': 2, '0121': 2, '0122': 2, '0131': 2, '0132': 3, '0141': 3, '0142': 3,
    '0211': 2, '0212': 2, '0221': 2, '0222': 2, '0231': 3, '0232': 3, '0241': 3, '0242': 3,
    '0311': 2, '0312': 3, '0321': 3, '0322': 3, '0331': 3, '0332': 3, '0341': 4, '0342': 4,

    '1111': 1, '1112': 2, '1121': 2, '1122': 2, '1131': 2, '1132': 3, '1141': 3, '1142': 3, 
    '1211': 2, '1212': 2, '1221': 2, '1222': 2, '1231': 3, '1232': 3, '1241': 3, '1242': 3,
    '1311': 2, '1312': 3, '1321': 3, '1322': 3, '1331': 3, '1332': 3, '1341': 4, '1342': 4,

    '2111': 2, '2112': 3, '2121': 3, '2122': 3, '2131': 3, '2132': 4, '2141': 4, '2142': 4,
    '2211': 3, '2212': 3, '2221': 3, '2222': 3, '2231': 3, '2232': 4, '2241': 4, '2242': 4,
    '2311': 3, '2312': 4, '2321': 4, '2322': 4, '2331': 4, '2332': 4, '2341': 5, '2342': 5,

    '3111': 3, '3112': 3, '3121': 4, '3122': 4, '3131': 4, '3132': 4, '3141': 5, '3142': 5,
    '3211': 3, '3212': 4, '3221': 4, '3222': 4, '3231': 4, '3232': 4, '3241': 5, '3242': 5,
    '3311': 4, '3312': 4, '3321': 4, '3322': 4, '3331': 4, '3332': 5, '3341': 5, '3342': 5,

    '4111': 4, '4112': 4, '4121': 4, '4122': 4, '4131': 4, '4132': 5, '4141': 5, '4142': 5,
    '4211': 4, '4212': 4, '4221': 4, '4222': 4, '4231': 4, '4232': 5, '4241': 5, '4242': 5,
    '4311': 4, '4312': 4, '4321': 4, '4322': 5, '4331': 5, '4332': 5, '4341': 6, '4342': 6,

    '5111': 5, '5112': 5, '5121': 5, '5122': 5, '5131': 5, '5132': 6, '5141': 6, '5142': 7,
    '5211': 5, '5212': 6, '5221': 6, '5222': 6, '5231': 6, '5232': 7, '5241': 7, '5242': 7,
    '5311': 5, '5312': 6, '5321': 6, '5322': 6, '5331': 6, '5332': 7, '5341': 7, '5342': 7,

    '6111': 7, '6112': 7, '6121': 7, '6122': 7, '6131': 7, '6132': 8, '6141': 8, '6142': 9,
    '6211': 8, '6212': 8, '6221': 8, '6222': 8, '6231': 8, '6232': 9, '6241': 9, '6242': 9,
    '6311': 9, '6312': 9, '6321': 9, '6322': 9, '6331': 9, '6332': 9, '6341': 9, '6342': 9
},
{ 
    //Table B
    //'012' - 0 is neck, 1 is trunk, 2 are legs
    '111': 1, '112': 3, '121': 2, '122': 3, '131': 3, '132': 4, '141': 5, '142': 5, '151': 6, '152': 6, '161': 6, '162': 7,
    '211': 2, '212': 3, '221': 2, '222': 3, '231': 4, '232': 5, '241': 5, '242': 5, '251': 6, '252': 7, '261': 7, '262': 7,
    '311': 3, '312': 3, '321': 3, '322': 4, '331': 4, '332': 5, '341': 5, '342': 6, '351': 6, '352': 7, '361': 7, '362': 7,
    '411': 5, '412': 5, '421': 5, '422': 6, '431': 6, '432': 7, '441': 7, '442': 7, '451': 7, '452': 7, '461': 8, '462': 8,
    '511': 7, '512': 7, '521': 7, '522': 7, '531': 7, '532': 8, '541': 8, '542': 8, '551': 8, '552': 8, '561': 8, '562': 8,
    '611': 8, '612': 8, '621': 8, '622': 8, '631': 8, '632': 8, '641': 8, '642': 9, '651': 9, '652': 9, '661': 9, '662': 9, 
    '672': 9, '772': 9
},
{ 
    //Table C
    //'01' - 0 is Wrist&Arm score, 1 is NeckTrunk&Leg score
    '1x1': 1, '1x2': 2, '1x3': 3, '1x4': 3, '1x5': 4, '1x6': 5, '1x7': 5,    '1x8': 5, '1x9': 5, '1x10': 5, '1x11': 5, '1x12': 5, '1x13': 5,
    '2x1': 2, '2x2': 2, '2x3': 3, '2x4': 4, '2x5': 4, '2x6': 5, '2x7': 5,    '2x8': 5, '2x9': 5, '2x10': 5, '2x11': 5, '2x12': 5, '2x13': 5,
    '3x1': 3, '3x2': 3, '3x3': 3, '3x4': 4, '3x5': 4, '3x6': 5, '3x7': 6,    '3x8': 6, '3x9': 6, '3x10': 6, '3x11': 6, '3x12': 6, '3x13': 6,
    '4x1': 3, '4x2': 3, '4x3': 3, '4x4': 4, '4x5': 5, '4x6': 6, '4x7': 6,    '4x8': 6, '4x9': 6, '4x10': 6, '4x11': 6, '4x12': 6, '4x13': 6,
    '5x1': 4, '5x2': 4, '5x3': 4, '5x4': 5, '5x5': 6, '5x6': 7, '5x7': 7,    '5x8': 7, '5x9': 7, '5x10': 7, '5x11': 7, '5x12': 7, '5x13': 7,
    '6x1': 4, '6x2': 4, '6x3': 5, '6x4': 6, '6x5': 6, '6x6': 7, '6x7': 7,    '6x8': 7, '6x9': 7, '6x10': 7, '6x11': 7, '6x12': 7, '6x13': 7,
    '7x1': 5, '7x2': 5, '7x3': 6, '7x4': 6, '7x5': 7, '7x6': 7, '7x7': 7,    '7x8': 7, '7x9': 7, '7x10': 7, '7x11': 7, '7x12': 7, '7x13': 7,
    '8x1': 5, '8x2': 5, '8x3': 6, '8x4': 7, '8x5': 7, '8x6': 7, '8x7': 7,    '8x8': 7, '8x9': 7, '8x10': 7, '8x11': 7, '8x12': 7, '8x13': 7,
    '9x1': 5, '9x2': 5, '9x3': 6, '9x4': 7, '9x5': 7, '9x6': 7, '9x7': 7,    '9x8': 7, '9x9': 7, '9x10': 7, '9x11': 7, '9x12': 7, '9x13': 7,

    '10x1': 5, '10x2': 5, '10x3': 6, '10x4': 7, '10x5': 7, '10x6': 7, '10x7': 7,     '10x8': 7, '10x9': 7, '10x10': 7, '10x11': 7, '10x12': 7, '10x13': 7,
    '11x1': 5, '11x2': 5, '11x3': 6, '11x4': 7, '11x5': 7, '11x6': 7, '11x7': 7,     '11x8': 7, '11x9': 7, '11x10': 7, '11x11': 7, '11x12': 7, '11x13': 7,
    '12x1': 5, '12x2': 5, '12x3': 6, '12x4': 7, '12x5': 7, '12x6': 7, '12x7': 7,     '12x8': 7, '12x9': 7, '12x10': 7, '12x11': 7, '12x12': 7, '12x13': 7,
    '13x1': 5, '13x2': 5, '13x3': 6, '13x4': 7, '13x5': 7, '13x6': 7, '13x7': 7,     '13x8': 7, '13x9': 7, '13x10': 7, '13x11': 7, '13x12': 7, '13x13': 7,
} ];

// startBtn.addEventListener('click', startQuiz);

startQuiz();

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

submitBtn.addEventListener('click', () => {
    getInput();
    currentQuestionIndex++;
    setNextQuestion();
    changeCard();
    })

function startQuiz() {
    setNextQuestion();
    changeCard();
    currentQuestionIndex = 8;
    titleElement.classList.add("grey-title");
}

function changeCard() {
    const card =  document.querySelector('.card');
    let delayInMilliseconds = 500;

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
            // startBtn.classList.add('hide');
            questionContainerElement.classList.remove('hide');

            showQuestion(questions[currentQuestionIndex]);
            showOptionalQuestion(questions[currentQuestionIndex]);

            if (currentQuestionIndex === 10) {
                setfinalResponse();
            }
        }, delayInMilliseconds);
    }
}

function showQuestion(question) {

    titleElement.innerText = question.title;
    questionElement.innerHTML = question.question;
    footerElement.innerHTML = question.footer;
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
    }
}

function setNextQuestion() {
    // startBtn.classList.add('hide');
    setScores();
    resetState();
}

function setAScore() {
    // console.log('You scored: ' + (upperArmValue + armAdjValue).toString() + 
    //     (lowerArmValue + lowerArmAdjValue).toString() + 
    //     (wristValue + wristAdjValue).toString() +
    //     wristTwistValue.toString())
    totalAValue = (upperArmValue + armAdjValue).toString() + 
    (lowerArmValue + lowerArmAdjValue).toString() + 
    (wristValue + wristAdjValue).toString() +
    wristTwistValue.toString();

    AScore = tables[0][totalAValue];
    console.log('Therefore AScore = ' + AScore); 
}

function setBScore() {
    // console.log('You scored: ' + (neckValue + neckAdjValue).toString() +
    //     (trunkValue + trunkAdjValue).toString() +
    //     legsValue.toString());
    totalBValue = (neckValue + neckAdjValue).toString() +
    (trunkValue + trunkAdjValue).toString() +
    legsValue.toString();

    BScore = tables[1][totalBValue];
    console.log('Therefore BScore = ' + BScore); 
}

function setWristArmScore() {
    wristArmScore = AScore + parseInt(forceLoadValue + muscleUseValue);
    // console.log("WristArmScore = " + wristArmScore);
}

function setNeckTrunkLegsScore() {
    neckTrunkLegsScore = BScore + parseInt(forceLoadB + muscleUseB);
    // console.log("NeckTrunkLegsScore = " + neckTrunkLegsScore);
}

function setFinalScore() {
    let tableCScore = wristArmScore + "x" + neckTrunkLegsScore;

    finalScore = tables[2][tableCScore];

    // console.log(tableCScore);
}
function setfinalResponse() {

    const resultsContainer = document.createElement('div');
    const scoreContainer = document.createElement('div');
    const generateContainer = document.createElement('div');
    

    resultsContainer.setAttribute("id", "results-container");
    resultsContainer.classList.add("results-container");

    scoreContainer.setAttribute("id", "score-container");
    scoreContainer.classList.add("score-container");

    generateContainer.classList.add("generate-container");

    submitBtn.classList.add("hide");
     const generateBtn = document.createElement('div');
     generateBtn.setAttribute("id", "generate-btn");

    generateBtn.innerHTML =
    `
    <button class="btn btn-primary" onclick="getPDF()">Generate PDF</button>
    `;

    cardBody.appendChild(generateBtn);


    //<button id="generate-btn" class="btn btn-primary generate-btn" onclick="getPDF()">Generate</button>

    cardBody.classList.add("results-grid");

    cardBody.appendChild(resultsContainer);
    
    cardBody.appendChild(scoreContainer);

    totalBValue = (neckValue + neckAdjValue).toString() +
    (trunkValue + trunkAdjValue).toString() +
    legsValue.toString();



    const inputContainer = document.createElement('div');
    
    inputContainer.setAttribute("id", "input-container");
    inputContainer.classList.add("input-container");

    inputContainer.innerHTML =
    `
    <ul style="padding: 0px;">
    <li><h4>Your details:</h4></li>
    <li><h5>Email: ${inputEmail}</h5></li>
    <li><h5>Subject: ${inputSubject}</h5></li>
    <li><h5>Scorer: ${inputScorer}</h5></li>
    </ul>
    `;
    cardBody.appendChild(inputContainer);

    questionDiv.classList.add('generate-div');



    //<script type="text/javascript" defer src="./jspdf.min.js"></script>
    // let head = document.getElementsByTagName('head')[0];
    // let jsPDF = document.createElement("script");
    // jsPDF.type = "text/javascript";
    // jsPDF.src = "./jspdf.min.js";

    // head.appendChild(jsPDF);

    // document.getElementById('submit-btn').classList.add('hide');
    // document.getElementById('generate-btn').classList.remove('hide');

    function scoresList() {
        resultsContainer.innerHTML = 
        `
            <ul class="results-list">
                <li><h4>Scores:</h4></li>
                <li class="item"><div>Upper Arm: </div><div class="score">${upperArmValue + armAdjValue}</div></li>
                <li class="item"><div>Lower Arm: </div><div class="score">${lowerArmValue + lowerArmAdjValue}</div></li>
                <li class="item"><div>Wrist: </div><div class="score">${wristValue + wristAdjValue}</div></li>
                <li class="item"><div>Wrist Twist: </div><div class="score">${wristTwistValue}</div></li>
                <li class="item"><div>Posture Score A: </div><div class="score">${AScore}</div></li>
                <li class="item"><div>Muscle Use + Force/Load: </div><div class="score">${forceLoadValue + muscleUseValue}</div></li>
                <li class="item"><div>Arm & Wrist Score: </div><div class="score">${wristArmScore}</div></li>
                <li class="item"><div>Neck: </div><div class="score">${neckValue + neckAdjValue}</div></li>
                <li class="item"><div>Trunk: </div><div class="score">${trunkValue + trunkAdjValue}</div></li>
                <li class="item"><div>Leg: </div><div class="score">${legsValue}</div></li>
                <li class="item"><div>Posture Score B: </div><div class="score">${BScore}</div></li>
                <li class="item"><div>Muscle Use + Force/Load: </div><div class="score">${forceLoadB + muscleUseB}</div></li>
                <li class="item"><div>Neck, Trunk & Leg Score: </div><div class="score">${neckTrunkLegsScore}</div></li>
            </ul>
        `;
    }

    
    if (finalScore < 3) {
        // resultsContainer.classList.add("acceptable-posture");
        scoresList();
        // resultsImageContainer.innerHTML = "<img src='media/manikin_logo.png' class='card-img'>"
        scoreContainer.innerHTML = 
        `<h4>Final score:</h4>
        <div class='card text-white bg-success mb-3 score-card'>
            <div class='card-body'>
                <h3 class='card-title'>RULA Score: ${finalScore}</h3>
                <h5 class='card-text'>
                    Action level 1:
                    The posture is acceptable if it is not maintained or repeated for long periods
                </h5>
            </div>
        </div>
        `;
        
    } else if (finalScore > 2 && finalScore < 5) {
        // resultsContainer.classList.add("f-investigation");
        scoresList();
        // resultsImageContainer.innerHTML = "<img src='media/manikin_logo.png' class='card-img'>"
        scoreContainer.innerHTML = 
        `<h4>Final results:</h4>
        <div class='card text-white bg-warning mb-3 score-card'>
            <div class='card-body'>
                <h3 class='card-title'><strong>RULA Score: ${finalScore}</strong></h3>
                <h5 class='card-text'>
                    Action level 2:
                    Further investigation is needed and changes may be required
                </h5>
            </div>
        </div>
        `;
    } 
    else if (finalScore > 4 && finalScore < 7) {
        // resultsContainer.classList.add("change-soon");
        scoresList();
        // resultsImageContainer.innerHTML = "<img src='media/manikin_logo.png' class='card-img'>"
        scoreContainer.innerHTML = 
        `<h4>Final results:</h4>
        <div class='card text-white bg-warning mb-3 score-card'>
            <div class='card-body'>
                <h3 class='card-title'><strong>RULA Score: ${finalScore}</strong></h3>
                <h5 class='card-text'>
                    Action level 3:
                    Further investigation and changes are required soon
                </h5>
            </div>
        </div>
        `;
    }
    else if (finalScore >= 7) {
        // resultsContainer.classList.add("investigate-change");
        scoresList();
        // resultsImageContainer.innerHTML = "<img src='media/manikin_logo.png' class='card-img'>"
        scoreContainer.innerHTML = 
        `<h4>Final results:</h4>
        <div class='card text-white bg-danger mb-3 score-card'>
            <div class='card-body'>
                <h3 class='card-title'><strong>RULA Score: ${finalScore}</strong></h3>
                <h5 class='card-text'>
                    Action level 4:
                    Further investigation and changes are required immediately
                </h5>
            </div>
        </div>
        `;
    }

    cardBody.classList.add('animated','fadeIn');
}

function getInput() {

    inputEmail = document.getElementById('form-email').value;
    inputSubject = document.getElementById('form-subject').value;
    inputScorer = document.getElementById('form-scorer').value;

    console.log(inputEmail, inputSubject, inputScorer);
}

// $(document).ready(function(){
// $('#generate-btn').click(function(){
//         document.getElementById("card-body"), {
//             onrendered: function(canvas) {

//                 var imgData = canvas.toDataURL('image/png');
//                 console.log('Report Image URL: '+imgData);
//                 var doc = new jsPDF('p', 'mm', [297, 210]); //210mm wide and 297mm high
                
//                 doc.addImage(imgData, 'PNG', 10, 10);
//                 doc.save('sample.pdf');
//             }
//         };
// });
// })

function getPDF() {
    let doc = new jsPDF('p', 'pt', 'a4');
    let margins = {
        top:    15,
        bottom: 40,
        left:   30,
        width:  550
    };
    let elementHandler = {
      '#ignorePDF': function (element, renderer) {
        return true;
      }
    };
    let source = document.getElementsByTagName("main")[0];

    doc.fromHTML(source,
    margins.left, // x coord
    margins.top,
    {
      // y coord
    width: margins.width,// max width of content on PDF
    'elementHandlers': elementHandler
    });
    doc.save("test.pdf");
}

function setScores() {

switch (currentQuestionIndex) {
    case 0:
        break;

    case 1:
    armAdjValue = 0;
    checkboxValues = [];
        
    upperArmValue = parseInt(document.querySelector('input[name="radio"]:checked').value);

        if (document.querySelector('input[name="customCheck"]:checked')) {

            $('input[name="customCheck"]:checked').each(function() {
                    checkboxValues.push($(this).val());
            });
                for (let i = 0; i < checkboxValues.length; i++) {
                    armAdjValue += parseInt(checkboxValues[i]);
                        }
        } else {
        armAdjValue = 0; }
    break;

    case 2:
    lowerArmValue = parseInt(document.querySelector('input[name="radio"]:checked').value);

        if (document.querySelector('input[name="customCheck"]:checked')) {

            lowerArmAdjValue = parseInt(document.querySelector('input[name="customCheck"]:checked').value);

        } else {
            lowerArmAdjValue = 0; }

    break;

    case 3:
    checkboxValues = [];
    wristValue = parseInt(document.querySelector('input[name="radio"]:checked').value);

        if (document.querySelector('input[name="customCheck"]:checked')) {
            wristAdjValue = parseInt(document.querySelector('input[name="customCheck"]:checked').value);
        } else {
            wristAdjValue = 0; }

    break;

    case 4:
    wristTwistValue = parseInt(document.querySelector('input[name="radio"]:checked').value);
    break;

    case 5:
    forceLoadValue = parseInt(document.querySelector('input[name="radio"]:checked').value);
        if (document.querySelector('input[name="customCheck"]:checked')) {
            muscleUseValue = parseInt(document.querySelector('input[name="customCheck"]:checked').value);
        } else {
            muscleUseValue = 0; }
    break;

    case 6:
    neckAdjValue = 0;
    checkboxValues = [];
    neckValue = parseInt(document.querySelector('input[name="radio"]:checked').value);

        if (document.querySelector('input[name="customCheck"]:checked')) {
            $('input[name="customCheck"]:checked').each(function() {
                checkboxValues.push($(this).val());
            });

            for (let i = 0; i < checkboxValues.length; i++) {

                neckAdjValue += parseInt(checkboxValues[i]);
            }
        } else {
            neckAdjValue = 0; }
    break;

    case 7:
    trunkAdjValue = 0;
    checkboxValues = [];
    trunkValue = parseInt(document.querySelector('input[name="radio"]:checked').value);

        if (document.querySelector('input[name="customCheck"]:checked')) {
            $('input[name="customCheck"]:checked').each(function() {
                checkboxValues.push($(this).val());
            });
            for (let i = 0; i < checkboxValues.length; i++) {
                trunkAdjValue += parseInt(checkboxValues[i]);
            }
        } else {
            trunkAdjValue = 0; }
    break;

    case 8:
    legsValue = parseInt(document.querySelector('input[name="radio"]:checked').value);
    break;

    case 9:
    forceLoadB = parseInt(document.querySelector('input[name="radio"]:checked').value);

        if (document.querySelector('input[name="customCheck"]:checked')) {
            muscleUseB = parseInt(document.querySelector('input[name="customCheck"]:checked').value);
        } else {
            muscleUseB = 0; }

    case 10:
    submitBtn.classList.remove('hide');
    document.getElementById("container").classList.add("form-container");

        //<button type="button" class="btn btn-success mb-2 form-btn hide" id="generate-btn" onclick="getPDF()">Generate</button>
    break;
    default:
    }

    if (currentQuestionIndex === 9) {
    titleElement.classList.remove("grey-title");
    insertScores();
    }
}

	function insertScores() {
	setAScore();
    setWristArmScore();
    setBScore();
    setNeckTrunkLegsScore();
    setFinalScore();
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

    if (document.querySelector('input[name="radio"]:checked') || currentQuestionIndex === 9) {

        document.getElementById('optional-fields').classList.add('animated', 'fadeIn');
        nextBtn.classList.remove('hide');

            nextBtn.classList.remove('hide');
            prevBtn.classList.remove('hide'); 
  

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
    title: 'Part A. Arm & Wrist Analysis',
    question: 'Step 1: Locate Upper Arm Position',
    footer:
    `<p>Progress:</p><div class="progress">
  	<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
	</div>`,
    answers: [

    { text: 
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="radio option-input" value="1" id="radio1">
        <label for="radio1" class="radioImg img">
            <img src="./media/Q1/upperarm1.jpg" alt="upperarm" class="img">
        </label>
    </span>`},
    { text:
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="radio option-input" value="2" id="radio2">
        <label for="radio2" class="radioImg img">
            <img src="./media/Q1/upperarm2.jpg" alt="" class="img">
        </label>
    </span>`},
    { text: 
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="radio option-input" value="2" id="radio3">
        <label for="radio3" class="radioImg img">
            <img src="./media/Q1/upperarm3.jpg" alt="" class="img">
        </label>
    </span>`},
    { text: 
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="radio option-input" value="3" id="radio4">
        <label for="radio4" class="radioImg img">
            <img src="./media/Q1/upperarm4.jpg" alt="" class="img">
        </label>
    </span>`},
    { text:
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="radio option-input" value="4" id="radio5">
        <label for="radio5" class="radioImg img">
            <img src="./media/Q1/upperarm5.jpg" alt="" class="img">
        </label>
    </span>`},

    ],
    optional: 'Step 1a: Also tick the following boxes if appropriate',
    optionalAnswers: [

    { field: 
    `<input type="checkbox" class="custom-control-input" name="customCheck" id="customCheck1" value="1">
    <label class="custom-control-label" for="customCheck1">
        Shoulder is raised.
    </label>`},
    { field: 
    `<input type="checkbox" class="custom-control-input" name="customCheck" id="customCheck2" value="1">
    <label class="custom-control-label" for="customCheck2">
        Upper arm is abducted (away from the side of the body).
    </label>`},
    { field: 
    `<input type="checkbox" class="custom-control-input" name="customCheck" id="customCheck3" value="-1">
    <label class="custom-control-label" for="customCheck3">
        Leaning or supporting the weight of the arm.
    </label>`},
    ]
    
},

{
    title: 'Part A. Arm & Wrist Analysis',
    question: 'Step 2: Locate Lower Arm Position',
    footer:
    `<p>Progress:</p>
    <div class="progress">
  	<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 11%" aria-valuenow="11" aria-valuemin="0" aria-valuemax="100">11%</div>
	</div>`,
    answers: [

    { text:
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="radio option-input" value="1" id="radio1">
        <label for="radio1" class="radioImg img">
            <img src="./media/Q2/lowerarm1.jpg" alt="" class="img">
        </label>
    </span>`},
    { text:
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="radio option-input" value="2" id="radio2">
        <label for="radio2" class="radioImg img">
            <img src="./media/Q2/lowerarm2.jpg" alt="" class="img">
        </label>
    </span>`},
    { text:
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="radio option-input" value="2" id="radio3">
        <label for="radio3" class="radioImg img">
            <img src="./media/Q2/lowerarm3.jpg" alt="" class="img">
        </label>
    </span>`},

    ],
    optional: "Step 2a: Also tick the following box if appropriate",
    optionalAnswers: [

    { field: 
    `<input type="checkbox" class="custom-control-input" name="customCheck" id="customCheck1" value="1">
    <label class="custom-control-label" for="customCheck1">
        Is either arm working across midline or out to side of body?<br>
        <img src="./media/Q2/lowerarm4.jpg" alt="" class="checkbox-img">
    </label>`},

    ]
},

{
    title: 'Part A. Arm & Wrist Analysis',
    question: 'Step 3: Locate Wrist Position',
    footer:
    `<p>Progress:</p>
    <div class="progress">
  	<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 22%" aria-valuenow="22" aria-valuemin="0" aria-valuemax="100">22%</div>
	</div>`,
    answers: [

    { text:
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="radio option-input" value="1" id="radio1">
        <label for="radio1" class="radioImg img">
            <img src="./media/Q3/wrist1.jpg" alt="wrist 0 degrees" class="img">
        </label>
    </span>`},
    { text: 
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="radio option-input" value="2" id="radio2">
        <label for="radio2" class="radioImg img">
            <img src="./media/Q3/wrist2.jpg" alt="wrist 15 down to 15 up degrees" class="img">
        </label>
    </span>`},
    { text: 
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="radio option-input" value="3" id="radio3">
        <label for="radio3" class="radioImg img">
            <img src="./media/Q3/wrist3.jpg" alt="wrist 15 degrees down" class="img">
        </label>
    </span>`},
    { text:
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="radio option-input" value="3" id="radio4">
        <label for="radio4" class="radioImg img">
            <img src="./media/Q3/wrist4.jpg" alt="wrist 15 degrees up" class="img">
        </label>
    </span>`},

    ],

    optional: "Step 3a: Also tick the following box if appropriate",
    optionalAnswers: [

    { field:
    `<input type="checkbox" class="custom-control-input" name="customCheck" id="customCheck1" value="1">
    <label class="custom-control-label" for="customCheck1">
        Is wrist bent away from midline?
        <img src="./media/Q3/wrist5.jpg" alt="lowerarm midline or out to side" class="checkbox-img">
    </label>`},

    ]
},

{
    title: 'Part A. Arm & Wrist Analysis',
    question: 'Step 4: Wrist Twist',
    footer:
    `<p>Progress:</p>
    <div class="progress">
  	<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 33%" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100">33%</div>
	</div>`,
    answers: [

    { text:
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="radio option-input" value="1" id="radio1">
        <label for="radio1" class="radioImg img">
            <img src="./media/Q4/wrist_twist1.jpg" alt="" class="img">
        </label>
    </span>`},
    { text:
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="radio option-input" value="2" id="radio2">
        <label for="radio2" class="radioImg img">
            <img src="./media/Q4/wrist_twist2.jpg" alt="" class="img">
        </label>
    </span>`},

    ],
},

{
    title: 'Part A. Force and Load for the Arm & Wrist',
    question: 'Step 5: Select the force and load that most reflects the working situation',
    footer:
    `<p>Progress:</p>
    <div class="progress">
  	<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 44%" aria-valuenow="44" aria-valuemin="0" aria-valuemax="100">44%</div>
	</div>`,
    answers: [

    { text:
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="radio option-input" value="0" id="radio1">
        <label for="radio1" class="radioImg img">
            <ul>
                <h5><strong>Score 0</strong></h5>
                <li>No resistance</li>
                <li>Less than 2 kg intermittent load or force</li>
            </ul>
        </label>
    </span>`},
    { text:
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="radio option-input" value="1" id="radio2">
        <label for="radio2" class="radioImg img">
            <ul>
                <h5><strong>Score 1</strong></h5>
                <li>2 - 10 kg intermittent load or force</li>
            <h2 style="visibility: hidden;">#</h2>
            </ul>
        </label>
    </span>`},
    { text:
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="radio option-input" value="2" id="radio3">
        <label for="radio3" class="radioImg img">
            <ul>
                <h5><strong>Score 2</strong></h5>
                <li>2 - 10 kg static load</li>
                <li>2 - 10 kg repeated loads or forces</li>
                <li>10 kg or more, intermittent load or force</li>
            </ul>
        </label>
    </span>`},
    { text:
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="radio option-input" value="3" id="radio4">
        <label for="radio4" class="radioImg img">
            <ul>
                <h5><strong>Score 3</strong></h5>
                <li>More than 10 kg static load</li>
                <li>10+ kg repeated loads or forces</li>
                <li>Shock or forces with rapid buildup</li>
            </ul>
        </label>
    </span>`},

    ],

    optional: "Step 5a: Select this box if it reflects your muscle use",
    optionalAnswers: [

    { field: 
    `<input type="checkbox" class="custom-control-input" name="customCheck" id="customCheck1" value="1">
    <label class="custom-control-label" for="customCheck1">
        <ul class="checkBoxList">
            <h5><strong>Score 1</strong></h5>
            Posture is mainly static, e.g. held for longer than 1 minute or repeated more than 4 times per minute.
        </ul>
    </label>`},

    ]
},

{
    title: 'Part B. Neck, Trunk & Leg Analysis',
    question: 'Step 6: Locate Neck Position',
    footer:
    `<p>Progress:</p>
    <div class="progress">
  	<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 55%" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100">55%</div>
	</div>`,
    answers: [

    { text:
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="option-input radio" value="1" id="radio1">
        <label for="radio1" class="radioImg img">
            <img src="./media/Q6/neck1.jpg" alt="" class="img">
        </label>
    </span>`},
    { text:
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="option-input radio" value="2" id="radio2">
        <label for="radio2" class="radioImg img">
            <img src="./media/Q6/neck2.jpg" alt="" class="img">
        </label>
    </span>`},
    { text:
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="option-input radio" value="3" id="radio3">
        <label for="radio3" class="radioImg img">
            <img src="./media/Q6/neck3.jpg" alt="" class="img">
        </label>
    </span>`},
    { text:
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="option-input radio" value="4" id="radio4">
        <label for="radio4" class="radioImg img">
            <img src="./media/Q6/neck4.jpg" alt="" class="img">
        </label>
    </span>`},
    ],
    optional: 'Step 6a: Also tick the following boxes if appropriate',
    optionalAnswers: [

    { field:
    `<input type="checkbox" class="custom-control-input" name="customCheck" id="customCheck1" value="1">
    <label class="custom-control-label" for="customCheck1">
        <img src="./media/Q6/neck5.jpg" alt="" class="checkbox-img">
    </label>`},
    { field:
    `<input type="checkbox" class="custom-control-input" name="customCheck" id="customCheck2" value="1">
    <label class="custom-control-label" for="customCheck2">
        <img src="./media/Q6/neck6.jpg" alt="" class="checkbox-img">
    </label>`},
    ]
},

{
    title: 'Part B. Neck, Trunk & Leg Analysis',
    question: 'Step 7: Locate Trunk Position',
    footer:
    `<p>Progress:</p>
    <div class="progress">
  	<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 66%" aria-valuenow="66" aria-valuemin="0" aria-valuemax="100">67%</div>
	</div>`,
    answers: [

    { text:
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="radio option-input" value="1" id="radio1">
        <label for="radio1" class="radioImg img">
            <img src="./media/Q7/trunk1.jpg" alt="" class="img">
        </label>
    </span>`},
    { text:
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="radio option-input" value="2" id="radio2">
        <label for="radio2" class="radioImg img">
            <img src="./media/Q7/trunk2.jpg" alt="" class="img">
        </label>
    </span>`},
    { text:
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="radio option-input" value="3" id="radio3">
        <label for="radio3" class="radioImg img">
            <img src="./media/Q7/trunk3.jpg" alt="" class="img">
        </label>
    </span>`},
    { text:
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="radio option-input" value="4" id="radio4">
        <label for="radio4" class="radioImg img">
            <img src="./media/Q7/trunk4.jpg" alt="" class="img">
        </label>
    </span>`},
    ],
    optional: 'Step 7a: Also tick the following boxes if appropriate',
    optionalAnswers: [

    { field:
    `<input type="checkbox" class="custom-control-input" name="customCheck" id="customCheck1" value="1">
    <label class="custom-control-label" for="customCheck1">
        <img src="./media/Q7/trunk5.jpg" alt="" class="checkbox-img">
    </label>`},
    { field:
    `<input type="checkbox" class="custom-control-input" name="customCheck" id="customCheck2" value="1">
    <label class="custom-control-label" for="customCheck2">
        <img src="./media/Q7/trunk6.jpg" alt="" class="checkbox-img">
    </label>`},
    ]
},
{
    title: 'Part B. Neck, Trunk & Leg Analysis',
    question: 'Step 8: Legs',
    footer:
    `<p>Progress:</p>
    <div class="progress">
  	<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 78%" aria-valuenow="78" aria-valuemin="0" aria-valuemax="100">78%</div>
	</div>`,
    answers: [
    { text:
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="radio option-input" value="1" id="radio1">
        <label for="radio1" class="">
            Legs and feet are well supported and in an evenly balanced posture.<br>
            <img src="./media/Q8/legs1.jpg" alt="" class="img" style="margin: 10px auto 0 auto">
        </label>
    </span>`},
    { text:
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="radio option-input" value="2" id="radio2">
        <label for="radio2" class="">
            Legs and feet are NOT evenly balanced and supported.<br>
            <img src="./media/Q8/legs2.jpg" alt="" class="img" style="margin: 10px auto 0 auto">
        </label>
    </span>`},
    ],
},
{
    title: 'Part B. Force and Load for the Neck, Trunk & Legs',
    question: 'Step 9: Select the force and load that most reflects the working situation',
    footer:
    `<p>Progress:</p>
    <div class="progress">
  	<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 89%" aria-valuenow="89" aria-valuemin="0" aria-valuemax="100">89%</div>
	</div>`,
    answers: [

    { text: 
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="radio option-input" value="0" id="radio1">
        <label for="radio1" class="radioImg img">
            <ul>
                <h5><strong>Score 0</strong></h5>
                <li>No resistance</li>
                <li>Less than 2 kg intermittent load or force</li>
            </ul>
        </label>
    </span>`},
    { text:
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="radio option-input" value="1" id="radio2">
        <label for="radio2" class="radioImg img">
            <ul>
                <h5><strong>Score 1</strong></h5>
                <li>2 - 10 kg intermittent load or force</li>
                <h2 style="visibility: hidden;">#</h2>
            </ul>
        </label>
    </span>`},
    { text:
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="radio option-input" value="2" id="radio3">
        <label for="radio3" class="radioImg img">
            <ul>
                <h5><strong>Score 2</strong></h5>
                <li>2 - 10 kg static load</li>
                <li>2 - 10 kg repeated loads or forces</li>
                <li>10 kg or more, intermittent load or force</li>
            </ul>
        </label>
    </span>`},
    { text:
    `<span class="btn quiz-zone">
        <input type="radio" name="radio" class="radio option-input" value="3" id="radio4">
        <label for="radio4" class="radioImg img">
            <ul>
                <h5><strong>Score 3</strong></h5>
                <li>More than 10 kg static load</li>
                <li>10+ kg repeated loads or forces</li>
                <li>Shock or forces with rapid buildup</li>
            </ul>
        </label>
    </span>`},
    ],

    optional: "Step 9a: Select this box if it reflects your muscle use",
    optionalAnswers: [

    { field:
    `<input type="checkbox" class="custom-control-input" name="customCheck" id="customCheck1" value="1">
    <label class="custom-control-label" for="customCheck1">
        <ul class="checkBoxList">
            <h5><strong>Score 1</strong></h5>
            Posture is mainly static, e.g. held for longer than 1 minute or repeated more than 4 times per minute.
        </ul>
    </label>`},
    ]
},

{
    title: 'Your details*',
    question: `
    <div class="form-container">
        <form id="form">
            <div class="form-group">
                <label for="form-email" class="form-label"><h4>Email address</h4></label>
                <input type="email" class="form-control" id="form-email" placeholder="name@example.com">
            </div>
            <div class="form-group">
                <label for="form-subject" class="form-label"><h4>Subject</h4></label>
                <input class="form-control" type="text" placeholder="John Doe" id="form-subject">
            <div>
            <div class="form-group">
                <label for="form-scorer" class="form-label"><h4>Scorer</h4></label>
                <input class="form-control" type="text" placeholder="Jane Doe" id="form-scorer">
            </div>
            <div class="form-group">
                <label for="form-department" class="form-label"><h4>Department</h4></label>
                <input class="form-control" type="text" placeholder="HR" id="form-department">
            </div>
            <div class="form-group">
                <label for="form-company" class="form-label"><h4>Company</h4></label>
                <input class="form-control" type="text" placeholder="Lorem Ipsum Ltd" id="form-company">
            </div>
            <p style="text-align: left;"><strong>*This step is optional for a beta version.</strong><br>Your details are passed into the PDF file for your use only.<br>No data is retained.<br><br>Leave fields blank to skip.</p>
        </form>
        </div>`,
    footer:
    `<p>Progress:</p>
    <div class="progress">
  	<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Complete</div>
	</div>`,
    answers: [

    { text: '<span class="hide"></span>'},

    ],
},

{
    title: 'RULA Summary',
    question: '',
    footer:
    ``,
    answers: [

    { text: '<span class="hide"></span>'},

    ],
},

]
//  let setArmsScore = questions[0].answers[1]['armsScore']