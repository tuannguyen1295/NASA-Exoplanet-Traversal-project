
export default function QueryPanel({
  years, facilities, year, facility, setYear, setFacility, onSearch, onClear, addColumn
}) {
  return (
    <div className="query-panel">

      <select value={year} onChange={(e) => setYear(e.target.value)}>
        <option value="">Year</option>
        {years.map(y => <option key={y}>{y}</option>)}
      </select>

      <select value={facility} onChange={(e) => setFacility(e.target.value)}>
        <option value="">Facility</option>
        {facilities.map(f => <option key={f}>{f}</option>)}
      </select>

      <button className="confirm" onClick={onSearch}>Search</button>
      <button className="error" onClick={onClear}>Clear</button>

      <select onChange={(e) => addColumn(e.target.value)}>
        <option value="">Add Column</option>
        <option value="hostname">Host Name</option>
        <option value="sy_pnum">Number of Planets</option>
        <option value="sy_snum">Number of Stars</option>
      </select>

    </div>
  )
}
