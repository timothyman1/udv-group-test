import { CircularProgress, styled } from "@mui/material";

export const Root = styled("div")({
  position: "relative",
});

export const Overlay = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
export const ClockProgess = styled(CircularProgress)({});
