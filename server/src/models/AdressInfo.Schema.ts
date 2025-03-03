import { Schema } from 'mongoose';
import { AddressInfo } from '../interfaces/address.interface';

const addressSchema = new Schema({
  district: { type: String, required: true },
  subdistrict: { type: String, required: true },
  village: { type: String, required: true },
});

export const addressInfoSchema = new Schema<AddressInfo>({
  permanentAddress: { type: addressSchema, required: true },
  presentAddress: { type: addressSchema, required: true },
});
