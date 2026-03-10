
import { useMemo } from "react"
import { Bubble } from "react-chartjs-2"
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from "chart.js"
ChartJS.register(LinearScale, PointElement, Tooltip, Legend)

export default function PlanetChart({ data }) {
  const options = {
    responsive: true,
    // parsing: false
  }

  const chartData = useMemo(() => ({
    datasets: data.map((p, i) => ({
      label: p.pl_name,
      data: [{
        x: i + 1,
        y: p.pl_bmasse || 0,
        r: Math.sqrt(p.pl_bmasse || 1) * 3
      }],
      backgroundColor: "rgba(153, 207, 243, 0.6)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1
    }))
  }), [data])


  return (
    <div className="chart">
      <h3>Planet Mass Visualization</h3>
      <Bubble data={chartData} options={options} />
    </div>
  )
}
