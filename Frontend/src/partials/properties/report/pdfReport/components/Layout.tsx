import React from "react"
import Footer from "./Footer"
import Header from "./Header"

interface IProps {
  children: React.ReactNode
}

const Layout = ({ children }: IProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout
