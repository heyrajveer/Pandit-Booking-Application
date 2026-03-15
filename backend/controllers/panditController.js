const Pandit = require("../models/Pandit");

exports.createPandit = async (req, res) => {
  try {

    const pandit = new Pandit(req.body);

    await pandit.save();

    res.json({ message: "Pandit profile created", pandit });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getPandits = async (req, res) => {
  try {

    const pandits = await Pandit.find();

    res.json(pandits);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  
// exports.panditProfile = async(req,res)=>{
//   try {
//     const pandit =await Pandit.findById(req.)
    
//   } catch (err) {
//     res.status(500).json({message:err.message});
//   }
// }