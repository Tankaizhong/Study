import React from "react";
import CountdownTimer from "./CountdownTimer";
import { targetDate } from "../../constant";
const App = () => {
  // 设置目标日期，这里是2023年6月30日

  return (
    <div>
      {/* <h1>Countdown Timer</h1> */}
      <CountdownTimer targetDate={targetDate} />
    </div>
  );
};

export default App;
