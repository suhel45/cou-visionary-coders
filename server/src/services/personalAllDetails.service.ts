import { IPersonalAllDetails } from "../interfaces/personalAllDetails.interface";
import { PersonalAllDetailsModel } from "../models/PersonalAllDetails.Model";

const createBiodata = async (biodata:IPersonalAllDetails) => {
    try {
        // Save the user to the database
        const newBiodata = new PersonalAllDetailsModel({
            users: biodata.user.id,
            personalInfo: biodata.personalInfo,
            address: biodata.address,
            education: biodata.education,
            familyInformation: biodata.familyInformation,
            expectedLifePartner: biodata.expectedLifePartner,
            contactInfo: biodata.contactInfo,
            personalPreference: biodata.personalPreference
        })
        const result = await newBiodata.save();
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const personalDetailsService = {
    createBiodata,
}