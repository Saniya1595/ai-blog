
const r=require("express").Router();
const c=require("../controllers/aiController");
r.post("/generate",c.generateBlog); module.exports=r;
