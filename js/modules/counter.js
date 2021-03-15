import {
  formatInput
} from '../utils/format-input.js';
import Result from './result.js';

// Задали постоянные для физической активности
const PhysicalActivityRatio = {
  MIN: 1.2,
  LOW: 1.375,
  MEDIUM: 1.55,
  HIGH: 1.725,
  MAX: 1.9,
};

// Формулы для расчета каллорий
const CaloriesFormulaFactor = {
  AGE: 5,
  WEIGHT: 10,
  HEIGHT: 6.25,
};

const CaloriesFormulaConstant = {
  MALE: 5,
  FEMALE: -160
};

const CaloriesMinMaxRatio = {
  MIN: 0.85,
  MAX: 1.15
};

// Создали класс для объектов
export default class Counter {
  constructor(element) {
    // Нашли article с классом counter и всем содержимым
    this.root = element;

    // Нашли форму в разметке
    this.form = this.root.querySelector(`.counter__form`);
    // Создаем коллекцию из всех элементов в форме
    this.elements = this.form.elements;
    // Создаем коллекцию из всех input в форме
    this.parameters = this.elements.parameters.elements;

    // Нашли кнопку самбит
    this.submit = this.elements.submit;

    // Нашли кнопку reset
    this.reset = this.elements.reset;
    // Нашли чекбоксы с полом
    this.gender = this.elements.gender;

    this.age = this.elements.age;
    this.weight = this.elements.weight;
    this.height = this.elements.height;
    this.activity = this.elements.activity;
    // Создаем новый экземпляр по шаблону класса Result
    this.result = new Result(this.root);
    // Находим три инпута(возраст, рост, вес)
    this.parametersItems = Array.from(this.parameters);

    this._onFormInput = this._onFormInput.bind(this);

    this._onFormReset = this._onFormReset.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
  }


  _onFormInput() {
    this.submit.disabled = !this.form.checkValidity();
    console.log(this.form.checkValidity())
    this.reset.disabled = !this.parametersItems.some((el) => el.value);

    this.age.value = formatInput(this.age);
    this.height.value = formatInput(this.height);
    this.weight.value = formatInput(this.weight);
  }

  // Блокирует кнопки reset, submit, и прячет результат
  _onFormReset() {
    this.reset.disabled = true;
    this.submit.disabled = true;
    // Вызываем метод hide() из модуля result.js
    this.result.hide();
  }

  // При самбите формы разcчитываем норму каллорий, максимум и минимум
  _onFormSubmit(evt) {
    evt.preventDefault(); // Отменяет стандартную отправку формы

    const caloriesData = {
      // Подставляем значения из обработчиков
      norm: this.getCaloriesNorm(),
      min: this.getCaloriesMin(),
      max: this.getCaloriesMax()
    };

    this.result.show(caloriesData);
  }

  // Создание событий для инпутов и кнопок
  init() {
    this.form.addEventListener(`input`, this._onFormInput, true);
    this.form.addEventListener(`reset`, this._onFormReset);
    this.form.addEventListener(`submit`, this._onFormSubmit);
  }

  // удаление событий для инпутов и кнопок
  deinit() {
    this.form.removeEventListener(`input`, this._onFormInput, true);
    this.form.removeEventListener(`reset`, this._onFormReset);
    this.form.removeEventListener(`submit`, this._onFormSubmit);
  }

  // Обработчик расчета нормы каллорий
  getCaloriesNorm() {
    const age = CaloriesFormulaFactor.AGE * this.age.value;
    const weight = CaloriesFormulaFactor.WEIGHT * this.weight.value;
    const height = CaloriesFormulaFactor.HEIGHT * this.height.value;
    const gender = CaloriesFormulaConstant[this.gender.value.toUpperCase()];
    const activity = PhysicalActivityRatio[this.activity.value.toUpperCase()];

    return Math.round((weight + height - age + gender) * activity);
  }

  getCaloriesMin() {
    return Math.round(this.getCaloriesNorm() * CaloriesMinMaxRatio.MIN);
  }

  getCaloriesMax() {
    return Math.round(this.getCaloriesNorm() * CaloriesMinMaxRatio.MAX);
  }
}