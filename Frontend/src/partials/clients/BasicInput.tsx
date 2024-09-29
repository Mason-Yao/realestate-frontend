import React from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { GENDER } from "../../../../Shared/Interface/client"
import { setCurrentName, setCurrentGender, setCurrentPhone, setCurrentEmail } from "../../slices/clientSlice"
import { useAuth0 } from "@auth0/auth0-react"

function BasicInput(props) {
  const dispatch = useAppDispatch()

  let client = useAppSelector((state) => state.client.currentClient)

  return (
    <main>
      {/* Components */}
      <div className="space-y-8 p-2">
        {/* Input Types */}
        <div>
          <h2 className="text-2xl text-slate-800 font-bold mb-6">Basic Information</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="mandatory">
                Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="placeholder"
                className={`form-input w-full md:w-3/4 ${props.invalidName ? "border-rose-500" : ""}`}
                type="text"
                required
                value={client.name}
                onChange={(e) => {
                  props.setInvalidName(false)
                  dispatch(setCurrentName(e.target.value))
                }}
              />
              {props.invalidName ? <div className="text-xs mt-1 text-rose-500">This field is required</div> : <div></div>}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="category">
                Gender
              </label>

              <div className="flex">
                <div className="m-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="radio-buttons"
                      className="form-radio"
                      checked={client.gender === GENDER.Male}
                      onChange={() => {
                        dispatch(setCurrentGender(GENDER.Male))
                      }}
                    />
                    <span className="text-sm ml-2">Male</span>
                  </label>
                </div>

                <div className="m-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="radio-buttons"
                      className="form-radio"
                      checked={client.gender === GENDER.Female}
                      onChange={() => {
                        dispatch(setCurrentGender(GENDER.Female))
                      }}
                    />
                    <span className="text-sm ml-2">Female</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="placeholder">
                Phone
              </label>
              <input
                id="placeholder"
                className={`form-input w-full md:w-3/4 ${props.invalidPhone ? "border-rose-500" : ""}`}
                type="text"
                placeholder="Mobile..."
                value={client.phone}
                onChange={(e) => {
                  props.setInvalidPhone(false)
                  dispatch(setCurrentPhone(e.target.value))
                }}
              />
              {props.invalidPhone ? <div className="text-xs mt-1 text-rose-500">Please input valid phone number</div> : <div></div>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="placeholder">
                Email
              </label>
              <input
                id="placeholder"
                className={`form-input w-full md:w-3/4 ${props.invalidEmail ? "border-rose-500" : ""}`}
                type="text"
                placeholder="Email..."
                value={client.email}
                onChange={(e) => {
                  props.setInvalidEmail(false)
                  dispatch(setCurrentEmail(e.target.value))
                }}
              />
              {props.invalidEmail ? <div className="text-xs mt-1 text-rose-500">Please input valid email</div> : <div></div>}
            </div>
            {/* End */}
          </div>
        </div>
      </div>
    </main>
  )
}

export default BasicInput
