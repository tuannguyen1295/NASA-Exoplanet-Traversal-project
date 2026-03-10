
import { useEffect, useState } from "react"
import QueryPanel from "./components/QueryPanel"
import ResultTable from "./components/ResultTable"
import PlanetChart from "./components/PlanetChart"
import { loadCSV } from "./utils/parseCSV"
import { buildIndex, searchPlanets, sortData } from "./utils/search"

export default function App() {

  const baseColumns = [
    "disc_year",
    "disc_facility",
    "pl_name",
    "pl_rade",
    "pl_bmasse"
  ]

  const [data, setData] = useState([])
  const [index, setIndex] = useState(null)
  const [year, setYear] = useState("")
  const [facility, setFacility] = useState("")
  const [results, setResults] = useState([])
  const [extraColumns, setExtraColumns] = useState([])
  const [sortColumn, setSortColumn] = useState("")
  const [order, setOrder] = useState("asc")

  useEffect(() => {
    async function init() {
      const csv = await loadCSV()
      setData(csv)
      setIndex(buildIndex(csv))
    }
    init()
  }, [])

  function handleSearch() {
    if (!year && !facility) { alert("Please select at least one filter"); return }
    const r = searchPlanets(year, facility, index, data)
    setResults(r)
  }

  function handleClear() { setYear(""); setFacility(""); setResults([]) }

  function addColumn(col) {
    if (!col) return
    if (!extraColumns.includes(col)) { setExtraColumns([...extraColumns, col]) }
  }

  function removeColumn(col) { setExtraColumns(extraColumns.filter(c => c !== col)) }

  const columns = [...baseColumns, ...extraColumns]

  let display = results
  if (sortColumn) { display = sortData(display, sortColumn, order) }
  display = display.slice(0, 10)

  const years = [...new Set(data.map(d => d.disc_year))].filter(Boolean)
  const facilities = [...new Set(data.map(d => d.disc_facility))].filter(Boolean)

  return (
    <div className="container">

      <h1>NASA Exoplanet Explorer</h1>

      <QueryPanel
        years={years}
        facilities={facilities}
        year={year}
        facility={facility}
        setYear={setYear}
        setFacility={setFacility}
        onSearch={handleSearch}
        onClear={handleClear}
        addColumn={addColumn}
      />

      <ResultTable
        data={display}
        columns={columns}
        removeColumn={removeColumn}
        sortColumn={sortColumn}
        setSortColumn={setSortColumn}
        order={order}
        setOrder={setOrder}
      />

      <PlanetChart data={display} />

    </div>
  )
}
