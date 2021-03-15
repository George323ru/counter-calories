import Counter from './modules/counter.js';

// Создаем коллекцию из всех элементов артикла .counter в одном экземпляре
const counterElements = document.querySelectorAll(`.counter`);

// Из каждого элемента коллекции counterElements создаем экземпляр объекта
counterElements.forEach((element) => {
  // Создаем экземпляр элемента на основе класса Counter из данных, полученных в counterElements
  const counter = new Counter(element);
  // Запускаем метод init в каждом экземпляре,
  // через который навешиваем события на input, submit и reset
  counter.init();   
});
