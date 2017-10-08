# fragment-shader-editor

This [simple editor](https://tolokoban.github.io/fragment-shader-editor/index.html) has only one purpose: test a fragment shader on a quad covering the screen.
The inputs are:
```
uniform float t;
varying vec2 varPos;
```

* `t` is the time expressed in seconds.
* `varPos.x` is the X coordinate lying between -1 and +1.
* `varPos.y` is the Y coordinate lying between -1 and +1.

Click on the button in the top-left corner to edit the fragment shader.
