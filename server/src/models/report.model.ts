// models/Report.js
import { model, Schema } from 'mongoose';
import { IReport } from './../interfaces/report.interface';
const mongoose = require('mongoose');

const reportSchema = new Schema<IReport>({
  biodataNo: {
    type: Number,
    required: true
  },
  reason: {
    type: String,
    required: true,
    enum: ['fake_profile', 'inappropriate_content', 'harassment', 'scam', 'other']
  },
  reasonDetails: {
    type: String,
    required: true
  },
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const ReportModel = model<IReport>('Report', reportSchema);