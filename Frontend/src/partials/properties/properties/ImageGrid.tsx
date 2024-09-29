/* eslint-disable max-len */
import React, { useMemo, useState } from "react"
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs"
import { IFile } from "../../../interfaces/interfaces"
import PlaceHolderImage from "../../../images/placeholder.jpg"

interface IProps {
  images: any[]
  customClasses?: string
}

const ImageGrid = ({ images, customClasses = "" }: IProps) => {
  const coverImageIndex = 0
  //const isCoverPageSet = coverImageIndex !== -1
  const [index, setIndex] = useState(0)

  const lastImage = () => {
    setIndex((prev) => {
      if (prev === 0) {
        return images.length - 1
      } else {
        return prev - 1
      }
    })
  }
  const nextImage = () => {
    setIndex((prev) => {
      if (prev === images.length - 1) {
        return 0
      } else {
        return prev + 1
      }
    })
  }

  return (
    <div className={`grid grid-cols-12 grid-rows-1 gap-1 rounded-xl overflow-hidden ${customClasses}`}>
      <div className="aspect-[8/5] col-span-full relative group">
        <BsCaretLeftFill
          className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-gray-400 p-1 rounded-full text-3xl cursor-pointer opacity-0 transition-all duration-500 group-hover:opacity-100 select-none"
          onClick={lastImage}
        />
        <img className="object-cover object-center w-full h-full" src={images[index].path} alt="imgs" />
        <BsCaretRightFill
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-gray-400 p-1 rounded-full text-3xl cursor-pointer opacity-0 transition-all duration-500 group-hover:opacity-100 select-none"
          onClick={nextImage}
        />
      </div>
      <div className="col-span-4 row-span-1">
        <img className="object-cover w-full h-full object-center aspect-8/5" src={images[index + 1] ? images[index + 1].path : PlaceHolderImage} alt="imgs" />
      </div>

      <div className="col-span-4 row-span-1">
        <img className="object-cover w-full h-full object-center aspect-8/5" src={images[index + 2] ? images[index + 2].path : PlaceHolderImage} alt="imgs" />
      </div>

      <div className="col-span-4 row-span-1 relative">
        <img className="object-cover w-full h-full object-center aspect-8/5" src={images[index + 3] ? images[index + 3].path : PlaceHolderImage} alt="imgs" />
        <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold bg-gray-800 bg-opacity-30">+{images.length}</div>
      </div>
    </div>
  )
}

export default ImageGrid
