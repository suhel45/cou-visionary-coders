import { SupportModel } from "../models/support.model"

const addToSupport = async (userId:string, message:string) => {
     // Check for duplicate support request
     const existing = await SupportModel.findOne({ user: userId, message });
     if (existing) {
         throw new Error("Duplicate support request: same message already submitted.");
     }
 
    const newSupportRequest = new SupportModel({
        user:userId,
        message,
    });
    const support = await newSupportRequest.save();
    return support;

}

export const supportService = {
    addToSupport,
}
