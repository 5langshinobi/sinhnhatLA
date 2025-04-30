import { useEffect, useRef } from "react";

interface FireworkParticle {
  x: number;
  y: number;
  color: string;
  velocity: { x: number; y: number };
  alpha: number;
  size: number;
}

export default function Fireworks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<FireworkParticle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    if (!ctx || !containerRef.current) return;
    
    containerRef.current.appendChild(canvas);
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    // Colors for fireworks
    const colors = ["#FF69B4", "#FFC0CB", "#87CEEB", "#1E90FF", "#FFD700"];
    
    // Create initial fireworks
    const createFireworks = (num: number) => {
      for (let i = 0; i < num; i++) {
        setTimeout(() => {
          launchFirework();
        }, i * 150);
      }
    };
    
    const launchFirework = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * (canvas.height * 0.7);
      createExplosion(x, y, colors[Math.floor(Math.random() * colors.length)]);
    };
    
    const createExplosion = (x: number, y: number, color: string) => {
      const particleCount = 80 + Math.round(Math.random() * 50);
      
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1;
        
        particlesRef.current.push({
          x,
          y,
          color,
          velocity: {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed
          },
          alpha: 1,
          size: Math.random() * 3 + 1
        });
      }
    };
    
    // Animation loop
    const animate = () => {
      if (!ctx) return;
      
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        
        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          i--;
          continue;
        }
        
        // Update position
        p.x += p.velocity.x;
        p.y += p.velocity.y;
        
        // Add some gravity
        p.velocity.y += 0.05;
        
        // Reduce alpha
        p.alpha -= 0.01;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.closePath();
        
        ctx.fillStyle = `${p.color}${Math.floor(p.alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      }
      
      // If all particles are gone and we're still animating, add more
      if (particlesRef.current.length === 0) {
        createFireworks(5);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    createFireworks(10);
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
      if (containerRef.current && canvas.parentNode === containerRef.current) {
        containerRef.current.removeChild(canvas);
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-40 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
}
