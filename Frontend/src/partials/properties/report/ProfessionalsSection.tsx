import { useAppSelector } from "../../../app/hooks"
//import { getReportProfessionals } from "../../../slices/reducers/reportSlice"
import ProfessionalForm from "./components/ProfessionalForm"
import ProfessionalCard from "./components/ProfessionalCard"

// This section is a fake one for now.
//TODO: Make a real professionals section in the future.
const ProfessionalsSection = ({ handlePrev, handleNext }) => {
  //const professionals = useAppSelector(getReportProfessionals)

  return (
    <>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold">Select business partners:</h2>
        <div className="grid grid-cols-12 gap-4">
          <ProfessionalForm />
          {/* {professionals.map((professional) => (
            <ProfessionalCard key={professional.id} professional={professional} />
          ))} */}
        </div>
      </div>
    </>
  )
}

export default ProfessionalsSection
