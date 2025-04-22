import { SupportModel } from "../models/support.model"

const addToSupport = async (userId:string, message:string) => {
    const newSupportRequest = new SupportModel({
        userId,
        message,
    });
    await newSupportRequest.save();

}
