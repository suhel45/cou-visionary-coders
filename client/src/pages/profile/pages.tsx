import React from 'react'
import UserProfile from '../../components/UserProfile'
import FamilyInformation from '../../components/profileDetails/FamilyInformation'
import EducationInformation from '../../components/profileDetails/EducationalInformation'
import AddressInformation from '../../components/profileDetails/AddressInformation'
const pages = () => {
  return (
    <div className="flex flex-col md:flex-row  gap-2  bg-gray-50 h-auto ">
        <div className="flex flex-col items-center md:items-stretch bg-gray-50 md:w-1/3">

        <UserProfile/>
        </div>
        <div className="flex flex-col items-stretch bg-gray-50 md:w-2/3">
        <FamilyInformation/>
        <EducationInformation/>
        <AddressInformation/>
        </div>
    </div>
  )
}

export default pages