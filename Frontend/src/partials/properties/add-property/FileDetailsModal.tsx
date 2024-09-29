import { useState } from "react"
import { FileDetails } from "../../../../../Shared/Interface/file"
import { Property } from "../../../../../Shared/Interface/property"

interface IProps {
  selectedFile: FileDetails
  currentProperty: Property
  setCurrentProperty: React.Dispatch<React.SetStateAction<Property>>
}

function FileDetailsModal({ selectedFile, currentProperty, setCurrentProperty }: IProps) {
  const { isPublic, isCover, tags } = selectedFile
  const [newTag, setNewTag] = useState<string>("")

  const handleAddTag = () => {
    if (newTag.length > 0) {
      setCurrentProperty({
        ...currentProperty,
        files: currentProperty.files?.map((el) => (el.path === selectedFile.path ? Object.assign({}, el, { tags: [...(tags as []), newTag] }) : el)),
      })
      setNewTag("")
    }
  }

  const handleDeleteTag = (tag: string) => {
    setCurrentProperty({
      ...currentProperty,
      files: currentProperty.files?.map((el) => (el.path === selectedFile.path ? Object.assign({}, el, { tags: tags?.filter((tagEl) => tagEl !== tag) }) : el)),
    })
  }

  return (
    <div className="flex flex-col gap-4 p-2 md:p-4 min-w-80 max-w-[360px] lg:max-w-sm">
      <div className="flex gap-1 items-center justify-between my-2">
        <span className="text-sm text-slate-800 font-semibold">Visibility:</span>
        <div className="flex">
          <div className="mt-3 ml-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="radio-buttons"
                className="form-radio"
                checked={isPublic}
                onChange={() => {
                  setCurrentProperty({
                    ...currentProperty,
                    files: currentProperty.files?.map((el) => (el.path === selectedFile.path ? Object.assign({}, el, { isPublic: true }) : el)),
                  })
                }}
              />
              <span className="text-sm ml-1">Public</span>
            </label>
          </div>

          <div className="mt-3 ml-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="radio-buttons"
                className="form-radio"
                checked={!isPublic}
                onChange={() => {
                  setCurrentProperty({
                    ...currentProperty,
                    files: currentProperty.files?.map((el) => (el.path === selectedFile.path ? Object.assign({}, el, { isPublic: false }) : el)),
                  })
                }}
              />
              <span className="text-sm ml-1">Private</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-1 items-center justify-between my-2">
        <span className="text-sm text-slate-800 font-semibold">Cover page:</span>
        <div className="flex">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              onClick={() => {
                setCurrentProperty({
                  ...currentProperty,
                  files: currentProperty.files?.map((el) => (el.path === selectedFile.path ? Object.assign({}, el, { isCover: !isCover }) : el)),
                })
              }}
            />
            <span className="text-sm font-medium ml-2">Set as cover page</span>
          </label>
        </div>
      </div>

      <div className="flex gap-1 items-start justify-between my-2">
        <span className="text-sm text-slate-800 font-semibold">Add a tag:</span>
        <div className="flex flex-col">
          <div className="flex">
            <input
              id="placeholder"
              className="text-xs form-input w-full md:w-3/4"
              type="text"
              required
              value={newTag}
              onChange={(e) => {
                setNewTag(e.target.value)
              }}
            />
            <button type="button" onClick={() => handleAddTag()} className="items-center px-2 rounded-[3px] bg-indigo-500 hover:bg-indigo-600 text-white">
              Add
            </button>
          </div>
          <div className="my-1">
            {tags?.map((tag) => (
              <div className="text-sm inline-flex flex-wrap items-center font-medium bg-slate-100 text-slate-600 rounded-[1px] text-center px-1 py-1 m-2">
                {tag}
                <button className="ml-2" onClick={() => handleDeleteTag(tag)}>
                  <svg className="w-4 h-4 fill-current">
                    <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileDetailsModal
