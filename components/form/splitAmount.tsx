import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

type Props = {
  split: number | string;
  onChange: (data: number | string) => void;
  label: string;
};

export default function splitAmount(props: Props) {
  const { label, split, onChange } = props;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={split}
        label="Split"
        onChange={(e) => onChange(e.target.value)}
      >
        <MenuItem value={0.1}>10%</MenuItem>
        <MenuItem value={0.09}>9%</MenuItem>
        <MenuItem value={0.08}>8%</MenuItem>
        <MenuItem value={0.07}>7%</MenuItem>
        <MenuItem value={0.06}>6%</MenuItem>
        <MenuItem value={0.05}>5%</MenuItem>
        <MenuItem value={0.04}>4%</MenuItem>
        <MenuItem value={0.03}>3%</MenuItem>
        <MenuItem value={0.02}>2%</MenuItem>
        <MenuItem value={0.01}>1%</MenuItem>
      </Select>
    </Box>
  );
}
