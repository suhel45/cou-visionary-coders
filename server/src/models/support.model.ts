import { model, Schema } from "mongoose";
import { ISupport } from "../interfaces/support.interface";

// models/Support.js
const mongoose = require('mongoose');

const supportSchema = new Schema<ISupport>({
  message: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export const SupportModel = model<ISupport>('Support', supportSchema);