import React from 'react'
import UserProfile from '../../components/UserProfile'
import FamilyInformation from '../../components/profileDetails/FamilyInformation'
import EducationInformation from '../../components/profileDetails/EducationalInformation'
import AddressInformation from '../../components/profileDetails/AddressInformation'
const pages = () => {
  return (
    <div className="flex flex-col bg-gray-50">
        <div className='flex flex-col items-center justify-center md:min-w-3xl p-2'><UserProfile/></div>
        <FamilyInformation/>
        <EducationInformation/>
        <AddressInformation/>
    </div>
  )
}

export default pages