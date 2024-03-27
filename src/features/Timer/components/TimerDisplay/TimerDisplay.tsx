import React from "react";
import { CircularProgress, Stack, Typography } from "@mui/material";
import {
  Overlay,
  Root,
} from "@/features/Timer/components/TimerDisplay/TimerDisplay.styles.ts";

interface TimerDisplay {
  clock: number;
  initialTime: number;
}
const TimerDisplay: React.FC<TimerDisplay> = ({ clock, initialTime }) => {
  const getTimeProgress = () => {
    return clock / (initialTime / 100);
  };
  const getTime = (time: number): string => {
    const min = Math.floor(time / 60);
    const sec = time % 60;

    return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
  };

  return (
    <Stack sx={{ minHeight: 135 }} alignItems="center" justifyContent="center">
      {clock !== 0 ? (
        <>
          <Root>
            <CircularProgress
              variant="determinate"
              value={getTimeProgress()}
              size="8rem"
            />
            <Overlay>
              <Typography variant="h6" component="div" color="textPrimary">
                {getTime(clock)}
              </Typography>
            </Overlay>
          </Root>
        </>
      ) : (
        <>
          <Typography variant="h5" color="blue">
            Timer finished!
          </Typography>
        </>
      )}
    </Stack>
  );
};

export default TimerDisplay;
