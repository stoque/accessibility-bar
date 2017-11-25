# Accessibility Bar
Accessibility Bar plugin.

#### Features
- Buttons to Increment/Decrement font size
- Button to toggle high-contrast version based on body class
- Button to LIBRAS (Língua brasileira de sinais)

## Quick Start

### Install
Download the [latest release](https://github.com/stoque/accessibility-bar/releases).

### Config
Add script with minified file

```html
<script type="text/javascript" src="vendor/accessibility/accessibility.js"></script>
```

Create markup with data-accessibility in buttons, example:
```html
<ul class="list">
    <li class="item">
        <button class="action" type="button" data-accessibility="font-decrease">
            A-
        </button>
    </li>
    <li class="item">
        <button class="action" type="button" data-accessibility="font-increase">
            A+
        </button>
    </li>
    <li class="item">
        <button class="action" type="button" data-accessibility="contrast">
          Contrast
        </button>
    </li>
    <li class="item">
        <a class="link" target="_blank" href="http://www.vlibras.gov.br/">
          VLIBRAS
        </a>
    </li>
</ul>
```

_(optional)_ Add link for css file

```html
<link rel="stylesheet" href="vendor/accessibility/accessibility.css">
```

### Use
Call the plugin function

```javascript
Accesibility.init();
```

## Options
Make some customizations

```js
Accessibility.init({
  fontIncrement: 2,
  fontIncrementLimit: 2,
  contrastClass: 'color-inverter'
})
```

|Key|Description|Type|Default|
|---|---|---|---|
|contrastClass|Define a custom class name for high contrast version|string|color-inverter|
|fontIncrementLimit|Define a custom maximum click for font adjust|integer|2|
|fontIncrement|Define a custom increment rate for font adjust|integer|2|
