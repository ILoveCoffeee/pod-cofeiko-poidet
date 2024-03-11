// Объявляем объект для хранения идентификаторов уроков
var lessonId = {};

// Функция для перенаправления на страницу урока
function goToLesson(lessonId) {
    window.location.href = `lessons/${lessonId}.html`;
}

// Функция для отображения текста по нажатию на кнопку
function showText(buttonId) {
    var contentDiv = document.getElementById('content');
    var sidebarDiv = document.getElementById('sidebar');
    var classNumber;

    // Убираем выделение у всех кнопок
    var buttons = document.querySelectorAll('#sidebar button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Выделяем текущую кнопку
    var currentButton = document.getElementById(buttonId);
    currentButton.classList.add('active');

    switch (buttonId) {
        case 'button1':
            classNumber = 7;
            break;
        case 'button2':
            classNumber = 8;
            break;
        case 'button3':
            classNumber = 9;
            break;
        case 'button4':
            classNumber = 10;
            break;
        case 'button5':
            classNumber = 11;
            break;
        default:
            contentDiv.innerHTML = "Неопределенная кнопка.";
            return;
    }

    var header = "<span class='program-header'>Программа для " + classNumber + " класса</span>";

    var lessons = [];
    switch (classNumber) {
        case 7:
            lessons = [
                { id: "lesson1", title: "Урок 1", topic: "Что изучает информатика. Правила гигиены и техники безопасности при работе на компьютере" },
                { id: "lesson2", title: "Урок 2", topic: "Информация, ее свойства и классификация" },
                { id: "lesson3", title: "Урок 3", topic: "Основные компоненты комрьютера и их функции" },
                { id: "lesson4", title: "Урок 4", topic: "Информационные процессы" },
                { id: "lesson5", title: "Урок 5", topic: "Кодирование информации. Двоичный код" },
                { id: "lesson6", title: "Урок 6", topic: "Единицы измерения информации" },
                { id: "lesson7", title: "Урок 7", topic: "Программное обеспечение компьютера" },
                { id: "lesson8", title: "Урок 8", topic: "Файл и файловая система" },
                { id: "lesson9", title: "Урок 9", topic: "Основы информационной безопасности и защиты информации" },
                { id: "lesson10", title: "Урок 10", topic: "Формирование изображения на экране компьютера" },
                { id: "lesson11", title: "Урок 11", topic: "Растровая графика" },
                { id: "lesson12", title: "Урок 12", topic: "Векторная графика" },
                { id: "lesson13", title: "Урок 13", topic: "Текстовые документы и оценка их количественных параметров" },
                { id: "lesson14", title: "Урок 14", topic: "Создание текстовых документов на компьютере" },
                { id: "lesson15", title: "Урок 15", topic: "Интеллектуальные возможности современных систем обработки текстов" },
                { id: "lesson16", title: "Урок 16", topic: "Технология мультимедиа. Создание мультимедийной презентации" },
                { id: "lesson17", title: "Урок 17", topic: "" }
            ];
            break;
        case 8:
            lessons = [
                { id: "lesson14", title: "Урок 1 | класс " + classNumber, topic: "Введение в информатику" },
                { id: "lesson15", title: "Урок 2 | класс " + classNumber, topic: "Основы программирования на Python" }
            ];
            break;
        case 9:
            lessons = [
                { id: "lesson16", title: "Урок 1 | класс " + classNumber, topic: "Основы HTML и CSS" },
                { id: "lesson17", title: "Урок 2 | класс " + classNumber, topic: "JavaScript: введение" },
                { id: "lesson18", title: "Урок 3 | класс " + classNumber, topic: "Основы работы с DOM" }
            ];
            break;
        case 10:
            lessons = [
                { id: "lesson19", title: "Урок 1 | класс " + classNumber, topic: "Основы программирования на Python" },
                { id: "lesson20", title: "Урок 2 | класс " + classNumber, topic: "Работа с файлами" }
            ];
            break;
        case 11:
            lessons = [
                { id: "lesson21", title: "Урок 1 | класс " + classNumber, topic: "JavaScript: введение" },
                { id: "lesson22", title: "Урок 2 | класс " + classNumber, topic: "Основы работы с DOM" },
                { id: "lesson23", title: "Урок 3 | класс " + classNumber, topic: "События в JavaScript" }
            ];
            break;
        default:
            contentDiv.innerHTML = "Неопределенная кнопка.";
            return;
    }

    var htmlContent = "<h2>" + header + "</h2>";
    for (var i = 0; i < lessons.length; i++) {
        // Присваиваем урокам уникальный идентификатор
        lessonId[classNumber + "-" + (i + 1)] = lessons[i].id;

        htmlContent += "<div id='" + lessons[i].id + "'>"; // начало блока урока
        htmlContent += "<h3 style='font-weight:normal;'>" + lessons[i].title + "</h3>"; // добавляем заголовок урока
        htmlContent += "<p style='font-family: Arial, sans-serif;'>" + lessons[i].topic + "</p>"; // добавляем тему урока
        htmlContent += "<button onclick='goToLesson(\"" + lessons[i].id + "\")'>Перейти к уроку</button>"; // Передаем идентификатор урока
        htmlContent += "</div>"; // конец блока урока
        if (i < lessons.length - 1) {
            htmlContent += "<hr>"; // разделитель между уроками
        }
    }

    
    sidebarDiv.style.display = 'block';
    contentDiv.innerHTML = htmlContent;
    
}

// Показываем первый урок при загрузке страницы
window.addEventListener('DOMContentLoaded', (event) => {
    showText('button1');

    var contentDiv = document.getElementById('content');
    var scrolled = false;

    // Функция для определения, долистал ли пользователь до конца блока
    function isScrolledToBottom() {
        return contentDiv.scrollHeight - contentDiv.scrollTop === contentDiv.clientHeight;
    }

    // Обработчик прокрутки блока
    contentDiv.addEventListener('scroll', function() {
        scrolled = isScrolledToBottom();
    });

    // Обработчик изменения содержимого блока
    contentDiv.addEventListener('DOMSubtreeModified', function() {
        if (scrolled) {
            // Если пользователь был прокручен до конца, возвращаем его туда после изменения содержимого
            contentDiv.scrollTop = contentDiv.scrollHeight;
        }
    });
});
