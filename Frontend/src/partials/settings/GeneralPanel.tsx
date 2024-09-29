import React, { useState, useEffect } from "react"
import packageJson from "/package.json"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { bulkUpdateSettings, getAPIVersion } from "../../apis/setting"
import { updateSettingValue } from "../../slices/settingSlice"
import { setIsLoading, setBanner } from "../../slices/configSlice"
import { DEFAULT_SETTINGS } from "../../../../Shared/Interface/settings"
import { clearPagedKeys } from "../../slices/clientSlice"
import { Settings } from "../../../../Shared/Interface/settings"

function GeneralPanel() {
  const dispatch = useAppDispatch()
  const settingState = useAppSelector((state) => state.setting)
  const [APIVersion, setAPIVersion] = useState("0.0.1")
  const { RMBcurrency, clientsPageSize, priceUnit } = settingState
  const [initialValue, setInitialValue] = useState({
    [DEFAULT_SETTINGS.RMBCurrency]: "",
    [DEFAULT_SETTINGS.ClientsPageSize]: "",
    [DEFAULT_SETTINGS.PriceUnit]: "",
  })

  const [invalidPageSize, setInvalidPageSize] = useState(false)
  const [invalidPriceUnit, setInvalidPriceUnit] = useState(false)
  const [invalidCurrency, setInvalidCurrency] = useState(false)

  useEffect(() => {
    recordInitialValue()

    getAPIVersion().then((res) => setAPIVersion(res))
  }, [])

  const recordInitialValue = () => {
    if (RMBcurrency && clientsPageSize && priceUnit) {
      setInitialValue({
        RMBcurrency: RMBcurrency.value,
        clientsPageSize: clientsPageSize.value,
        priceUnit: priceUnit.value,
      })
    }
  }

  //page size must be a number and between 10 and 100
  const checkPageSize = () => {
    const value = clientsPageSize.value
    return !isNaN(Number(value)) && value >= 10 && value <= 100
  }

  //RMB currency must be a number and between 0 and 10
  const checkRMBcurrency = () => {
    const value = RMBcurrency.value
    return !isNaN(Number(value)) && value >= 0 && value <= 10
  }

  //must be AUD or RMB
  const checkPriceUnit = () => {
    return priceUnit.value === "AUD" || priceUnit.value === "RMB"
  }

  const validationCheck = () => {
    if (!checkPageSize()) {
      setInvalidPageSize(true)
      return false
    }
    if (!checkRMBcurrency()) {
      setInvalidCurrency(true)
      return false
    }
    if (!checkPriceUnit()) {
      setInvalidPriceUnit(true)
      return false
    }
    return true
  }

  const onClientsPageSizeChange = (e) => {
    dispatch(updateSettingValue({ name: DEFAULT_SETTINGS.ClientsPageSize, value: e.target.value }))
  }

  const onIsAUDChange = (e) => {
    dispatch(updateSettingValue({ name: DEFAULT_SETTINGS.PriceUnit, value: e.target.value }))
  }

  const onRMBCurrencyChange = (e) => {
    dispatch(updateSettingValue({ name: DEFAULT_SETTINGS.RMBCurrency, value: e.target.value }))
  }

  const onSaveChanges = () => {
    if (validationCheck()) {
      dispatch(setIsLoading(true))
      const valueChanged: Settings[] = []
      for (const key in initialValue) {
        if (initialValue[key] !== settingState[key].value) {
          valueChanged.push({ name: key, value: settingState[key].value } as Settings)
        }
      }

      if (valueChanged.length > 0) {
        bulkUpdateSettings(valueChanged)
          .then((res) => {
            //refresh initial record
            recordInitialValue()

            //Reload clients table keys
            dispatch(clearPagedKeys())

            dispatch(setIsLoading(false))
            dispatch(setBanner({ content: "Settings updated successfully.", status: "success" }))
          })
          .catch((err) => {
            dispatch(setIsLoading(false))
            dispatch(setBanner({ content: "Error updating settings.", status: "error" }))
          })
      } else {
        dispatch(setIsLoading(false))
        dispatch(setBanner({ content: "No changes made.", status: "warning" }))
      }
    }
  }

  function getVersion() {
    const versions = [packageJson.version]
    if (process.env.CRM_ENV != "prod") {
      versions.push(process.env.CRM_ENV || "local")
      if (process.env.GITHUB_SHA) {
        versions.push(process.env.GITHUB_SHA.slice(0, 6))
      }
      if (process.env.GITHUB_RUN_NUMBER) {
        versions.push(process.env.GITHUB_RUN_NUMBER)
      }
    }
    return versions.join(".")
  }

  return (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 font-bold mb-5">General Settings</h2>

        {/* General */}
        <div>
          <h3 className="text-xl leading-snug text-slate-800 font-bold mb-1">Display</h3>
          <ul>
            <li className="flex items-center py-3 border-b border-slate-200">
              <div>
                <div className="text-slate-800 font-semibold">Clients per page</div>
                <div className="text-sm">
                  Please specify the number of clients you wish to view in the client table on each page. You can enter a value between 10 and 100 to customize
                  the pagination.
                </div>
                <div className="sm:w-1/2 mt-2">
                  <input
                    id="name"
                    className={`form-input ${invalidPageSize ? "border-rose-500" : ""}`}
                    type="text"
                    value={clientsPageSize ? clientsPageSize.value : 20}
                    onChange={(e) => {
                      setInvalidPageSize(false)
                      onClientsPageSizeChange(e)
                    }}
                  />
                  {invalidPageSize ? <div className="text-xs mt-1 text-rose-500">Must be a number between 10 and 100.</div> : <div></div>}
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* Currency */}
        <div>
          <h3 className="text-xl leading-snug text-slate-800 font-bold mb-1">Currency</h3>
          <ul>
            <li className="flex items-center py-3 border-b border-slate-200">
              <div>
                <div className="text-slate-800 font-semibold">Use AUD as currency</div>
                <div className="text-sm">Choose between AUD or RMB to view the prices in your preferred currency.</div>

                <div className="sm:w-1/2 mt-2">
                  <input
                    id="name"
                    className={`form-input ${invalidPriceUnit ? "border-rose-500" : ""}`}
                    type="text"
                    value={priceUnit ? priceUnit.value : "AUD"}
                    onChange={(e) => {
                      setInvalidPriceUnit(false)
                      onIsAUDChange(e)
                    }}
                  />
                  {invalidPriceUnit ? <div className="text-xs mt-1 text-rose-500">Currency must be AUD or RMB.</div> : <div></div>}
                </div>
              </div>
            </li>
            <li className="flex items-center py-3 border-b border-slate-200">
              <div>
                <div className="text-slate-800 font-semibold">RMB Currency</div>
                <div className="text-sm"></div>
                Please input a value for the currency between AUD and RMB.
                <div className="sm:w-1/2 mt-2">
                  <input
                    id="name"
                    className={`form-input ${invalidCurrency ? "border-rose-500" : ""}`}
                    type="text"
                    value={RMBcurrency ? RMBcurrency.value : "5.0"}
                    onChange={(e) => {
                      setInvalidCurrency(false)
                      onRMBCurrencyChange(e)
                    }}
                  />
                  {invalidCurrency ? <div className="text-xs mt-1 text-rose-500">Must be a number between 0 and 10.</div> : <div></div>}
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl leading-snug text-slate-800 font-bold mb-1">Versions</h3>
          <ul>
            <li className="flex items-center py-3 border-b border-slate-200">
              <div>
                <div>
                  <span className="text-slate-800 font-semibold my-2">Version: </span> {getVersion()}
                </div>
                <div>
                  <span className="text-slate-800 font-semibold my-2">API Version: </span>
                  {APIVersion}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Panel Button */}
      <footer>
        <div className="flex flex-col px-6 py-5 §fgfgbord5t§÷er-t border-slate-200">
          <div className="flex self-end">
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3" onClick={() => onSaveChanges()}>
              Save Changes
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default GeneralPanel
