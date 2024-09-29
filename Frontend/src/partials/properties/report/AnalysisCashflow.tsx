import RangeInput from "../../../components/RangeInput"
import ValueDisplay from "../../../components/ValueDisplay"
import { numberToPrice, priceToNumber } from "../../../utils/helper"
import { getYearlyMaintenanceCost } from "./reportCalculations"
import { RENTAL_PERIOD } from "../../../interfaces/properties"
import ValueInput from "../../../components/ValueInput"

const AnalysisCashflow = ({ propertyData, analysisData, setAnalysisData, annualRentalIncome }) => {
  const responsiveClasses = "col-span-6 xs:col-span-4 sm:col-span-3 md:col-span-2"

  const { rentalIncome, rentalPeriod, councilRate, insurance, bodyCorp, repairs, waterCharge, landTax, pestControl, fireAlarm, otherCost, managementRate } =
    analysisData.cashflow

  return (
    <>
      <div className="flex flex-col gap-2 sm:gap-4">
        <h2 className="pb-3 border-b border-slate-100 font-semibold text-slate-800">4.Annual Income</h2>
        <div className="grid grid-cols-12 gap-2 sm:gap-4 lg:gap-6">
          <ValueInput
            label="Rental Income"
            value={numberToPrice(rentalIncome)}
            onChange={(e) => {
              setAnalysisData({ ...analysisData, cashflow: { ...analysisData.cashflow, rentalIncome: priceToNumber(e.target.value) } })
            }}
          />

          {/* Rental Period */}
          <div className="col-span-4 sm:col-span-3 md:col-span-2">
            <label className="block text-sm font-medium text-indigo-500 mb-1" htmlFor="pr">
              Rent Paid
            </label>
            <select
              id="rent-paid"
              className="form-select w-full md:w-3/4"
              value={RENTAL_PERIOD[rentalPeriod]}
              onChange={(e) =>
                setAnalysisData({
                  ...analysisData,
                  cashflow: {
                    ...analysisData.cashflow,
                    rentalPeriod: Object.keys(RENTAL_PERIOD)[Object.values(RENTAL_PERIOD).indexOf(e.target.value as RENTAL_PERIOD)] as RENTAL_PERIOD,
                  },
                })
              }
            >
              {Object.values(RENTAL_PERIOD).map((value, index) => (
                <option key={index}>{value}</option>
              ))}
            </select>
          </div>
          <ValueDisplay label="Rental Income" value={numberToPrice(annualRentalIncome)} styleClasses="col-span-4" />
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:gap-4">
        <h2 className="pb-3 border-b border-slate-100 font-semibold text-slate-800">5.Annual Cost</h2>
        <div className="grid grid-cols-12 gap-2 sm:gap-4 lg:gap-6">
          {/* Council rate */}

          <ValueInput
            label="Council Rate"
            value={numberToPrice(councilRate)}
            onChange={(e) => {
              setAnalysisData({ ...analysisData, cashflow: { ...analysisData.cashflow, councilRate: priceToNumber(e.target.value) } })
            }}
          />

          {/* Insurance */}

          <ValueInput
            label="Property Insurance"
            value={numberToPrice(insurance)}
            onChange={(e) => {
              setAnalysisData({ ...analysisData, cashflow: { ...analysisData.cashflow, insurance: priceToNumber(e.target.value) } })
            }}
          />

          {/* Body corp */}

          <ValueInput
            label="Body Corporate"
            value={numberToPrice(bodyCorp)}
            onChange={(e) => {
              setAnalysisData({ ...analysisData, cashflow: { ...analysisData.cashflow, bodyCorp: priceToNumber(e.target.value) } })
            }}
          />

          {/* Repairs */}
          <ValueInput
            label="Repairs"
            value={numberToPrice(repairs)}
            onChange={(e) => {
              setAnalysisData({ ...analysisData, cashflow: { ...analysisData.cashflow, repairs: priceToNumber(e.target.value) } })
            }}
          />

          {/* Water */}
          <ValueInput
            label="Water Charges"
            value={numberToPrice(waterCharge)}
            onChange={(e) => {
              setAnalysisData({ ...analysisData, cashflow: { ...analysisData.cashflow, waterCharge: priceToNumber(e.target.value) } })
            }}
          />

          {/* Land tax */}

          <ValueInput
            label="Land Tax"
            value={numberToPrice(landTax)}
            onChange={(e) => {
              setAnalysisData({ ...analysisData, cashflow: { ...analysisData.cashflow, landTax: priceToNumber(e.target.value) } })
            }}
          />

          {/* Pest control */}

          <ValueInput
            label="Pest Control"
            value={numberToPrice(pestControl)}
            onChange={(e) => {
              setAnalysisData({ ...analysisData, cashflow: { ...analysisData.cashflow, pestControl: priceToNumber(e.target.value) } })
            }}
          />

          {/* Firm alarm */}

          <ValueInput
            label="Fire Alarm"
            value={numberToPrice(fireAlarm)}
            onChange={(e) => {
              setAnalysisData({ ...analysisData, cashflow: { ...analysisData.cashflow, fireAlarm: priceToNumber(e.target.value) } })
            }}
          />

          {/* Other */}

          <ValueInput
            label="Other Maintenance Cost"
            value={numberToPrice(otherCost)}
            onChange={(e) => {
              setAnalysisData({ ...analysisData, cashflow: { ...analysisData.cashflow, otherCost: priceToNumber(e.target.value) } })
            }}
          />

          <RangeInput
            key={managementRate}
            label="Rental Management Rate:"
            inputValue={managementRate}
            onChange={() => {}}
            min={3}
            max={10}
            step={0.01}
            wrapperStyles="col-span-6 sm:col-span-4 md:col-span-3"
          />
          <ValueDisplay label="Management Cost:" value={numberToPrice((rentalIncome * 52 * managementRate) / 100)} />
          <ValueDisplay label="Total:" value={numberToPrice(getYearlyMaintenanceCost(analysisData))} />
        </div>
      </div>
    </>
  )
}

export default AnalysisCashflow
