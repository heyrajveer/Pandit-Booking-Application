const Pandit = require("../models/Pandit");

exports.createPandit = async (req, res) => {
  try {

    // check if pandit profile already exists
    const existingPandit = await Pandit.findOne({ userId: req.user.id });

    if (existingPandit) {
      return res.status(400).json({ message: "Pandit profile already exists" });
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

exports.getPandits = async (req, res) => {
  try {

    const pandits = await Pandit.find();

    res.json(pandits);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  
exports.getPanditById = async (req,res)=>{
  try{

    const pandit = await Pandit.findById(req.params.id);

    if(!pandit){
      return res.status(404).json({message:"Pandit not found"});
    }

    res.status(200).json(pandit);

  }catch(err){
    res.status(500).json({message:err.message});
  }
};




exports.getMyPanditProfile = async (req,res)=>{
  try{

    const pandit = await Pandit.findOne({ userId: req.user.id });

    if(!pandit){
      return res.status(404).json({message:"Pandit profile not found"});
    }

    res.status(200).json(pandit);

  }catch(err){
    res.status(500).json({message:err.message});
  }
};

exports.updatePanditProfile = async (req,res)=>{
  try{

    const pandit = await Pandit.findByIdAndUpdate(
      req.user.id,
      req.body,
      {new:true}
    );

    if(!pandit){
      return res.status(404).json({message:"Pandit not found"});
    }

    res.status(200).json(pandit);

  }catch(err){
    res.status(500).json({message:err.message});
  }
};
exports.deletePandit = async (req,res)=>{
  try{

    const pandit = await Pandit.findByIdAndDelete(req.params.id);

    if(!pandit){
      return res.status(404).json({message:"Pandit not found"});
    }

    res.status(200).json({message:"Pandit deleted successfully"});

  }catch(err){
    res.status(500).json({message:err.message});
  }
};