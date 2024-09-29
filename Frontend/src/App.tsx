import React, { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { Wrapper } from "@googlemaps/react-wrapper"

import "./css/style.css"

import "./charts/ChartjsConfig"

// Import pages
import Main from "./pages/dashboard/Main"
import Dashboard from "./pages/dashboard/Dashboard"
import Analytics from "./pages/dashboard/Analytics"

import Clients from "./pages/clients/Clients"
import AddClient from "./pages/clients/AddClient"
import EditClient from "./pages/clients/EditClient"

import AddProperty from "./pages/properties/AddProperty"
import EditProperty from "./pages/properties/EditProperty"
import Properties from "./pages/properties/Properties"
import Property from "./pages/properties/Property"
import Report from "./pages/properties/Report"

import Templates from "./pages/email/Templates"
import SaveTemplate from "./pages/email/SaveTemplate"

import Account from "./pages/settings/Account"
import General from "./pages/settings/General"
import Client from "./pages/settings/Client"
import Feedback from "./pages/settings/Feedback"

import Faqs from "./pages/utility/Faqs"
import PageNotFound from "./pages/utility/PageNotFound"
import KnowledgeBase from "./pages/utility/KnowledgeBase"
import Signin from "./pages/Signin"
import PageLoader from "./utils/PageLoader"
import { AuthenticationGuard } from "./AuthenticationGuard"

import { useAuth0 } from "@auth0/auth0-react"
import { validateUser } from "../src/app/validateUser"
import { setCurrentUser } from "./slices/userSlice"
import { setBanner, setIsLoading } from "./slices/configSlice"
import { getSettings } from "./apis/setting"
import { loadSettings } from "./slices/settingSlice"
import { VITE_APP_GMAP_API_KEY } from "./utils/constants"

const authGuardClientPage = <AuthenticationGuard component={Clients} />
const authGuardDashboardMainPage = <AuthenticationGuard component={Main} />
const authGuardDashboardPage = <AuthenticationGuard component={Dashboard} />
const authGuardAnalyticsPage = <AuthenticationGuard component={Analytics} />
const authGuardAddClientPage = <AuthenticationGuard component={AddClient} />
const authGuardEditClientPage = <AuthenticationGuard component={EditClient} />
const authGuardTemplatesPage = <AuthenticationGuard component={Templates} />
const authGuardSaveTemplatePage = <AuthenticationGuard component={SaveTemplate} />

function App() {
  const location = useLocation()
  const currentUser = useAppSelector((state) => state.user)
  const isFetching = useAppSelector((state) => state.config.isLoading)

  useEffect(() => {
    document.querySelector("html")!.style.scrollBehavior = "auto"
    window.scroll({ top: 0 })
    document.querySelector("html")!.style.scrollBehavior = ""
  }, [location.pathname]) // triggered on route change

  //validate logged in user email with profile in user db
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()
  const dispatch = useAppDispatch()

  getAccessTokenSilently({}).then((token) => {
    //logger.info("token = ", token)
    localStorage.setItem("token", token)
    // TODO: consider refresh token if expired (1 day)
  })

  useEffect(() => {
    if (isAuthenticated && currentUser.isValid == false) {
      dispatch(
        setBanner({
          status: "info",
          content: `Loading profile for ${user?.email}...`,
        })
      )
      //logger.info("check profile for " + user.email)
      validateUser(user?.email || "").then((res) => {
        if (res) {
          dispatch(
            setCurrentUser({
              isValid: true,
              name: user?.nickname || "",
              profile: res,
            })
          )
          dispatch(
            setBanner({
              status: "success",
              content: `Welcome back ${user?.nickname}!`,
            })
          )
        } else {
          dispatch(
            setBanner({
              status: "error",
              content: "You are not authorized to use this application. Please contact your administrator.",
            })
          )
        }
      })
    }
  }, [user])

  useEffect(() => {
    dispatch(setIsLoading(true))
    getSettings().then((res) => {
      dispatch(loadSettings(res))
      dispatch(setIsLoading(false))
    })
  }, [])

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    )
  }

  return (
    <>
      {isFetching && <PageLoader />}
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard/main" element={authGuardDashboardMainPage} />
        <Route path="/dashboard" element={authGuardDashboardPage} />
        <Route path="/dashboard/analytics" element={authGuardAnalyticsPage} />

        <Route path="/clients" element={authGuardClientPage} />
        <Route path="/clients/add-client" element={authGuardAddClientPage} />
        <Route path="/clients/edit-client/:id" element={authGuardEditClientPage} />

        <Route
          path="/properties/properties"
          element={
            <Wrapper apiKey={VITE_APP_GMAP_API_KEY} version="beta" libraries={["marker", "places"]}>
              <Properties />
            </Wrapper>
          }
        />
        <Route
          path="/properties/add-property"
          element={
            <Wrapper apiKey={VITE_APP_GMAP_API_KEY} version="beta" libraries={["marker", "places"]}>
              <AddProperty />
            </Wrapper>
          }
        />
        <Route
          path="/properties/edit/:id"
          element={
            <Wrapper apiKey={VITE_APP_GMAP_API_KEY || ""} version="beta" libraries={["marker", "places"]}>
              <EditProperty />
            </Wrapper>
          }
        />
        <Route
          path="/properties/:id"
          element={
            <Wrapper apiKey={VITE_APP_GMAP_API_KEY} version="beta" libraries={["marker", "places"]}>
              <Property />
            </Wrapper>
          }
        />
        <Route
          path="/properties/edit/:id"
          element={
            <Wrapper apiKey={VITE_APP_GMAP_API_KEY} version="beta" libraries={["marker", "places"]}>
              <EditProperty />
            </Wrapper>
          }
        />
        <Route
          path="/properties/report"
          element={
            <Wrapper apiKey={VITE_APP_GMAP_API_KEY} version="beta" libraries={["marker", "places"]}>
              <Report />
            </Wrapper>
          }
        />

        <Route path="/marketing/templates" element={authGuardTemplatesPage} />
        <Route path="/marketing/templates/new" element={authGuardSaveTemplatePage} />
        <Route path="/marketing/edit-template/:id" element={authGuardSaveTemplatePage} />

        <Route path="/settings/account" element={<Account />} />
        <Route path="/settings/general" element={<General />} />
        <Route path="/settings/client" element={<Client />} />
        <Route path="/settings/feedback" element={<Feedback />} />

        <Route path="/utility/faqs" element={<Faqs />} />
        <Route path="/utility/404" element={<PageNotFound />} />
        <Route path="/utility/knowledge-base" element={<KnowledgeBase />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
