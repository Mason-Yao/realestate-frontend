import React from "react"
import { convertToHTML } from "../../utils/emailToHTML"

function EmailPreview(props) {
  const html = convertToHTML(props.content)
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default EmailPreview
