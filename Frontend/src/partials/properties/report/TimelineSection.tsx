import ValueDisplay from "../../../components/ValueDisplay"
import { numberToPrice } from "../../../utils/helper"

import DatePicker from "../../../components/Datepicker"

const TimelineSection = ({ handlePrev, handleNext, propertyData, analysisData, timelineData, setTimelineData, upfrontCost }) => {
  const { contractDate, coolingOffDate, subjectToFinanceDate, subjectToBuildingDate, settlementDate } = timelineData
  const { loanAmount, loanInterest, monthlyRepayment } = analysisData.loan

  return (
    <>
      <h2 className="font-bold">Timeline Section:</h2>
      <div className="flex flex-col gap-8 p-4 bg-white shadow-lg rounded-sm border border-slate-200">
        <div className="flex flex-col gap-4">
          <h2 className="flex justify-between items-center pb-3 border-b border-slate-100 font-semibold text-slate-800">
            <span>1. Sign Contract</span>
            <DatePicker
              date={new Date(contractDate)}
              setDate={(value: string) => setTimelineData({ ...timelineData, contractDate: value })}
              align={undefined}
            />
          </h2>
          <p>
            The seller (vendor) of a property will prepare a contract of sale. As a potential buyer, first inspect the property and talk to the real estate
            agent or seller. Then, ask to see the contract of sale. Get help from a solicitor or conveyancer to review the contract before signing. Paying a
            legal expert is the best way to avoid costly mistakes.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="flex justify-between items-center pb-3 border-b border-slate-100 font-semibold text-slate-800">
            <span>2. Cooling off Period</span>
            <DatePicker
              date={new Date(coolingOffDate)}
              setDate={(value: string) => setTimelineData({ ...timelineData, coolingOffDate: value })}
              align={undefined}
            />
          </h2>
          <p>
            In QLD, A cooling-off period of 5 business days applies to contracts for the sale of residential property. It will start the day the buyer receives
            a copy of the contract (signed by both parties).
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="flex justify-between items-center pb-3 border-b border-slate-100 font-semibold text-slate-800">
            <span>3. Subject to Finance Date</span>
            <DatePicker
              date={new Date(subjectToFinanceDate)}
              setDate={(value: string) => setTimelineData({ ...timelineData, subjectToFinanceDate: value })}
              align={undefined}
            />
          </h2>
          <p>The contract is subject to and conditional upon the buyer obtaining finance approval, which is satisfactory to them to complete the purchase.</p>
          <div className="grid grid-cols-12 gap-2 sm:gap-4 lg:gap-6">
            <ValueDisplay label="Loan Amount:" value={numberToPrice(loanAmount)} styleClasses="col-span-4" />
            <ValueDisplay label="Loan Interest:" value={loanInterest} styleClasses="col-span-4" />
            <ValueDisplay label="Monthly Repayments:" value={numberToPrice(monthlyRepayment)} styleClasses="col-span-4" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="flex justify-between items-center pb-3 border-b border-slate-100 font-semibold text-slate-800">
            <span>4. Subject to Building Inspection Date</span>
            <DatePicker
              date={new Date(subjectToBuildingDate)}
              setDate={(value: string) => setTimelineData({ ...timelineData, subjectToBuildingDate: value })}
              align={undefined}
            />
          </h2>
          <p>
            The phrase ‘subject to building inspection' is a clause inserted into a property sale contract which means the sale is conditional on a satisfactory
            building inspection being carried out. It’s a very common clause in a property sale contract, although it’s not compulsory to have a pest or
            property inspection before purchasing your property.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="flex justify-between items-center pb-3 border-b border-slate-100 font-semibold text-slate-800">
            <span>5. Settlement Date</span>
            <DatePicker
              date={new Date(settlementDate)}
              setDate={(value: string) => setTimelineData({ ...timelineData, settlementDate: value })}
              align={undefined}
            />
          </h2>
          <p>
            The settlement date is when the property title is transferred into your name, and your mortgage begins. The contract of sale sets out the settlement
            period, when you have to pay the full purchase price. Your solicitor or conveyancer will finalise the settlement with the lender and seller. Then
            you'll get the keys to your new property.
          </p>
          <ValueDisplay label="Upfront Cost:" value={numberToPrice(upfrontCost)} styleClasses="col-span-4" />
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={handlePrev} type="button" className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
          &lt;- Prev
        </button>

        <div className="ml-auto flex gap-4">
          <button onClick={handleNext} type="button" className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
            Next -&gt;
          </button>
        </div>
      </div>
    </>
  )
}

export default TimelineSection
