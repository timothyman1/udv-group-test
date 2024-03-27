import { Button } from "@mui/material";
import React, { memo } from "react";

interface TimerControlProps {
  isActive: boolean;
  toggleClock: () => void;
}

const TimerControl: React.FC<TimerControlProps> = memo(
  ({ isActive, toggleClock }) => {
    return (
      <Button onClick={toggleClock}>{isActive ? "Pause" : "Start"}</Button>
    );
  },
);
export default TimerControl;
