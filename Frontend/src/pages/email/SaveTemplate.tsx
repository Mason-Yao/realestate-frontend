import React, { useState } from "react"
import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks"
import Sidebar from "../../partials/Sidebar"
import Header from "../../partials/Header"
import Tooltip from "../../components/Tooltip"
import { useAppSelector } from "../../app/hooks"
import NoPermission from "../utility/NoPermission"
import TemplateEditor from "../../partials/email/TemplateEditor"
import { addTemplate, updateTemplate, getTemplate } from "../../apis/templates"
import { setCurrentTemplate, clearCurrentTemplate, setCurrentName, setCurrentSubject, setCurrentEditorData, setCurrentCreatedBy } from "../../slices/emailSlice"
import { setIsLoading, setBanner } from "../../slices/configSlice"

function SaveTemplate() {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const dispatch = useAppDispatch()
  let navigate = useNavigate()
  const [invalidName, setInvalidName] = useState(false)
  const [invalidSubject, setInvalidSubject] = useState(false)
  const [editorRefresh, setEditorRefresh] = useState(false)
  const user = useAppSelector((state) => state.user)
  const templateData = useAppSelector((state) => state.email.currentTemplate)

  //Clear current template redux when unmount save template page
  useEffect(() => {
    const id = location.state ? location.state.templateID : location.pathname.split("/")[3]
    if (id !== "new") {
      dispatch(setIsLoading(true))
      getTemplate(id).then((res) => {
        dispatch(setCurrentTemplate(res))
        dispatch(setIsLoading(false))
        setEditorRefresh(true)
      })
    }
    return () => {
      dispatch(clearCurrentTemplate())
    }
  }, [])

  useEffect(() => {
    //Add created by to template if we are adding a new template
    if (!location.state) {
      dispatch(setCurrentCreatedBy(user.name))
    }
  }, [user])

  const handleSave = () => {
    if (templateData.name == "") {
      setInvalidName(true)
      return
    }
    if (templateData.subject == "") {
      setInvalidSubject(true)
      return
    }
    dispatch(setIsLoading(true))
    const { PK, id, ...templatePayload } = templateData
    // We are editing a template
    if (location.state) {
      updateTemplate(id, templatePayload)
        .then((res) => {
          dispatch(
            setBanner({
              status: "success",
              content: `Template '${templateData.name}' updated successfully.`,
            })
          )
          dispatch(setIsLoading(false))
          navigate("/marketing/templates")
        })
        .catch((error) => {
          dispatch(
            setBanner({
              status: "error",
              content: `Something wrong when saving template, please try again later.`,
            })
          )
          dispatch(setIsLoading(false))
        })
    } else {
      // We are adding a new template
      addTemplate(templatePayload)
        .then((res) => {
          dispatch(
            setBanner({
              status: "success",
              content: `New template '${templateData.name}' saved successfully.`,
            })
          )
          dispatch(setIsLoading(false))
          navigate("/marketing/templates")
        })
        .catch((error) => {
          dispatch(
            setBanner({
              status: "error",
              content: `Something wrong when saving template, please try again later.`,
            })
          )
          dispatch(setIsLoading(false))
        })
    }
  }

  const handleCancel = () => {
    navigate("/marketing/templates")
  }

  const handleEditorData = (data) => {
    dispatch(setCurrentEditorData(data))
  }

  if (user.isValid) {
    return (
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="md:px-20 md:py-10">
              {/* Inputs */}
              <div className="space-y-8 p-2 py-2">
                {/* Input Types */}
                <h2 className="text-2xl text-slate-800 font-bold mb-6">New Template</h2>
                <div className="grid gap-5 grid-cols-1">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="mandatory">
                      Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="name"
                      className={`form-input w-full ${invalidName ? "border-rose-500" : ""}`}
                      type="text"
                      required
                      value={templateData.name}
                      onChange={(e) => {
                        setInvalidName(false)
                        dispatch(setCurrentName(e.target.value))
                      }}
                    />
                    {invalidName ? <div className="text-xs mt-1 text-rose-500">This field is required</div> : <div></div>}
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="mandatory">
                      Subject <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="subject"
                      className={`form-input w-full ${invalidSubject ? "border-rose-500" : ""}`}
                      type="text"
                      required
                      value={templateData.subject}
                      onChange={(e) => {
                        setInvalidSubject(false)
                        dispatch(setCurrentSubject(e.target.value))
                      }}
                    />
                    {invalidSubject ? <div className="text-xs mt-1 text-rose-500">This field is required</div> : <div></div>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="mandatory">
                      Body
                    </label>

                    {/* Editor */}
                    <TemplateEditor handleEditorData={handleEditorData} data={templateData.template} editorRefresh={editorRefresh} />
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="md:px-20 mt-20 sm:mt-0 pt-2 sm:pt-0">
              <div className="flex p-2 justify-between">
                <nav className="mb-4 md:mb-0 order-1 " role="navigation" aria-label="Navigation">
                  <ul className="flex justify-center">
                    <li className="ml-3 first:ml-0">
                      <a className="btn border-slate-200 hover:border-slate-300 text-slate-600" href="#0" onClick={() => handleCancel()}>
                        Cancel
                      </a>
                    </li>
                    <li className="ml-3 first:ml-0">
                      <a className="btn bg-emerald-500 hover:bg-emerald-600 text-white" href="#0" onClick={() => handleSave()}>
                        Save
                      </a>
                    </li>
                  </ul>
                </nav>
                {/* A Placeholder */}
                <div>
                  <div className="text-sm px-2.5 flex flex-wrap">
                    Placeholders {/* @ts-ignore */}
                    <Tooltip
                      size="md"
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-help-circle-filled w-5 h-5 stroke-1 fill-current"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path
                            d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm0 13a1 1 0 0 0 -.993 .883l-.007 .117l.007 .127a1 1 0 0 0 1.986 0l.007 -.117l-.007 -.127a1 1 0 0 0 -.993 -.883zm1.368 -6.673a2.98 2.98 0 0 0 -3.631 .728a1 1 0 0 0 1.44 1.383l.171 -.18a.98 .98 0 0 1 1.11 -.15a1 1 0 0 1 -.34 1.886l-.232 .012a1 1 0 0 0 .111 1.994a3 3 0 0 0 1.371 -5.673z"
                            strokeWidth="0"
                            fill="currentColor"
                          />
                        </svg>
                      }
                    >
                      <div className="text-xs">The following placeholders in template will be replaced by real values in email.</div>
                    </Tooltip>
                    {": "}
                  </div>
                  <div className="flex flex-wrap items-center">
                    {/* Placeholder Badges */}
                    {/* @ts-ignore */}
                    <Tooltip
                      icon={
                        <div className="m-1.5">
                          {/* Start */}
                          <div className="text-sm inline-flex font-medium bg-indigo-100 text-indigo-600 rounded-full text-center px-2.5 py-1">
                            {`{{FROM_EMAIL}}`}
                          </div>
                          {/* End */}
                        </div>
                      }
                    >
                      <div className="text-xs whitespace-nowrap">Your email</div>
                    </Tooltip>
                    {/* @ts-ignore */}
                    <Tooltip
                      icon={
                        <div className="m-1.5">
                          {/* Start */}
                          <div className="text-sm inline-flex font-medium bg-indigo-100 text-indigo-600 rounded-full text-center px-2.5 py-1">{`{{TO_EMAIL}}`}</div>
                          {/* End */}
                        </div>
                      }
                    >
                      <div className="text-xs whitespace-nowrap">Recipients email</div>
                    </Tooltip>
                    {/* @ts-ignore */}
                    <Tooltip
                      icon={
                        <div className="m-1.5">
                          {/* Start */}
                          <div className="text-sm inline-flex font-medium bg-indigo-100 text-indigo-600 rounded-full text-center px-2.5 py-1">{`{{TODAY_DATE}}`}</div>
                          {/* End */}
                        </div>
                      }
                    >
                      <div className="text-xs whitespace-nowrap">Today's date</div>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }
  return <NoPermission />
}

export default SaveTemplate
