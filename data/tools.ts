export type SkillLevel = "expert" | "proficient" | "familiar";

export interface Tool {
  name: string;
  level: SkillLevel;
  url?: string;
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
          { name: "Python", level: "expert", url: "https://www.python.org/" },
          { name: "TypeScript", level: "proficient", url: "https://www.typescriptlang.org/" },
          { name: "JavaScript", level: "proficient", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
          { name: "Swift", level: "familiar", url: "https://www.swift.org/" },
          { name: "Dart", level: "familiar", url: "https://dart.dev/" },
          { name: "Kotlin", level: "familiar", url: "https://kotlinlang.org/" },
          { name: "C/C++", level: "familiar", url: "https://isocpp.org/" },
          { name: "Bash", level: "proficient", url: "https://www.gnu.org/software/bash/" },
        ],
      },
      {
        category: "AI / ML Frameworks",
        icon: "Brain",
        color: "from-teal-500 to-pink-500",
        tools: [
          { name: "PyTorch", level: "expert", url: "https://pytorch.org/" },
          { name: "TensorFlow", level: "proficient", url: "https://www.tensorflow.org/" },
          { name: "Ultralytics YOLO", level: "expert", url: "https://ultralytics.com/" },
          { name: "OpenCV", level: "expert", url: "https://opencv.org/" },
          { name: "Scikit-learn", level: "proficient", url: "https://scikit-learn.org/" },
          { name: "Keras", level: "proficient", url: "https://keras.io/" },
          { name: "ONNX Runtime", level: "proficient", url: "https://onnxruntime.ai/" },
        ],
      },
      {
        category: "Web Frameworks",
        icon: "Globe",
        color: "from-orange-500 to-amber-500",
        tools: [
          { name: "Next.js", level: "proficient", url: "https://nextjs.org/" },
          { name: "React", level: "proficient", url: "https://react.dev/" },
          { name: "FastAPI", level: "expert", url: "https://fastapi.tiangolo.com/" },
          { name: "Flask", level: "expert", url: "https://flask.palletsprojects.com/" },
          { name: "Node.js", level: "familiar", url: "https://nodejs.org/" },
        ],
      },
      {
        category: "Databases",
        icon: "Database",
        color: "from-sky-500 to-teal-500",
        tools: [
          { name: "PostgreSQL", level: "proficient", url: "https://www.postgresql.org/" },
          { name: "MongoDB", level: "familiar", url: "https://www.mongodb.com/" },
          { name: "InfluxDB", level: "proficient", url: "https://www.influxdata.com/" },
          { name: "Redis", level: "familiar", url: "https://redis.io/" },
          { name: "SQLite", level: "proficient", url: "https://www.sqlite.org/" },
        ],
      },
      {
        category: "Mobile Development",
        icon: "Smartphone",
        color: "from-violet-500 to-purple-500",
        tools: [
          { name: "Flutter", level: "proficient", url: "https://flutter.dev/" },
          { name: "SwiftUI", level: "familiar", url: "https://developer.apple.com/xcode/swiftui/" },
          { name: "Jetpack Compose", level: "familiar", url: "https://developer.android.com/compose" },
          { name: "React Native", level: "familiar", url: "https://reactnative.dev/" },
          { name: "Android Studio", level: "proficient", url: "https://developer.android.com/studio" },
          { name: "Xcode", level: "familiar", url: "https://developer.apple.com/xcode/" },
        ],
      },
      {
        category: "DevOps & Cloud",
        icon: "Cloud",
        color: "from-sky-500 to-indigo-500",
        tools: [
          { name: "Docker", level: "proficient", url: "https://www.docker.com/" },
          { name: "Git / GitHub", level: "expert", url: "https://github.com/" },
          { name: "Linux", level: "expert", url: "https://www.kernel.org/" },
          { name: "AWS (EC2/S3)", level: "familiar", url: "https://aws.amazon.com/" },
          { name: "Nginx", level: "familiar", url: "https://nginx.org/" },
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
          { name: "MacBook Pro", level: "expert", url: "https://www.apple.com/macbook-pro/" },
          { name: "iPhone XR", level: "expert", url: "https://www.apple.com/iphone-xr/" },
          { name: "Apple Watch Series 6", level: "proficient", url: "https://www.apple.com/apple-watch-series-6/" },
          { name: "Galaxy Buds 3 Pro", level: "proficient", url: "https://www.samsung.com/galaxy-buds3-pro/" },
        ],
      },
      {
        category: "Embedded / IoT",
        icon: "Cpu",
        color: "from-red-500 to-orange-500",
        tools: [
          { name: "Raspberry Pi", level: "expert", url: "https://www.raspberrypi.org/" },
          { name: "Jetson Nano", level: "expert", url: "https://developer.nvidia.com/embedded/jetson-nano" },
          { name: "Arduino", level: "proficient", url: "https://www.arduino.cc/" },
          { name: "ESP32", level: "proficient", url: "https://www.espressif.com/en/products/socs/esp32" },
          { name: "MQTT", level: "proficient", url: "https://mqtt.org/" },
          { name: "TensorRT", level: "proficient", url: "https://developer.nvidia.com/tensorrt" },
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
  Swift: "Smartphone",
  Dart: "Zap",
  Kotlin: "Coffee",
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
  Flutter: "Layers3",
  SwiftUI: "Smartphone",
  "Jetpack Compose": "Layers",
  "React Native": "Atom",
  "Android Studio": "Code2",
  Xcode: "Triangle",
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
