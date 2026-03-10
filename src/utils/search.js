
export function buildIndex(data) {
  const yearIndex = new Map()
  const facilityIndex = new Map()
  data.forEach(p => {
    if (p.disc_year) {
      if (!yearIndex.has(p.disc_year)) yearIndex.set(p.disc_year, [])
      yearIndex.get(p.disc_year).push(p)
    }
    if (p.disc_facility) {
      if (!facilityIndex.has(p.disc_facility)) facilityIndex.set(p.disc_facility, [])
      facilityIndex.get(p.disc_facility).push(p)
    }
  })
  return { yearIndex, facilityIndex }
}

export function searchPlanets(year, facility, index, allData) {
  let results = allData
  if (year) { results = index.yearIndex.get(Number(year)) || [] }
  if (facility) {
    const f = index.facilityIndex.get(facility) || []
    if (year) { results = results.filter(p => f.includes(p)) }
    else { results = f }
  }
  return results
}

export function sortData(data, column, order) {
  return [...data].sort((a, b) => {
    if (order === "asc") return a[column] > b[column] ? 1 : -1
    return a[column] < b[column] ? 1 : -1
  })
}
