export interface BaseWidget {
  id: string;
  column: number;
  data: TimerData | WeatherData;
}

export interface TimerData {
  type: "timer";
  currentTime?: number;
  initialTime?: number;
}

interface WeatherData {
  type: "weather";
  city?: string;
}

export type WidgetsData = TimerData | WeatherData;

export interface ColumnInterface {
  id: number;
}

export interface WidgetState {
  widgets: BaseWidget[];
  columns: ColumnInterface[];
}
