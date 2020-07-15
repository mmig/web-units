# web-units

`web-units` is a JavaScript library for converting between angle and length units. Both are intended for use within other libraries that need to convert between acceptable CSS units when creating polyfills. Using these unit conversions allows a library to support all valid CSS units easily.

__Based on [heygrady/Units](https://github.com/heygrady/Units)__

## `angle`
Used for converting between various angle units. Angle calculations are simple math and the library is less than 500 characters when minified. There's a detailed description of [CSS angle units on the MDN](https://developer.mozilla.org/en/CSS/angle).

```javascript
// Degrees
angle.toDeg('360deg'); //-> 360
angle.toDeg((2 * Math.PI) +'rad'); //-> 360
angle.toDeg('4grad'); //-> 360
angle.toDeg('1turn'); //-> 360

// Radians
angle.toRad('360deg'); //-> 6.283185307179586 (2 * PI)
angle.toRad((2 * Math.PI) +'rad'); //-> 6.283185307179586 (2 * PI)
angle.toRad('4grad'); //-> 6.283185307179586 (2 * PI)
angle.toRad('1turn'); //-> 6.283185307179586 (2 * PI)

// Gradians
angle.toGrad('360deg'); //-> 4
angle.toGrad((2 * Math.PI) +'rad'); //-> 4
angle.toGrad('4grad'); //-> 4
angle.toGrad('1turn'); //-> 4

// Turns
angle.toTurn('360deg'); //-> 1
angle.toTurn((2 * Math.PI) +'rad');  //-> 1
angle.toTurn('4grad'); //-> 1
angle.toTurn('1turn'); //-> 1
```

## `length`
Used for converting between various length units. Absolute units -- such as inches, points and centimeters -- are relative to the Screen DPI which is usually 96. Not all units are supported in every browser, in those cases 0 is returned. In all cases this library uses the browsers own CSS calculations (by setting values with the style property). There's a detailed description of [CSS length units on the MDN](https://developer.mozilla.org/en/CSS/length). The length library is around 1200 characters when minified.

```javascript
// Absolute Units
// Different based on the Screen DPI
length.toPx(element, '96px'); //-> Always: 96px
length.toPx(element, '25.4mm'); //-> Always: 96px
length.toPx(element, '2.54cm'); //-> Always: 96px
length.toPx(element, '1in'); //-> Always: 96px
length.toPx(element, '72pt'); //-> Always: 96px
length.toPx(element, '6pc'); //-> Always: 96px
length.toPx(element, '25.4mozmm'); //-> Usually: 0px; Firefox: 95.673418px

// Viewport-relative Units
// Different based on the browser windows size
length.toPx(element, '2vh'); //-> Firefox 19, Chrome 20, Safari 6, IE9: based on viewport height
length.toPx(element, '2vw'); //-> Firefox 19, Chrome 20, Safari 6, IE9: based on viewport width
length.toPx(element, '2vm'); //-> Usually: 0px; IE9: based on viewport height/width
length.toPx(element, '2vmin'); //-> Firefox 19, Chrome 20, Safari 6, IE9: based on viewport height/width
length.toPx(element, '2vmax'); //-> Firefox 19, Chrome 20, IE9: based on viewport height/width

// Font-relative Units
// Different based on the font on the element (Below is default font of 16px serif font)
length.toPx(element, '6em'); //-> Usually: 96px
length.toPx(element, '13.4ex'); //-> Usually: 96px; Opera: 94px; IE7: 107px; Safari: 112px;
length.toPx(element, '12ch'); //-> Usually: 0px; Firefox: 96px; IE9: 83.2px
length.toPx(element, '6rem'); //-> Usually: 96px; IE8, IE7: 0px;
```

Percentage lengths cannot be easily determined because the percentage is relative to a different measurement based on the CSS property it is applied to. It is usually based on the height or width of the parent element (padding, margin, top, bottom, etc.). Measuring percentages requires the CSS property to be passed as well. WebKit won't reliably convert percentage units. Firefox will pass back an unconverted unit in cases where the property is unsupported but the unit is valid such as a width on an inline element or a top on a statically positioned element.

```javascript
length.toPx(element, '10%', 'paddingLeft'); //-> reliable in all browsers
length.toPx(element, '10%', 'top'); //-> unreliable in Firefox
```
