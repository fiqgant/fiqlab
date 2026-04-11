export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi?: string;
  url?: string;
  abstract: string;
  tags: string[];
  citations?: number;
  featured?: boolean;
}

import type { ScholarArticle } from "@/lib/scholar";

export type PublicationSource = Publication | ScholarArticle;

export function isManualPublication(pub: PublicationSource): pub is Publication {
  return Array.isArray(pub.authors);
}

export const publications: Publication[] = [
  {
    id: "pub-2025-yolo-drone",
    title: "Enhancing Drone-Based Multi-Object Tracking Through YOLOv10 and BoostTrack Integration",
    authors: ["Taufiqurrahman"],
    journal: "JICSA",
    year: 2025,
    abstract: "Integration of YOLOv10 and BoostTrack to improve multi-object tracking accuracy on UAV-based drones with real-time performance.",
    tags: ["YOLO", "Drone", "Multi-Object Tracking", "UAV"],
    featured: true,
  },
  {
    id: "pub-2025-traffic-sign",
    title: "Improving YOLO-Based Traffic-Sign Detection on GTSDB via F1-Guided Thresholding and Confusion-Aware Analysis",
    authors: ["Taufiqurrahman"],
    journal: "JANAPATI",
    year: 2025,
    abstract: "Improved YOLO-based traffic sign detection on GTSDB dataset using F1-guided thresholding and confusion matrix analysis.",
    tags: ["YOLO", "Traffic Sign", "Object Detection", "GTSDB"],
    featured: true,
  },
  {
    id: "pub-2025-gps-nav",
    title: "Real-Time Navigation Using Incremental GPS Path Logging Algorithm and Interactive Web-Based Visualization",
    authors: ["Taufiqurrahman"],
    journal: "Jurnal Minfo Polgan",
    year: 2025,
    abstract: "Real-time navigation system using incremental GPS path logging algorithm with interactive web-based visualization for location tracking.",
    tags: ["GPS", "Navigation", "Web GIS", "Real-time"],
    featured: true,
  },
  {
    id: "pub-2025-batak-music",
    title: "Integration of Batak Music Archive as a Strategic Innovation in Cultural-Based Convention and Event Management",
    authors: ["Taufiqurrahman"],
    journal: "Jurnal SEMAR",
    year: 2025,
    abstract: "Digital platform for Batak music archive to manage cultural-based conventions and events in North Sumatra.",
    tags: ["Cultural Heritage", "Digital Archive", "Batak Music"],
  },
  {
    id: "pub-2025-pajak",
    title: "Significance of Tax Aggressiveness from the Aspect of Corporate Sustainability",
    authors: ["Taufiqurrahman"],
    journal: "Jurnal Akuntansi Indonesia",
    year: 2025,
    abstract: "Analysis of tax aggressiveness in the context of corporate sustainability and environmental management accounting.",
    tags: ["Tax", "Sustainability", "Accounting"],
  },
  {
    id: "pub-2025-gamifikasi",
    title: "Increasing Environmental Sustainability Awareness Through Gamification Approach in Elementary School Children",
    authors: ["Taufiqurrahman"],
    journal: "JPMA",
    year: 2025,
    abstract: "Application of gamification methods to increase environmental awareness among elementary school students.",
    tags: ["Gamification", "Environment", "Education"],
  },
  {
    id: "pub-2025-bts7960",
    title: "Implementation of BTS7960 as Standalone Electronic Speed Controller Without Microcontroller",
    authors: ["Taufiqurrahman"],
    journal: "JTIUST",
    year: 2025,
    abstract: "Design of standalone electronic speed controller using BTS7960 IC without microcontroller for embedded systems applications.",
    tags: ["Embedded", "Motor Control", "Electronics"],
  },
  {
    id: "pub-2024-yolo-vehicle",
    title: "Performance Evaluation of YOLOv8 in Front Vehicle Object Detection with Environmental Condition Variations",
    authors: ["Taufiqurrahman"],
    journal: "Jurnal Minfo Polgan",
    year: 2024,
    abstract: "Performance evaluation of YOLOv8 for front vehicle object detection across various environmental conditions using IoT approach.",
    tags: ["YOLOv8", "IoT", "Vehicle Detection", "Computer Vision"],
    featured: true,
  },
  {
    id: "pub-2024-efficientnet-tomat",
    title: "Integration of Deep Learning EfficientNet-B0 Model for Tomato Leaf Disease Detection on Flutter Mobile Application",
    authors: ["Taufiqurrahman"],
    journal: "Djtechno",
    year: 2024,
    abstract: "Development of Flutter mobile application with EfficientNet-B0 model for real-time tomato leaf disease detection.",
    tags: ["EfficientNet", "Plant Disease", "Flutter", "Deep Learning"],
  },
  {
    id: "pub-2024-k-means",
    title: "Menu Clustering at Doktor Kopi Using K-Means Algorithm to Increase Sales",
    authors: ["Taufiqurrahman"],
    journal: "INFOKUM",
    year: 2024,
    abstract: "Application of K-Means algorithm for menu clustering at Doktor Kopi to increase sales through data-driven insights.",
    tags: ["K-Means", "Data Mining", "Business Intelligence"],
  },
  {
    id: "pub-2024-team-leadership",
    title: "Software Development Team Performance Optimization through Non-Technical Leadership",
    authors: ["Taufiqurrahman"],
    journal: "Warta Dharmawangsa",
    year: 2024,
    abstract: "Study on non-technical leadership in optimizing software development team performance.",
    tags: ["Software Engineering", "Team Management", "Leadership"],
  },
  {
    id: "pub-2024-face-attendance",
    title: "Performance Analysis of Smart Technology with Face Detection Using YOLOv3 and InsightFace for Student Attendance Monitoring",
    authors: ["Taufiqurrahman"],
    journal: "IJISAE",
    year: 2024,
    abstract: "Performance analysis of student attendance system based on face recognition using YOLOv3 and InsightFace.",
    tags: ["Face Detection", "YOLOv3", "InsightFace", "Attendance"],
  },
  {
    id: "pub-2022-reinforcement",
    title: "Analysis of Model-Free Reinforcement Learning Algorithm for Target Tracking",
    authors: ["Taufiqurrahman"],
    journal: "Journal of Computer Engineering, Electronics and Information Technology",
    year: 2022,
    abstract: "Analysis of model-free reinforcement learning algorithms for target tracking applications in autonomous systems.",
    tags: ["Reinforcement Learning", "Target Tracking", "AI"],
  },
  {
    id: "pub-2021-knn",
    title: "Analysis of Dimensional Reduction Effect on K-Nearest Neighbor Classification Method",
    authors: ["Taufiqurrahman"],
    journal: "Sinkron: Jurnal dan Penelitian Teknik Informatika",
    year: 2021,
    abstract: "Analysis of dimensional reduction effects on K-Nearest Neighbor classification method to improve accuracy and computational efficiency.",
    tags: ["KNN", "Dimensionality Reduction", "Classification", "Machine Learning"],
  },
];
