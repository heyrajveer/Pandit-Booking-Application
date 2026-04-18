import multer from "multer";

const storage = multer.memoryStorage(); // 🔥 important

const upload = multer({ storage });

export default upload;