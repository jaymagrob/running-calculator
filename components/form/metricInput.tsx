import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function convertKtM(a) {
  return a / 1.609344;
}

function convertMtK(a) {
  return a * 1.609344;
}

type Props = {
  distance: string | number;
  metric: "k" | "m";
  onDistanceChange: (data: string | number) => void;
  onMetricChange: (data: string | number) => void;
};

export default function metricInput(props: Props) {
  const { distance, metric, onDistanceChange, onMetricChange } = props;

  return (
    <FormControl fullWidth>
      <InputLabel id="metric-select-label">Metric</InputLabel>
      <Select
        labelId="metric-select-label"
        id="metric-select"
        value={metric}
        label="Metric"
        onChange={(e) => {
          const metric2 = e.target.value;
          if (metric2 === "k") {
            onDistanceChange(convertMtK(distance));
          }
          if (metric2 === "m") {
            onDistanceChange(convertKtM(distance));
          }
          onMetricChange(metric2);
        }}
      >
        <MenuItem value="k">Kilometers</MenuItem>
        <MenuItem value="m">Miles</MenuItem>
      </Select>
    </FormControl>
  );
}
