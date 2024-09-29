import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IProfessional } from "../../interfaces/interfaces"

export const professionalsApiSlice = createApi({
  reducerPath: "professionalsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.VITE_AWS_API_GATEWAY || process.env.VITE_LOCAL_JSON_SERVER_API }),
  tagTypes: ["Professionals"],
  endpoints: (builder) => ({
    getProfessionals: builder.query<IProfessional[], void>({
      query: () => "/professionals",
      providesTags: ["Professionals"],
    }),
    getProfessionalById: builder.query<IProfessional, string>({
      query: (id) => `/professionals/${id}`,
      providesTags: ["Professionals"],
    }),
    searchProfessionalsByName: builder.query<IProfessional[], string>({
      query: (keyword) => `/professionals?name_like=${keyword}`,
      providesTags: ["Professionals"],
    }),
  }),
})

export const { useGetProfessionalsQuery, useGetProfessionalByIdQuery, useSearchProfessionalsByNameQuery } = professionalsApiSlice
