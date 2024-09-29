import PieChart from "../../../charts/PieChart"
import { numberToPrice } from "../../../utils/helper"

interface IProps {
  title?: string
  data: {
    item: string
    value: number
    color: string
    hoverColor: string
  }[]
  subtitles: { title: string; value: number }[]
  styleClasses?: string
}

const AnalysisPieChart = ({ data, title = "", styleClasses = "", subtitles }: IProps) => {
  const items = data.map((item) => item.item)
  const values = data.map((item) => item.value)
  const colors = data.map((item) => item.color)
  const hoverColors = data.map((item) => item.hoverColor)
  const chartData = {
    labels: items,
    datasets: [
      {
        label: title,
        data: values,
        backgroundColor: colors,
        hoverBackgroundColor: hoverColors,
        borderWidth: 0,
      },
    ],
  }

  return (
    <div className={`flex flex-col ${styleClasses} bg-white shadow-lg rounded-sm border border-slate-200`}>
      {title && (
        <header className="px-5 py-4 border-b border-slate-100 flex items-center">
          <h2 className="font-semibold text-slate-800">{title}</h2>
        </header>
      )}
      <div className="flex justify-between flex-wrap">
        {subtitles.map((sum, i) => (
          <div key={i} className="px-5 py-3">
            <p className="text-sm">{sum.title}</p>
            <p className="text-xl font-bold text-slate-800">{numberToPrice(sum.value)}</p>
          </div>
        ))}
      </div>
      <PieChart data={chartData} width={389} height={220} />
    </div>
  )
}

export default AnalysisPieChart
