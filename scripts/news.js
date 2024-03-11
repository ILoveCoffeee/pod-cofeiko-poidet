// Карусель новостей
document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0;
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const totalItems = items.length;
    let interval = null; // Инициализируем переменную интервала как null

    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.remove('active');
            indicators[index] && indicators[index].classList.remove('active');
        });
        items[currentIndex].classList.add('active');
        indicators[currentIndex] && indicators[currentIndex].classList.add('active');
    }

    function startInterval() {
        clearInterval(interval); // Очищаем существующий интервал перед созданием нового
        interval = setInterval(nextSlide, 5000); // Устанавливаем новый интервал
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }

    // Назначаем обработчики событий для индикаторов
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
            startInterval(); // Перезапускаем интервал после ручного переключения
        });
    });

    // Опционально: Пауза и возобновление интервала при уходе/возвращении пользователя на вкладку
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            startInterval(); // Возобновляем интервал
        } else {
            clearInterval(interval); // Останавливаем интервал
        }
    });

    startInterval(); // Начинаем автоматическое переключение при загрузке страницы
});