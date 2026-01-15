// client/src/data.js

export const TIMELINE_DATA = [
  {
    year: "2025-2027",
    title: "M.Tech VLSI Specialization",
    institution: "Digital University Kerala (Sem 2)",
    desc: "Focusing on Neuromorphic Computing, Advanced VLSI Design, and AI/ML Deep Dive.",
    skills: ["Verilog", "CUDA", "PyTorch", "Vivado", "Neuromorphic VLSI"],
    details: "Developing BlueDepth-Crescent (Underwater Image Enhancement) and mastering full-stack hardware-software integration.",
    side: "left"
  },
  {
    year: "2020-2024",
    title: "B.Tech Electronics (ECE)",
    institution: "Undergraduate Journey",
    desc: "Foundation in Circuit Theory, Embedded Systems, and IoT.",
    skills: ["Embedded C", "MATLAB", "IoT", "PCB Design", "Python"],
    details: "Major Project: Water Quality Monitoring System using GSM/GPS. Learned to bridge sensors with software analytics.",
    side: "right"
  },
  {
    year: "2018-2020",
    title: "Higher Secondary (11th-12th)",
    institution: "Science Stream",
    desc: "Core foundation in Physics, Mathematics, and Electronics basics.",
    skills: ["C Programming", "Circuit Analysis", "Arduino Basics"],
    details: "Developed deep interest in how electricity becomes logic.",
    side: "left"
  },
  {
    year: "2017-2018",
    title: "High School (10th)",
    institution: "Foundation",
    desc: "Strong foundation in Science and Computer basics.",
    skills: ["Basic Math", "Logic Building", "MS Office"],
    details: "The beginning of the journey into technology.",
    side: "right"
  }
];

export const SKILL_CATEGORIES = [
  {
    id: "programming",
    title: "Programming Languages",
    // Purple-Blue Gradient
    gradient: "from-purple-500 to-blue-500", 
    items: ["Python (Expert)", "JavaScript (Adv)", "C/C++", "Verilog", "MATLAB"]
  },
  {
    id: "ai_ml",
    title: "AI/ML & Computer Vision",
    // Pink-Purple Gradient
    gradient: "from-pink-500 to-purple-600",
    items: ["PyTorch", "TensorFlow", "CUDA", "OpenCV", "UNet"]
  },
  {
    id: "hardware",
    title: "Hardware & VLSI",
    // Orange-Red Gradient
    gradient: "from-orange-500 to-red-500",
    items: ["Vivado", "Cadence", "FPGA", "Arduino", "IoT"]
  },
  {
    id: "web",
    title: "Full Stack Web",
    // Green-Emerald Gradient
    gradient: "from-green-500 to-emerald-500",
    items: ["React.js", "FastAPI", "Tailwind", "PostgreSQL", "Framer Motion"]
  },
  {
    id: "tools",
    title: "Tools & DevOps",
    // Cyan-Teal Gradient
    gradient: "from-cyan-500 to-teal-500",
    items: ["Git/GitHub", "Linux (Kali/Ubuntu)", "Docker", "VS Code"]
  },
  {
    id: "design",
    title: "Creative & Design",
    // Yellow-Orange Gradient
    gradient: "from-yellow-500 to-orange-500",
    items: ["Blender", "Godot", "Figma", "Video Editing"]
  }
];