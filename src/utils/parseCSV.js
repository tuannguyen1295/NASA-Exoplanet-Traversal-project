
import Papa from "papaparse";
export async function loadCSV() {
  const res = await fetch("/exoplanets.csv")
  const text = await res.text()
  const parsed = Papa.parse(text, { header: true, dynamicTyping: true, skipEmptyLines: true })
  return parsed.data
}
