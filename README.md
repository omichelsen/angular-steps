# angular-steps

Wrap your Angular UI logic into a series of steps (pages/slides).

Demo: http://codepen.io/omichelsen/pen/zkCun

## Install

```bash
$ bower install angular-steps --save
```

Include the library in your web page:

```html
<script src="bower_components/angular-steps/angular-steps.js"></script>
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
        <h1>Step 1</h2>
        <button step-next>Next</button>
    </step>
    <step>
        <h1>Step 2</h2>
        <button step-previous>Previous</button>
    </step>
</steps>
```

The main `<steps>` directive has the following (optional) properties:

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

## Licence
The MIT License (MIT)

Copyright (c) 2014 Ole Michelsen http://ole.michelsen.dk

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
