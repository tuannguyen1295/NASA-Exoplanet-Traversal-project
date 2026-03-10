
export default function ResultTable({
  data, columns, removeColumn, sortColumn, setSortColumn, order, setOrder
}) {

  function handleSort(col) {
    if (sortColumn === col) { setOrder(order === "asc" ? "desc" : "asc") }
    else { setSortColumn(col); setOrder("asc") }
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {columns.map(c => (
              <th key={c} onClick={() => handleSort(c)}>
                {c}
                {!["disc_year", "disc_facility", "pl_name", "pl_rade", "pl_bmasse"].includes(c) &&
                  <button onClick={() => removeColumn(c)} className="x-icon">❌</button>}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map(c => (<td key={c}>{row[c]}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
