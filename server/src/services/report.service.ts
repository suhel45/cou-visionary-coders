import { PersonalAllDetailsModel } from '../models/PersonalAllDetails.Model';
import { ReportModel } from '../models/report.model';

const createReport = async (
  userId: string,
  biodataNo: number,
  reason: string,
  reasonDetails: string,
) => {
  // Verify biodata exists
  const biodata = await PersonalAllDetailsModel.findOne({ biodataNo });
  if (!biodata) {
    throw new Error('Biodata not found!');
  }

  // Check if user already reported this biodataNo
  const existingReport = await ReportModel.findOne({
    biodataNo,
    reporter: userId,
  });
  if (existingReport) {
    throw new Error('You have already reported this biodata.');
  }

  // Create the report
  const newReport = new ReportModel({
    biodataNo,
    reason,
    reasonDetails,
    reporter: userId,
  });

  const report = await newReport.save();
  return report;
};

export const reportService = {
  createReport,
};
