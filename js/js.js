const submit=document.getElementById("submit");
const ans1 = document.getElementById("one");
const ans2 = document.getElementById("two");
const ans3 = document.getElementById("three");
const ans4 = document.getElementById("four");
const question = document.getElementById("question");
const answers = document.querySelectorAll(".answer");
const showScore = document.querySelector("#showScore")
const input =document.querySelectorAll("input")


    var xhr = new XMLHttpRequest();
    xhr.open("get","../MCQ_Json/js.json", true);
    xhr.send();
    xhr.onload=()=>{
        // console.log(ans1)
        var t = xhr.responseText;
        var data = JSON.parse(t);
        let questionCount=0;
        let score=0;
        function loadQuestion(){
            question.innerHTML=data[questionCount].question
            ans1.innerHTML=data[questionCount].a
            ans2.innerHTML=data[questionCount].b
            ans3.innerHTML=data[questionCount].c
            ans4.innerHTML=data[questionCount].d
        }
        loadQuestion();
        const getCheckAnswer=()=>{
            let answer;
            answers.forEach((currAns) => {
                if(currAns.checked){
                    answer=currAns.id;
                }
            });
            return answer;
        }
        const deSelectAll =()=>{
            answers.forEach(currAns=> currAns.checked=false);
        }
        submit.addEventListener("click",()=>{
            if(input[0].checked || input[1].checked || input[2].checked || input[3].checked){
                const checkAnswer = getCheckAnswer();
                console.log(checkAnswer);
    
                if(checkAnswer===data[questionCount].ans){
                    score++;
                };
                questionCount++;
    
                deSelectAll();
                if(questionCount < data.length){
                    loadQuestion();
                }else{
                    showScore.innerHTML=`
                    <h3> You scored ${score}/${data.length} ✌🏻 </h3>
                    <button class ="btn btn-warning" onclick = "location.reload()">Play Again</button>
                    `;
    
                    showScore.classList.remove('scorearea')
                }
            }
            else{
                alert("Please choose an answer.")
            }
        });

    }
