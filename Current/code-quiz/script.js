var quizData = [
    {
        question: 'How many toes do cats have?',
        correct: 2,
        a: '16',
        b: '18',
        c: '20',
    },
    {
        question: 'In Ancient Egypt, family members would do what when their cat died?',
        correct: 2,
        a: 'Eat fish for 3 days straight',
        b: 'Shave their eyebrows off',
        c: 'Get a new cat',
    },
    {
        question: 'What year did the first and only cat go to space?',
        correct: 1,
        a: '1963',
        b: '1964',
        c: '1965',
    },
    {
        question: 'What is a group of cats called?',
        correct: 3,
        a: 'a harem',
        b: 'a troop',
        c: 'a clowder',
    },
]

const quiz = document.getElementById('quiz');
const answerEl = document.querySelectorAll('.answer');
const questionEL = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const submitBtn = document.getElementById('submit');

let currentQuiz = 0
var score = 0;

loadQuiz()

function loadQuiz() {

    deselectAnswers() 

    const currentQuizData = quizData[currentQuiz]

    questionEL.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
}

function deselectAnswers() {
    answerEl.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer
    answerEl.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}

// calculating and displaying the score
submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    if(answer) {
        if(answer === quizData[currentQuiz].correct) {
            score++
        }

        currentQuiz++ 

        if(currentQuiz < quizData.length) {
            loadQuiz()
        } else {
            quiz.innerHTML = ` 
            <h2>You answered ${score}/${quizData.length} questions correctly</h2>

            <button onclick="location.reload()" Reload</button>
            `
        }
    }
})


// need to add timer that counts down and highscore page with initial input
// =============================================================================