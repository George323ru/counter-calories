import {formatNumber} from '../utils/format-number.js';


// Создается класс объекта, по которому будет создаваться объект с результатом
export default class Result {
  constructor(element) {
    // Записываем все элементы артикла counter в одну переменную
    this.counter = element;
    
    // Находим секцию с резульатами
    this.root = element.querySelector(`.counter__result`);
    // Находим span в котором будет записан результат каллорий
    this.caloriesNormOutput = this.root.querySelector(`#calories-norm`);
    this.caloriesMinOutput = this.root.querySelector(`#calories-minimal`);
    this.caloriesMaxOutput = this.root.querySelector(`#calories-maximal`);
  }

  // присваиваем полям введеные польовалетем значения
  show(calories) {
    this.caloriesNormOutput.textContent = formatNumber(calories.norm);
    this.caloriesMinOutput.textContent = formatNumber(calories.min);
    this.caloriesMaxOutput.textContent = formatNumber(calories.max);

    // Удаляем класс, который скрывает вывод формул
    this.root.classList.remove(`counter__result--hidden`);
    this.root.scrollIntoView({block: `center`, behavior: `smooth`});
  }


  hide() {
    this.caloriesNormOutput.textContent = 0;
    this.caloriesMinOutput.textContent = 0;
    this.caloriesMaxOutput.textContent = 0;

    this.root.classList.add(`counter__result--hidden`);
    this.counter.scrollIntoView({block: `start`, behavior: `smooth`});
  }
}
