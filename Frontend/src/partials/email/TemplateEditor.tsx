import React, { useState, useEffect } from "react"
import { useQuill } from "react-quilljs"
import "quill/dist/quill.snow.css" // Add css for snow theme

const TemplateEditor = (props) => {
  const imageHandler = () => {
    // @ts-ignore
    const tooltip = this.quill.theme.tooltip
    const originalSave = tooltip.save
    const originalHide = tooltip.hide

    tooltip.save = function () {
      const range = this.quill.getSelection(true)
      const value = this.textbox.value
      if (value) {
        this.quill.insertEmbed(range.index, "image", value, "user")
      }
    }
    // Called on hide and save.
    tooltip.hide = function () {
      tooltip.save = originalSave
      tooltip.hide = originalHide
      tooltip.hide()
    }
    tooltip.edit("image")
    tooltip.textbox.placeholder = "Embed URL"
  }

  const modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        imageHandler: imageHandler,
      },
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
  }

  const { quill, quillRef, Quill } = useQuill({ modules })

  useEffect(() => {
    if (Quill) {
      let Block = Quill.import("blots/block")
      Block.tagName = "div"
      Quill.register(Block, true)
    }
  }, [Quill])

  useEffect(() => {
    if (quill) {
      //set initial value in edit mode
      if (props.data) {
        quill.clipboard.dangerouslyPasteHTML(props.data)
      }
    }
  }, [quill, props.editorRefresh])

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        props.handleEditorData(quill.root.innerHTML) // Get innerHTML using quill
      })
    }
  }, [quill])

  const CustomImageFromLink = () => (
    <svg className="svg-icon" viewBox="0 0 20 20">
      <path d="M18.555,15.354V4.592c0-0.248-0.202-0.451-0.45-0.451H1.888c-0.248,0-0.451,0.203-0.451,0.451v10.808c0,0.559,0.751,0.451,0.451,0.451h16.217h0.005C18.793,15.851,18.478,14.814,18.555,15.354 M2.8,14.949l4.944-6.464l4.144,5.419c0.003,0.003,0.003,0.003,0.003,0.005l0.797,1.04H2.8z M13.822,14.949l-1.006-1.317l1.689-2.218l2.688,3.535H13.822z M17.654,14.064l-2.791-3.666c-0.181-0.237-0.535-0.237-0.716,0l-1.899,2.493l-4.146-5.42c-0.18-0.237-0.536-0.237-0.716,0l-5.047,6.598V5.042h15.316V14.064z M12.474,6.393c-0.869,0-1.577,0.707-1.577,1.576s0.708,1.576,1.577,1.576s1.577-0.707,1.577-1.576S13.343,6.393,12.474,6.393 M12.474,8.645c-0.371,0-0.676-0.304-0.676-0.676s0.305-0.676,0.676-0.676c0.372,0,0.676,0.304,0.676,0.676S12.846,8.645,12.474,8.645"></path>
    </svg>
  )

  //console.log(quill);    // undefined > Quill Object
  //console.log(quillRef); // { current: undefined } > { current: Quill Editor Reference }

  return (
    <main>
      <div style={{ height: 300 }}>
        <div id="toolbar">
          <select className="ql-size"></select>

          <span className="ql-formats">
            <button className="ql-bold"></button>
            <button className="ql-italic"></button>
            <button className="ql-underline"></button>
            <button className="ql-strike"></button>
          </span>

          <span className="ql-formats">
            <button className="ql-list" value="ordered"></button>
            <button className="ql-list" value="bullet"></button>
          </span>

          <span className="ql-formats">
            <select className="ql-align"></select>
            <button className="ql-indent" value="-1"></button>
            <button className="ql-indent" value="+1"></button>
          </span>

          <span className="ql-formats">
            <select className="ql-color"></select>
            <select className="ql-background"></select>
          </span>

          <span className="ql-formats">
            <button className="ql-link"></button>
            <button className="ql-image"></button>
            <button className="ql-imageHandler">
              <CustomImageFromLink />
            </button>
            <button className="ql-video"></button>
          </span>

          <span className="ql-formats">
            <button className="ql-clean"></button>
          </span>
        </div>
        <div ref={quillRef} className="bg-white" />
      </div>
    </main>
  )
}

export default TemplateEditor
