const app = require("./app");
const cloudinary = require("cloudinary").v2;

const { connectDatabase } = require("./config/database");
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
