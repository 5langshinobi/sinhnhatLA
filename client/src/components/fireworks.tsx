import { useEffect, useRef } from 'react';

interface FireworkParticle {
  x: number;
  y: number;
  color: string;
  velocity: { x: number; y: number };
  alpha: number;
  size: number;
}

interface Firework {
  x: number;
  y: number;
  color: string;
  particles: FireworkParticle[];
}

export default function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fireworksRef = useRef<Firework[]>([]);
  const colorsRef = useRef(['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#448AFF', '#40C4FF', '#18FFFF']);

  const createFirework = (x: number, y: number) => {
    const color = colorsRef.current[Math.floor(Math.random() * colorsRef.current.length)];
    const particles: FireworkParticle[] = [];
    const particleCount = 80 + Math.floor(Math.random() * 50);

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;

      particles.push({
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

    fireworksRef.current.push({ x, y, color, particles });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Thiết lập kích thước canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Tạo ngẫu nhiên pháo hoa
    const createRandomFirework = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * (canvas.height * 0.6); // Chỉ tạo ở 60% phía trên của màn hình
      createFirework(x, y);
    };

    // Tạo pháo hoa ngẫu nhiên mỗi 1 giây
    const fireworkInterval = setInterval(createRandomFirework, 1000);

    // Tạo pháo hoa khi click
    const handleClick = (e: MouseEvent) => {
      createFirework(e.clientX, e.clientY);
    };

    canvas.addEventListener('click', handleClick);

    // Vẽ khung hình
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Cập nhật và vẽ tất cả pháo hoa
      fireworksRef.current.forEach((firework, fireworkIndex) => {
        let shouldRemoveFirework = true;

        firework.particles.forEach((particle, particleIndex) => {
          // Kiểm tra nếu hạt pháo hoa đã mờ hoàn toàn
          if (particle.alpha <= 0) {
            return;
          }

          shouldRemoveFirework = false;

          // Cập nhật vị trí
          particle.velocity.y += 0.03; // Trọng lực
          particle.x += particle.velocity.x;
          particle.y += particle.velocity.y;
          particle.alpha -= 0.01;

          // Vẽ hạt pháo hoa
          ctx.save();
          ctx.globalAlpha = particle.alpha;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        // Xóa pháo hoa nếu tất cả hạt đã mờ
        if (shouldRemoveFirework) {
          fireworksRef.current.splice(fireworkIndex, 1);
        }
      });

      requestAnimationFrame(draw);
    };

    const animation = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('click', handleClick);
      clearInterval(fireworkInterval);
      cancelAnimationFrame(animation);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ pointerEvents: 'none' }}
    />
  );
}