import { styled, Paper, Stack } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { RemoveWidget } from "@/shared/ui";
import { Timer } from "@/features";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks.ts";
import {
  addWidget,
  moveWidget,
  selectWidgetsByColumn,
} from "@/pages/Home/widgetsSlice.ts";
import { WidgetBox } from "@/shared/ui/Widget/Widget.styles.ts";
import { shallowEqual } from "react-redux";
import { ColumnControls } from "@/shared/ui/Column/index.ts";
import Weather from "@/features/Weather/Weather.tsx";

const StyledColumn = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  color: "black",
  backgroundColor: "white",
  height: "100%",
}));

interface ColumnProps {
  columnId: number;
}

const Column: React.FC<ColumnProps> = ({ columnId }) => {
  const [movingWidget, setMovingWidget] = useState({
    id: "",
    moving: true,
  });

  const selectedWidgets = useMemo(() => selectWidgetsByColumn, []);

  const widgets = useAppSelector(
    (state) => selectedWidgets(state, columnId),
    shallowEqual,
  );

  const dispatch = useAppDispatch();

  const handleAdd = useCallback(
    (type: string) => {
      dispatch(
        type === "timer"
          ? addWidget({
              column: columnId,
              data: { type: "timer" },
            })
          : addWidget({
              column: columnId,
              data: { type: "weather" },
            }),
      );
    },
    [dispatch, columnId],
  );

  const handleOnDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const widget = e.dataTransfer.getData("widget");
    const { widgetId } = JSON.parse(widget);

    dispatch(moveWidget({ widgetId, columnId }));
    setMovingWidget({ id: "", moving: false });
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent, widgetId: string) => {
    const data = {
      widgetId,
    };

    setMovingWidget({ id: widgetId, moving: true });
    e.dataTransfer.setData("widget", JSON.stringify(data));
  };

  const renderWidgets = () => (
    <>
      {widgets.length ? (
        <div>
          {widgets.map(({ id, data }) => (
            <WidgetBox
              key={id}
              draggable
              onDragStart={(e) => handleDragStart(e, id)}
            >
              <RemoveWidget widgetId={id} />
              {data.type === "timer" ? (
                <Timer widgetId={id} time={data} isMoving={movingWidget} />
              ) : (
                <Weather widgetId={id} city={data.city} />
              )}
            </WidgetBox>
          ))}
        </div>
      ) : (
        <h2>Add widget here</h2>
      )}
    </>
  );

  return (
    <div>
      <StyledColumn onDrop={handleOnDrop} onDragOver={handleDragOver}>
        <Stack sx={{ minHeight: "200px" }} justifyContent="end">
          {renderWidgets()}
          <ColumnControls addWidget={handleAdd} />
        </Stack>
      </StyledColumn>
    </div>
  );
};

export default Column;
