import type { Project } from "../types/content";

export const projects: Project[] = [
  {
    id: 1,
    title: "Computer Vision Research",
    categories: ["AI & ML"],
    description:
      "A repository dedicated to my research, implementation and learning about the groundbreaking advancements in Computer Vision. The repository comprises implementation — from scratch — of various prominent Computer Vision architectures, which includes: Vision Transformer, MobileNet, ResNet, EfficientNet, et al. The tasks covered span across image classification, object segmentation, detection and generative models, such as Diffusion models and Generative Adversarial Networks (GANs).",
    image: "/images/cv-image.png",
    link: "https://github.com/TolaniSilas/Computer-Vision-Research",
  },
  {
    id: 2,
    title: "Mini GPT",
    categories: ["AI & ML"],
    description:
      "Implemented Generative Pretrained Transformer (GPT) models (e.g., GPT-2, GPT-3) for experimental purposes to gain a deeper understanding of the underlying mechanisms of this technology. The model architecture is inspired by a major breakthrough in deep learning: the self-attention mechanism introduced in 'Attention Is All You Need' by Vaswani et al. It employs a decoder-only Transformer design and incorporates Byte Pair Encoding (BPE) tokenization as its robust text-preprocessing technique.",
    image: "/images/llm-image.png",
    link: "https://github.com/TolaniSilas/Mini-GPT",
  },
  {
    id: 3,
    title: "Real-Time Currency Analyst Agent",
    categories: ["AI & ML", "Backend Development"],
    description:
      "A conversational, financial intelligence AI Agent specialized in analyzing currencies. It fetches real-time exchange rate data and interprets currency relationships at real-time (the current moment). It responsibility is also to provide clear and concise insights for users seeking to understand the relative strength of currencies across various countries or perform instant conversions between different currencies.",
    image: "/images/currency-image.png",
    link: "https://github.com/TolaniSilas/genai_works/tree/main/src/currency_analyst_agent",
  },
  {
    id: 4,
    title: "Web3 Semantic Search",
    categories: ["AI & ML", "Backend Development"],
    description:
      "This is a decentralized content retrieval system in which users upload content - such as images and blogs - that can later be retrieved by other users using natural-language search (via queries or prompts). It was developed on Camp Network - a Layer-1 blockchain built to modernize intellectual property (IP) infrastructure and power the next generation of AI Agents on verifiable IP.",
    image: "/images/web3-semantic.png",
    link: "https://github.com/TolaniSilas/web3-semantic-search",
  },
  {
    id: 5,
    title: "Automatic Detection of Diabetic Retinopathy",
    categories: ["AI & ML", "Web Development", "Backend Development"],
    description:
      "An end-to-end AI-driven software system for early detection of Diabetic Retinopathy (DR) using deep learning and computer vision techniques. This project analyzes retinal fundus images to automate diagnosis, improving accuracy, speed, and accessibility of diabetic eye screening for ophthalmologists.",
    image: "/images/ai-as-a-doctor.png",
    link: "https://diabetic-retinopathy-web.streamlit.app/",
  },
  {
    id: 6,
    title: "Recipe Site Traffic",
    categories: ["Backend Development", "AI & ML", "Web Development"],
    description:
      "An end-to-end ML system from problem formulation to model deployment via Docker; it also step forward to cover data drift and model monitoring. The product team at Tasty Bytes needs a data-driven assistance in the decision-making process for selecting which recipes to feature on the homepage so they can maximize high-traffic recipes and minimize low-traffic ones, with a target of correctly identifying popular recipes around 80% of the time, thereby boosting subscriptions.",
    image: "/images/recipe-traffic-image.png",
    link: "https://github.com/TolaniSilas/Recipe-Site-Traffic",
  },
  {
    id: 7,
    title: "Loan Eligibility App",
    categories: ["Backend Development", "AI & ML", "Web Development"],
    description:
      "A machine learning web application developed for Dream Housing Finance to automate real-time loan eligibility assessments. It analyzes customer data, validates financial metrics, and predicts approval outcomes with high accuracy, streamlining decision-making for the company.",
    image: "/images/loan-eligibility.png",
    link: "https://dreamhousingfinance.onrender.com/",
  },
];
