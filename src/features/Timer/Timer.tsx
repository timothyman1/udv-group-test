import React, { memo, useEffect, useMemo, useState } from "react";

import useTimer from "@/features/Timer/hooks/useTimer.tsx";
import { TimerControl, TimerDisplay } from "@/features/Timer/components";
import { useAppDispatch } from "@/shared/hooks/hooks.ts";
import { setData } from "@/pages/Home/widgetsSlice.ts";
import { TimerData } from "@/shared/types/Widget";
import { Box, Button, Stack, TextField } from "@mui/material";

interface TimerProps {
  widgetId: string;
  time: Omit<TimerData, "type">;
  isMoving: { id: string; moving: boolean };
}

const Clock: React.FC<TimerProps> = ({ widgetId, time, isMoving }) => {
  const [clock, isActive, toggleClock] = useTimer(
    time.currentTime ?? time.initialTime ?? 0,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isMoving.moving && widgetId === isMoving.id) {
      dispatch(setData({ widgetId, currentTime: clock }));
    }
  }, [isMoving, widgetId, dispatch, clock]);

  return (
    <Box width={"100%"}>
      <h2>Timer</h2>
      <TimerDisplay clock={clock} initialTime={time.initialTime ?? 0} />
      {clock ? (
        <TimerControl isActive={isActive} toggleClock={toggleClock} />
      ) : null}
    </Box>
  );
};

const Timer: React.FC<TimerProps> = memo(({ widgetId, time, isMoving }) => {
  const [timer, setTimer] = useState(time.initialTime ?? false);
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("00");
  const [error, setError] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (time.initialTime !== undefined) {
      setTimer(true);
    }
  }, [time.initialTime]);

  const initTimer = useMemo(() => {
    return parseInt(minutes) * 60 + parseInt(seconds);
  }, [minutes, seconds]);

  const validateInput = (input: string) => {
    const value = parseInt(input);
    value < 0 || value > 59 ? setError(true) : setError(false);
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateInput(e.target.value);
    if (!error && e.target.value.toString().length <= 2)
      setMinutes(e.target.value);
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateInput(e.target.value);
    if (!error && e.target.value.toString().length <= 2)
      setSeconds(e.target.value);
  };

  const handleInitalStart = () => {
    dispatch(setData({ widgetId, initialTime: initTimer }));
  };

  return (
    <Stack sx={{ minHeight: 250 }} alignItems="center" justifyContent="center">
      {!timer ? (
        <>
          <Box
            display="flex"
            gap={2}
            alignItems="center"
            justifyContent="center"
            m={2}
          >
            <TextField
              error={error}
              helperText={error ? "Input is not valid" : ""}
              label="Minutes"
              variant="outlined"
              value={minutes}
              onChange={handleMinutesChange}
              type="number"
              inputProps={{ min: "0", max: "59", maxLength: 2 }}
            />
            <TextField
              error={error}
              helperText={error ? "Input is not valid" : ""}
              label="Seconds"
              variant="outlined"
              value={seconds}
              onChange={handleSecondsChange}
              type="number"
              inputProps={{ min: "0", max: "59", maxLength: 2 }}
            />
          </Box>
          <Button onClick={handleInitalStart}>start</Button>
        </>
      ) : (
        <Clock
          widgetId={widgetId}
          isMoving={isMoving}
          time={{
            initialTime: time.initialTime ?? initTimer,
            currentTime: time.currentTime,
          }}
        />
      )}
    </Stack>
  );
});

export default Timer;
