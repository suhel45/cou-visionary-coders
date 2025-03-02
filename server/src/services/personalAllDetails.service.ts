import { IPersonalAllDetails } from "../interfaces/personalAllDetails.interface";
import { PersonalAllDetailsModel } from "../models/PersonalAllDetails.Model";

const createBiodata = async (biodata:IPersonalAllDetails) => {
        // Check if the Biodata already exists
        const existingBiodata = await PersonalAllDetailsModel.findOne({ users: biodata.users });
        if (existingBiodata) {
            throw new Error('Biodata already exists!');
        }

        // Save the user to the database
        const newBiodata = new PersonalAllDetailsModel({
            users: biodata.users,
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

}

export const personalDetailsService = {
    createBiodata,
}