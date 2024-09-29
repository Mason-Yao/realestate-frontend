import React, { useEffect, useState } from "react"
import { AiFillHome, AiOutlineClose } from "react-icons/ai"
import { FileDetails } from "../../../../../Shared/Interface/file"
import ModalBasic from "../../../components/ModalBasic"
import FileDetailsModal from "./FileDetailsModal"
import { Property } from "../../../../../Shared/Interface/property"

interface IProps {
  file: FileDetails
  handleDelete: (file: FileDetails) => void
  currentProperty: Property
  setCurrentProperty: React.Dispatch<React.SetStateAction<Property>>
}

const ImageThumbnail = ({ file, handleDelete, currentProperty, setCurrentProperty }: IProps) => {
  const [fileDetailsModalOpen, setFileDetailsModalOpen] = useState(false)
  const { path, tags } = file
  const [preview, setPreview] = useState("")

  useEffect(() => {
    typeof path === "string" ? setPreview(path) : setPreview(URL.createObjectURL(path))
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(preview)
  }, [path])

  const handleClick = () => {
    setFileDetailsModalOpen(true)
  }

  return (
    <>
      <img onClick={() => handleClick()} className="h-full w-full object-cover object-center cursor-pointer" src={preview} alt="image" />
      <button type="button" className="absolute top-[5px] right-[5px] bg-transparent cursor-pointer" onClick={() => handleDelete(file)}>
        <AiOutlineClose className="text-xl text-black bg-white p-[2px] rounded-full" pointerEvents="none" />
      </button>
      {file.isCover && <AiFillHome className="absolute top-[5px] left-[5px] text-xl text-indigo-500 bg-white p-[2px] rounded-full" />}
      <ul className="flex gap-1 absolute left-[5px] bottom-[5px] flex-wrap">
        {tags &&
          tags.map((tag, i) => (
            <li key={i} className="text-sm px-1 bg-slate-100 text-slate-600 rounded-sm">
              {tag}
            </li>
          ))}
      </ul>
      <ModalBasic id="file-details-modal" title={"Edit file"} modalOpen={fileDetailsModalOpen} setModalOpen={setFileDetailsModalOpen} size={"max-w-sm"}>
        <FileDetailsModal selectedFile={file} currentProperty={currentProperty} setCurrentProperty={setCurrentProperty} />
      </ModalBasic>
    </>
  )
}

export default ImageThumbnail
