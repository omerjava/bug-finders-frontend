import React from "react";
import { dataForIntro } from "../../data/dataForIntro";
import Intro from "../intro/Intro";
import "./Main.css";

function Main() {
  return (
    <div className="main">
      <h3 className="main-headline">
        If you also feel frustrated as below, register and join us!<br></br>
        Let's neutralize all bugs together!
      </h3>
      {dataForIntro.map((v, i) => (
        <Intro
          key={i}
          occupation={v.occupation}
          content={v.content}
          age={v.age}
          name={v.name}
        />
      ))}
    </div>
  );
}

export default Main;
