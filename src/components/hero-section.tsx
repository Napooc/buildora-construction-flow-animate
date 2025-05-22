import { ArrowRight, Building, CheckCircle, ChevronDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MoroccanPattern } from "@/components/ui/pattern";
import { useState, useRef, useEffect } from "react";
import { DemoRequestDialog } from "./demo-request-dialog";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
export function HeroSection() {
  const [showDemoDialog, setShowDemoDialog] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const scrollToContact = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  const scrollToFeatures = () => {
    const featuresElement = document.getElementById('features');
    if (featuresElement) {
      featuresElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section ref={heroRef} className="relative min-h-screen pt-32 pb-20 overflow-hidden w-full flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 w-full">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-gray-50 to-transparent"></div>
        <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[50%] rounded-full bg-morocco-blue/10 blur-3xl"></div>
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-morocco-terracotta/10 blur-3xl"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] rounded-full bg-morocco-gold/10 blur-3xl"></div>
        <MoroccanPattern className="opacity-10 animate-rotate-slow absolute inset-0" />
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div style={{
          opacity,
          scale,
          y
        }} className="text-center md:text-left flex flex-col md:flex-row items-center gap-10 lg:gap-16">
            {/* Hero Text Content */}
            <div className="flex-1">
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6
            }}>
                <span className="bg-morocco-gold/10 text-morocco-terracotta px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-6">
                  La nouvelle ère de la gestion de projets
                </span>
              </motion.div>
              
              <motion.h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              delay: 0.2
            }}>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-morocco-terracotta to-morocco-blue">
                  Gérez vos projets de construction
                </span>{" "}
                <span className="relative inline-block">
                  avec précision
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 338 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5.5C69.6667 2.16667 261.8 -2.3 337 10.5" stroke="#E56B4E" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span> et élégance
              </motion.h1>
              
              <motion.p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              delay: 0.4
            }}>
                Buildora est une solution complète pour la gestion de projets de construction, conçue pour améliorer l'efficacité et la communication sur vos chantiers.
              </motion.p>
              
              <motion.div className="flex flex-wrap gap-4 mb-12" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              delay: 0.6
            }}>
                <Button size="lg" className={cn("bg-morocco-blue text-white hover:bg-morocco-deep-blue group relative overflow-hidden transition-all duration-500", isHovered ? "pl-10 pr-12" : "px-6")} onClick={() => setShowDemoDialog(true)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                  <span className={cn("absolute inset-y-0 left-0 flex items-center justify-center w-0 bg-morocco-navy transition-all duration-500", isHovered ? "w-8" : "w-0")}>
                    {isHovered && <Play className="h-4 w-4" />}
                  </span>
                  Demander une démo
                  <ArrowRight className={cn("ml-2 h-4 w-4 transition-all duration-500", isHovered ? "translate-x-4 opacity-100" : "translate-x-0 opacity-0")} />
                </Button>
                
                <Button size="lg" variant="outline" onClick={scrollToFeatures} className="border-morocco-blue hover:bg-morocco-blue/5 text-zinc-950">
                  Explorer les fonctionnalités
                </Button>
              </motion.div>
              
              <motion.div className="flex flex-wrap gap-6 justify-center md:justify-start" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              delay: 0.8
            }}>
                {["Suivi en temps réel", "Gestion des tâches", "Rapports automatisés"].map((feature, index) => <div key={feature} className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                    <CheckCircle className="h-5 w-5 text-morocco-terracotta mr-2" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>)}
              </motion.div>
            </div>
            
            {/* Hero Image */}
            <motion.div className="flex-1 relative" initial={{
            opacity: 0,
            x: 20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8,
            delay: 0.5
          }}>
              <div className="relative z-10">
                <div className="relative aspect-[4/3] w-full max-w-lg mx-auto">
                  {/* Main Dashboard Image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-morocco-blue to-morocco-deep-blue rounded-xl shadow-2xl overflow-hidden border-4 border-white transform rotate-1 transition-all hover:rotate-0 duration-500">
                    <img src="/lovable-uploads/9d79e4ad-94cc-4248-a699-9a4c439b27a7.png" alt="Dashboard Buildora" className="w-full h-full object-cover opacity-95 mix-blend-overlay hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center backdrop-blur-sm bg-black/10 p-6 rounded-lg transform transition-all duration-300 hover:scale-105 w-3/4">
                        <Building className="w-12 h-12 mb-3 mx-auto" />
                        <p className="text-xl md:text-2xl font-bold">Aperçu du Dashboard</p>
                        <p className="text-sm opacity-90">Interface complète pour gérer vos projets</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating UI Elements */}
                  <motion.div className="absolute -bottom-12 -left-8 w-40 bg-white rounded-lg shadow-lg p-2 transform -rotate-3" animate={{
                  y: [0, -8, 0]
                }} transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut"
                }}>
                    <div className="bg-morocco-terracotta/10 p-3 rounded-md">
                      <div className="h-2 w-16 bg-morocco-terracotta/30 rounded mb-2"></div>
                      <div className="h-2 w-10 bg-morocco-terracotta/30 rounded"></div>
                    </div>
                  </motion.div>
                  
                  <motion.div className="absolute -top-10 -right-6 w-32 bg-white rounded-lg shadow-lg p-2 transform rotate-6" animate={{
                  y: [0, -10, 0]
                }} transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                  delay: 1
                }}>
                    <div className="bg-morocco-blue/10 p-3 rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <div className="h-2 w-8 bg-morocco-blue/30 rounded"></div>
                        <div className="h-3 w-3 bg-morocco-blue/50 rounded-full"></div>
                      </div>
                      <div className="h-2 w-full bg-morocco-blue/30 rounded mb-2"></div>
                      <div className="h-2 w-3/4 bg-morocco-blue/30 rounded"></div>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Abstract background elements */}
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-morocco-gold/20 rounded-full filter blur-3xl animate-float"></div>
              <div className="absolute -left-16 -top-8 w-40 h-40 bg-morocco-terracotta/20 rounded-full filter blur-3xl animate-float" style={{
              animationDelay: "1s"
            }}></div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll down indicator */}
        <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer" animate={{
        y: [0, 10, 0]
      }} transition={{
        repeat: Infinity,
        duration: 2
      }} onClick={scrollToFeatures}>
          <p className="text-sm text-gray-500 mb-2">Découvrir plus</p>
          <ChevronDown className="h-6 w-6 text-morocco-blue" />
        </motion.div>
      </div>
      
      <DemoRequestDialog open={showDemoDialog} onOpenChange={setShowDemoDialog} scrollToContact={scrollToContact} />
    </section>;
}