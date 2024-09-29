import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IUploadFile, IFileState } from "./types"

const initialState: IFileState = {
  files: [],
}

export const filesSlice = createSlice({
  name: "uploadFiles",
  initialState,
  reducers: {
    addFiles: (state, action: PayloadAction<IUploadFile[]>) => {
      // state.files = state.files.concat(action.payload);
      state.files = state.files.concat(action.payload)
    },
    resetFiles: (state) => {
      state.files = []
    },
    // ZT-NOTE: here we use the fileSrc as the unique identifier
    toggleImageCover: (state, action: PayloadAction<string>) => {
      state.files.forEach((file) => {
        // Toggle the selected one
        if (file.fileSrc === action.payload && (file.fileCategory === "image" || file.fileCategory === "video")) {
          file.isCoverPage = !file.isCoverPage
        } else {
          // Turn off all other isCoverPage
          file.isCoverPage = false
        }
      })
    },
    toggleFilePublish: (state, action: PayloadAction<string>) => {
      state.files.forEach((file) => {
        if (file.fileSrc === action.payload) {
          file.isPublic = !file.isPublic
        }
      })
    },
    toggleImageTag: (state, action: PayloadAction<{ fileSrc: string; tag: string }>) => {
      // console.log("toggleImageTag", action.payload); // for debug
      state.files.forEach((image) => {
        if (image.fileSrc === action.payload.fileSrc) {
          const isTagExist = image.tags.includes(action.payload.tag)
          if (isTagExist) {
            image.tags = image.tags.filter((tag) => tag !== action.payload.tag)
          } else {
            image.tags.push(action.payload.tag)
          }
        }
      })
    },
    removeFileBySrc: (state, action: PayloadAction<string>) => {
      state.files = state.files.filter((file) => file.fileSrc !== action.payload)
    },
  },
})

export const { addFiles, toggleImageCover, toggleFilePublish, toggleImageTag, removeFileBySrc, resetFiles } = filesSlice.actions
export const getImageFiles = (state) => state.uploadFiles.files.filter((file) => file.fileCategory === "image")
export const getDocFiles = (state) => state.uploadFiles.files.filter((file) => file.fileCategory === "document")
export const getAllFiles = (state) => state.uploadFiles.files

export default filesSlice.reducer
