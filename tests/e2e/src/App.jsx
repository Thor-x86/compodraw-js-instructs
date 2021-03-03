import React, { useEffect } from "react";
import "./App.css";

import { composeFromJsx, draw } from "compodraw";
import instructs from "compodraw-instructs";

const circleMask = composeFromJsx(<ellipse />, instructs);
const imageSource = document.createElement("img");
const svgSource = document.createElement("img");
imageSource.src = "/img/this_is_you.jpg";
svgSource.src = "/img/poop.svg";

const composed = composeFromJsx(
  <move x={50} y={50}>
    <rectangle-stroke x={-50} width={1280} y={-50} height={720} />
    <elevate>
      <rotate angle={45} x={50} y={50}>
        <gradient-radial x={50} y={50} points={{ 0.0: "blue", 1.0: "cyan" }}>
          <rectangle />
        </gradient-radial>
      </rotate>
      <scale x={3} y={3}>
        <rectangle color="lightgreen" x={50} width={40} y={-5} height={40} />
      </scale>
      <move x={275} y={-30}>
        <path color="pink" width={150} height={150}>
          x: 20, y: 8; x: 30, y: 2, smooth; x: 40, y: 10, smooth; x: 20, y: 21;
          x: 0, y: 10, smooth; x: 10, y: 2, smooth; x: 20, y: 8;
        </path>
      </move>
    </elevate>
    <shadow color="purple" x={0} y={0} blur={16}>
      <move x={450}>
        <rotate angle={22.5} x={50} y={50}>
          <rectangle color="purple" />
        </rotate>
      </move>
    </shadow>
    <move x={600}>
      <crop y={30} height={70}>
        <gradient>
          <ellipse />
        </gradient>
      </crop>
    </move>
    <move x={750}>
      <ellipse color="#cfffcf" />
      <rotate angle={45} x={50} y={50}>
        <mask shape={circleMask}>
          <rectangle x={-50} y={-50} color="#00ff00" />
          <rectangle x={50} y={50} color="#007f00" />
        </mask>
      </rotate>
      <ellipse-stroke color="darkgreen" thickness={2} />
    </move>
    <move x={860} y={-30}>
      <path-stroke color="red" width={150} height={150} thickness={8}>
        x: 20, y: 8; x: 30, y: 2, smooth; x: 40, y: 10, smooth; x: 20, y: 21; x:
        0, y: 10, smooth; x: 10, y: 2, smooth; x: 20, y: 8;
      </path-stroke>
    </move>
    <image source={imageSource} y={180} width={512} height={364} />
    <move x={420} y={200}>
      <elevate>
        <text align="left" size={32}>
          GONNA give you up\n GONNA let you down
        </text>
        <text align="center" size={32} x={24} y={84}>
          GONNA run around\n and DESERT you
        </text>
        <text align="right" size={32} y={172}>
          GONNA make u cry\n GONNA say goodbye
        </text>
        <text-stroke
          align="center"
          style="bold|italic"
          size={32}
          x={24}
          y={260}
        >
          GONNA tell a lie\n and HURT you
        </text-stroke>
      </elevate>
    </move>
    <shadow color="black" x={0} y={0} blur={8}>
      <image source={svgSource} x={840} width={128} y={420} height={128} />
    </shadow>
  </move>,
  instructs
);

function onDraw() {
  const element = document.getElementById("viewport");
  draw(composed, element);
}

imageSource.onload = onDraw;
svgSource.onload = onDraw;

function App() {
  useEffect(() => {
    window.addEventListener("resize", onDraw);
    onDraw();
    return () => window.removeEventListener("resize", onDraw);
  });

  return (
    <canvas id="viewport">
      <strong>Canvas is NOT supported</strong>
    </canvas>
  );
}

export default App;
