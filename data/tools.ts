export type SkillLevel = "expert" | "proficient" | "familiar";

export interface Tool {
  name: string;
  level: SkillLevel;
}

export interface ToolCategory {
  category: string;
  icon: string;
  color: string;
  tools: Tool[];
}

export interface SkillSection {
  id: string;
  label: string;
  description: string;
  color: string;
  accentColor: string;
  categories: ToolCategory[];
}

export const skillSections: SkillSection[] = [
  {
    id: "software",
    label: "Software",
    description: "Languages, frameworks, libraries, and tools for building AI systems and web applications.",
    color: "from-blue-500 to-teal-500",
    accentColor: "text-blue-500",
    categories: [
      {
        category: "Languages",
        icon: "Code2",
        color: "from-blue-500 to-cyan-500",
        tools: [
          { name: "Python", level: "expert" },
          { name: "TypeScript", level: "proficient" },
          { name: "JavaScript", level: "proficient" },
          { name: "C/C++", level: "familiar" },
          { name: "Bash", level: "proficient" },
        ],
      },
      {
        category: "AI / ML Frameworks",
        icon: "Brain",
        color: "from-teal-500 to-pink-500",
        tools: [
          { name: "PyTorch", level: "expert" },
          { name: "TensorFlow", level: "proficient" },
          { name: "Ultralytics YOLO", level: "expert" },
          { name: "OpenCV", level: "expert" },
          { name: "Scikit-learn", level: "proficient" },
          { name: "Keras", level: "proficient" },
          { name: "ONNX Runtime", level: "proficient" },
        ],
      },
      {
        category: "Web Frameworks",
        icon: "Globe",
        color: "from-orange-500 to-amber-500",
        tools: [
          { name: "Next.js", level: "proficient" },
          { name: "React", level: "proficient" },
          { name: "FastAPI", level: "expert" },
          { name: "Flask", level: "expert" },
          { name: "Node.js", level: "familiar" },
        ],
      },
      {
        category: "Databases",
        icon: "Database",
        color: "from-green-500 to-teal-500",
        tools: [
          { name: "PostgreSQL", level: "proficient" },
          { name: "MongoDB", level: "familiar" },
          { name: "InfluxDB", level: "proficient" },
          { name: "Redis", level: "familiar" },
          { name: "SQLite", level: "proficient" },
        ],
      },
      {
        category: "DevOps & Cloud",
        icon: "Cloud",
        color: "from-sky-500 to-indigo-500",
        tools: [
          { name: "Docker", level: "proficient" },
          { name: "Git / GitHub", level: "expert" },
          { name: "Linux", level: "expert" },
          { name: "AWS (EC2/S3)", level: "familiar" },
          { name: "Nginx", level: "familiar" },
        ],
      },
    ],
  },
  {
    id: "hardware",
    label: "Hardware",
    description: "Embedded systems, single-board computers, and IoT devices for edge AI deployment.",
    color: "from-orange-500 to-red-500",
    accentColor: "text-orange-500",
    categories: [
      {
        category: "Personal Devices",
        icon: "Laptop",
        color: "from-purple-500 to-pink-500",
        tools: [
          { name: "MacBook Pro", level: "expert" },
          { name: "iPhone XR", level: "expert" },
          { name: "Apple Watch Series 6", level: "proficient" },
          { name: "Galaxy Buds 3 Pro", level: "proficient" },
        ],
      },
      {
        category: "Embedded / IoT",
        icon: "Cpu",
        color: "from-red-500 to-orange-500",
        tools: [
          { name: "Raspberry Pi", level: "expert" },
          { name: "Jetson Nano", level: "expert" },
          { name: "Arduino", level: "proficient" },
          { name: "ESP32", level: "proficient" },
          { name: "MQTT", level: "proficient" },
          { name: "TensorRT", level: "proficient" },
        ],
      },
    ],
  },
];

// Flat list of all tools for the icon grid
export const allTools: Tool[] = skillSections.flatMap((section) =>
  section.categories.flatMap((cat) => cat.tools)
);

export const toolIconMap: Record<string, string> = {
  Python: "FileCode",
  TypeScript: "FileType",
  JavaScript: "FileCode2",
  "C/C++": "Binary",
  Bash: "Terminal",
  PyTorch: "Flame",
  TensorFlow: "Brain",
  "Ultralytics YOLO": "Target",
  OpenCV: "Eye",
  "Scikit-learn": "LineChart",
  Keras: "Layers",
  "ONNX Runtime": "Box",
  "Next.js": "Triangle",
  React: "Atom",
  FastAPI: "Zap",
  Flask: "Coffee",
  "Node.js": "Hexagon",
  PostgreSQL: "Database",
  MongoDB: "Database",
  InfluxDB: "Activity",
  Redis: "Layers",
  SQLite: "Table",
  Docker: "Container",
  "Git / GitHub": "GitBranch",
  Linux: "Monitor",
  "AWS (EC2/S3)": "Cloud",
  Nginx: "Server",
  "Raspberry Pi": "CircuitBoard",
  "Jetson Nano": "Cpu",
  Arduino: "CircuitBoard",
  ESP32: "Wifi",
  MQTT: "Radio",
  TensorRT: "Cpu",
  "MacBook Pro": "Laptop",
  "iPhone XR": "Smartphone",
  "Apple Watch Series 6": "Watch",
  "Galaxy Buds 3 Pro": "Headphones",
};
