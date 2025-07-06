"use client";

import type React from "react";
import { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Torus, Float } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Terminal,
  Globe,
  Zap,
  Users,
  GitBranch,
  Clock,
  Star,
  TrendingUp,
  Activity,
  Gauge,
} from "lucide-react";
import type * as THREE from "three";
import ClickSpark from "@/components/click-spark";

// 3D Background Components
function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 800;

  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

    colors[i * 3] = 0.6 + Math.random() * 0.4;
    colors[i * 3 + 1] = 0.4 + Math.random() * 0.4;
    colors[i * 3 + 2] = 0.9 + Math.random() * 0.1;
  }

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x += 0.0005;
      particlesRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.7} />
    </points>
  );
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#6366f1" />
      <ParticleField />
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <Torus
          position={[0, 0, -15]}
          args={[8, 0.5, 16, 100]}
          rotation={[Math.PI / 4, 0, 0]}
        >
          <meshStandardMaterial color="#6366f1" transparent opacity={0.1} />
        </Torus>
      </Float>
    </>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ type: "loading", message: "Sending your message..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({
          type: "success",
          message:
            "Message sent successfully! Check your email for confirmation.",
        });
        setFormData({ name: "", email: "", projectType: "", message: "" });
      } else {
        setFormStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }

    setTimeout(() => {
      setFormStatus({ type: "idle", message: "" });
    }, 5000);
  };

  const projects = [
    {
      title: "Distributed Computing Platform",
      description:
        "High-performance distributed system handling 10M+ requests/day with auto-scaling microservices architecture.",
      tech: ["Go", "Kubernetes", "Redis", "PostgreSQL", "gRPC"],
      metrics: "99.99% uptime, <50ms latency",
      category: "Infrastructure",
    },
    {
      title: "Real-time Analytics Engine",
      description:
        "Stream processing system for real-time data analytics with ML-powered insights and predictive modeling.",
      tech: ["Python", "Apache Kafka", "TensorFlow", "ClickHouse", "Docker"],
      metrics: "1TB+ data/day processed",
      category: "Data Engineering",
    },
    {
      title: "AI-Powered Code Assistant",
      description:
        "Intelligent code completion and refactoring tool using transformer models and static analysis.",
      tech: ["TypeScript", "PyTorch", "WebAssembly", "LSP", "Tree-sitter"],
      metrics: "40% dev productivity boost",
      category: "AI/ML",
    },
  ];

  const ongoingProjects = [
    {
      title: "QuantumTrade AI",
      description:
        "Revolutionary trading algorithm using quantum computing principles and machine learning for cryptocurrency market prediction.",
      tech: ["Python", "TensorFlow", "Qiskit", "FastAPI", "Redis"],
      status: "In Development",
      progress: 75,
      teamSize: 3,
      lookingFor: ["ML Engineer", "Quantum Computing Specialist"],
      timeline: "Q2 2024",
      priority: "High",
      commits: 247,
      lastUpdate: "2 hours ago",
    },
    {
      title: "EcoChain Network",
      description:
        "Sustainable blockchain platform for carbon credit trading with zero-energy consensus mechanism.",
      tech: ["Rust", "Substrate", "React", "GraphQL", "IPFS"],
      status: "Alpha Testing",
      progress: 60,
      teamSize: 5,
      lookingFor: ["Blockchain Developer", "Frontend Engineer"],
      timeline: "Q3 2024",
      priority: "Medium",
      commits: 189,
      lastUpdate: "5 hours ago",
    },
    {
      title: "NeuralCloud OS",
      description:
        "Next-generation operating system with built-in AI assistance and distributed computing capabilities.",
      tech: ["C++", "Rust", "WebAssembly", "TensorFlow", "gRPC"],
      status: "Research Phase",
      progress: 35,
      teamSize: 2,
      lookingFor: ["Systems Engineer", "AI Researcher", "UI/UX Designer"],
      timeline: "Q4 2024",
      priority: "High",
      commits: 156,
      lastUpdate: "1 day ago",
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(sectionId);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-400 bg-red-400/10 border-red-400/30";
      case "Medium":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
      case "Low":
        return "text-green-400 bg-green-400/10 border-green-400/30";
      default:
        return "text-blue-400 bg-blue-400/10 border-blue-400/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Development":
        return "text-blue-400 bg-blue-400/10 border-blue-400/30";
      case "Alpha Testing":
        return "text-purple-400 bg-purple-400/10 border-purple-400/30";
      case "Research Phase":
        return "text-orange-400 bg-orange-400/10 border-orange-400/30";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/30";
    }
  };

  return (
    <ClickSpark
      sparkColor="#60a5fa"
      sparkSize={12}
      sparkRadius={25}
      sparkCount={12}
      duration={600}
      easing="ease-out"
      extraScale={1.2}
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative">
        {/* 3D Background */}
        <div className="fixed inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
            <Suspense fallback={null}>
              <Scene3D />
            </Suspense>
          </Canvas>
        </div>

        {/* Navigation */}
        <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-full px-8 py-4">
            <div className="flex items-center space-x-8">
              <div className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                PRATHAM
              </div>
              <div className="h-4 w-px bg-white/20"></div>
              <div className="flex space-x-6">
                {["About", "Skills", "Projects", "Ongoing", "Contact"].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className={`text-sm font-medium transition-all duration-300 hover:text-blue-400 ${
                        activeSection === item.toLowerCase()
                          ? "text-blue-400"
                          : "text-white/70"
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section
            id="home"
            className="min-h-screen flex items-center justify-center px-8"
          >
            <div className="max-w-6xl mx-auto text-center">
              <div
                className="transform transition-all duration-1000"
                style={{ transform: `translateY(${scrollY * 0.1}px)` }}
              >
                <div className="mb-12">
                  <h1 className="text-7xl md:text-9xl font-black mb-6 leading-none">
                    <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                      PRATHAM
                    </span>
                  </h1>
                  <div className="text-xl md:text-2xl text-white/60 font-light tracking-wider mb-8">
                    COMPUTER ENGINEER • SYSTEM ARCHITECT • INNOVATOR
                  </div>
                  <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-12"></div>
                </div>

                <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-16 leading-relaxed">
                  Building next-generation systems that scale. Specializing in
                  distributed architectures, high-performance computing, and
                  AI-driven solutions that power the future.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Button
                    onClick={() => scrollToSection("projects")}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                  >
                    View Engineering Projects
                  </Button>
                  <Button
                    onClick={() => scrollToSection("contact")}
                    variant="outline"
                    className="group border-2 border-blue-400/50 text-blue-400 hover:bg-blue-400/10 hover:border-blue-400 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Connect & Collaborate
                      <div className="ml-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-32 px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Engineering
                    </span>
                    <br />
                    Excellence
                  </h2>
                  <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                    <p>
                      Computer Science graduate with expertise in building
                      scalable, high-performance systems. I architect solutions
                      that handle millions of users while maintaining
                      sub-millisecond response times.
                    </p>
                    <p>
                      My approach combines theoretical computer science
                      foundations with practical engineering experience,
                      focusing on system design, performance optimization, and
                      cutting-edge technology integration.
                    </p>
                    <p>
                      Currently exploring the intersection of distributed
                      systems and machine learning, building the infrastructure
                      that powers next-generation AI applications.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-8">
                    {[
                      "System Design",
                      "Performance Engineering",
                      "Distributed Systems",
                      "AI/ML",
                    ].map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-white/10 text-white border-white/20 hover:bg-white/20 transition-colors px-4 py-2"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-400 mb-2">
                          CS
                        </div>
                        <div className="text-white/60 text-sm">Student</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400 mb-2">
                          20+
                        </div>
                        <div className="text-white/60 text-sm">
                          Projects Built
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400 mb-2">
                          24/7
                        </div>
                        <div className="text-white/60 text-sm">
                          Learning Mode
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-orange-400 mb-2">
                          ∞
                        </div>
                        <div className="text-white/60 text-sm">
                          Curiosity Level
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="py-32 px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-5xl md:text-6xl font-black mb-6">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Tech Arsenal
                  </span>
                </h2>
                <p className="text-xl text-white/60 max-w-2xl mx-auto">
                  Technologies I wield to build the future of web and finance
                </p>
              </div>

              {/* Code Terminal */}
              <div className="bg-black/40 rounded-2xl border border-green-500/30 p-8 mb-16 backdrop-blur-sm">
                <div className="flex items-center mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="ml-4 text-white/60 text-sm font-mono">
                    pratham@engineer:~$
                  </div>
                </div>

                <div className="font-mono text-sm space-y-2">
                  <div className="text-green-400">
                    <span className="text-white/60">$</span> cat tech_stack.json
                  </div>
                  <div className="text-white/80 ml-4">{`{`}</div>
                  <div className="text-blue-400 ml-8">
                    "frontend":{" "}
                    <span className="text-yellow-400">
                      ["JavaScript", "HTML5", "CSS3"]
                    </span>
                    ,
                  </div>
                  <div className="text-blue-400 ml-8">
                    "backend":{" "}
                    <span className="text-yellow-400">
                      ["Python", "Node.js"]
                    </span>
                    ,
                  </div>
                  <div className="text-blue-400 ml-8">
                    "interests":{" "}
                    <span className="text-yellow-400">
                      ["FinTech", "Trading Algorithms", "Market Analysis"]
                    </span>
                    ,
                  </div>
                  <div className="text-blue-400 ml-8">
                    "passion":{" "}
                    <span className="text-green-400">
                      "Building the future of finance"
                    </span>
                  </div>
                  <div className="text-white/80 ml-4">{`}`}</div>
                  <div className="text-green-400 animate-pulse">
                    <span className="text-white/60">&gt;</span>{" "}
                    <span className="animate-pulse">█</span>
                  </div>
                </div>
              </div>

              {/* Tech Metrics Dashboard */}
              <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
                <div className="border-b border-white/10 p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Activity className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          Technical Proficiency
                        </h3>
                        <p className="text-white/60">
                          Real-time skill assessment & performance metrics
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-sm font-medium">
                        Live
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        name: "JavaScript",
                        level: 95,
                        icon: Code2,
                        color: "yellow",
                      },
                      {
                        name: "Python",
                        level: 90,
                        icon: Terminal,
                        color: "blue",
                      },
                      {
                        name: "Frontend",
                        level: 88,
                        icon: Globe,
                        color: "purple",
                      },
                      { name: "FinTech", level: 85, icon: Zap, color: "green" },
                    ].map((skill) => (
                      <div key={skill.name} className="group relative">
                        <div className="relative bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                              <skill.icon className="w-5 h-5 text-white/70" />
                            </div>
                            <TrendingUp className="w-4 h-4 text-green-400" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-baseline space-x-2">
                              <span className="text-3xl font-bold text-white">
                                {skill.level}
                              </span>
                              <span className="text-lg text-white/80">%</span>
                            </div>
                            <p className="text-white/80 font-medium">
                              {skill.name}
                            </p>
                            <p className="text-white/50 text-sm">
                              Expert Level
                            </p>
                          </div>
                          <div className="mt-4">
                            <div className="w-full bg-white/10 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${skill.level}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <Gauge className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            Performance Score
                          </p>
                          <p className="text-blue-400 text-sm">92.5% Overall</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Growth Rate</p>
                          <p className="text-green-400 text-sm">
                            +15% This Month
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <Activity className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            Active Projects
                          </p>
                          <p className="text-purple-400 text-sm">
                            8 In Progress
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-32 px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-5xl md:text-6xl font-black mb-6">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Featured Projects
                  </span>
                </h2>
                <p className="text-xl text-white/60 max-w-2xl mx-auto">
                  Innovative solutions built with cutting-edge technologies and
                  modern engineering practices.
                </p>
              </div>

              <div className="space-y-16">
                {projects.map((project, index) => (
                  <div
                    key={project.title}
                    className="group relative bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 hover:bg-black/30 transition-all duration-700 overflow-hidden"
                  >
                    <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                      <div className="space-y-8">
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2 text-sm font-medium">
                              {project.category}
                            </Badge>
                            <div className="text-green-400 text-sm font-mono bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20">
                              {project.metrics}
                            </div>
                          </div>

                          <h3 className="text-3xl md:text-4xl font-black text-white group-hover:text-blue-400 transition-colors duration-500">
                            {project.title}
                          </h3>
                        </div>

                        <p className="text-lg text-white/70 leading-relaxed">
                          {project.description}
                        </p>

                        <div className="space-y-3">
                          <h4 className="text-white font-semibold text-lg">
                            Tech Stack:
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {project.tech.map((tech) => (
                              <div
                                key={tech}
                                className="px-4 py-2 bg-white/5 border border-white/20 rounded-full text-white/80 text-sm font-medium hover:bg-white/10 hover:border-white/40 transition-all duration-300 cursor-pointer"
                              >
                                {tech}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Live
                          </Button>

                          <Button
                            variant="outline"
                            className="border-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 bg-transparent"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            GitHub Repo
                          </Button>
                        </div>
                      </div>

                      <div className="relative flex items-center justify-center">
                        <div className="relative w-64 h-64 group-hover:scale-110 transition-transform duration-700">
                          <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-500/30 backdrop-blur-sm transform rotate-12 group-hover:rotate-45 transition-transform duration-1000"></div>
                          <div className="flex items-center justify-center absolute inset-0">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-600/40 to-purple-600/40 rounded-xl border border-blue-500/50 flex items-center justify-center backdrop-blur-sm group-hover:scale-125 transition-transform duration-500">
                              <Code2 className="w-10 h-10 text-blue-300 group-hover:text-white transition-colors duration-500" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Ongoing Projects Section */}
          <section id="ongoing" className="py-32 px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-5xl md:text-6xl font-black mb-6">
                  <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    Active Development
                  </span>
                </h2>
                <p className="text-xl text-white/60 max-w-2xl mx-auto">
                  Current projects in development - building the future one
                  commit at a time.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {ongoingProjects.map((project) => (
                  <div
                    key={project.title}
                    className="group relative bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500"
                  >
                    <div className="relative z-10 p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Badge
                              className={`${getStatusColor(project.status)} px-3 py-1 text-xs font-medium border`}
                            >
                              {project.status}
                            </Badge>
                            <Badge
                              className={`${getPriorityColor(project.priority)} px-3 py-1 text-xs font-medium border`}
                            >
                              {project.priority}
                            </Badge>
                          </div>
                          <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                            {project.title}
                          </h3>
                        </div>
                        <div className="text-right text-sm text-white/60">
                          <div className="flex items-center gap-1 mb-1">
                            <Clock className="w-3 h-3" />
                            <span>{project.timeline}</span>
                          </div>
                          <div className="text-xs text-white/40">
                            {project.lastUpdate}
                          </div>
                        </div>
                      </div>

                      <p className="text-white/70 mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-white/80">
                            Progress
                          </span>
                          <span className="text-sm font-bold text-blue-400">
                            {project.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-white/80 mb-3">
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-white/5 border border-white/20 rounded-full text-xs text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-black/20 rounded-xl p-4 border border-white/10">
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="w-4 h-4 text-blue-400" />
                            <span className="text-sm font-medium text-white/80">
                              Team Size
                            </span>
                          </div>
                          <div className="text-2xl font-bold text-blue-400">
                            {project.teamSize}
                          </div>
                        </div>
                        <div className="bg-black/20 rounded-xl p-4 border border-white/10">
                          <div className="flex items-center gap-2 mb-2">
                            <GitBranch className="w-4 h-4 text-green-400" />
                            <span className="text-sm font-medium text-white/80">
                              Commits
                            </span>
                          </div>
                          <div className="text-2xl font-bold text-green-400">
                            {project.commits}
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-white/80 mb-3 flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          Looking For
                        </h4>
                        <div className="space-y-2">
                          {project.lookingFor.map((role) => (
                            <div
                              key={role}
                              className="flex items-center gap-2 text-sm text-white/70 bg-yellow-400/10 border border-yellow-400/20 rounded-lg px-3 py-2"
                            >
                              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                              {role}
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
                        Join Project
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 text-center">
                <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-white/10 rounded-3xl p-12">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Want to Collaborate?
                  </h3>
                  <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                    I'm always looking for talented developers, designers, and
                    innovators to join these exciting projects. Let's build
                    something amazing together!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                      View All Projects
                    </Button>
                    <Button
                      onClick={() => scrollToSection("contact")}
                      variant="outline"
                      className="border-2 border-blue-400/50 text-blue-400 hover:bg-blue-400/10 hover:border-blue-400 px-8 py-4 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm"
                    >
                      Get In Touch
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-32 px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-5xl md:text-6xl font-black mb-6">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Let's Connect
                  </span>
                </h2>
                <p className="text-xl text-white/60">
                  Ready to build something extraordinary? Let's discuss your
                  next project.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-16">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">
                      Get In Touch
                    </h3>
                    <p className="text-white/70 leading-relaxed mb-8">
                      I'm always excited to discuss new opportunities,
                      innovative projects, and potential collaborations. Whether
                      you have a specific project in mind or just want to
                      connect, I'd love to hear from you.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <a
                      href="mailto:pratham@example.com"
                      className="group flex items-center space-x-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                        <Mail className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-white font-medium">Email</div>
                        <div className="text-white/60 text-sm">
                          pratham@example.com
                        </div>
                      </div>
                    </a>

                    <a
                      href="https://linkedin.com/in/pratham"
                      className="group flex items-center space-x-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                        <Linkedin className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-white font-medium">LinkedIn</div>
                        <div className="text-white/60 text-sm">
                          Connect professionally
                        </div>
                      </div>
                    </a>

                    <a
                      href="https://github.com/pratham"
                      className="group flex items-center space-x-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                        <Github className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-white font-medium">GitHub</div>
                        <div className="text-white/60 text-sm">
                          View my code
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-white font-medium mb-2"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-white font-medium mb-2"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="projectType"
                        className="block text-white font-medium mb-2"
                      >
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="" className="bg-slate-800">
                          Select project type
                        </option>
                        <option
                          value="web-development"
                          className="bg-slate-800"
                        >
                          Web Development
                        </option>
                        <option
                          value="system-architecture"
                          className="bg-slate-800"
                        >
                          System Architecture
                        </option>
                        <option value="ai-ml" className="bg-slate-800">
                          AI/ML Integration
                        </option>
                        <option value="consulting" className="bg-slate-800">
                          Technical Consulting
                        </option>
                        <option value="collaboration" className="bg-slate-800">
                          Collaboration
                        </option>
                        <option value="other" className="bg-slate-800">
                          Other
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-white font-medium mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    {formStatus.type !== "idle" && (
                      <div
                        className={`p-4 rounded-xl border ${
                          formStatus.type === "success"
                            ? "bg-green-500/10 border-green-500/30 text-green-400"
                            : formStatus.type === "error"
                              ? "bg-red-500/10 border-red-500/30 text-red-400"
                              : "bg-blue-500/10 border-blue-500/30 text-blue-400"
                        }`}
                      >
                        {formStatus.message}
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={formStatus.type === "loading"}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {formStatus.type === "loading" ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                          Sending...
                        </div>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="relative z-10 border-t border-white/10 py-12 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  PRATHAM
                </div>
                <p className="text-white/60">
                  Building the future, one line of code at a time.
                </p>
              </div>
              <div className="flex space-x-6">
                <a
                  href="https://github.com/Pratham-The-Warrior"
                  className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 hover:border-white/40 transition-all duration-300 group"
                >
                  <Github className="w-5 h-5 text-white/70 group-hover:text-white" />
                </a>
                <a
                  href="https://www.linkedin.com/in/pratham-sarda-8a6a88318?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 hover:border-white/40 transition-all duration-300 group"
                >
                  <Linkedin className="w-5 h-5 text-white/70 group-hover:text-white" />
                </a>
                <a
                  href="prathamsarda1234@gmail.com"
                  className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 hover:border-white/40 transition-all duration-300 group"
                >
                  <Mail className="w-5 h-5 text-white/70 group-hover:text-white" />
                </a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/50">
              <p>&copy; 2024 Pratham. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </ClickSpark>
  );
}
