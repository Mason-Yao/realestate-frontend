import React from "react"

function PageLoader() {
  return (
    <div className="flex justify-center items-center h-screen fixed top-0 bottom-0 left-0 right-0 z-50">
      <svg className="animate-spin w-8 h-8 fill-current shrink-0" viewBox="0 0 16 16">
        <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
      </svg>
    </div>
  )
}

export default PageLoader
