import mongoose from 'mongoose';

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(`Error while connect DB: ${err}`));
};

export default connectDB;
