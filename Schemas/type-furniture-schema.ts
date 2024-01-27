import { Model, Schema, model } from 'mongoose';
import { ITypeFurniture } from '../interfaces/type-furniture';

type TypeFurnitureModel = Model<ITypeFurniture>;

const typeFurnitureSchema = new Schema<ITypeFurniture, TypeFurnitureModel>(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const TypeFurnitureModel: TypeFurnitureModel = model<
  ITypeFurniture,
  TypeFurnitureModel
>('Type-Furniture', typeFurnitureSchema);

export default TypeFurnitureModel;
