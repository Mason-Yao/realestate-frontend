import { useEffect, useState } from "react"
import ClientSearch from "./ClientSearch"
import { Client } from "../../../../../Shared/Interface/client"

const ClientSection = ({ clientData, setClientData }) => {
  const [selectedOption, setSelectedOption] = useState<Client | undefined>(undefined)

  useEffect(() => {
    if (selectedOption) {
      setClientData({ ...clientData, name: selectedOption?.name, email: selectedOption.email, phone: selectedOption.phone })
    }
  }, [selectedOption])

  return (
    <>
      <h2 className="font-bold">Select a client:</h2>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 sm:col-span-6 flex flex-col gap-4 p-4 bg-white shadow-lg rounded-sm border border-slate-200">
          <h2 className="pb-3 border-b border-slate-100 font-semibold text-slate-800">Client details</h2>
          <ClientSearch onChange={setSelectedOption} />

          <div className="flex gap-4 flex-wrap">
            <div>
              <label className="block text-sm font-medium text-indigo-500 mb-1" htmlFor="mandatory">
                Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="placeholder"
                className={"form-input w-full"}
                type="text"
                required
                value={clientData.name}
                onChange={(e) => {
                  setClientData({ ...clientData, name: e.target.value })
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-indigo-500 mb-1" htmlFor="mandatory">
                Email
              </label>
              <input
                id="placeholder"
                className={"form-input w-full"}
                type="text"
                required
                value={clientData.email}
                onChange={(e) => {
                  setClientData({ ...clientData, email: e.target.value })
                }}
              />
            </div>
            <div>
              <label className="block text-sm mb-1 font-medium text-indigo-500" htmlFor="mandatory">
                Phone
              </label>
              <input
                id="placeholder"
                className={"form-input w-full"}
                type="text"
                required
                value={clientData.phone}
                onChange={(e) => {
                  setClientData({ ...clientData, phone: e.target.value })
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 flex flex-col gap-4 p-4 bg-white shadow-lg rounded-sm border border-slate-200">
          <h2 className="pb-3 border-b border-slate-100 font-semibold text-slate-800">Additional options</h2>
          {/* Foreign buyer */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="category">
              Foreign buyer:
            </label>
            <div className="flex">
              <div className="m-1 px-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="foreign-buyer-radio"
                    className="form-radio"
                    checked={clientData.foreignBuyer}
                    onChange={() => {
                      setClientData({ ...clientData, foreignBuyer: true })
                    }}
                  />
                  <span className="text-sm ml-2">Yes</span>
                </label>
              </div>

              <div className="m-1 px-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="foreign-buyer-radio"
                    className="form-radio"
                    checked={!clientData.foreignBuyer}
                    onChange={() => {
                      setClientData({ ...clientData, foreignBuyer: false })
                    }}
                  />
                  <span className="text-sm ml-2">No</span>
                </label>
              </div>
            </div>
          </div>

          {/* First home buyer */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="category">
              First home buyer:
            </label>
            <div className="flex">
              <div className="m-1 px-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="first-home-buyer-radio"
                    className="form-radio"
                    checked={clientData.firstHomeBuyer}
                    onChange={() => {
                      setClientData({ ...clientData, firstHomeBuyer: true })
                    }}
                  />
                  <span className="text-sm ml-2">Yes</span>
                </label>
              </div>

              <div className="m-1 px-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="first-home-buyer-radio"
                    className="form-radio"
                    checked={!clientData.firstHomeBuyer}
                    onChange={() => {
                      setClientData({ ...clientData, firstHomeBuyer: false })
                    }}
                  />
                  <span className="text-sm ml-2">No</span>
                </label>
              </div>
            </div>
          </div>

          {/* Buying for */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="category">
              Buying for:
            </label>
            <div className="flex">
              <div className="m-1 px-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="investment-type-radio"
                    className="form-radio"
                    checked={clientData.investmentType === "investment"}
                    onChange={() => {
                      setClientData({ ...clientData, investmentType: "investment" })
                    }}
                  />
                  <span className="text-sm ml-2">Investment</span>
                </label>
              </div>

              <div className="m-1 px-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="investment-type-radio"
                    className="form-radio"
                    checked={clientData.investmentType === "residence"}
                    onChange={() => {
                      setClientData({ ...clientData, investmentType: "residence" })
                    }}
                  />
                  <span className="text-sm ml-2">Residence</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ClientSection
