document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('content').classList.add('show');
    document.getElementById('back-button').style.opacity = 1;
});

function goBack() {
    window.history.back();
}

var currentQuestionIndex = 0;
var testButton = document.getElementById('test-button');
var lessonContent = document.getElementById('lesson-content');
var backBtn = document.getElementById('back-button');
var quizContainer = document.getElementById('quiz-container');
var navigationButtons = document.getElementById('navigation-buttons');
var nextButton; // Объявляем переменную для кнопки "Вперед"
var prevButton; // Объявляем переменную для кнопки "Назад"

// Создаем тест
var questions = [
    {
        question: 'Какие основные компоненты компьютера существуют?',
        answers: [
            { text: 'Процессор, оперативная память, жесткий диск.', correct: true },
            { text: 'Мышь, клавиатура, монитор.', correct: false },
            { text: 'Принтер, сканер, флешка.', correct: false },
            { text: 'Дисковод, акустическая система, микрофон.', correct: false }
        ]
    },
    {
        question: 'Что такое вирусы в контексте компьютеров?',
        answers: [
            { text: 'Это программы, способные самостоятельно размножаться и распространяться.', correct: true },
            { text: 'Это некорректное поведение операционной системы.', correct: false },
            { text: 'Это вредные электрические разряды в компьютере.', correct: false },
            { text: 'Это службы защиты от несанкционированного доступа.', correct: false }
        ]
    },
    {
        question: 'Почему важно регулярно обновлять антивирусное программное обеспечение?',
        answers: [
            { text: 'Для обеспечения защиты от новых угроз и вирусов.', correct: true },
            { text: 'Чтобы сделать компьютер быстрее.', correct: false },
            { text: 'Для улучшения внешнего вида операционной системы.', correct: false },
            { text: 'Для увеличения объема оперативной памяти.', correct: false }
        ]
    },
    {
        question: 'Какие меры следует предпринять при получении писем от незнакомых отправителей с прикрепленными файлами?',
        answers: [
            { text: 'Не открывать прикрепленные файлы, а лучше удалить такие письма.', correct: true },
            { text: 'Открыть все прикрепленные файлы и посмотреть, что внутри.', correct: false },
            { text: 'Переслать письмо своим друзьям.', correct: false },
            { text: 'Ответить на письмо с просьбой отправить еще файлов.', correct: false }
        ]
    },
    {
        question: 'Что такое резервное копирование данных?',
        answers: [
            { text: 'Это процесс создания дубликатов важной информации для её сохранности в случае потери.', correct: true },
            { text: 'Это процесс удаления всех данных с компьютера.', correct: false },
            { text: 'Это процесс ускорения работы компьютера.', correct: false },
            { text: 'Это процесс шифрования данных.', correct: false }
        ]
    },
    {
        question: 'Почему важно использовать сложные пароли для защиты доступа к компьютеру и аккаунтам?',
        answers: [
            { text: 'Сложные пароли обеспечивают более высокий уровень защиты от несанкционированного доступа.', correct: true },
            { text: 'Сложные пароли делают работу с компьютером более удобной.', correct: false },
            { text: 'Сложные пароли делают работу с компьютером более медленной.', correct: false },
            { text: 'Сложные пароли снижают безопасность компьютера.', correct: false }
        ]
    }
];

// Функция отображения текущего вопроса
function showQuestion(index) {
    var questionContainer = document.getElementById('question-container');
    if (!questionContainer) {
        console.error('Элемент question-container не найден');
        return;
    }
    questionContainer.innerHTML = ''; // Очищаем содержимое перед добавлением нового вопроса

    var questionObj = questions[index];
    var questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML = '<p>' + questionObj.question + '</p>';

    // Создаем радио-кнопки для ответов
    questionObj.answers.forEach(function (answerObj, ansIndex) {
        var answerInput = document.createElement('input');
        answerInput.type = 'radio';
        answerInput.name = 'answer' + index;
        answerInput.id = 'answer' + index + '_' + ansIndex;
        answerInput.value = ansIndex;
        var answerLabel = document.createElement('label');
        answerLabel.htmlFor = 'answer' + index + '_' + ansIndex;
        answerLabel.innerText = answerObj.text;
        var br = document.createElement('br');

        questionDiv.appendChild(answerInput);
        questionDiv.appendChild(answerLabel);
        questionDiv.appendChild(br);
    });

    questionContainer.appendChild(questionDiv);
}

// Функция создания кнопок "Назад" и "Вперед"
function createNavigationButtons(index) {
    // Удаляем существующие кнопки навигации
    navigationButtons.innerHTML = '';

    // Создаем кнопку "Назад"
    prevButton = document.createElement('button');
    prevButton.classList.add('quiz-button');
    prevButton.innerText = 'Назад';
    prevButton.disabled = (index === 0); // Отключаем кнопку "Назад" на первом вопросе
    prevButton.addEventListener('click', function () {
        navigate(-1); // Перемещение к предыдущему вопросу
    });

    // Создаем кнопку "Вперед"
    nextButton = document.createElement('button');
    nextButton.classList.add('quiz-button');
    nextButton.innerText = 'Вперед';
    nextButton.addEventListener('click', function () {
        navigate(1); // Перемещение к следующему вопросу
    });

    // Добавляем кнопки навигации в контейнер
    navigationButtons.appendChild(prevButton);
    navigationButtons.appendChild(nextButton);
}

function navigate(direction) {
    var newIndex = currentQuestionIndex + direction;
    if (newIndex >= 0 && newIndex < questions.length) {
        // Если пользователь идет назад, сохраняем ответ на текущий вопрос
        if (direction === -1) {
            saveAnswer();
        }

        // Показываем новый вопрос
        showQuestion(newIndex);
        createNavigationButtons(newIndex); // Обновляем кнопки навигации для нового вопроса
        currentQuestionIndex = newIndex;

        // Включаем кнопку "Назад", если это не первый вопрос
        prevButton.disabled = newIndex === 0;

        // Если новый вопрос последний
        if (newIndex === questions.length - 1) {
            nextButton.innerText = "Проверить";
        } else {
            nextButton.innerText = "Вперед";
        }
    }
}

// Функция для отображения результатов теста
function showResults() {
    // Скрываем вопросы
    quizContainer.style.display = 'none';

    // Подсчитываем количество правильных ответов
    var correctAnswersCount = 0;
    questions.forEach(function (question, index) {
        var answerInputs = document.querySelectorAll('input[name="answer' + index + '"]');
        answerInputs.forEach(function (input) {
            if (input.checked && question.answers[input.value].correct) {
                correctAnswersCount++;
            }
        });
    });

    // Создаем элемент для вывода результатов
    var resultMessage = document.createElement('p');
    resultMessage.innerText = 'Вы ответили правильно на ' + correctAnswersCount + ' из ' + questions.length + ' вопросов.';
    lessonContent.appendChild(resultMessage);
}

// Функция для сохранения ответа на текущий вопрос
function saveAnswer() {
    var answerInputs = document.querySelectorAll('input[name="answer' + currentQuestionIndex + '"]');
    var answered = false;
    answerInputs.forEach(function (input) {
        if (input.checked) {
            answered = true;
            // Здесь можно сохранить ответ пользователя
        }
    });
}

quizContainer.addEventListener('change', function (event) {
    var selectedInputs = document.querySelectorAll('input[type="radio"]:checked');

    // Если был выбран какой-либо вариант ответа, делаем кнопку "Вперед" активной
    if (selectedInputs.length > 0) {
        nextButton.disabled = false;
    } else {
        // Если ни один вариант ответа не выбран, делаем кнопку "Вперед" неактивной
        nextButton.disabled = true;
    }
});

// Обработчик нажатия на кнопку "Проверить"
testButton.addEventListener('click', function () {
    // Скрытие контента урока и отображение теста
    lessonContent.style.display = 'none';
    testButton.style.display = 'none';
    backBtn.style.display = 'none'; // Скрытие кнопки "Назад"
    quizContainer.style.display = 'block';

    // Создаем кнопку "Вперед" и "Проверить"
    createNextButton();
    createPrevButton();

    showQuestion(0); // Показываем первый вопрос
    createNavigationButtons(0); // Создаем кнопки "Назад" и "Вперед" для первого вопроса
});

// Функция создания кнопки "Вперед"
function createNextButton() {
    nextButton = document.createElement('button');
    nextButton.classList.add('quiz-button');
    nextButton.innerText = 'Проверить';
    nextButton.addEventListener('click', showResults); // Вызываем функцию showResults() при нажатии на кнопку "Проверить"
    navigationButtons.appendChild(nextButton);
}

// Функция создания кнопки "Назад"
function createPrevButton() {
    prevButton = document.createElement('button');
    prevButton.classList.add('quiz-button');
    prevButton.innerText = 'Назад';
    prevButton.disabled = true; // Пока не был выбран ответ
    prevButton.addEventListener('click', function () {
        navigate(-1); // Перемещение к предыдущему вопросу
    });
    navigationButtons.insertBefore(prevButton, nextButton); // Вставляем перед кнопкой "Вперед"
}
