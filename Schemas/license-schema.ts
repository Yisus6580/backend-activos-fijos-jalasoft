import { Model, Schema, model } from "mongoose";
import { ILicense } from "../interfaces/license";

type LicenseModel = Model<ILicense>;

const licenseSchema = new Schema<ILicense, LicenseModel>(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    keyProduct: { type: String, required: true, unique: true },
    dateOfPurchase: { type: Date, required: true },
    expiration: {
      isExpires: { type: Boolean, required: true },
      dateOfExpiration: { type: String, required: false },
    },
    price: { type: Number, required: true },
    isReusable: { type: Boolean, required: true },
    condition: {
      type: String,
      default: "available",
      enum: {
        values: ["available", "used", "expired", "stolen"],
        message: "{VALUE} Condition is invalid",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const LicenseModel: LicenseModel = model<ILicense, LicenseModel>(
  "License",
  licenseSchema
);

export default LicenseModel;
