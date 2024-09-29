import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "../src/app/store"
import App from "./App"
import { Auth0ProviderWithNavigate } from "./Auth0ProviderWithNavigate"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <Provider store={store}>
          <App />
        </Provider>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
)
