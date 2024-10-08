import { useEffect, useState } from 'react';

type Props = {
  onTimeout: () => void;
  timeout: number;
};

function TimerDisplay({ onTimeout, timeout }: Props) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);
    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 50);
    }, 50);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      <progress max={timeout} value={remainingTime}></progress>
    </>
  );
}

export default TimerDisplay;
