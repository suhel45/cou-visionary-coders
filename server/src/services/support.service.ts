import { SupportModel } from "../models/support.model"

const addToSupport = async (userId:string, message:string) => {
    const newSupportRequest = new SupportModel({
        user:userId,
        message,
    });
    const support = await newSupportRequest.save();
    return support;

}
