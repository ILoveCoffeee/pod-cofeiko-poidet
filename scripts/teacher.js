// Преподаватели
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('questionModal');
    const closeBtn = document.querySelector('.close-button');
    const questionForm = document.getElementById('questionForm');
    const askQuestionBtn = document.getElementById('askQuestionBtn');
    const responseMessage = document.createElement('div');
    responseMessage.style.display = 'none';
    document.body.appendChild(responseMessage);

    // Функция для открытия модального окна
    askQuestionBtn.onclick = function() {
        modal.style.display = 'block';
        document.body.classList.add('body-no-scroll'); // Отключаем прокрутку
    };

    // Закрытие модального окна при нажатии на кнопку закрытия
    closeBtn.onclick = function() {
        modal.style.display = 'none';
        document.body.classList.remove('body-no-scroll'); // Включаем прокрутку обратно
    };

    // Закрытие модального окна при нажатии вне его области
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.classList.remove('body-no-scroll'); // Включаем прокрутку обратно
        }
    };

    // Обработка отправки формы
    questionForm.onsubmit = function(event) {
        event.preventDefault(); // Предотвратить стандартную отправку формы
        // Здесь код для отправки данных формы, например, через Fetch API
        console.log("Форма отправлена. Преподаватель: ", questionForm.teacherName.value, ", Email: ", questionForm.userEmail.value, ", Вопрос: ", questionForm.userQuestion.value);

        // Показать сообщение об успешной отправке
        responseMessage.textContent = 'Ваш вопрос успешно отправлен!';
        responseMessage.style.display = 'block';
        responseMessage.style.color = 'green';
        responseMessage.style.position = 'fixed';
        responseMessage.style.bottom = '20px';
        responseMessage.style.right = '20px';
        responseMessage.style.padding = '20px';
        responseMessage.style.backgroundColor = '#ddffdd';
        responseMessage.style.border = '1px solid #00aa00';
        responseMessage.style.borderRadius = '5px';

        // Очищаем форму
        questionForm.reset();

        // Закрываем модальное окно через 3 секунды
        setTimeout(function() {
            modal.style.display = 'none';
            responseMessage.style.display = 'none'; // Скрываем сообщение об отправке
            document.body.classList.remove('body-no-scroll');
        }, 3000);
    };

    // Добавление обработчика клика на карточки преподавателей
    const teacherItems = document.querySelectorAll('.teacher-item');
    teacherItems.forEach(item => {
        item.addEventListener('click', function() {
            // Проверка, была ли уже провернута карточка
            const isFlipped = this.classList.contains('flipped');

            // Сначала закрываем все открытые карточки
            teacherItems.forEach(item => {
                item.classList.remove('flipped');
            });

            // Если карточка была провернута, то скрываем ее, иначе открываем
            if (!isFlipped) {
                this.classList.add('flipped');
            }
        });
    });
});