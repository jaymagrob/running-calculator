import TextField from "@mui/material/TextField";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

type Props = {
  time: Dayjs;
  onChange: (time: Dayjs) => void;
};

export default function timePicker(props: Props) {
  const { onChange, time } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        ampmInClock
        inputFormat="mm:ss"
        mask="__:__"
        label="Minutes and seconds"
        value={time}
        onChange={(newTime) => {
          onChange(newTime);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
