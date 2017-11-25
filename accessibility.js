
(function (window, document) {
    'use strict';

    var Accessibility = {
        init: init
    }

    var $btnIncreaseFontSize = document.querySelector('[data-accessibility="font-increase"]');
    var $btnDecreaseFontSize = document.querySelector('[data-accessibility="font-decrease"]');
    var $btnContrast = document.querySelector('[data-accessibility="contrast"]');
    var countIncrease = 0;
    var defaultConfig;
    
    function init(config) {
        _setDefaultValues(config);
        _initEvents();
        _verifyContrast();
    }

    function _setDefaultValues(config) {
        var userConfig = config;
        defaultConfig = {
            font: {
                increment: userConfig.fontIncrement || 2,
                incrementLimit: userConfig.fontIncrementLimit || 2
            },
            contrast: {
                class: userConfig.contrastClass || 'color-inverter'
            }
        }
    }

    function _initEvents() {
        $btnIncreaseFontSize.addEventListener('click', _increaseFontSize);
        $btnDecreaseFontSize.addEventListener('click', decreaseFontSize);
        $btnContrast.addEventListener('click', _setContrast);
    }

    function _toggleClass(element, classe) {
        var $element = document.querySelector(element);
        if ($element.classList.contains(classe)) {
            $element.classList.remove(classe);
        } else {
            $element.classList.add(classe);
        }
    }

    function _getTextElements() {
        return ['p', 'span', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'dt', 'dd', 'button', 'input[type=text]', 'input[type=button]', 'input[type=submit]', 'label'];
    }

    function _adjustFontSize(operator) {
        var $html = document.querySelector('html');
        var textElements = _getTextElements();
        textElements.forEach(function (item) {
            var $elements = document.getElementsByTagName(item);
            Array.prototype.forEach.call($elements, function (element) {
                var elementFontSize = _getElementFontSize(element);
                if (operator === '+') {
                    elementFontSize += defaultConfig.font.increment;
                } else if (operator === '-') {
                    elementFontSize -= defaultConfig.font.increment;
                }
                element.setAttribute('style', 'font-size: ' + elementFontSize + 'px;');
            });
        });
    }

    function _getElementFontSize(element) {
        var elementFontSize = window.getComputedStyle(element, null).getPropertyValue('font-size');
        return _convertFontSizeToNumber(elementFontSize);
    }
    
    function _convertFontSizeToNumber(string) {
        /** 
         * @todo Garantir que a unidade seja pixel, caso não seja converter para
        **/
        var regex = /(?:\d+\.?(?:\d+)?)/;
        string = string.match(regex)[0];
        string = Number(string);
        return string;
    }

    function _countFontIncrement(operator) {
        if (operator === '+') {
            countIncrease += 1;
        } else {
            countIncrease -= 1;
        }
        return countIncrease;
    }

    function _increaseFontSize() {
        var operator = '+';
        if (countIncrease < defaultConfig.font.incrementLimit) {
            _adjustFontSize('+');
            _countFontIncrement('+')
        }
    }
    
    function decreaseFontSize() {
        var operator = '-';
        if (countIncrease) {
            _adjustFontSize(operator);
            _countFontIncrement(operator);
        }
    }

    function _verifyContrast() {
        if (localStorage.getItem('accessibility-contrast') === 'true') {
           _setContrast();
        }
    }

    function _setContrast() {
        var $body = document.body;
        _toggleClass('body', defaultConfig.contrast.defaultClass);
        localStorage.setItem('accessibility-contrast', $body.classList.contains(defaultConfig.contrast.defaultClass));
    }

    window.Accessibility = Accessibility;
})(window, document);