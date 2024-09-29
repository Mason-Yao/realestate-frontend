// @ts-nocheck
import React, { useState, useRef, useEffect } from "react"
import Transition from "../utils/Transition"
import { getRelationSearchResult } from "../apis/clients"

function SearchDropdown({ value, onChange }) {
  const MINIMAL_SEARCH_LENGTH = 3

  const [options, setOptions] = useState([])

  const [showOptions, setShowOptions] = useState(false)
  const [cursor, setCursor] = useState(-1)
  const ref = useRef()

  //when select value from search dropdown
  const select = (option) => {
    onChange(option)
    setShowOptions(false)
  }

  //when input value changes
  const handleChange = (text) => {
    onChange(text)
    setCursor(-1)
    if (text.length >= MINIMAL_SEARCH_LENGTH) {
      getRelationSearchResult().then((res) => {
        setOptions(res.relationSearchResults)
      })
      setShowOptions(true)
    } else {
      setShowOptions(false)
    }
  }

  //const filteredOptions = options.filter(option => option.includes(value))

  const moveCursorDown = () => {
    if (cursor < options.length - 1) {
      setCursor((c) => c + 1)
    }
  }

  const moveCursorUp = () => {
    if (cursor > 0) {
      setCursor((c) => c - 1)
    }
  }

  const handleNav = (e) => {
    switch (e.key) {
      case "ArrowUp":
        moveCursorUp()
        break
      case "ArrowDown":
        moveCursorDown()
        break
      case "Enter":
        if (cursor >= 0 && cursor < options.length) {
          select(options[cursor])
        }
        break
    }
  }

  // close on click outside
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current.contains(e.target)) {
        setShowOptions(false)
        setCursor(-1)
      }
    }

    document.addEventListener("click", listener)
    document.addEventListener("focusin", listener)
    return () => {
      document.removeEventListener("click", listener)
      document.removeEventListener("focusin", listener)
    }
  }, [])

  return (
    <div className="relative border-slate-200" ref={ref}>
      <div className="relative w-full">
        <input value={value} onChange={(e) => handleChange(e.target.value)} onKeyDown={handleNav} className="form-input w-full pl-9" />
        <button className="absolute inset-0 right-auto group" type="submit" aria-label="Search">
          <svg
            className="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-4 mr-2"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
            <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
          </svg>
        </button>
      </div>

      <Transition
        show={showOptions}
        tag="div"
        className="z-10 absolute top-full left-0 w-full bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        enter="transition ease-out duration-100 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <ul className={` divide-y rounded-lg shadow-lg ${!showOptions && "hidden"} select-none`}>
          {options.length > 0 ? (
            options.map((option, i, arr) => {
              let className = "px-4 py-1 hover:bg-gray-100 flex"

              if (cursor === i) {
                className += " bg-gray-100"
              }

              return (
                <li className={className} key={i} onClick={() => select(option)}>
                  {option.name + " " + option.email}
                </li>
              )
            })
          ) : (
            <li className="px-4 py-2 text-gray-500">No results</li>
          )}
        </ul>
      </Transition>
    </div>
  )
}

export default SearchDropdown
