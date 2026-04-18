import Pandit from "../models/Pandit.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// 🔹 CREATE
export  const createPandit = async (req, res) => {
  try {
    const existingPandit = await Pandit.findOne({ userId: req.user.id });

    if (existingPandit) {
      return res.status(400).json({
        message: "Pandit profile already exists"
      });
    }

    const pandit = new Pandit({
      ...req.body,
      userId: req.user.id,
      city: req.user.city,
    });

    await pandit.save();

    res.status(201).json({
      message: "Pandit profile created",
      pandit
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 🔹 GET ALL
// export const getPandits = async (req, res) => {
//   try {
//     const pandits = await Pandit.find()
//       .populate("userId", "name city phone");

//     res.json(pandits);

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const getPandits = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const pandits = await Pandit.find()
      .skip(skip)
      .limit(limit);

    const total = await Pandit.countDocuments();

    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: pandits
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 GET BY ID
export const getPanditById = async (req, res) => {
  try {
    const pandit = await Pandit.findById(req.params.id)
      .populate("userId", "name city phone");

    if (!pandit) {
      return res.status(404).json({ message: "Pandit not found" });
    }

    res.status(200).json(pandit);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 🔹 GET MY PROFILE
export const getMyPanditProfile = async (req, res) => {
  try {
    const pandit = await Pandit.findOne({ userId: req.user.id })
      .populate("userId");

    if (!pandit) {
     return res.status(200).json(null); // 🔥 VERY IMPORTANT
      // return res.status(404).json({
      //   message: "Pandit profile not found"
      // });ye problem de rha hai kruki prifle created nhi he isliye and we already 
      //use toggle in ui for profile creation or not
    }

    res.status(200).json(pandit);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 🔹 UPDATE PROFILE
export const updatePanditProfile = async (req, res) => {
  try {
    const pandit = await Pandit.findOneAndUpdate(
      { userId: req.user.id },
      req.body,
      { new: true }
    ).populate("userId", "name email city phone"); // 🔥 ADD THIS;

    if (!pandit) {
      return res.status(404).json({ message: "Pandit not found" });
    }

    res.status(200).json(pandit);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 UPLOAD PROFILE IMAGE
// export const uploadPanditProfileImage = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     // const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
//     const imageUrl = `${process.env.BACKEND_URL}/uploads/${req.file.filename}`;
//     const pandit = await Pandit.findOneAndUpdate(
//       { userId: req.user.id },
//       { profileImage: imageUrl },
//       { new: true }
//     ).populate("userId", "name email city phone");

//     if (!pandit) {
//       return res.status(404).json({ message: "Pandit profile not found" });
//     }

//     res.status(200).json(pandit);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


export const uploadPanditProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "pandit-app/pandits" },
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

    const pandit = await Pandit.findOneAndUpdate(
      { userId: req.user.id }, // ✅ FIXED
      { profileImage: imageUrl },
      {
        returnDocument: "after",
        upsert: true,
      }
    ).populate("userId", "name email city phone");

    res.status(200).json(pandit);

  } catch (err) {
    console.log("UPLOAD ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// 🔹 DELETEbad me kaam krunga
export const deletePandit = async (req, res) => {
  try {
    const pandit = await Pandit.findByIdAndDelete(req.params.id);

    if (!pandit) {
      return res.status(404).json({ message: "Pandit not found" });
    }

    res.status(200).json({ message: "Pandit deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getPanditByCity = async (req, res) => {
  try {
    const city = req.query.city;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const pandits = await Pandit.find({
      city: { $regex: `^${city}$`, $options: "i" } // ✅ FIX (case insensitive)
    })
      .skip(skip)
      .limit(limit);

    const total = await Pandit.countDocuments({
      city: { $regex: `^${city}$`, $options: "i" }
    });

    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: pandits
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};