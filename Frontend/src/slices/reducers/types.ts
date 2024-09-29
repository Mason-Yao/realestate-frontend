export interface IFileState {
  files: IUploadFile[]
}

export interface IUploadFile {
  fileSrc: string
  fileName: string
  fileCategory: "image" | "document" | "video" | "others"
  isCoverPage: boolean
  isPublic: boolean
  tags: string[]
}

export interface IPostFileRequestBody {
  files: IPostFileItem[]
}

export interface IPostFileItem {
  file: string //base64
  createdBy: string
  fileName: string
  fileCategory: "image" | "document" | "video" | "others"
  isCoverPage: boolean
  isPublic: boolean
  tags: string[]
}
