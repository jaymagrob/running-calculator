import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

type Split = {
  km: number;
  split: string;
  lapTime: string;
};

type Props = {
  splits: Split[];
};

export default function SplitTable(props: Props) {
  const { splits } = props;

  if (!splits || !splits.length) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        flexGrow: 1,
      }}
    >
      <Table sx={{ width: "100%", maxWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">KM</TableCell>
            <TableCell align="right">Split Time</TableCell>
            <TableCell align="right">Lap Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {splits.map((row) => (
            <TableRow
              key={row.km}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">
                <>{row.km % 1 ? Number(row.km).toFixed(2) : row.km}</>
              </TableCell>
              <TableCell align="right">{row.split}</TableCell>
              <TableCell align="right">{row.lapTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
