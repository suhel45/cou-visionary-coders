import { IReport } from "../interfaces/report.interface";
import { PersonalAllDetailsModel } from "../models/PersonalAllDetails.Model";

const createReport = async (userId:string, biodataNo:number, reason:string, reasonDetails:string) => {
    
    // Verify biodata exists
    const biodata = await PersonalAllDetailsModel.findOne({ biodataNo });
    if (!biodata) {
        throw new Error("Biodata not found!");
    }
}