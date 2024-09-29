import { Auth0Provider } from "@auth0/auth0-react"
import React from "react"
import { useNavigate } from "react-router-dom"
import { config } from "./config/auth0"

export const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate()

  const domain = config.domain
  const clientId = config.clientId
  const audience = config.audience
  const redirectUri = window.location.origin

  const onRedirectCallback = () => {
    navigate("/dashboard")
  }

  if (!(domain && clientId && redirectUri)) {
    return null
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience: audience,
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}
