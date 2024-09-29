import { useState, useCallback } from "react"
import RangeInput from "../../../components/RangeInput"
import ValueDisplay from "../../../components/ValueDisplay"
import { numberToPrice, priceToNumber } from "../../../utils/helper"
import { LOAN_TYPE } from "../../../interfaces/properties"
import { debounce, set } from "lodash"
import ValueInput from "../../../components/ValueInput"
import RatioSelector from "../../../components/RatioSelector"

const AnalysisLoan = ({ propertyData, analysisData, setAnalysisData }) => {
  const { loanAmount, loanInterest, loanType, loanRatio, monthlyRepayment, monthlyInterest } = analysisData.loan
  const { housePrice } = propertyData
  const [loanAmountDisplay, setLoanAmountDisplay] = useState<number>(loanAmount)

  const onLoanRatioChange = useCallback(
    debounce((e) => {
      const newRatio = Number(e.target.value)
      const loanAmount = Math.round((housePrice * newRatio) / 100)
      setAnalysisData((previousAnalysisData) => ({
        ...previousAnalysisData,
        deposit: housePrice - loanAmount - previousAnalysisData.eoi,
        loan: { ...analysisData.loan, loanRatio: newRatio, loanAmount: loanAmount },
      }))
    }, 2000),
    [loanRatio]
  )

  const onLoanAmountChange = useCallback(
    debounce((e) => {
      const newAmount = priceToNumber(e.target.value)
      setAnalysisData((previousAnalysisData) => ({
        ...previousAnalysisData,
        deposit: housePrice - newAmount - previousAnalysisData.eoi,
        loan: { ...analysisData.loan, loanRatio: Math.round((newAmount / housePrice) * 100), loanAmount: newAmount },
      }))
    }, 500),
    [loanAmount]
  )

  const onLoanInterestChange = useCallback(
    debounce((e) => {
      setAnalysisData({ ...analysisData, loan: { ...analysisData.loan, loanInterest: Number(e.target.value) } })
    }, 500),
    [loanInterest]
  )
  const options = [
    { label: "Principal & Interest", value: LOAN_TYPE.PI },
    { label: "Interest Only", value: LOAN_TYPE.IO },
  ]

  return (
    <>
      <div className="flex flex-col gap-2 sm:gap-4">
        <h2 className="pb-3 border-b border-slate-100 font-semibold text-slate-800">3.Loan settings</h2>
        <div className="grid grid-cols-12 gap-2 sm:gap-4 lg:gap-6 mx-2">
          <RangeInput
            key={loanRatio}
            label="Loan ratio (LVR):"
            inputValue={loanRatio}
            onChange={(e) => {
              setLoanAmountDisplay(Math.round((housePrice * Number(e.target.value)) / 100))
              onLoanRatioChange(e)
            }}
            min={0}
            max={100}
            step={1}
          />
          <RangeInput
            key={loanInterest}
            label="Loan Interest:"
            inputValue={loanInterest}
            onChange={(e) => onLoanInterestChange(e)}
            min={0}
            max={20}
            step={0.01}
          />
          {/* Loan type */}
          <div className="col-span-12 sm:col-span-3">
            <label className="block text-sm font-medium mb-1" htmlFor="category">
              Loan Type:
            </label>
            <RatioSelector
              options={options}
              selectedValue={loanType}
              onChange={(selectedOption: { label: string; value: string }) => {
                setAnalysisData({ ...analysisData, loan: { ...analysisData.loan, loanType: selectedOption.value } })
              }}
            />
          </div>

          <ValueInput
            label="Loan amount"
            value={numberToPrice(loanAmountDisplay)}
            onChange={(e) => {
              const amount = priceToNumber(e.target.value)
              setLoanAmountDisplay(amount)
              onLoanAmountChange(e)
            }}
          />

          <ValueDisplay label="Monthly interest" value={monthlyInterest} styleClasses="col-span-6 sm:col-span-3" />
          <ValueDisplay label="Monthly repayment" value={monthlyRepayment} styleClasses="col-span-6 sm:col-span-3" />
          <ValueDisplay label="Annual repayment" value={String((monthlyRepayment * 12).toFixed(2))} styleClasses="col-span-6 sm:col-span-3" />
        </div>
      </div>
    </>
  )
}

export default AnalysisLoan
