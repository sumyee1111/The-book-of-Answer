let answers = []; // 初始化空数组

fetch('answers.json')
  .then(response => response.json())
  .then(data => {
    answers = data.answers; // 把 JSON 文件的答案数组赋值给 answers
  })
  .catch(error => {
    console.error('加载答案JSON失败:', error);
    // 失败时可给默认答案
    answers = ["你会有新开始", "你会遇到惊喜"];
  });

const book = document.getElementById('book');
const answerDiv = document.getElementById('answer');
const questionForm = document.getElementById('question-form');
const flipBtn = document.getElementById('flip-btn');
const backBtn = document.getElementById('back-btn');
const questionInput = document.getElementById('question');

// 点击封面翻页按钮，翻页且清空输入框和答案
flipBtn.addEventListener('click', function(e) {
    e.preventDefault();
    questionInput.value = "";
    answerDiv.textContent = "";
    book.classList.add('flipping');
});

// 表单提交，显示随机答案，短暂翻页动画
questionForm.addEventListener('submit', function(e) {
    e.preventDefault();
    book.classList.add('flipping');
    answerDiv.style.opacity = 0;

    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * answers.length);
        answerDiv.textContent = answers[randomIndex];
        answerDiv.style.opacity = 1;
        // 保持翻页状态，等待用户点击返回
    }, 900);
});

// 点击返回按钮，回到封面，清空输入和答案
backBtn.addEventListener('click', function() {
    book.classList.remove('flipping');
    questionInput.value = "";
    answerDiv.textContent = "";
});
