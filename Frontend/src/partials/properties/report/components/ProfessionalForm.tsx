// @ts-nocheck
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools"
import { BsPersonFillAdd, BsPhoneVibrateFill } from "react-icons/bs"
import { FaUserTie } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { RiSpeakFill } from "react-icons/ri"
//import SearchSelect from "../SearchSelect"
import ClientSearch from "../ClientSearch"
import { Client } from "../../../../../../Shared/Interface/client"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
//import { addProfessional, getReportProfFormData } from "../../../../slices/reducers/reportSlice"
import { BiSolidUser } from "react-icons/bi"
import { IProfessional } from "../../../../interfaces/interfaces"
import { languages, occupations, validators } from "../../../../utils/constants"

const ProfessionalForm = () => {
  const dispatch = useAppDispatch()
  //const reduxProfFormData = useAppSelector(getReportProfFormData)

  // const formData = {
  //   defaultValues: reduxProfFormData,
  // } // Need to pass defaultValues to useForm

  // const { register, control, handleSubmit, formState, reset } = useForm(formData)
  // const { errors } = formState

  const onSubmit = (data: IProfessional) => {
    // ZT-Note: here we prepare a new id for interaction use only (remove card need this id)
    const itemId = new Date().toISOString()
    const newProfessional = { ...data, id: itemId }
    // console.log("newProfessional-to-add", newProfessional);
    dispatch(addProfessional(newProfessional))
  }

  // useEffect(() => {
  //   reset(formData.defaultValues)
  // }, [reduxProfFormData])

  const [selectedOption, setSelectedOption] = useState<Client | undefined>(undefined)

  return (
    <>
      <form
        id="report-professionals-form"
        // onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="col-span-12 sm:col-span-6 xl:col-span-4 2xl:col-span-3 flex flex-col gap-4 p-4 bg-white shadow-lg rounded-sm border border-slate-200"
      >
        <div className="flex justify-between">
          <ClientSearch onChange={setSelectedOption} />
          <button className="text-2xl" type="submit">
            <BsPersonFillAdd />
          </button>
        </div>

        <div>
          <div className="flex gap-2 items-center">
            <BiSolidUser className="text-xl min-w-[20px]" />
            <input
              type="text"
              id="name"
              // {...register("name", { required: { value: true, message: "Required" } })}
              className="w-4/5 text-base border-t-0 border-l-0 border-r-0 border-b-slate-200 focus:ring-0"
            />
          </div>
          {/* {errors.name && <small className="text-red-300">{errors.name.message}</small>} */}
        </div>

        <div>
          <div className="flex gap-2 items-center">
            <FaUserTie className="text-xl min-w-[20px]" />
            <select
              className="w-4/5 h-[50px] border-none thin-scrollbar focus:ring-0"
              id="roles"
              // {...register("roles", { required: { value: true, message: "Required" } })}
              multiple
            >
              {occupations.map((e) => (
                <option key={e.id} value={e.value}>
                  {e.label}
                </option>
              ))}
            </select>
          </div>
          {/* {errors.roles && <small className="text-red-300">{errors.roles.message}</small>} */}
        </div>

        <div>
          <div className="flex gap-2 items-center">
            <MdEmail className="text-xl min-w-[20px]" />
            <input
              type="email"
              id="email"
              // {...register("email", {
              //   pattern: {
              //     value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              //     message: "Invalid email format",
              //   },
              //   validate: validators.email,
              // })}
              className="w-4/5 text-base border-t-0 border-l-0 border-r-0 border-b-slate-200 focus:ring-0"
            />
          </div>
          {/* {errors.email && <small className="text-red-300">{errors.email.message}</small>} */}
        </div>

        <div>
          <div className="flex gap-2 items-center">
            <BsPhoneVibrateFill className="text-xl min-w-[20px]" />
            <input
              type="text"
              id="phone"
              // {...register("phone", { required: { value: true, message: "Required" } })}
              className="w-4/5 text-base border-t-0 border-l-0 border-r-0 border-b-slate-200 focus:ring-0"
            />
          </div>
          {/* {errors.phone && <small className="text-red-300">{errors.phone.message}</small>} */}
        </div>

        <div className="flex gap-2 items-center">
          <RiSpeakFill className="text-xl min-w-[20px]" />
          <select
            className="w-4/5 h-[50px] border-none thin-scrollbar focus:ring-0"
            id="languages"
            // {...register("languages", { required: { value: true, message: "Required" } })}
            multiple
          >
            {languages.map((e) => (
              <option key={e.id} value={e.value}>
                {e.label}
              </option>
            ))}
          </select>
          {/* {errors.languages && <small className="text-red-300">{errors.languages.message}</small>} */}
        </div>
      </form>
      {/* <DevTool control={control} /> */}
    </>
  )
}

export default ProfessionalForm
