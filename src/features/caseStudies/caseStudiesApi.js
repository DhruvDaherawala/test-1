
import healthImg from '../../assets/CGI/health.png';
import roboticsImg from '../../assets/CGI/robotics.png';
import casinoImg from '../../assets/CGI/casino.png';
import contructionImg from '../../assets/CGI/contruction.png';
import influencerImg from '../../assets/CGI/influencer.png';
import nftImg from '../../assets/CGI/NFT.png';
import surveyImg from '../../assets/CGI/survey.png';
import sportsImg from '../../assets/CGI/sports.png';
import shoesImg from '../../assets/CGI/shoes.png';
import portfolioImg from '../../assets/CGI/portfolio.png';

export const INITIAL_CASE_STUDIES = [
  {
    id: "cs-health",
    title: "Health Care Diagnostic & Clinical AI Assistant",
    category: "AI",
    summary: "Built an intelligent healthcare diagnostic and patient triage platform integrating multimodal vision AI for rapid clinical decision support and EHR synchronization.",
    year: 2024,
    img: healthImg,
    readTime: "4 min read",
    impact: "96.4% diagnostic accuracy",
    tags: ["AI Diagnostics", "Computer Vision", "HIPAA", "PyTorch"]
  },
  {
    id: "cs-robotics",
    title: "Robotics Edge Automation & Teleoperation",
    category: "AI",
    summary: "Autonomous industrial robotics telemetry pipeline featuring real-time sensor processing, edge neural nets, computer vision guidance, and sub-10ms latency control.",
    year: 2025,
    img: roboticsImg,
    readTime: "5 min read",
    impact: "35% higher throughput",
    tags: ["Edge AI", "Robotics", "ROS", "TensorFlow"]
  },
  {
    id: "cs-nft",
    title: "NFT Web3 Digital Asset Marketplace",
    category: "Blockchain",
    summary: "High-throughput decentralized NFT auction and trading marketplace on Ethereum and Polygon with smart contract royalty automation and instant wallet connect.",
    year: 2024,
    img: nftImg,
    readTime: "5 min read",
    impact: "$42M+ trading volume",
    tags: ["Solidity", "ERC-721", "Polygon", "Web3.js"]
  },
  {
    id: "cs-survey",
    title: "Decentralized Survey & Governance Protocol",
    category: "Blockchain",
    summary: "Sybil-resistant on-chain opinion polling and decentralized community voting protocol utilizing zero-knowledge cryptographic proofs and tamper-proof audits.",
    year: 2023,
    img: surveyImg,
    readTime: "4 min read",
    impact: "180k+ verified votes",
    tags: ["zk-SNARKs", "Governance", "Ethereum", "Ethers.js"]
  },
  {
    id: "cs-influencer",
    title: "Influencer Creator Economy Mobile Platform",
    category: "Mobile",
    summary: "Viral creator iOS and Android mobile app with interactive live streaming, direct fan micro-monetization, social discovery feeds, and real-time push analytics.",
    year: 2024,
    img: influencerImg,
    readTime: "6 min read",
    impact: "1.8M active users",
    tags: ["React Native", "WebRTC", "iOS", "Android"]
  },
  {
    id: "cs-sports",
    title: "Sports Performance & Biometric Mobile App",
    category: "Mobile",
    summary: "Cross-platform mobile sports tracker pairing with wearable biometric sensors for live athlete telemetry, GPS heatmaps, and recovery performance analytics.",
    year: 2023,
    img: sportsImg,
    readTime: "5 min read",
    impact: "+45% athlete recovery",
    tags: ["React Native", "BLE Sensors", "HealthKit", "Redux"]
  },
  {
    id: "cs-casino",
    title: "Casino Game High-Frequency Web Engine",
    category: "Web",
    summary: "Ultra-low latency web casino gaming engine featuring provably fair cryptographic algorithms, WebSockets, and sub-50ms synchronized multiplayer gaming lobbies.",
    year: 2024,
    img: casinoImg,
    readTime: "4 min read",
    impact: "50k concurrent players",
    tags: ["React", "WebSockets", "Node.js", "Canvas"]
  },
  {
    id: "cs-construction",
    title: "Construction 3D BIM & Jobsite Web Portal",
    category: "Web",
    summary: "Enterprise construction management web platform integrating real-time 3D BIM models, contractor task scheduling, blueprint markup, and jobsite IoT safety monitoring.",
    year: 2023,
    img: contructionImg,
    readTime: "5 min read",
    impact: "28% reduced schedule delays",
    tags: ["Three.js", "React", "Tailwind CSS", "IoT"]
  },
  {
    id: "cs-shoes",
    title: "Global E-Commerce Shoes & Footwear Store",
    category: "Web",
    summary: "High-conversion headless e-commerce store with 3D footwear previewing, lightning-fast edge rendering, dynamic stock inventory, and frictionless multi-currency checkout.",
    year: 2024,
    img: shoesImg,
    readTime: "4 min read",
    impact: "+68% checkout conversion",
    tags: ["Next.js", "Tailwind CSS", "Stripe", "Headless"]
  },
  {
    id: "cs-portfolio",
    title: "Interactive 3D Agency Portfolio Showcase",
    category: "Web",
    summary: "Flagship interactive digital agency showcase featuring smooth shader transitions, WebGL animations, dynamic project filtering, and responsive case study narratives.",
    year: 2025,
    img: portfolioImg,
    readTime: "3 min read",
    impact: "Awwwards Site of the Day",
    tags: ["Three.js", "WebGL", "Framer Motion", "React"]
  }
];

// Simulates an async API with ~800ms latency, ~15% failure rate, and abort signal support
export const fetchCaseStudies = ({ signal } = {}) => {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      return reject(new DOMException("Aborted", "AbortError"));
    }

    const timer = setTimeout(() => {
      const shouldFail = Math.random() < 0.15;

      if (shouldFail) {
        reject(new Error("Network failed"));
      } else {
        resolve(JSON.parse(JSON.stringify(INITIAL_CASE_STUDIES)));
      }
    }, 800);

    if (signal) {
      signal.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      });
    }
  });
};
