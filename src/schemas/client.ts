import * as mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  id: Number,
  firstName: String,
  lastName: String,
  title: String,
});

export default clientSchema;
