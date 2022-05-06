const start_btn = document.querySelector(".start_btn button");
const restart_btn = document.querySelector(".buttons .restart");
const highscores_btn = document.querySelector(".buttons .highscores");
const quiz_box = document.querySelector(".quiz_box");
const score_box = document.querySelector(".score_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_text");
const timeCount = document.querySelector(".timer .timer_sec");


start_btn.onclick = () => {
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    qCounter(1);
    startTimer(15);
    startTimerLine(0);   
}

let timeValue = 15;
let q_count = 0;
let q_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = score_box.querySelector(".buttons .restart");

restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz");
    score_box.classList.remove("activeScore");
    timeValue = 15;
    q_count = 0;
    q_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(q_count);
    qCounter(q_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeText.textContent = "Time Left";
    next_btn.classList.remove("show");
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_q_counter = document.querySelector("footer .total_q");

next_btn.onclick = () => {
    if(q_count < questions.length - 1){
        q_count++;
        q_numb++;
        showQuestions(q_count);
        qCounter(q_numb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimer(widthValue);
        timeText.textContent = "Time left";
        next_btn.classList.remove("show");
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        showScore();
    }
}

function showQuestions(index){
    const q_text = document.querySelector(".q_text");

    let q_tag = '<span>' + questions[index].numb + ". " + questions[index].question +'</span></div>';
    let option_tag = '<div class="option"><span>' + questions[index].options[0] +'</span></div>' + '<div class="option"><span>' + questions[index].options[1] +'</span></div>' + '<div class="option"><span>' + questions[index].options[2] +'</span></div>';
    q_text.innerHTML = q_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");

    for( i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this");
    }
}

let tickIconTag = '<div class="icon tick"><i class"fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class"fas fa-times"></i></div>';

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[q_count].answer;
    const allOptions = option_list.children.length;

    if(userAns == correctAns){
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag);
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correctAns){
                option_list.children.setAttribute("class", "option correct");
                option_list.children.insertAdjacentHTML("beforeend", tickIconTag);
                console.log("Auto Selected Correct Answer");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show");
}

function showScore() {
    quiz_box.classList.remove("activeQuiz");
    score_box.classList.remove("activeScore");
    const scoreText = score_box.querySelector(".score_text");
    if (userScore > 3) {
        let scoreTag = '<span>and congrats! You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    } else if (userScore > 1) {
        let scoreTag = '<span>and congrats! You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    } else {
        let scoreTag = '<span>and congrats! You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }        
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0) {
            clearInterval(counter);
            timeText.textContent = "Time's up";
            const allOptions = option_list.children.length;
            let correctAns = questions[q_count].answer;
            for(i = 0; i < allOptions; i++){
                if(option_list.children[i].textContent == correctAns){
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                    console.log("Time's up");
                }
            }
            for(i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.classList.add("show");
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        time_line.getElementsByClassName.width = timer + "px";
        if(timer > 549){
            clearInterval(counterLine);
        }
    }
}

function qCounter(index) {
    let totalQCountTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions </span>';
    bottom_q_counter.innerHTML = totalQCountTag;
}