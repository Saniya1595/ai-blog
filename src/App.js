import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaWandMagicSparkles } from "react-icons/fa6";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [blog, setBlog] = useState("");

  const generate = async () => {
    if (!prompt) return;
    const res = await axios.post("http://localhost:5000/api/ai/generate", { prompt });
    setBlog(res.data.text);
  };

  return (
    <div style={{
      minHeight:"100vh",
      background:"radial-gradient(circle at top,#ff00cc,#333399)",
      fontFamily:"Orbitron",
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      paddingTop:80,
      color:"#fff"
    }}>

      <motion.h1 animate={{rotate:[-2,2,-2]}} transition={{repeat:Infinity,duration:3}}>
        ⚡ AI Blog Blaster ⚡
      </motion.h1>

      <p style={{opacity:0.8}}>
        Tell me your chaotic brain thought and I’ll turn it into a blog 👀
      </p>

      <motion.textarea
        onKeyDown={e => e.key === "Enter" && generate()}
        placeholder="e.g. Why Gen-Z will replace Google with AI"
        onChange={e=>setPrompt(e.target.value)}
        style={{
          width:"60%",
          height:120,
          borderRadius:30,
          padding:20,
          fontSize:16,
          outline:"none",
          border:"none",
          textAlign:"center"
        }}
      />

      <motion.button
        whileHover={{scale:1.1}}
        onClick={generate}
        style={{
          marginTop:20,
          background:"#000",
          color:"#ff00cc",
          border:"none",
          padding:"12px 40px",
          borderRadius:40,
          cursor:"pointer",
          fontSize:16
        }}>
        <FaWandMagicSparkles /> Create My Blog
      </motion.button>

      {blog && (
        <motion.div initial={{opacity:0,y:50}} animate={{opacity:1,y:0}}
          style={{
            marginTop:40,
            width:"70%",
            background:"rgba(0,0,0,0.4)",
            padding:30,
            borderRadius:30,
            lineHeight:1.6,
            whiteSpace:"pre-wrap"
          }}>
          {blog}
        </motion.div>
      )}
    </div>
  );
}
