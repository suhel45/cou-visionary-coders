import { PersonalAllDetailsModel } from '../models/PersonalAllDetails.Model';
import { ReportModel } from '../models/report.model';
import validator from 'validator';

function sanitizeNumber(input: unknown): number {
  const inputStr = String(input);
  const sanitized = validator.stripLow(validator.whitelist(inputStr, '0-9'));
  if (!validator.isInt(sanitized)) {
    throw new Error('Invalid number input');
  }
  return parseInt(sanitized, 10);
}

function sanitizeText(input: unknown): string {
  const inputStr = String(input).trim();
  const sanitized = validator.escape(inputStr);
  if (sanitized.length === 0) {
    throw new Error('Invalid or empty string input');
  }
  return sanitized;
}

const createReport = async (
  userId: string,
  biodataNo: number,
  reason: string,
  reasonDetails: string,
) => {
  // Sanitize all user input
  const safeUserId = sanitizeText(userId);
  const safeBiodataNo = sanitizeNumber(biodataNo);
  const safeReason = sanitizeText(reason);
  const safeReasonDetails = sanitizeText(reasonDetails);

  //  Validate biodata exists
  const biodata = await PersonalAllDetailsModel.findOne({
    biodataNo: safeBiodataNo,
  });

  if (!biodata) {
    throw new Error('Biodata not found!');
  }

  //  Prevent duplicate report
  const existingReport = await ReportModel.findOne({
    biodataNo: safeBiodataNo,
    reporter: safeUserId,
  });

  if (existingReport) {
    throw new Error('You have already reported this biodata.');
  }

  //  Create the report
  const newReport = new ReportModel({
    biodataNo: safeBiodataNo,
    reason: safeReason,
    reasonDetails: safeReasonDetails,
    reporter: safeUserId,
  });

  const report = await newReport.save();
  return report;
};

const getAllReports = async () => {
  const reports = await ReportModel.find()
    .populate('reporter', 'username email')
    .sort({ createdAt: -1 })
    .exec();

  return reports;
};

export const reportService = {
  createReport,
  getAllReports,
};
