export default function SplitTable(props) {
  const { splits } = props;

  if (!splits || !splits.length) {
    return null;
  }

  return (
    <table>
      <thead>

        <tr>
          <th>KM</th>
          <th>Split Time</th>
          <th>Lap Time</th>
        </tr>
      </thead>
      <tbody>
        {splits.map(split => (
          <tr key={split.km}>
            <td>{split.km}</td>
            <td>{split.split}</td>
            <td>{split.lapTime}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}