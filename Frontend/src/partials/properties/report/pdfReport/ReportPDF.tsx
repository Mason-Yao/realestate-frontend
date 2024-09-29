import { Document, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer"
import CoverPage from "./CoverPage"
import PropertyPage from "./PropertyPage"
import SummaryPage from "./SummaryPage"

const ReportPDF = ({ handlePrev, clientData, propertyData, analysisData, timelineData, upfrontCost, annualTotalCost, annualRentalIncome }) => {
  return (
    <>
      <PDFViewer className="w-[95%] h-[800px] mx-auto">
        <Document title="Investment Report" creator="selected-agent">
          {/* ZT-Note: createdAt not getting from backend yet */}
          <CoverPage propertyData={propertyData} clientData={clientData} />
          <PropertyPage propertyData={propertyData} />
          <SummaryPage
            clientData={clientData}
            propertyData={propertyData}
            analysisData={analysisData}
            timelineData={timelineData}
            upfrontCost={upfrontCost}
            annualTotalCost={annualTotalCost}
            annualRentalIncome={annualRentalIncome}
          />
        </Document>
      </PDFViewer>
      <div className="flex justify-between">
        <button onClick={handlePrev} type="button" className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
          &lt;- Prev
        </button>

        <div className="ml-auto flex gap-4">
          <PDFDownloadLink
            document={
              <Document title="Investment Report" creator="selected-agent">
                <CoverPage propertyData={propertyData} clientData={clientData} />
                <PropertyPage propertyData={propertyData} />
                <SummaryPage
                  clientData={clientData}
                  propertyData={propertyData}
                  analysisData={analysisData}
                  timelineData={timelineData}
                  upfrontCost={upfrontCost}
                  annualTotalCost={annualTotalCost}
                  annualRentalIncome={annualRentalIncome}
                />
              </Document>
            }
            fileName="Investment Report.pdf"
          >
            <button type="button" className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
              Download -&gt;
            </button>
          </PDFDownloadLink>
        </div>
      </div>
    </>
  )
}

export default ReportPDF
