
const User=require("../models/User");
const bcrypt=require("bcryptjs"); const jwt=require("jsonwebtoken");
exports.register=async(req,res)=>{
 const hash=await bcrypt.hash(req.body.password,10);
 await new User({...req.body,password:hash}).save(); res.send("Registered");
};
exports.login=async(req,res)=>{
 const u=await User.findOne({email:req.body.email});
 if(!u) return res.send("No user");
 const ok=await bcrypt.compare(req.body.password,u.password);
 if(!ok) return res.send("Wrong");
 const t=jwt.sign({id:u._id},process.env.JWT_SECRET); res.json({token:t});
};
