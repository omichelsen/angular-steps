# angular-steps

Wrap your Angular UI logic into a series of steps (pages/slides).

[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

Demo: http://codepen.io/omichelsen/pen/zkCun

## Install

```bash
$ bower install angular-steps --save
```

Include the style sheet and library in your web page:

```html
<link href="bower_components/angular-steps/dist/angular-steps.css" rel="stylesheet">
```

```html
<script src="bower_components/angular-steps/dist/angular-steps.js"></script>
```

angular-steps has no other dependencies than [Angular](https://angularjs.org/)
itself, and [ngAnimate](https://docs.angularjs.org/api/ngAnimate/service/$animate)
if you want animated transition effects.

## Usage

Require angular-steps as a dependency for your app:

```javascript
angular.module('MyApp', ['angular-steps']);
```

Start creating some steps around your UI:

```html
<steps>
    <step>
        <h1>Step 1</h1>
        <button step-next>Next</button>
    </step>
    <step>
        <h1>Step 2</h1>
        <button step-previous>Previous</button>
    </step>
</steps>
```

The main `<steps>` directive has the following (optional) attributes:

- **name**: Name of the group of steps. Use if you have multiple `<steps>` to
    reference them in the `ServiceHandler`.
- **template**: Path to a custom template.
- **current-step**: Variable containing the name of the currently selected step.
    Can also be used to change selected step.
- **on-finish**: Scope function to be called when the user has been through all steps.

### Buttons

You can step navigate back and forward between the steps using these built-in
attributes:

- **step-next**: Go to next step.
- **step-previous**: Go to previous step.
- **step-cancel**: Go to first step.
- **step-finish**: Triggers the `on-finish` callback. Clicking `step-next` on
    the last step will have same effect.

All attributes can receive an optional function to be called before changing
the step:

```html
<button step-next="doStuff()">Next</button>
```

In this case, `doStuff()` will be called before going to the next step.

### Accessing steps from the controller

If you want to access and manipulate the steps from the controller, you can
inject the StepsHandler.

This example validates that the input name is "Marvin" and proceeds to the next
step:

```html
<steps>
    <step>
        <input type="text" ng-model="name">
        <button ng-click="validateAndSubmit">Save my name</button>
    </step>
</steps>
```
```javascript
myapp.controller('MyCtrl', ['StepsService', function (stepsService) {
    $scope.validateAndSubmit = function () {
        if ($scope.name === 'Marvin') {
            stepsService.steps().next();
        }
    };
}]);
```

You can use the following functions on `StepsService.steps()`:

- **next()**: Go to next step.
- **previous()**: Go to previous step.
- **cancel()**: Go to first step.
- **finish()**: Triggers the `on-finish` callback.
- **goTo(** *number* | *name* **)**: Go to a specific step. Argument can be
    either a number (zero-based index) or the **name** of a step.
- **selectedIndex()**: Get current step index.

You can get the number of steps from `StepsService.steps().steps.length`.

#### Multiple steps

If you have multiple `<steps>` in your page and wish to access them from the
`StepsService`, be sure to specify a unique **name** on each like so:

```html
<steps name="myLoginFlow"> ... </steps>
<steps name="mySecondFlow"> ... </steps>
```

Access them by name to avoid conflicts:

```javascript
StepsService.steps('myLoginFlow').next();
StepsService.steps('mySecondFlow').next();
```

## Styling

By default the steps are overlayed on top of each other using
`position: absolute` and `z-index`.

If you want to style each step individually, you can apply a CSS class to it
as you would any element:

```html
<step class="step-yellow">
    ...
</step>
```
```css
.step-yellow {
    background: yellow;
}
```

The default styles for angular-steps are supplied in both CSS, SCSS and LESS
format, whichever your prefer.

### Animations

You can animate the transition between the steps using
[ngAnimate](https://docs.angularjs.org/api/ngAnimate/service/$animate).
The following styles will add a fade in/out animation between the steps:

```css
.angular-steps .step.ng-hide-add,
.angular-steps .step.ng-hide-remove {
    transition: all 0.6s ease-in-out;
    opacity: 1;
}
.angular-steps .step.ng-hide {
    opacity: 0;
}
```


## Credits

This project was inspired by
[angular-wizard](https://github.com/mgonto/angular-wizard) by
[@mgonto](https://twitter.com/mgonto). angular-steps is intended to be simpler,
with a subset of features, smaller footprint and fewer dependencies.

[travis-image]: https://img.shields.io/travis/omichelsen/angular-steps/master.svg
[travis-url]: https://travis-ci.org/omichelsen/angular-steps
[coveralls-image]: https://img.shields.io/coveralls/omichelsen/angular-steps/master.svg
[coveralls-url]: https://coveralls.io/r/omichelsen/angular-steps?branch=master