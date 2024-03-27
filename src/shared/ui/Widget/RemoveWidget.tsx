import React, { memo } from "react";
import { Button, Stack } from "@mui/material";
import { useAppDispatch } from "@/shared/hooks/hooks.ts";
import { removeWidget } from "@/pages/Home/widgetsSlice.ts";

interface WidgetProps {
  widgetId: string;
}

const RemoveWidget: React.FC<WidgetProps> = memo(({ widgetId }) => {
  const dispatch = useAppDispatch();
  const handleRemove = () => {
    dispatch(removeWidget(widgetId));
  };

  return (
    <Button variant="outlined" onClick={handleRemove}>
      Delete
    </Button>
  );
});

export default RemoveWidget;
