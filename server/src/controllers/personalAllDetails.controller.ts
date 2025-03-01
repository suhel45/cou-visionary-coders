import { Response } from "express";
import { personalDetailsService } from "../services/personalAllDetails.service";

const Biodata = async(req:Request ,res:Response) => {
    try {
        const personalBiodata = req.body;
        const result = await personalDetailsService.createBiodata(personalBiodata);
    } catch (error) {
        console.log(error);
    }
}

export const personalDetailsController = {
    Biodata,
}