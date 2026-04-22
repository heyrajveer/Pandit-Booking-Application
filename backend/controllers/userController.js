import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
export const getUserProfile = async (req,res)=>{
    try{
        const user =await User.findById(req.user.id).select("-password");
        res.status(200).json(user);

    }
    catch(err){
      console.log("UPLOAD ERROR FULL:", err);
    res.status(500).json({message:err.message});

    }
};
export const updateUserProfile =async(req,res)=>{
    try {
        const user =await User.findByIdAndUpdate(
            req.user.id,
            req.body,
              { returnDocument: "after" } // ✅ NEW WAY
        ).select("-password");
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({message:err.message});
    }
}

// export const uploadUserProfileImage = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }
//     // const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
//     const imageUrl = `${process.env.BACKEND_URL}/uploads/${req.file.filename}`; // production level pe backend URL use karna better hoga, env variable se lena chahiye
//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { profileImage: imageUrl },
//       { returnDocument: "after" }
//     ).select("-password");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }


export const uploadUserProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 🔥 upload buffer to cloudinary
    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "pandit-app/users" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload();

    const imageUrl = result.secure_url;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage: imageUrl },
      { new: true }
    ).select("-password");
   console.log("user:",user.profileImage);
    res.status(200).json(user);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const deleteUserProfile =async(req,res)=>{
    try {
        const user =await User.findByIdAndDelete(req.user.id);
        
    if(!user){
      return res.status(404).json({message:"user not found"});
    }
      
        
    } catch (err) {
        res.status(500).json({message:"err.message"});
    }
}