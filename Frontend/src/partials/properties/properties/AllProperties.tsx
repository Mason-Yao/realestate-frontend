import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { setIsLoading } from "../../../slices/configSlice"
import {
  setPagedProperties,
  setNextPageKey,
  setTotalProperties,
  incrementPage,
  decrementPage,
  pushPreviousKeys,
  setCurrentPageKey,
  popPreviousKey,
} from "../../../slices/propertySlice"
import PropertyFilter from "./PropertyFilter"
import PropertiesList from "./PropertiesList"

import { listProperties, getPropertiesCount } from "../../../apis/property"

function AllProperties() {
  const dispatch = useAppDispatch()
  const propertyState = useAppSelector((state) => state.property)
  const { totalProperties: total, pagedProperties: properties, currentPage: page, previousKeys, currentPageKey, nextPageKey, filter } = propertyState
  const lastPageKey = previousKeys[previousKeys.length - 1]

  useEffect(() => {
    dispatch(setIsLoading(true))
    getPropertiesCount().then((res) => {
      dispatch(setTotalProperties(res))
      dispatch(setIsLoading(false))
    })
  }, [])

  //Initial load
  useEffect(() => {
    dispatch(setIsLoading(true))

    listProperties(true, page, currentPageKey).then((res) => {
      dispatch(setPagedProperties(res))
      dispatch(setNextPageKey(res.lastEvaluatedKey))
      dispatch(setIsLoading(false))
    })
  }, [])

  const handleNext = () => {
    //if (page < startKeys.length - 1) {
    dispatch(incrementPage())
    //}
    dispatch(setIsLoading(true))

    listProperties(true, page, nextPageKey, filter).then((res) => {
      if (currentPageKey) {
        dispatch(pushPreviousKeys(currentPageKey))
      }
      dispatch(setCurrentPageKey(nextPageKey))
      dispatch(setPagedProperties(res))
      dispatch(setNextPageKey(res.lastEvaluatedKey))
      dispatch(setIsLoading(false))
    })
  }

  const handlePrevious = () => {
    //if (page >= 0) {
    dispatch(decrementPage())
    //}
    dispatch(setIsLoading(true))

    listProperties(true, page, lastPageKey, filter).then((res) => {
      dispatch(setCurrentPageKey(lastPageKey))
      dispatch(popPreviousKey())
      dispatch(setPagedProperties(res))
      dispatch(setNextPageKey(res.lastEvaluatedKey))
      dispatch(setIsLoading(false))
    })
  }

  return (
    <>
      <main className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <PropertyFilter />
        {/* eslint-disable-next-line max-len */}
        <div className="flex flex-col space-y-10 sm:flex-row sm:space-x-6 sm:space-y-0 md:flex-col md:space-x-0 md:space-y-10 xl:flex-row xl:space-x-6 xl:space-y-0 mt-9">
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="flex flex-col gap-4">
              <PropertiesList properties={properties} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default AllProperties
