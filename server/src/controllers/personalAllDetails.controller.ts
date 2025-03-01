import { Request, Response } from "express";
import { personalDetailsService } from "../services/personalAllDetails.service";

const Biodata = async(req:Request ,res:Response) => {
    try {
        const result = await personalDetailsService.createBiodata(req.body);
        res.status(200).json({
            success: true,
            message: 'Biodata created successfully',
            data: result,
        });
    } catch (error) {
        console.log(error);
    }
}

export const personalDetailsController = {
    Biodata,
}