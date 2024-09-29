import React from "react"

function DashboardCard07() {
  return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Top Sales</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">TOP Sales</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Visitors</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Revenues</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Sales</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Conversion</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">David</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">2.4K</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">$3,877</div>
                </td>
                <td className="p-2">
                  <div className="text-center">267</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">4.7%</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">Susan</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">2.2K</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">$3,426</div>
                </td>
                <td className="p-2">
                  <div className="text-center">249</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">4.4%</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">Vivian</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">2.0K</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">$2,444</div>
                </td>
                <td className="p-2">
                  <div className="text-center">224</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">4.2%</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">Lee</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">1.9K</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">$2,236</div>
                </td>
                <td className="p-2">
                  <div className="text-center">220</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">4.2%</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">Ryan</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">1.7K</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">$2,034</div>
                </td>
                <td className="p-2">
                  <div className="text-center">204</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">3.9%</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DashboardCard07
