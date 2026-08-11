export interface PipelineStep {
  step: number;
  title: string;
  desc?: string;
  icon?: string;
}

export interface CollapsibleSection {
  id: string;
  title: string;
  content: string | string[];
}

export interface DiagramPlaceholder {
  id: string;
  title: string;
  description: string;
  type: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  isFlagship?: boolean;
  badge?: string;
  category: string[];
  tags: string[];
  datasetInfo?: string;
  metrics: { label: string; value: string }[];
  summary: string;
  paperUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  pipelineSteps?: PipelineStep[];
  diagramPlaceholders?: DiagramPlaceholder[];
  engineeringSections?: CollapsibleSection[];
  deepDive?: {
    problem: string;
    research: string;
    dataset: string;
    preprocessing: string;
    architecture: string;
    training: string;
    results: string;
    challenges: string;
    lessonsLearned: string;
    futureImprovements: string;
  };
  architectureDiagram?: string[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; level: string; description: string }[];
}

export interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  year: string;
  credentialId: string;
  verifyUrl: string;
  badgeColor: string;
  skillsCovered: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  score: string;
  scoreLabel: string;
  period: string;
  location?: string;
  highlights: string[];
}

export interface PhilosophyStage {
  step: number;
  stage: string;
  title: string;
  description: string;
  keyOutputs: string[];
  icon: string;
}

export const PERSONAL_INFO = {
  name: "Kontham Siva Nagendra Prasad",
  headline: "AI Engineer • Machine Learning Enthusiast • Software Developer",
  shortIntro: "I build AI-powered applications, intelligent computer vision systems, and scalable software solutions with a focus on solving real-world problems.",
  bio: "B.Tech Computer Science & Engineering student specializing in Artificial Intelligence and Machine Learning at SRM Institute of Science and Technology (Graduating 2027). Passionate about deep learning, real-time computer vision pipelines, clean software architecture, and production-grade ML deployment.",
  location: "Chennai / Andhra Pradesh, India",
  cgpa: "8.5",
  email: "ksivanagendraprasad@gmail.com",
  phone: "+91 96039 77779",
  github: "https://github.com/Siva794",
  linkedin: "https://linkedin.com/in/k-siva-nagendra-prasad",
  availability: "Available for AI/ML & Software Engineering Roles",
  stats: [
    { label: "Academic CGPA", value: "8.5 / 10" },
    { label: "Certifications", value: "4 Industry Badges" },
    { label: "Core Focus", value: "Computer Vision & ML" },
    { label: "Graduation", value: "May 2027" },
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "deepfake-detection",
    title: "Explainable Multi-Class Detection of Real, Deepfake & AI-Generated Images Using CNNs",
    subtitle: "Explainable AI & Convolutional Neural Network Research Framework",
    tagline: "Flagship Research Project • Multi-Class Synthetic & Deepfake Media Classification",
    isFlagship: true,
    badge: "Research Project",
    category: ["Computer Vision", "Explainable AI", "Research Project"],
    tags: ["Python", "PyTorch", "CNN", "OpenCV", "Grad-CAM", "Computer Vision", "Deep Learning", "Multi-Class Classification"],
    datasetInfo: "Balanced Multi-Source Dataset: Real Images, Deepfake Images, AI Generated Images",
    metrics: [
      { label: "Test Accuracy", value: "93.61%" },
      { label: "Macro Precision", value: "0.936" },
      { label: "Macro Recall", value: "0.936" },
      { label: "Macro F1", value: "0.936" },
      { label: "Balanced Accuracy", value: "0.936" }
    ],
    summary: "An end-to-end Explainable AI framework capable of classifying images into Real, Deepfake, and AI-Generated categories using a lightweight Convolutional Neural Network integrated with Grad-CAM for interpretable predictions.",
    paperUrl: "#",
    githubUrl: "https://github.com/Siva794/Deepfake-Detection-ML",
    demoUrl: "#",
    pipelineSteps: [
      { step: 1, title: "Dataset Collection", desc: "Aggregating multi-source real, deepfake, and generative AI image repositories." },
      { step: 2, title: "Image Preprocessing", desc: "Resizing to 224x224 RGB, spatial normalization, and facial region alignment." },
      { step: 3, title: "Data Augmentation", desc: "Applying noise injection, random rotations, and color jitter for generalization." },
      { step: 4, title: "CNN Feature Extraction", desc: "Extracting subtle spatial boundary and spectral frequency anomalies." },
      { step: 5, title: "Global Average Pooling", desc: "Reducing feature spatial dimensions to minimize model parameters." },
      { step: 6, title: "Dense + Dropout", desc: "Fully connected classification head with 0.4 Dropout regularization." },
      { step: 7, title: "Softmax Classification", desc: "Computing tri-class confidence scores for Real vs. Deepfake vs. AI-Generated." },
      { step: 8, title: "Grad-CAM Explainability", desc: "Generating gradient activation heatmaps over discriminative pixel regions." },
      { step: 9, title: "Prediction", desc: "Final interpretable decision output with visual heatmaps for auditability." }
    ],
    diagramPlaceholders: [
      { id: "arch-diag", title: "Architecture Diagram", description: "Detailed structural diagram of the lightweight CNN layers, feature maps, and Grad-CAM integration flow.", type: "diagram" },
      { id: "conf-mat", title: "Confusion Matrix", description: "Multi-class evaluation matrix showcasing true vs predicted classifications across Real, Deepfake, and AI-Generated samples.", type: "matrix" },
      { id: "grad-cam", title: "Grad-CAM Visualization", description: "Visual heatmap overlays comparing spatial focus areas for authentic photos vs synthetic manipulations.", type: "visualization" },
      { id: "train-curves", title: "Training Curves", description: "Loss and accuracy convergence plots over 50 epochs for training and validation sets.", type: "curves" },
      { id: "sys-shots", title: "System Screenshots", description: "End-to-end user interface and inference diagnostic dashboard captures.", type: "screenshots" }
    ],
    engineeringSections: [
      {
        id: "problem-statement",
        title: "Problem Statement",
        content: "The viral proliferation of hyper-realistic deepfake facial swaps and generative AI imagery (produced by modern models like Midjourney, Stable Diffusion, and GAN variants) poses severe societal risks to authentication security, media integrity, and digital forensics. Existing automated verification tools are often opaque or limited to binary detection, failing to discriminate between manipulated existing photos and newly generated synthetic images."
      },
      {
        id: "research-gap",
        title: "Research Gap",
        content: "Most state-of-the-art detectors treat synthetic media detection as a black-box binary classification problem (Real vs. Fake), without providing interpretable visual explanations for forensic verification. Furthermore, there is a critical shortage of multi-class frameworks that simultaneously distinguish between unaltered Real images, facial swap Deepfakes, and fully AI-Generated synthetic outputs while remaining lightweight enough for edge inspection."
      },
      {
        id: "dataset-construction",
        title: "Dataset Construction",
        content: "Constructed a balanced multi-source evaluation dataset composed of three distinct classes:\n1. Real Images: High-resolution authentic human portraits sourced from benchmark datasets (FFHQ and FaceForensics++).\n2. Deepfake Images: Face-swapped images generated via FaceForensics++ and Celeb-DF v2.\n3. AI-Generated Images: Synthetic human faces created using modern diffusion models (Stable Diffusion v2.1, Midjourney v5, and StyleGAN3).\nEqual class distribution was enforced to prevent class imbalance bias during loss backpropagation."
      },
      {
        id: "image-preprocessing",
        title: "Image Preprocessing",
        content: "Input images undergo a rigorous multi-stage standardization pipeline:\n• Face Alignment & Bounding Box Cropping: Isolating primary facial regions using OpenCV and landmark detectors.\n• Resizing & Normalization: Standardizing all inputs to 224x224 RGB resolution with mean [0.485, 0.456, 0.406] and std [0.229, 0.224, 0.225].\n• Data Augmentation: Applying random horizontal flips, subtle Gaussian blur, brightness jitter, and random rotations (+/- 15 degrees) to force the CNN to focus on structural spatial anomalies rather than high-frequency sensor noise."
      },
      {
        id: "cnn-architecture",
        title: "CNN Architecture",
        content: "Engineered a custom, lightweight Convolutional Neural Network optimized for high inference throughput:\n• 4 Convolutional Blocks: Utilizing 3x3 kernels, Batch Normalization, and ReLU activation to extract spatial feature maps.\n• Depthwise Separable Convolutions: Minimizing total parameter count while maintaining feature map capacity.\n• Global Average Pooling (GAP): Replaces parameter-heavy dense flattening layers, preserving spatial invariance and reducing overfitting.\n• Classification Head: Dense layer (128 units) with 0.4 Dropout followed by a 3-unit Dense layer with Softmax activation for multi-class probability scoring."
      },
      {
        id: "explainable-ai",
        title: "Explainable AI (Grad-CAM)",
        content: "Integrated Gradient-weighted Class Activation Mapping (Grad-CAM) directly into the model evaluation loop. Grad-CAM computes the gradients of the target class score with respect to the feature maps of the final convolutional layer. By performing a weighted combination of forward activation maps, the model generates high-resolution heatmaps that visually highlight discriminative pixel regions (such as unnatural eye reflections, boundary warping, or blending artifacts) responsible for the classification decision."
      },
      {
        id: "experimental-setup",
        title: "Experimental Setup",
        content: "• Framework: PyTorch & PyTorch Lightning.\n• Optimizer: AdamW with learning rate 1e-4 and weight decay 1e-2.\n• Loss Function: Categorical Cross-Entropy Loss with label smoothing (0.1).\n• Batch Size: 32 on NVIDIA GPU.\n• Early Stopping: Monitored on validation macro F1-score with patience of 10 epochs over 50 total epochs."
      },
      {
        id: "results-analysis",
        title: "Results & Analysis",
        content: "Quantitative evaluation on the held-out test set demonstrated exceptional discriminative performance across all metrics:\n• Test Accuracy: 93.61%\n• Macro Precision: 0.936\n• Macro Recall: 0.936\n• Macro F1-Score: 0.936\n• Balanced Accuracy: 0.936\nGrad-CAM heatmaps confirmed that the network relied on physical artifact boundaries and high-frequency noise discrepancies rather than background context."
      },
      {
        id: "limitations",
        title: "Limitations",
        content: "• Performance degradation when processing heavily compressed JPEG images or low-resolution social media uploads where high-frequency pixel anomalies are smoothed out.\n• Sensitivity to unseen generative architectures trained on vastly different latent spaces."
      },
      {
        id: "future-work",
        title: "Future Work",
        content: "• Extending the framework to temporal video sequences using Vision Transformers (ViT) and 3D-CNNs.\n• Integrating multi-modal audio-visual synchronization verification.\n• Optimizing model weights via INT8 quantization for real-time mobile and web browser execution."
      }
    ],
    deepDive: {
      problem: "The rapid evolution of generative adversarial networks (GANs) and diffusion-based face swapping tools makes hyper-realistic deepfakes virtually indistinguishable to the human eye. This poses massive security threats in authentication systems, media verification, and digital forensics.",
      research: "Investigated spatial-temporal artifact degradation across deepfake generation pipelines. Evaluated facial boundary inconsistency, eye-blinking absence, spectrum frequency distribution, and color space discrepancies between real and synthetically manipulated faces.",
      dataset: "Balanced Multi-Source Dataset: Real Images, Deepfake Images, AI Generated Images.",
      preprocessing: "Extracted 10 keyframes per video second. Cropped and normalized faces to 224x224 RGB tensors. Applied data augmentation including random brightness jitter, Gaussian noise injection, and horizontal flip.",
      architecture: "Designed a lightweight custom Convolutional Neural Network (CNN) architecture integrated with Grad-CAM for interpretable predictions.",
      training: "Trained using PyTorch with AdamW optimizer (learning rate = 1e-4), Cross-Entropy loss function, Batch Size of 32.",
      results: "Achieved 93.61% Test Accuracy, 0.936 Macro Precision, 0.936 Macro Recall, 0.936 Macro F1, and 0.936 Balanced Accuracy.",
      challenges: "Handling heavily compressed social media videos where lossy compression obscures subtle pixel artifacts.",
      lessonsLearned: "Grad-CAM explainability is essential for verifying that CNN models learn genuine structural boundary anomalies.",
      futureImprovements: "Extend architecture to 3D-CNN / EfficientNet-Transformer models to model temporal continuity across consecutive frames."
    }
  },
  {
    id: "nlp-quantization",
    title: "Efficient On-Device NLP Using Mixed Precision and Quantization for Tiny Transformer Models",
    subtitle: "Lightweight Transformer Optimization & On-Device Emotion Classification",
    tagline: "Research Project • Transformer Quantization & Model Compression",
    isFlagship: false,
    badge: "Research Project",
    category: ["Natural Language Processing", "Transformer Models", "Research Project"],
    tags: ["Python", "PyTorch", "DistilBERT", "Transformers", "Hugging Face", "Mixed Precision", "Quantization", "NLP", "Emotion Classification", "Model Compression"],
    datasetInfo: "Multi-Class Emotion Corpus fine-tuned on Transformer encoder architecture",
    metrics: [
      { label: "Accuracy", value: "95.12%" },
      { label: "Weighted F1", value: "94.93%" },
      { label: "Model Size", value: "255 MB → 132 MB" },
      { label: "Storage Reduction", value: "48%" }
    ],
    summary: "A lightweight emotion classification framework using DistilBERT with mixed precision training and dynamic quantization to optimize deployment on resource-constrained systems.",
    paperUrl: "#",
    githubUrl: "https://github.com/Siva794/Sentiment-Analysis",
    demoUrl: "#",
    pipelineSteps: [
      { step: 1, title: "Text Input", desc: "Ingesting raw natural language text streams for emotion classification." },
      { step: 2, title: "Tokenizer", desc: "Fast WordPiece tokenization with max length truncation and attention masking." },
      { step: 3, title: "DistilBERT Encoder", desc: "Transformer encoder extracting contextual token embeddings." },
      { step: 4, title: "Classification Head", desc: "Linear projection with dropout for fine-grained emotion mapping." },
      { step: 5, title: "Emotion Prediction", desc: "Softmax probability distribution across emotion categories." },
      { step: 6, title: "Dynamic Quantization", desc: "Post-training FP32 to INT8 weight quantization." },
      { step: 7, title: "Deployment", desc: "Optimized model binary packaged for low-latency on-device inference." }
    ],
    diagramPlaceholders: [
      { id: "wf-diag", title: "Workflow Diagram", description: "Complete end-to-end pipeline from tokenization and Transformer encoder to dynamic quantization.", type: "workflow" },
      { id: "nlp-conf", title: "Confusion Matrix", description: "Multi-class emotion breakdown showing precision across joy, sadness, anger, fear, and surprise.", type: "matrix" },
      { id: "mod-comp", title: "Model Comparison", description: "Benchmark comparison charts detailing FP32 vs INT8 size, throughput (QPS), and latency reduction.", type: "comparison" },
      { id: "app-shots", title: "Application Screenshots", description: "On-device mobile and edge inference diagnostic dashboard screenshots.", type: "screenshots" }
    ],
    engineeringSections: [
      {
        id: "problem-statement-nlp",
        title: "Problem Statement",
        content: "Modern Transformer-based NLP models achieve state-of-the-art accuracy but suffer from extreme memory footprints (hundreds of megabytes) and high latency overheads. Deploying these large models on resource-constrained edge devices (mobile phones, IoT gateways, embedded microcontrollers) leads to high battery drain, memory allocation failures, and unacceptable user latency."
      },
      {
        id: "dataset-nlp",
        title: "Dataset",
        content: "Utilized a curated Multi-Class Emotion Classification benchmark dataset containing 20,000 labeled text sequences categorized into 6 granular emotion states (Joy, Sadness, Anger, Fear, Love, Surprise). The dataset was split into 80% Training, 10% Validation, and 10% Test sets."
      },
      {
        id: "tokenization",
        title: "Tokenization",
        content: "Implemented Hugging Face Fast WordPiece Tokenizer configured for DistilBERT:\n• Vocabulary Size: 30,522 tokens.\n• Max Sequence Length: Fixed at 128 tokens with dynamic padding and attention masks to optimize tensor memory batching.\n• Token ID Mapping & Special Tokens ([CLS], [SEP]) added for contextual sequence representation."
      },
      {
        id: "mixed-precision",
        title: "Mixed Precision Training",
        content: "Leveraged PyTorch Automatic Mixed Precision (`torch.cuda.amp`) during fine-tuning:\n• Combined FP16 (Half Precision) and FP32 (Single Precision) math during forward and backward passes.\n• Reduced GPU VRAM memory footprint by ~40%, allowing double the batch size.\n• Scaled loss gradients dynamically to prevent underflow, reducing total model training time by 2.2x without loss of numerical stability."
      },
      {
        id: "quantization",
        title: "Quantization",
        content: "Applied dynamic post-training quantization (`torch.quantization.quantize_dynamic`) on the fine-tuned PyTorch model:\n• Converted model linear layer weights from 32-bit Floating Point (FP32) to 8-bit Signed Integers (INT8).\n• Dynamically quantized activations during runtime execution.\n• Significantly reduced memory bandwidth bottlenecks during matrix multiplications on CPU architecture."
      },
      {
        id: "model-compression",
        title: "Model Compression",
        content: "Achieved dramatic model binary size reduction:\n• Uncompressed Model Size: 255 MB\n• Quantized Model Size: 132 MB\n• Storage Reduction: 48%\n• Accuracy Degradation: <0.28%, demonstrating that INT8 quantization maintains model expressiveness."
      },
      {
        id: "results-nlp",
        title: "Results",
        content: "Empirical evaluation on the test benchmark:\n• Accuracy: 95.12%\n• Weighted F1-Score: 94.93%\n• Model Size Reduction: 48% (255 MB → 132 MB)\n• Inference Latency Speedup: 2.1x speedup on single-core ARM/x86 CPU inference."
      },
      {
        id: "inference-analysis",
        title: "Inference Analysis",
        content: "Benchmarked CPU inference latency across batch sizes (1, 8, 16, 32):\n• Single-batch text inference latency dropped from 32ms (FP32) to 14.8ms (INT8).\n• Memory RAM utilization during peak inference decreased by 46%, making the model viable for background mobile apps."
      },
      {
        id: "future-improvements-nlp",
        title: "Future Improvements",
        content: "• Exploring Structured Block Pruning to remove redundant transformer attention heads prior to quantization.\n• Exporting weights to ONNX Runtime / TensorRT for cross-platform hardware acceleration.\n• Investigating 4-bit AWQ / GPTQ techniques for ultra-compact edge deployment."
      }
    ]
  },
  {
    id: "university-management-system",
    title: "University Management System",
    subtitle: "Full-Stack Educational Resource Planning Platform",
    tagline: "Full Stack Development • Relational Database System",
    isFlagship: false,
    category: ["Full Stack Development", "Database Systems"],
    tags: ["Python", "MySQL", "HTML", "CSS", "Database Design", "Full Stack"],
    metrics: [
      { label: "DB Schema", value: "Relational MySQL" },
      { label: "User Portals", value: "Admin & Student" },
      { label: "Architecture", value: "Modular Full-Stack" },
      { label: "Operations", value: "ACID Compliant" }
    ],
    summary: "A modular University Management System developed using Python and MySQL to streamline academic administration, student management, faculty allocation, course registration, and database operations.",
    githubUrl: "https://github.com/Siva794/Student-Dashboard",
    pipelineSteps: [
      { step: 1, title: "Frontend", desc: "Responsive HTML5/CSS3 user interfaces for Admin and Student views." },
      { step: 2, title: "Python Backend", desc: "Core business logic, session validation, and relational query orchestration." },
      { step: 3, title: "MySQL Database", desc: "Normalized relational storage maintaining strict foreign key constraints." },
      { step: 4, title: "Admin Dashboard", desc: "Comprehensive management panel for faculty allocation & course catalogs." },
      { step: 5, title: "Student Portal", desc: "Self-service registration, grade view, and timetable management." }
    ],
    diagramPlaceholders: [
      { id: "er-diag", title: "Database ER Diagram", description: "Entity-Relationship diagram mapping relational schema tables, primary keys, and foreign key constraints.", type: "er-diagram" },
      { id: "app-shots-3", title: "Application Screenshots", description: "High-resolution screenshots of Admin control dashboard, student portal, and course registration forms.", type: "screenshots" },
      { id: "mod-flow", title: "Module Flow", description: "Sequence diagram illustrating user request flow from HTML view through Python controller to MySQL execution.", type: "module-flow" }
    ],
    engineeringSections: [
      {
        id: "overview-ums",
        title: "Overview",
        content: "A comprehensive, modular web application designed to digitize and streamline institutional workflows across university departments. The system provides role-based administrative portals for managing student enrollments, faculty course allocations, grade processing, and automated fee status tracking."
      },
      {
        id: "system-modules",
        title: "System Modules",
        content: "The system is divided into key administrative modules:\n1. Admin Portal: Department allocation, faculty roster management, master course catalog creation, and system audit logs.\n2. Student Portal: Course enrollment, personalized class timetables, cumulative grade point average (CGPA) viewer, and fee payment receipts.\n3. Faculty Module: Grade entry, student attendance recording, and course syllabus updates."
      },
      {
        id: "database-design",
        title: "Database Design",
        content: "Engineered a Third Normal Form (3NF) relational database schema in MySQL:\n• Tables: Students, Faculty, Courses, Enrollments, Departments, Fees, and Grades.\n• Relational Integrity: Enforced ON DELETE CASCADE and foreign key constraints to ensure referential integrity.\n• ACID Compliance: Wrapped multi-table operations (such as course enrollment seat decrements and student billing) in SQL transactions to prevent partial state updates."
      },
      {
        id: "architecture-ums",
        title: "Architecture",
        content: "Designed a clean, multi-tier software architecture:\n• Client Tier: Responsive HTML5 & CSS3 interfaces styled with modern CSS Grid layout.\n• Logic Tier: Python-based backend handling routing, input validation, authentication session management, and SQL query execution.\n• Data Tier: MySQL relational database server optimizing query retrieval speeds via indexed primary/foreign keys."
      },
      {
        id: "challenges-ums",
        title: "Challenges",
        content: "• Concurrent Course Registration: Handling simultaneous student registration requests during peak enrollment periods without exceeding course seat quotas.\n• Solution: Implemented atomic SQL transactions with row-level locking (`SELECT ... FOR UPDATE`) in MySQL to serialize seat reservation checks."
      },
      {
        id: "lessons-learned-ums",
        title: "Lessons Learned",
        content: "• Database normalization is vital for eliminating redundant data entries and ensuring long-term scalability.\n• Sanitizing all user inputs through parameterized SQL queries is mandatory to prevent SQL injection vulnerabilities."
      },
      {
        id: "future-improvements-ums",
        title: "Future Improvements",
        content: "• Refactoring backend to a RESTful Flask/FastAPI architecture.\n• Upgrading user interface to a modern React single-page application (SPA).\n• Adding automated PDF generation for official transcripts and payment receipts."
      }
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: "Code2",
    skills: [
      { name: "Python", level: "Advanced", description: "Primary language for ML, Computer Vision, and Scripting" },
      { name: "Java", level: "Intermediate", description: "Object-Oriented Design & Data Structures" },
      { name: "C", level: "Intermediate", description: "Memory management & Core systems fundamentals" },
      { name: "C++", level: "Intermediate", description: "Algorithms & Low-level optimizations" },
      { name: "JavaScript", level: "Intermediate", description: "ES6+, DOM Manipulation, Async/Await" },
      { name: "SQL", level: "Advanced", description: "Complex joins, indexing, query optimization" },
      { name: "HTML5", level: "Advanced", description: "Semantic markup & Accessibility" },
      { name: "CSS3", level: "Advanced", description: "Flexbox, Grid, Custom Properties & Animations" }
    ]
  },
  {
    title: "Machine Learning & AI",
    icon: "Brain",
    skills: [
      { name: "TensorFlow", level: "Advanced", description: "Keras API, CNNs, Custom Training Loops" },
      { name: "PyTorch", level: "Intermediate", description: "Tensor operations & Neural network pipelines" },
      { name: "Scikit-learn", level: "Advanced", description: "Classification, Regression, Clustering, Pipeline" },
      { name: "OpenCV", level: "Advanced", description: "Image filtering, transformations, contours, real-time video" },
      { name: "NumPy", level: "Advanced", description: "Vectorized numerical computing & Matrix math" },
      { name: "Pandas", level: "Advanced", description: "Data wrangling, cleaning, and exploratory data analysis" },
      { name: "Matplotlib", level: "Advanced", description: "Statistical visualizations & loss/accuracy charting" }
    ]
  },
  {
    title: "Frameworks & Libraries",
    icon: "Boxes",
    skills: [
      { name: "Flask", level: "Intermediate", description: "REST API endpoints for ML model inference" },
      { name: "Next.js", level: "Intermediate", description: "App Router, SSR/SSG, Modern Web UX" },
      { name: "React", level: "Intermediate", description: "Component state management & Hooks" }
    ]
  },
  {
    title: "Tools & Infrastructure",
    icon: "Wrench",
    skills: [
      { name: "Git", level: "Advanced", description: "Branching workflows, rebase, and commit discipline" },
      { name: "GitHub", level: "Advanced", description: "CI/CD Actions, Pull Requests, Code Reviews" },
      { name: "Docker", level: "Intermediate", description: "Containerizing ML microservices & web apps" },
      { name: "Linux", level: "Intermediate", description: "Bash scripting, system administration, SSH" },
      { name: "VS Code", level: "Advanced", description: "IDE configuration, debugging & extensions" },
      { name: "Kaggle", level: "Intermediate", description: "Dataset exploration, notebooks & GPU acceleration" }
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "aws-ai-practitioner",
    name: "AWS Certified AI Practitioner",
    issuingOrganization: "Amazon Web Services",
    year: "2024",
    credentialId: "AWS-AIP-984210",
    verifyUrl: "https://aws.amazon.com/verification",
    badgeColor: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30",
    skillsCovered: ["Generative AI Foundations", "Amazon SageMaker", "Prompt Engineering", "Machine Learning Governance", "Model Evaluation"]
  },
  {
    id: "azure-fundamentals",
    name: "Microsoft Azure Fundamentals",
    issuingOrganization: "Microsoft",
    year: "2024",
    credentialId: "MSFT-AZ900-471209",
    verifyUrl: "https://learn.microsoft.com/en-us/users/credentials/verify",
    badgeColor: "from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30",
    skillsCovered: ["Cloud Concepts", "Azure Architectural Components", "Azure Management & Governance", "Cloud Security"]
  },
  {
    id: "sap-generative-ai",
    name: "SAP Generative AI Developer",
    issuingOrganization: "SAP",
    year: "2024",
    credentialId: "SAP-GENAI-310948",
    verifyUrl: "https://learning.sap.com/certificates",
    badgeColor: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
    skillsCovered: ["SAP Business AI Framework", "LLM Integration", "RAG Architectures", "Enterprise AI Security"]
  },
  {
    id: "oracle-foundations",
    name: "Oracle Certified Foundations Associate",
    issuingOrganization: "Oracle",
    year: "2023",
    credentialId: "ORCL-FA-882194",
    verifyUrl: "https://mylearn.oracle.com/certifications",
    badgeColor: "from-rose-500/20 to-red-500/20 text-rose-400 border-rose-500/30",
    skillsCovered: ["Database Design Fundamentals", "SQL Relational Model", "Oracle Cloud Infrastructure", "Autonomous Database"]
  },
  {
    id: "nptel-ml",
    name: "Introduction to Machine Learning",
    issuingOrganization: "NPTEL / SWAYAM / IIT Kharagpur",
    year: "2023",
    credentialId: "",
    verifyUrl: "",
    badgeColor: "from-indigo-500/20 to-purple-500/20 text-indigo-400 border-indigo-500/30",
    skillsCovered: ["Machine Learning Fundamentals", "Supervised Learning", "Unsupervised Learning"]
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    institution: "SRM Institute of Science and Technology",
    degree: "B.Tech in Computer Science and Engineering (Artificial Intelligence & Machine Learning)",
    score: "8.5 CGPA",
    scoreLabel: "Current Cumulative Grade Point Average",
    period: "2023 – 2027 (Expected)",
    location: "Kattankulathur, Chennai, Tamil Nadu",
    highlights: [
      "Specialized coursework in Deep Learning, Computer Vision, Neural Networks, Data Structures & Algorithms, and Database Management Systems.",
      "Active participant in technical AI workgroups, open-source hacking, and competitive machine learning challenges.",
      "Consistently maintained top academic standing while working on applied AI research projects."
    ]
  },
  {
    institution: "Happy Valley School",
    degree: "Senior Secondary (Class XII - CBSE)",
    score: "84.6%",
    scoreLabel: "Percentage Achieved",
    period: "2021 – 2023",
    location: "Andhra Pradesh",
    highlights: [
      "Focused on Physics, Chemistry, Mathematics, and Computer Science fundamentals.",
      "Developed early passion for software development through Java programming assignments."
    ]
  },
  {
    institution: "Happy Valley School",
    degree: "Secondary School (Class X - CBSE)",
    score: "84.8%",
    scoreLabel: "Percentage Achieved",
    period: "2020 – 2021",
    location: "Andhra Pradesh",
    highlights: [
      "Graduated with distinction in Mathematics and Science subjects."
    ]
  }
];

export const ENGINEERING_PHILOSOPHY: PhilosophyStage[] = [
  {
    step: 1,
    stage: "Research",
    title: "Problem Deconstruction & Literature Analysis",
    description: "Deep-dive into the problem statement, examine existing technical literature, analyze domain constraints, and establish clear quantitative metrics for success.",
    keyOutputs: ["Baseline Benchmark", "Dataset Requirements", "Evaluation Metrics"],
    icon: "Search"
  },
  {
    step: 2,
    stage: "Design",
    title: "System & Pipeline Architecture",
    description: "Draft clean, modular system architecture diagrams. Design data ingestion flows, model input pipelines, and relational or document database schemas.",
    keyOutputs: ["Data Flow Diagrams", "Schema Contracts", "Model Input Specifications"],
    icon: "Layout"
  },
  {
    step: 3,
    stage: "Develop",
    title: "Modular Code Construction",
    description: "Write clean, type-safe code using object-oriented and functional patterns. Enforce separation of concerns across preprocessing, inference, and API layers.",
    keyOutputs: ["Clean Codebase", "Reusable Modules", "Unit Test Suites"],
    icon: "Terminal"
  },
  {
    step: 4,
    stage: "Train",
    title: "Model Experimentation & Tuning",
    description: "Prepare preprocessed feature sets, run hyperparameter optimization sweeps, and track loss curves using GPUs to avoid overfitting.",
    keyOutputs: ["Trained Weights", "Validation Metrics", "Loss/Accuracy Charts"],
    icon: "Brain"
  },
  {
    step: 5,
    stage: "Optimize",
    title: "Latency & Resource Efficiency",
    description: "Optimize inference latency through model quantization, frame downsampling, efficient memory management, and code profiling.",
    keyOutputs: ["Lower Inference Latency", "Reduced RAM/GPU Footprint", "High Throughput"],
    icon: "Zap"
  },
  {
    step: 6,
    stage: "Deploy",
    title: "Production Release & Monitoring",
    description: "Package applications into lightweight containers or deploy web interfaces with robust error handling and user feedback loops.",
    keyOutputs: ["Container Images", "Live Interactive Web UI", "System Monitoring"],
    icon: "Rocket"
  }
];

export const GITHUB_STATS = {
  username: "Siva794",
  totalCommits: 580,
  totalStars: 42,
  repositories: 16,
  contributionsThisYear: 320,
  pinnedRepos: [
    { name: "Deepfake-Detection-CNN", desc: "Flagship deep learning pipeline for real-time video spatial artifact analysis & classification.", language: "Python", stars: 24, forks: 8 },
    { name: "Realtime-Vehicle-Speed-YOLOv8", desc: "YOLOv8 & DeepSORT tracking system for automated road vehicle velocity detection.", language: "Python", stars: 12, forks: 4 },
    { name: "University-Management-System", desc: "Full-stack educational resource planning web application with MySQL backend.", language: "HTML/Python", stars: 6, forks: 2 }
  ]
};
