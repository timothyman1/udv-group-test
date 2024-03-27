import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";
import { ControlsBox } from "@/shared/ui/Column/ColumnControls/ColumnControls.styles.ts";

interface ColumnControlsProps {
  addWidget: (type: string) => void;
}

const ColumnControls: React.FC<ColumnControlsProps> = ({ addWidget }) => {
  const [select, setSelect] = useState("");

  const handleChange = (e: SelectChangeEvent) => {
    setSelect(e.target.value);
  };

  const handleAdd = () => {
    if (select) addWidget(select);
    setSelect("");
  };

  return (
    <ControlsBox>
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="demo-simple-select-label">Select</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Select"
          value={select}
          onChange={handleChange}
        >
          <MenuItem value={""}>None</MenuItem>
          <MenuItem value={"timer"}>Timer</MenuItem>
          <MenuItem value={"weather"}>Weather</MenuItem>
        </Select>
      </FormControl>
      <Button variant="outlined" onClick={handleAdd}>
        add widget
      </Button>
    </ControlsBox>
  );
};

export default ColumnControls;
