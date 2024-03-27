import { useCallback, useEffect, useState } from "react";

const useTimer = (initialTime: number): [number, boolean, () => void] => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [time, isActive]);

  const toggleClock = useCallback(() => setIsActive(!isActive), [isActive]);

  return [time, isActive, toggleClock];
};

export default useTimer;
