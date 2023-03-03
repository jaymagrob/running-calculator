import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

type Props = {
  distance: number | string;
  onChange: (data: string) => void;
  isError: boolean;
};

export default function distanceInput(props: Props) {
  const { distance, isError, onChange } = props;

  return (
    <FormControl fullWidth>
      <TextField
        type="number"
        inputProps={{ min: "0", max: "200", step: "1" }}
        id="distance"
        label="Distance"
        value={distance}
        onChange={(e) => onChange(e.target.value)}
        error={isError}
        helperText={isError ? "Between 0 and 200" : null}
      />
    </FormControl>
  );
}
