import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

function convertKtM(a) {
  return a / 1.609344;
}

function convertMtK(a) {
  return a * 1.609344;
}

const popularList = [
  { value: "0", label: "5km", k: 5, m: convertKtM(5) },
  { value: "1", label: "10km", k: 10, m: convertKtM(10) },
  { value: "2", label: "5 miles", k: convertMtK(5), m: 5 },
  { value: "3", label: "15km", k: 15, m: convertKtM(15) },
  { value: "4", label: "10 miles", k: convertMtK(10), m: 10 },
  { value: "5", label: "Half Marathon", k: convertMtK(13.1), m: 13.1 },
  { value: "6", label: "Marathon", k: convertMtK(26.2), m: 26.2 },
  { value: "7", label: "50km", k: 50, m: convertKtM(50) },
];

type Props = {
  onChange: (data: number) => void;
  metric: "k" | "m";
};

export default function splitPace(popularDropdown: Props) {
  const [popular, setPopular] = useState("");
  const { onChange, metric } = popularDropdown;

  return (
    <FormControl fullWidth>
      <InputLabel id="popular-select-label">Popular</InputLabel>
      <Select
        labelId="popular-select-label"
        id="popular-select"
        value={popular}
        label="popular"
        onChange={(e) => {
          const { value } = e.target;
          setPopular(value);
          const data = popularList.find((i) => i.value === value);
          onChange(data[metric]);
        }}
      >
        {popularList.map((item) => (
          <MenuItem key={item.label} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
