import React, { useEffect, useState } from "react"

import Sidebar from "../../partials/Sidebar"
import Header from "../../partials/Header"
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner"
import DashboardAvatars from "../../partials/dashboard/DashboardAvatars"
import FilterButton from "../../components/DropdownFilter"
import ReminderList from "../../partials/dashboard/ReminderList"
import ChangeTable from "../../partials/dashboard/ChangeTable"
import RecentActivityList from "../../partials/dashboard/RecentActivityList"
import ClientNumberCard from "../../partials/dashboard/ClientNumberCard"
import DropdownClassic from "../../components/DropdownClassic"
import PropertyNumberCard from "../../partials/dashboard/PropertyNumberCard"
import { useAppSelector } from "../../app/hooks"

function Main() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const settingState = useAppSelector((state) => state.setting)
  // TODO: put this into setting state
  //const defaultDateRange = Number(settingState.DashboardDefaultDateRange.value)
  const defaultDateRange = 30
  const DashboardDateOption = [
    {
      name: "Default",
      value: new Date(new Date().setDate(new Date().getDate() - defaultDateRange)),
    },
    {
      name: "Today",
      value: new Date(),
    },
    {
      name: "Last 7 Days",
      value: new Date(new Date().setDate(new Date().getDate() - 7)),
    },
    {
      name: "Last 30 Days",
      value: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    },
    {
      name: "Last 12 Months",
      value: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    },
  ]
  const [selected, setSelected] = useState(DashboardDateOption[0])

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto mb-3">
            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Avatars */}
              <DashboardAvatars />

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton align="right" />
                {/* Datepicker built with flatpickr */}
                <DropdownClassic options={DashboardDateOption} selected={selected} setSelected={setSelected} />
                {/* Add view button */}
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                  <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add View</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="mb-5">
              <div className="flex flex-col md:flex-row gap-6 h-full md:h-[35rem] mb-5">
                <div className="flex flex-col gap-4 basis-2/3">
                  <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <ClientNumberCard />
                    <PropertyNumberCard />
                  </div>
                  <ReminderList />
                </div>
                <div className="basis-1/3">
                  <RecentActivityList />
                </div>
              </div>
              <ChangeTable date={selected.value} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Main
