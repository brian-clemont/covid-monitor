import { Schema, Document, model } from 'mongoose';

let patientSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  age: { type: Number, required: true },
  familyCount: { type: Number, required: true },
  phone: { type: Number, required: true, unique:true },
  status: { type: String, required: true },
});

export default model('Patient', patientSchema);
