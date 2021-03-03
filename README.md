# Basic CompoDraw JS Drawing Instructions

Provides essential instructs for [CompoDrawJS](https://github.com/Thor-x86/compodraw-js). With this instructs package, you can compose and draw basic shapes and visual effects like rectangle, ellipse, crop, move, rotate, and more.

## How to Install

1. Make sure [CompoDrawJS](https://github.com/Thor-x86/compodraw-js) already installed.
2. Add to your project with Yarn:
   ```bash
   yarn add compodraw-instructs
   ```
   or with NPM:
   ```bash
   npm install compodraw-instructs --save
   ```
   or you can [download the bundled JavaScript](https://github.com/Thor-x86/compodraw-js-instructs/releases) file for plain HTML or PHP project
3. **That's it!** for more info, see reference below.

## References

### Crop

The fast way to remove excessive drawing. If you want cut other than in square, use Mask instead.

```xml
<crop
  x="0"  width="128"
  y="0"  height="128">

  <!-- Other instructs here... -->

</crop>
```

| Property  |   Data Type    | Default Value | Description                           |
| :-------: | :------------: | :-----------: | :------------------------------------ |
|    `x`    |   **number**   |       0       | Value in pixels.                      |
|    `y`    |   **number**   |       0       | Value in pixels.                      |
|  `width`  |   **number**   |      128      | Value in pixels.                      |
| `height`  |   **number**   |      128      | Value in pixels.                      |
| `content` | **Instruct[]** |      []       | Other instructs inside this are here. |

---

### Elevate

Like shadow, but you just have to set depth value to create realistic drop shadow.

```xml
<elevate
  depth="4" angle="0">

  <!-- Other instructs here... -->

</elevate>
```

| Property  |   Data Type    | Default Value | Description                                          |
| :-------: | :------------: | :-----------: | :--------------------------------------------------- |
|  `depth`  |   **number**   |       4       | Z axis depth perception, in pixel.                   |
|  `angle`  |   **number**   |       0       | Angle of incoming light in degrees, 0 is from above. |
| `content` | **Instruct[]** |      []       | Other instructs inside this are here.                |

---

### Ellipse

Draw an ellipse shape.

```xml
<ellipse
  x="0"  width="100"
  y="0"  height="100"
  color="#000000"
/>
```

| Property | Data Type  | Default Value | Description         |
| :------: | :--------: | :-----------: | :------------------ |
|   `x`    | **number** |       0       | Value in pixels.    |
|   `y`    | **number** |       0       | Value in pixels.    |
| `width`  | **number** |      100      | Value in pixels.    |
| `height` | **number** |      100      | Value in pixels.    |
| `color`  | **string** |   "#000000"   | CSS standard color. |

---

### EllipseStroke

Draw an ellipse outline.

```xml
<ellipse-stroke
  x="0"  width="100"
  y="0"  height="100"
  color="#000000"
  thickness="1"
/>
```

|  Property   | Data Type  | Default Value | Description         |
| :---------: | :--------: | :-----------: | :------------------ |
|     `x`     | **number** |       0       | Value in pixels.    |
|     `y`     | **number** |       0       | Value in pixels.    |
|   `width`   | **number** |      100      | Value in pixels.    |
|  `height`   | **number** |      100      | Value in pixels.    |
|   `color`   | **string** |   "#000000"   | CSS standard color. |
| `thickness` | **number** |       1       | Value in pixels.    |

---

### GradientLinear

Fills linear gradient color to the containing shape.

```xml
<gradient
  startX="0"  endX="100"
  startY="0"  endY="100"
  points={0.0: "#000000", 1.0: "#ffffff"}>

  <!-- Other instructs here... -->

</gradient>
```

**or**

```xml
<gradient-linear
  startX="0"  endX="100"
  startY="0"  endY="100"
  points={0.0: "#000000", 1.0: "#ffffff"}>

  <!-- Other instructs here... -->

</gradient-linear>
```

| Property  |       Data Type        |          Default Value           | Description                                          |
| :-------: | :--------------------: | :------------------------------: | :--------------------------------------------------- |
| `startX`  |       **number**       |                0                 | Value in pixels.                                     |
| `startY`  |       **number**       |                0                 | Value in pixels.                                     |
|  `endX`   |       **number**       |               100                | Value in pixels.                                     |
|  `endY`   |       **number**       |               100                | Value in pixels.                                     |
| `points`  | **GradientPointsType** | {0.0: "#000000", 1.0: "#ffffff"} | Position of colors, indices are between 0.0 and 1.0. |
| `content` |     **Instruct[]**     |                []                | Other instructs inside this are here.                |

---

### GradientRadial

Fills radial gradient color to the containing shape.

```xml
<gradient-radial
  x="0" y="0" radius="100"
  points={0.0: "#000000", 1.0: "#ffffff"}>

  <!-- Other instructs here... -->

</gradient-radial>
```

| Property  |       Data Type        |          Default Value           | Description                                          |
| :-------: | :--------------------: | :------------------------------: | :--------------------------------------------------- |
|    `x`    |       **number**       |                0                 | Value in pixels.                                     |
|    `y`    |       **number**       |                0                 | Value in pixels.                                     |
| `radius`  |       **number**       |               100                | Value in pixels.                                     |
| `points`  | **GradientPointsType** | {0.0: "#000000", 1.0: "#ffffff"} | Position of colors, indices are between 0.0 and 1.0. |
| `content` |     **Instruct[]**     |                []                | Other instructs inside this are here.                |

---

### Group

Stacks multiple instructions into one.

```xml
<group>
 <!-- Other instructs here... -->
</group>
```

| Property  |   Data Type    | Default Value | Description                           |
| :-------: | :------------: | :-----------: | :------------------------------------ |
| `content` | **Instruct[]** |      []       | Other instructs inside this are here. |

---

### Image

Draw a fully loaded image, you have to make sure the source is completely downloaded before draw.

```xml
<image
  source={...}
  x="0"  width="0"
  y="0"  height="0"
/>
```

| Property |       Data Type        | Default Value | Description                                      |
| :------: | :--------------------: | :-----------: | :----------------------------------------------- |
| `source` | **CanvasImageSource**? |   undefined   | Fully loaded SVG, image DOM, or bitmap           |
|   `x`    |       **number**       |       0       | Value in pixels.                                 |
|   `y`    |       **number**       |       0       | Value in pixels.                                 |
| `width`  |       **number**       |      NaN      | Value in pixels, set NaN to use original width.  |
| `height` |       **number**       |      NaN      | Value in pixels, set NaN to use original height. |

---

### Mask

Like crop but you can use custom shape.

```xml
<mask
  shape={...}
  allowIntersect="false">

  <!-- Other instructs here... -->

</mask>
```

|     Property     |        Data Type         | Default Value | Description                                       |
| :--------------: | :----------------------: | :-----------: | :------------------------------------------------ |
|     `shape`      | **Instruct** or **null** |     null      | Custom shape, set null to deactivate masking.     |
| `allowIntersect` |       **boolean**        |     false     | If true, transparent color exist at intersection. |
|    `content`     |      **Instruct[]**      |      []       | Other instructs inside this are here.             |

---

### Move

Add offset as big as (x, y) point.

```xml
<move x="0" y="0">
  <!-- Other instructs here... -->
</move>
```

| Property | Data Type  | Default Value | Description      |
| :------: | :--------: | :-----------: | :--------------- |
|   `x`    | **number** |       0       | Value in pixels. |
|   `y`    | **number** |       0       | Value in pixels. |

---

### Path

Draw custom shape based on array of vertices.

```xml
<path
  x="0"  width="NaN"
  y="0"  height="NaN"
  color="#000000">

  x: 10, y: 10;
  x: 10, y: 30, smooth;
  x: 30, y: 10;

</path>
```

|  Property  |    Data Type     | Default Value | Description                                      |
| :--------: | :--------------: | :-----------: | :----------------------------------------------- |
|    `x`     |    **number**    |       0       | Value in pixels.                                 |
|    `y`     |    **number**    |       0       | Value in pixels.                                 |
|  `width`   |    **number**    |      NaN      | Value in pixels, set NaN to use original width.  |
|  `height`  |    **number**    |      NaN      | Value in pixels, set NaN to use original height. |
|  `color`   |    **string**    |   "#000000"   | CSS standard color.                              |
| `vertices` | **PathVertex[]** |      []       | Array of vertices.                               |
| `content`  |    **string**    |      ""       | Easy way to write vertices, as shown above.      |

---

### PathStroke

Draw custom line path based on array of vertices.

```xml
<path-stroke
  x="0"  width="NaN"
  y="0"  height="NaN"
  color="#000000"
  thickness="1"
  sharp="false"
  autoConnect="false">

  x: 10, y: 10;
  x: 10, y: 30, smooth;
  x: 30, y: 10;

</path-stroke>
```

|   Property    |       Data Type        | Default Value | Description                                      |
| :-----------: | :--------------------: | :-----------: | :----------------------------------------------- |
|      `x`      |       **number**       |       0       | Value in pixels.                                 |
|      `y`      |       **number**       |       0       | Value in pixels.                                 |
|    `width`    |       **number**       |      NaN      | Value in pixels, set NaN to use original width.  |
|   `height`    |       **number**       |      NaN      | Value in pixels, set NaN to use original height. |
|    `color`    |       **string**       |   "#000000"   | CSS standard color.                              |
|  `thickness`  |       **number**       |       1       | Value in pixels.                                 |
|    `sharp`    |      **boolean**       |     false     | Set to true for sharp edges.                     |
| `autoConnect` |      **boolean**       |     false     | Set true to prevent unconnected path ends.       |
|  `vertices`   | **PathStrokeVertex[]** |      []       | Array of vertices.                               |
|   `content`   |       **string**       |      ""       | Easy way to write vertices, as shown above.      |

---

### Rectangle

Draw a rectangle shape.

```xml
<rectangle
  x="0"  width="100"
  y="0"  height="100"
  color="#000000"
/>
```

| Property | Data Type  | Default Value | Description         |
| :------: | :--------: | :-----------: | :------------------ |
|   `x`    | **number** |       0       | Value in pixels.    |
|   `y`    | **number** |       0       | Value in pixels.    |
| `width`  | **number** |      100      | Value in pixels.    |
| `height` | **number** |      100      | Value in pixels.    |
| `color`  | **string** |   "#000000"   | CSS standard color. |

---

### RectangleStroke

Draw a rectangle shape.

```xml
<rectangle-stroke
  x="0"  width="100"
  y="0"  height="100"
  color="#000000"
  thickness="1"
  sharp="false"
/>
```

|  Property   |  Data Type  | Default Value | Description                  |
| :---------: | :---------: | :-----------: | :--------------------------- |
|     `x`     | **number**  |       0       | Value in pixels.             |
|     `y`     | **number**  |       0       | Value in pixels.             |
|   `width`   | **number**  |      100      | Value in pixels.             |
|  `height`   | **number**  |      100      | Value in pixels.             |
|   `color`   | **string**  |   "#000000"   | CSS standard color.          |
| `thickness` | **number**  |       1       | Value in pixels.             |
|   `sharp`   | **boolean** |     false     | Set to true for sharp edges. |

---

### RectangleRound

Draw a rounded rectangle shape.

```xml
<rectangle-round
  x="0"  width="100"
  y="0"  height="100"
  color="#000000"
  cornerRadius="16"
/>
```

|    Property    | Data Type  | Default Value | Description         |
| :------------: | :--------: | :-----------: | :------------------ |
|      `x`       | **number** |       0       | Value in pixels.    |
|      `y`       | **number** |       0       | Value in pixels.    |
|    `width`     | **number** |      100      | Value in pixels.    |
|    `height`    | **number** |      100      | Value in pixels.    |
|    `color`     | **string** |   "#000000"   | CSS standard color. |
| `cornerRadius` | **number** |      100      | Value in pixels.    |

---

### RectangleRoundStroke

Draw a rounded rectangle outline.

```xml
<rectangle-round-stroke
  x="0"  width="100"
  y="0"  height="100"
  color="#000000"
  cornerRadius="16"
  thickness="1"
/>
```

|    Property    | Data Type  | Default Value | Description         |
| :------------: | :--------: | :-----------: | :------------------ |
|      `x`       | **number** |       0       | Value in pixels.    |
|      `y`       | **number** |       0       | Value in pixels.    |
|    `width`     | **number** |      100      | Value in pixels.    |
|    `height`    | **number** |      100      | Value in pixels.    |
|    `color`     | **string** |   "#000000"   | CSS standard color. |
| `cornerRadius` | **number** |      100      | Value in pixels.    |
|  `thickness`   | **number** |       1       | Value in pixels.    |

---

### Rotate

Add angle of rotation with specified center point.

```xml
<rotate
  x="0" y="0"
  angle="0">

  <!-- Other instructs here... -->

</rotate>
```

| Property  |   Data Type    | Default Value | Description                           |
| :-------: | :------------: | :-----------: | :------------------------------------ |
|    `x`    |   **number**   |       0       | X axis center point, in pixels.       |
|    `y`    |   **number**   |       0       | Y axis center point, in pixels.       |
|  `angle`  |   **number**   |       0       | Value in degrees (0 - 359).           |
| `content` | **Instruct[]** |      []       | Other instructs inside this are here. |

---

### Scale

Multiple the size of drawn graphics.

```xml
<scale x="1" y="1">
  <!-- Other instructs here... -->
</scale>
```

| Property  |   Data Type    | Default Value | Description                           |
| :-------: | :------------: | :-----------: | :------------------------------------ |
|    `x`    |   **number**   |      1.0      | Value in fraction.                    |
|    `y`    |   **number**   |      1.0      | Value in fraction.                    |
| `content` | **Instruct[]** |      []       | Other instructs inside this are here. |

---

### Shadow

Give customizable shadow effects to drawn graphics.

```xml
<shadow
  blur="8"
  color="rgba(0,0,0,0.32)"
  x="4" y="4">

  <!-- Other instructs here... -->

</shadow>
```

| Property  |   Data Type    |   Default Value    | Description                           |
| :-------: | :------------: | :----------------: | :------------------------------------ |
|  `blur`   |   **number**   |         8          | Value in pixels.                      |
|  `color`  |   **string**   | "rgba(0,0,0,0.32)" | CSS standard color.                   |
|    `x`    |   **number**   |         0          | Value in pixels.                      |
|    `y`    |   **number**   |         0          | Value in pixels.                      |
| `content` | **Instruct[]** |         []         | Other instructs inside this are here. |

---

### Text

Draw multiline or a single line of text with default fonts.

**WARNING:** If you are using JSX, put `\n` at the end of every line of text because JSX cannot recognize line-break automatically.

```xml
<text
  x="0" size="18"
  y="0" align="left"
  style="bold|italic"
  color="#000000">

  Lorem Ipsum
  Dolor Amet

</text>
```

| Property  | Data Type  |   Default Value    | Description                                      |
| :-------: | :--------: | :----------------: | :----------------------------------------------- |
|    `x`    | **number** |         0          | Value in pixels.                                 |
|    `y`    | **number** |         0          | Value in pixels.                                 |
|  `size`   | **number** |         18         | Value in pixels.                                 |
|  `color`  | **string** | "rgba(0,0,0,0.32)" | CSS standard color.                              |
|  `value`  | **string** |         ""         | Text string to be drawn.                         |
|  `style`  | **string** |         ""         | Can be "bold", "italic", or combination of them. |
|  `align`  | **string** |       "left"       | It can be one of "left", "center", or "right".   |
|  `value`  | **string** |         ""         | Text string to be drawn.                         |
| `content` | **string** |         ""         | Symbolic link to `value`.                        |

---

### TextStroke

Draw outlined multiline or a single line of text.

**WARNING:** If you are using JSX, put `\n` at the end of every line of text because JSX cannot recognize line-break automatically.

```xml
<text-stroke
  x="0" size="18"
  y="0" align="left"
  style="bold|italic"
  color="#000000"
  thickness="1">

  Lorem Ipsum
  Dolor Amet

</text-stroke>
```

|  Property   | Data Type  |   Default Value    | Description                                      |
| :---------: | :--------: | :----------------: | :----------------------------------------------- |
|     `x`     | **number** |         0          | Value in pixels.                                 |
|     `y`     | **number** |         0          | Value in pixels.                                 |
|   `size`    | **number** |         18         | Value in pixels.                                 |
|   `color`   | **string** | "rgba(0,0,0,0.32)" | CSS standard color.                              |
|   `value`   | **string** |         ""         | Text string to be drawn.                         |
|   `style`   | **string** |         ""         | Can be "bold", "italic", or combination of them. |
|   `align`   | **string** |       "left"       | It can be one of "left", "center", or "right".   |
| `thickness` | **number** |         1          | Value in pixels.                                 |
|   `value`   | **string** |         ""         | Text string to be drawn.                         |
|  `content`  | **string** |         ""         | Symbolic link to `value`.                        |

---

### Transparent

Set transparency of specific drawing.

```xml
<transparent value="1">
  <!-- Other instructs here... -->
</transparent>
```

| Property  |   Data Type    | Default Value | Description                           |
| :-------: | :------------: | :-----------: | :------------------------------------ |
|  `value`  |   **number**   |       1       | In fraction between 0.0 and 1.0.      |
| `content` | **Instruct[]** |      []       | Other instructs inside this are here. |
