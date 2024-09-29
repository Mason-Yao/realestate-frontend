import React from "react"
import { IProfessional } from "../../../../interfaces/interfaces"
import { useAppDispatch } from "../../../../app/hooks"
import { removeProfessional } from "../../../../slices/reducers/reportSlice"
import { BsPhoneVibrateFill } from "react-icons/bs"
import { FaUserTie } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { RiSpeakFill } from "react-icons/ri"
import { TiDelete } from "react-icons/ti"

interface IProps {
  professional: IProfessional
}

const ProfessionalCard = ({ professional }: IProps) => {
  const { id, name, roles, email, phone, languages } = professional
  const dispatch = useAppDispatch()

  return (
    <div className="col-span-12 sm:col-span-6 xl:col-span-4 2xl:col-span-3 flex flex-col gap-4 p-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="flex justify-between pb-3 border-b border-slate-100 font-semibold text-slate-800">
        <span>{name}</span>
        <button className="text-2xl" type="button" onClick={() => dispatch(removeProfessional(id))}>
          <TiDelete pointerEvents="none" />
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <FaUserTie className="text-2xl" />
        <div className="flex gap-2 flex-wrap">
          {roles.map((role, i) => (
            <small key={i} className="bg-indigo-400 py-1 px-2 rounded-md text-white font-bold">
              {role}
            </small>
          ))}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <MdEmail className="text-2xl min-w-[24px]" />
        <span>{email}</span>
      </div>
      <div className="flex gap-2 items-center">
        <BsPhoneVibrateFill className="text-2xl" />
        <span>{phone}</span>
      </div>
      <div className="flex gap-2 items-center">
        <RiSpeakFill className="text-2xl min-w-[24px]" />
        <div className="flex gap-2 flex-wrap">
          {languages.map((language, i) => (
            <small key={i} className="bg-indigo-400 py-1 px-2 rounded-md text-white font-bold">
              {language}
            </small>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProfessionalCard
