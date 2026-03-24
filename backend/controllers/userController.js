const User = require("../models/User");
exports.getUserProfile = async (req,res)=>{
    try{
        const user =await User.findById(req.user.id).select("-password");
        res.status(200).json(user);

    }
    catch(err){
    res.status(500).json({message:err.message});

    }
};
exports.updateUserProfile =async(req,res)=>{
    try {
        const user =await User.findByIdAndUpdate(
            req.user.id,
            req.body,
            {new:true}
        ).select("-password");
        // console.log(user)
        res.status(200).json(user);

        
    } catch (err) {
        res.status(500).json({message:"err.message"});
    }
}
exports.deleteUserProfile =async(req,res)=>{
    try {
        const user =await User.findByIdAndDelete(req.user.id);
        
    if(!user){
      return res.status(404).json({message:"user not found"});
    }
      
        
    } catch (err) {
        res.status(500).json({message:"err.message"});
    }
}