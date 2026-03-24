const Pandit = require("../models/Pandit");

// 🔹 CREATE
exports.createPandit = async (req, res) => {
  try {
    const existingPandit = await Pandit.findOne({ userId: req.user.id });

    if (existingPandit) {
      return res.status(400).json({
        message: "Pandit profile already exists"
      });
    }

    const pandit = new Pandit({
      ...req.body,
      userId: req.user.id
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
exports.getPandits = async (req, res) => {
  try {
    const pandits = await Pandit.find()
      .populate("userId", "name city phone");

    res.json(pandits);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 🔹 GET BY ID
exports.getPanditById = async (req, res) => {
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
exports.getMyPanditProfile = async (req, res) => {
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
exports.updatePanditProfile = async (req, res) => {
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


// 🔹 DELETEbad me kaam krunga
exports.deletePandit = async (req, res) => {
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


//filter pandit by city
exports.getPanditByCity = async (req, res) => {
  try {
    const { city } = req.query;

    let pandits = await Pandit.find()
      .populate("userId", "name city phone");
//Why not direct Mongo filter?

    // 🔥 filter after populate
    //Because:city is inside user collection (not Pandit)
    if (city) {
      pandits = pandits.filter((p) =>
        p.userId?.city?.toLowerCase().includes(city.toLowerCase())
      );
    }

    res.json(pandits);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};