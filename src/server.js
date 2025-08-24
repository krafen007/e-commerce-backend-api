import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/connectDB.js';

dotenv.config();

connectDB();

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server running at http://localhost:${PORT}`);
});
