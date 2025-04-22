import { PersonalAllDetailsModel } from "../models/PersonalAllDetails.Model";
import { ReportModel } from "../models/report.model";

const createReport = async (userId:string, biodataNo:number, reason:string, reasonDetails:string) => {

    // Verify biodata exists
    const biodata = await PersonalAllDetailsModel.findOne({ biodataNo });
    if (!biodata) {
        throw new Error("Biodata not found!");
    }

    // Create the report
    const newReport = new ReportModel({
        biodataNo,
        reason,
        reasonDetails,
        reporter: userId
      });
      
     const report = await newReport.save();
     return report;

}