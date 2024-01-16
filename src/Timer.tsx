import { useState, useRef } from "react";

const Timer = () => {
  const time = useRef(4000);
  const [hour, setHour] = useState(Math.floor(time.current / 3600));
  const [min, setMin] = useState(Math.floor((time.current / 60) % 60));
  const [sec, setSec] = useState(Math.floor(time.current % 60));
  const timerId = useRef(null);

  // useEffect(() => {
  //   timerId.current = setInterval(() => {
  //     setHour(Math.floor(time.current / 3600));
  //     setMin(Math.floor(time.current / 3600 / 60));
  //     setSec(Math.floor(time.current % 60));
  //     time.current += 1;
  //   }, 1000);

  //   return () => clearInterval(timerId.current);
  // }, [sec]);

  // const startTimer = () => {
  //   setTimeout(() => {
  //     setHour(Math.floor(time.current / 3600));
  //     setMin(Math.floor(time.current / 3600 / 60));
  //     setSec(Math.floor(time.current % 60));
  //     time.current += 1;
  //   }, 1000);
  // };

  const startTimer = () => {
    timerId.current = setInterval(() => {
      setHour(Math.floor(time.current / 3600));
      setMin(Math.floor((time.current / 60) % 60));
      setSec(Math.floor(time.current % 60));
      time.current += 1;
    }, 1000);
  };

  const StopTimer = () => {
    clearInterval(timerId.current);
  };

  return (
    <div className="timer">
      <h2>공부 시간</h2>
      {hour} 시 {min} 분 {sec} 초
      <div>
        <button onClick={startTimer}>시작</button>
        <button onClick={StopTimer}>멈춤</button>
      </div>
    </div>
  );
};

export default Timer;
