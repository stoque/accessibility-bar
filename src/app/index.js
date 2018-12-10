class Accessbility {
  constructor() {
    this.$btnIncreaseFontSize = document.querySelector('[data-accessibility="font-increase"]')
    this.$btnDecreaseFontSize = document.querySelector('[data-accessibility="font-decrease"]')
    this.$btnContrast = document.querySelector('[data-accessibility="contrast"]')
    this.countIncrease = 0
    this.defaultConfig = {}
  }

  init (config = null) {
    this._setDefaultValues(config);
    this._initEvents();
    this._verifyContrast();
  }

  _setDefaultValues(config) {
    this.defaultConfig = {
        font: {
          increment: config ? userConfig.fontIncrement : 2,
          incrementLimit: config ? userConfig.fontIncrementLimit : 2
        },
        contrast: {
          class: config ? userConfig.contrastClass : 'contrast-class'
        }
    }
  }

  _verifyContrast() {
    if (localStorage.getItem('accessibility-contrast') === 'true') {
      this._setContrast();
    }
  }

  _initEvents() {
    this.$btnIncreaseFontSize.addEventListener('click', this._increaseFontSize);
    this.$btnDecreaseFontSize.addEventListener('click', this._decreaseFontSize);
    this.$btnContrast.addEventListener('click', this._setContrast);
  }

  _toggleClass(element, classe) {
    const $element = document.querySelector(element);
    if ($element.classList.contains(classe)) {
      $element.classList.remove(classe);
    } else {
      $element.classList.add(classe);
    }
  }

  _getTextElements() {
    return ['p', 'span', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'dt', 'dd', 'button', 'input[type=text]', 'input[type=button]', 'input[type=submit]', 'label'];
  }

  _adjustFontSize(operator) {
    const textElements = this._getTextElements();
    textElements.forEach((item) => {
      const $elements = document.getElementsByTagName(item);
      Array.prototype.forEach.call($elements, (element) => {
        let elementFontSize = this._getElementFontSize(element);
        if (operator === '+') {
          elementFontSize += this.defaultConfig.font.increment;
        } else if (operator === '-') {
          elementFontSize -= this.defaultConfig.font.increment;
        }
        element.style.fontSize = elementFontSize + 'px';
      });
    });
  }

  _getElementFontSize(element) {
    const elementFontSize = window.getComputedStyle(element, null).getPropertyValue('font-size');
    return this._convertFontSizeToNumber(elementFontSize);
  }

  _convertFontSizeToNumber(string) {
      // TODO: Garantir que a unidade seja pixel, caso não seja converter para
    const regex = /(?:\d+\.?(?:\d+)?)/;
    string = string.match(regex)[0];
    string = Number(string);
    return string;
  }

  _countFontIncrement(operator) {
    if (operator === '+') {
        this.countIncrease += 1;
    } else {
        this.countIncrease -= 1;
    }
    return this.countIncrease;
  }

  _increaseFontSize = () => {
    if (this.countIncrease < this.defaultConfig.font.incrementLimit) {
      this._adjustFontSize('+');
      this._countFontIncrement('+')
    }
  }

  _decreaseFontSize = () => {
    const operator = '-';
    if (this.countIncrease) {
      this._adjustFontSize(operator);
      this._countFontIncrement(operator);
    }
  }

  _setContrast = () => {
    const $body = document.body;
    this._toggleClass('body', this.defaultConfig.contrast.class);
    localStorage.setItem('accessibility-contrast', $body.classList.contains(this.defaultConfig.contrast.class));
  }
}

export default Accessbility;
