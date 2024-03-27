import { v4 as uuidv4 } from "uuid";
import { BaseWidget, WidgetState } from "@/shared/types/Widget";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/shared/store/store.ts";

const initialState: WidgetState = {
  widgets: [],
  columns: [{ id: 1 }, { id: 2 }, { id: 3 }],
};

const widgetSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
    addWidget: (state, action: PayloadAction<Omit<BaseWidget, "id">>) => {
      state.widgets.push({
        id: uuidv4(),
        ...action.payload,
      });
    },
    removeWidget: (state, action: PayloadAction<BaseWidget["id"]>) => {
      const rm = (el: BaseWidget) => el.id === action.payload,
        rmWidget = state.widgets.findIndex(rm);

      state.widgets.splice(rmWidget, 1);
    },
    moveWidget(
      state,
      action: PayloadAction<{
        widgetId: string;
        columnId: number;
      }>,
    ) {
      const { widgetId, columnId } = action.payload;
      const widget = state.widgets.find((w) => w.id === widgetId);
      if (widget) {
        widget.column = columnId;
      }
    },
    setData(
      state,
      action: PayloadAction<{
        widgetId: string;
        initialTime?: number;
        currentTime?: number;
        city?: string;
      }>,
    ) {
      const { widgetId, initialTime, currentTime, city } = action.payload;
      const widget = state.widgets.find((w) => w.id === widgetId);
      if (widget) {
        if (widget.data.type === "timer") {
          if (initialTime) widget.data.initialTime = initialTime;
          if (currentTime) widget.data.currentTime = currentTime;
        } else widget.data.city = city;
      }
    },
  },
});

export const { addWidget, removeWidget, moveWidget, setData } =
  widgetSlice.actions;
export const selectAllWidgets = (state: RootState) => state.widgets.widgets;
export const selectWidgetsByColumn = createSelector(
  [selectAllWidgets, (_, columnId) => columnId],
  (widgets, columnId) => {
    return widgets.filter((widget) => widget.column === columnId);
  },
);
export default widgetSlice.reducer;
