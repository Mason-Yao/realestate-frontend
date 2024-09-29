import { useState, useEffect } from "react"
import { FileDetails } from "../../../../../Shared/Interface/file"
import ImageThumbnail from "./ImageThumbnail"
import { useAppSelector, useAppDispatch } from "../../../app/hooks"
import { Property } from "../../../../../Shared/Interface/property"
import { deleteFromS3, directUploadToS3, getUploadPresignedUrl } from "../../../apis/file"
import { logger } from "../../../../../Shared/Utils/logger"
import { setIsLoading } from "../../../slices/configSlice"

interface IProps {
  currentProperty: Property
  setCurrentProperty: React.Dispatch<React.SetStateAction<Property>>
}

// TODO: move PK to shared
const FILE_PK = "FILE"

const FileUpload = ({ currentProperty, setCurrentProperty }: IProps) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)
  const { files } = currentProperty

  const onAddImage = async (e) => {
    dispatch(setIsLoading(true))
    const selectedFiles: File[] = Array.from(e.target.files)
    if (selectedFiles.length === 0) {
      return
    }
    //get s3 presigned url to upload image
    const response = await getUploadPresignedUrl(selectedFiles.length)
    const urls = response.data.urls

    if (selectedFiles.length !== urls.length) {
      logger.error("Number of presigned urls does not match files")
    }

    //post the image directly to the s3 bucket
    await Promise.all(
      urls.map(async (urlItem, i) => {
        const { path, url } = urlItem
        logger.info("s3 presigned url:", url)

        await directUploadToS3(url, selectedFiles[i])
      })
    )
    dispatch(setIsLoading(false))
    const fileDetails: FileDetails[] = urls.map((urlItem, i) => ({
      PK: FILE_PK,
      id: urlItem.path,
      path: urlItem.url.split("?")[0],
      isCover: false,
      isPublic: true,
      createdBy: user.name,
      createdDate: new Date().toISOString(),
      tags: [],
    }))
    setCurrentProperty({ ...currentProperty, files: [...(currentProperty.files as []), ...fileDetails] })
  }

  const handleDelete = async (file: FileDetails) => {
    const response = await deleteFromS3(file.id)
    logger.info("delete from s3:", response)
    setCurrentProperty({ ...currentProperty, files: currentProperty.files?.filter((fileItem) => fileItem.path != file.path) })
  }

  return (
    <div className="flex flex-col col-span-full">
      <header className="mb-2 flex items-center justify-between text-sm font-medium leading-6 text-gray-900">
        <p>
          <span>Files</span>
          <span className="ml-4 text-xs leading-5 text-gray-600">(Max 1 files, each up to 10MB)</span>
        </p>

        <input
          id="uploadFiles"
          type="file"
          className="px-2 cursor-pointer w-full md:w-1/4"
          onChange={(e) => onAddImage(e)}
          name="uploadFiles"
          multiple
          accept="*"
        />
      </header>
      <div className="aspect-[32/5] p-2 grid grid-cols-12 gap-2 rounded-lg border border-dashed border-gray-900/25">
        {files?.map((file, i) => (
          <div className="relative aspect-[8/5] col-span-full xs:col-span-6 md:col-span-4 lg:col-span-3" key={i}>
            {file && <ImageThumbnail file={file} handleDelete={handleDelete} currentProperty={currentProperty} setCurrentProperty={setCurrentProperty} />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FileUpload
