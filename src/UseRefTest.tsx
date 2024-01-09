import React, { useRef, useEffect, useState } from "react";

function UseRefTest() {
  const countRef = useRef(0);
  const [countState, setCountState] = useState(0);

  useEffect(
    () => {
      // countRef의 값은 리렌더링에 영향을 받지 않음
      console.log(countRef.current);
    },
    [
      /* dependencies */
    ]
  );

  return (
    <div>
      <p>Count: {countRef.current}</p>
      <button onClick={() => countRef.current++}>Increment</button>
      <p>Count: {countState}</p>
      <button onClick={() => setCountState(countState + 1)}>Increment</button>
    </div>
  );
}

export default UseRefTest;
