// FAQ
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.classList.contains('active');

            // Сначала закрываем все ответы
            document.querySelectorAll('.faq-answer').forEach(el => {
                el.style.height = '0px'; // Сбрасываем высоту, чтобы анимировать закрытие
                el.classList.remove('active');
            });
            document.querySelectorAll('.faq-question').forEach(el => {
                el.classList.remove('active');
            });

            // Если выбранный ответ был закрыт, открываем его
            if (!isOpen) {
                answer.classList.add('active');
                this.classList.add('active');

                // Расчет и установка высоты для анимации
                const answerHeight = answer.scrollHeight + "px";
                answer.style.height = answerHeight;
            } else {
                // Необязательно, если вы хотите закрыть ответ при повторном клике
                answer.style.height = "0px";
            }
        });
    });
});

// Маркер наверх
document.addEventListener('DOMContentLoaded', function() {
    var toTopButton = document.getElementById('toTop');
    window.onscroll = function() {
        if (window.scrollY > 100) {
            toTopButton.style.display = 'block';
        } else {
            toTopButton.style.display = 'none';
        }
    };

    toTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
});