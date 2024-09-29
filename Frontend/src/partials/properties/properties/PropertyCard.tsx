import { IoBedOutline } from "react-icons/io5"
import { LuBath } from "react-icons/lu"
import { BiArea, BiCar } from "react-icons/bi"
import { Property } from "../../../../../Shared/Interface/property"
import moment from "moment"
import { AiOutlineClose } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { deleteProperty, listProperties } from "../../../apis/property"
import { useDispatch } from "react-redux"
import { setBanner, setIsLoading } from "../../../slices/configSlice"
import { setNextPageKey, setPagedProperties } from "../../../slices/propertySlice"
import { getAddressString, numberToPrice } from "../../../utils/helper"
import { logger } from "../../../../../Shared/Utils"
//fake images import
import PlaceHolderImage from "../../../images/placeholder.jpg"
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs"
import { useState } from "react"

interface IProps {
  property: Property
}

const PropertyCard = ({ property }: IProps) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id, files, address, type, bedrooms, bathrooms, carSpaces, houseArea, housePrice, createdDate } = property
  const propertyImages = files && files.length ? files.map((image) => image.path) : [PlaceHolderImage]

  const [imageIndex, setImageIndex] = useState(0)
  const handleNext = () => {
    setImageIndex((prevIndex) => {
      return (prevIndex + 1) % propertyImages.length
    })
  }
  const handlePrev = () => {
    setImageIndex((prevIndex) => {
      return (prevIndex - 1 + propertyImages.length) % propertyImages.length
    })
  }

  const handleDelete = async (propertyId: string) => {
    const userComfirm = window.confirm("Are you sure you want to delete this property?")
    if (!userComfirm) {
      return
    }
    dispatch(setIsLoading(true))
    await deleteProperty(propertyId)
      .then((res) => {
        listProperties(true, 1).then((res) => {
          dispatch(setPagedProperties(res))
          dispatch(setNextPageKey(res.lastEvaluatedKey))
        })
        dispatch(setIsLoading(false))
        dispatch(
          setBanner({
            status: "success",
            content: "Property has been deleted successfully.",
          })
        )
      })
      .catch((err) => {
        logger.error(err)
        dispatch(setIsLoading(false))
        dispatch(
          setBanner({
            status: "error",
            content: "Something wrong happened. Please try again.",
          })
        )
      })
  }
  const handleEdit = (propertyId: string) => {
    navigate(`/properties/edit/${propertyId}`, { state: { propertyID: propertyId } })
  }

  const seePropertyDetails = () => {
    navigate(`/properties/${id}`, { state: { propertyID: id } })
  }

  const editTheProperty = (id: string) => {
    navigate(`/properties/edit/${id}`, { state: { propertyID: id } })
  }

  return (
    <div className="flex flex-col h-full col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200 overflow-hidden">
      <div className="relative w-full group">
        <img
          className="object-cover object-center aspect-8/5 cursor-pointer"
          src={propertyImages[imageIndex]}
          alt="Property Image Cover"
          onClick={() => {
            seePropertyDetails()
          }}
        />
        <BsCaretLeftFill
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-gray-400 p-1 rounded-full text-3xl cursor-pointer opacity-0 
                    transition-all duration-500 group-hover:opacity-100 select-none"
        />
        <BsCaretRightFill
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-gray-400 p-1 rounded-full text-3xl cursor-pointer opacity-0 
                    transition-all duration-500 group-hover:opacity-100 select-none"
        />

        <button
          type="button"
          className="absolute top-[5px] right-[5px] bg-transparent cursor-pointer opacity-0 transition-all duration-500 group-hover:opacity-100"
          onClick={() => handleDelete(id)}
        >
          <AiOutlineClose className="text-xl text-white bg-red-500 p-[2px] rounded-full" pointerEvents="none" />
        </button>
      </div>
      <div className="grow flex flex-col p-5">
        <div className="grow">
          <header className="mb-3 h-15 md:h-20">
            <h3
              className="text-lg text-slate-800 font-semibold cursor-pointer"
              onClick={() => {
                seePropertyDetails()
              }}
            >
              {getAddressString(address)}
            </h3>
            <small>Since {moment(createdDate).fromNow()}</small>
          </header>
          <div className="flex flex-wrap justify-between items-center mb-4">
            <div className="inline-flex text-sm font-medium bg-emerald-100 text-emerald-600 rounded-full text-center px-2 py-0.5">
              {housePrice ? numberToPrice(housePrice) : "Price withhold"}
            </div>
            <div className="inline-flex text-sm font-medium bg-emerald-100 text-emerald-600 rounded-full text-center px-2 py-0.5">{type}</div>
          </div>
          <ul className="flex text-sm mb-5">
            {bedrooms && (
              <li className="flex items-center mr-2 text-base text-slate-400">
                <IoBedOutline className="mr-1" />
                <span className="font-bold">{bedrooms}</span>
              </li>
            )}
            {bathrooms && (
              <li className="flex items-center mr-2 text-base text-slate-400">
                <LuBath className="text-slate-400 mr-1" />
                <span className="font-bold">{bathrooms}</span>
              </li>
            )}
            {carSpaces !== undefined && carSpaces && carSpaces > 0 && (
              <li className="flex items-center mr-2 text-base text-slate-400">
                <BiCar className="text-base mr-1" />
                <span className="font-bold">{carSpaces}</span>
              </li>
            )}
            {houseArea && (
              <li className="flex items-center mr-2 text-base text-slate-400">
                <BiArea className="text-base mr-1" />
                <span className="font-bold">{houseArea}</span>
                <span>m²</span>
              </li>
            )}
          </ul>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="btn-sm w-full bg-orange-500 hover:bg-orange-600 text-white"
            onClick={() => {
              editTheProperty(id)
            }}
          >
            Edit Property
          </button>
          <button
            className="btn-sm w-full bg-indigo-500 hover:bg-indigo-600 text-white"
            onClick={() => {
              seePropertyDetails()
            }}
          >
            See Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
