export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail?: string;
  tech: string[];
  github?: string;
  demo?: string;
  category: "research" | "tool" | "webapp" | "embedded";
  featured?: boolean;
  year: number;
}

export const projects: Project[] = [
  {
    id: "smartvision-iot",
    title: "SmartVision IoT Platform",
    description: "Real-time object detection and analytics platform for IoT edge devices with cloud dashboard.",
    longDescription: "A full-stack platform integrating YOLOv8 on Raspberry Pi clusters with a Next.js dashboard for real-time monitoring, alerting, and analytics visualization.",
    tech: ["YOLOv8", "Python", "FastAPI", "Next.js", "MQTT", "InfluxDB", "Grafana"],
    github: "https://github.com/taufiqurrahman/smartvision-iot",
    demo: "https://smartvision.demo.com",
    category: "research",
    featured: true,
    year: 2024,
  },
  {
    id: "agrovision",
    title: "AgroVision",
    description: "AI-powered plant disease detection mobile app using CNN for precision agriculture.",
    longDescription: "Cross-platform mobile application using React Native and TensorFlow Lite for offline plant disease diagnosis, integrated with weather APIs and expert recommendations.",
    tech: ["React Native", "TensorFlow Lite", "Python", "FastAPI", "PostgreSQL"],
    github: "https://github.com/taufiqurrahman/agrovision",
    category: "webapp",
    featured: true,
    year: 2024,
  },
  {
    id: "traffic-ai",
    title: "TrafficAI Dashboard",
    description: "Smart city traffic management dashboard with YOLOv5-based vehicle counting.",
    longDescription: "Web dashboard for city traffic management that processes CCTV streams in real-time, providing vehicle counting, density heatmaps, and adaptive signal timing recommendations.",
    tech: ["YOLOv5", "OpenCV", "React", "Node.js", "Redis", "WebSocket"],
    github: "https://github.com/taufiqurrahman/traffic-ai",
    demo: "https://trafficai.demo.com",
    category: "webapp",
    featured: true,
    year: 2023,
  },
  {
    id: "faceattend",
    title: "FaceAttend",
    description: "Automated face recognition attendance system using MTCNN + ArcFace.",
    longDescription: "Plug-and-play attendance automation for educational institutions, supporting 1000+ registered faces with 98.2% accuracy under varied lighting conditions.",
    tech: ["Python", "MTCNN", "ArcFace", "Flask", "SQLite", "Raspberry Pi"],
    github: "https://github.com/taufiqurrahman/faceattend",
    category: "embedded",
    featured: false,
    year: 2023,
  },
  {
    id: "yolo-benchmark",
    title: "YOLO Benchmark Suite",
    description: "Comprehensive benchmarking tool comparing YOLOv5/v8/v10/v11 across hardware targets.",
    tech: ["Python", "PyTorch", "ONNX", "TensorRT", "Streamlit"],
    github: "https://github.com/taufiqurrahman/yolo-benchmark",
    category: "tool",
    featured: false,
    year: 2024,
  },
  {
    id: "aqi-monitor",
    title: "AQI Monitor",
    description: "IoT air quality monitoring network with LSTM prediction and alert system.",
    tech: ["ESP32", "Python", "LSTM", "InfluxDB", "Grafana", "Telegram Bot"],
    github: "https://github.com/taufiqurrahman/aqi-monitor",
    category: "embedded",
    featured: false,
    year: 2021,
  },
];
