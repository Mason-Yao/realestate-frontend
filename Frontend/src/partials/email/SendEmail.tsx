import React, { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { useNavigate } from "react-router-dom"
import ModalBasic from "../../components/ModalBasic"
import { logger } from "../../../../Shared/Utils"
import EmailPreview from "./EmailPreview"
import { setAllTemplates } from "../../slices/emailSlice"
import { setIsLoading, setBanner } from "../../slices/configSlice"
import { listTemplates } from "../../apis/templates"
import { sendEmail } from "../../apis/marketing"

function SendEmail(props) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const sender = useAppSelector((state) => state.user.profile.email)
  const receivers = props.selectedItems.map((item) => item.email).filter((item) => item !== null)
  const templates = useAppSelector((state) => state.email.allTemplates)
  const [selected, setSelected] = useState(0)
  const modalTitle = receivers.length == 1 ? "Send an email to " + receivers[0] : "Send Emails to " + receivers.length + " clients"
  const content = templates[selected] ? templates[selected].template : ""
  const replacePlaceHolder = (text) => {
    text = text.replace("{{FROM_EMAIL}}", sender)
    text = text.replace("{{TO_EMAIL}}", receivers[0])
    text = text.replace("{{TODAY_DATE}}", new Date().toDateString())
    return text
  }
  const previewContent = replacePlaceHolder(content)

  useEffect(() => {
    dispatch(setIsLoading(true))
    //list all templates without pagination
    listTemplates(false, 1).then((res) => {
      dispatch(setAllTemplates(res))
      dispatch(setIsLoading(false))
    })
  }, [])

  const handleSend = () => {
    const selectedTemplate = templates[selected]
    const subject = selectedTemplate.subject

    dispatch(setIsLoading(true))
    sendEmail(subject, sender, receivers, content)
      .then((res) => {
        logger.info(res)
        dispatch(setIsLoading(false))
        props.setSendEmailModalOpen(false)
        dispatch(
          setBanner({
            status: "success",
            content: `Emails sent successfully.`,
          })
        )
      })
      .catch((error) => {
        logger.error(error)
        dispatch(setIsLoading(false))
        props.setSendEmailModalOpen(false)
        dispatch(
          setBanner({
            status: "error",
            content: `Something wrong happened. Please try again.`,
          })
        )
      })
  }

  const onManageTemplatesClick = () => {
    props.setSendEmailModalOpen(false)
    navigate("/marketing/templates")
  }

  return (
    <div className="space-y-8 mt-8">
      <ModalBasic id="sendEmail-modal" modalOpen={props.sendEmailModalOpen} setModalOpen={props.setSendEmailModalOpen} title={modalTitle} size={`max-w-5xl`}>
        {/* Modal content */}
        <div className="px-5 py-4">
          {/* Template selection */}
          <div className="space-y-3">
            <div>
              <div className="flex flex-wrap justify-between">
                <label className="block text-sm font-medium mb-1" htmlFor="templateSelection">
                  Email Template
                </label>
                <button className="text-sm underline hover:no-underline text-sky-600" onClick={() => onManageTemplatesClick()}>
                  Manage templates
                </button>
              </div>

              <select id="templateSelection" className="form-select w-full " onChange={(e) => setSelected(Number(e.target.value))} value={selected}>
                {templates.map((template, index) => {
                  return (
                    <option key={template.id} value={index}>
                      {template.name}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className="space-y-3 mt-3">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="templateSelection">
                Preview
              </label>
            </div>
            {/* Email content */}
            <div className="bg-white rounded-sm border border-slate-200 h-80 overflow-y-scroll">
              <EmailPreview content={previewContent} />
            </div>
          </div>
        </div>
        {/* Modal footer */}
        <div className="px-5 py-4 border-t border-slate-200">
          <div className="flex flex-wrap justify-end space-x-2">
            <button
              className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
              onClick={(e) => {
                e.stopPropagation()
                props.setSendEmailModalOpen(false)
              }}
            >
              Cancel
            </button>
            <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => handleSend()}>
              Send
            </button>
          </div>
        </div>
      </ModalBasic>
    </div>
  )
}

export default SendEmail
