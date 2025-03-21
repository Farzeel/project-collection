import React, { useEffect, useRef } from "react";



const Fireworks = ({show}) => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
  
    useEffect(() => {
      if (!show) return;
   console.log("fireworks")
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
  
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  
      const createParticles = (x, y) => {
        particlesRef.current = []; // Reset previous particles
        for (let i = 0; i < 100; i++) {
          particlesRef.current.push({
            x,
            y,
            speedX: (Math.random() - 0.5) * 8,
            speedY: (Math.random() - 0.5) * 8,
            size: Math.random() * 6 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            lifetime: 100,
          });
        }
      
      };
  
      const updateParticles = () => {
        particlesRef.current = particlesRef.current
          .map((p) => ({
            ...p,
            x: p.x + p.speedX,
            y: p.y + p.speedY,
            size: p.size * 0.96,
            lifetime: p.lifetime - 1,
          }))
          .filter((p) => p.lifetime > 0);
     
      };
  
      const drawParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesRef.current.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        });
       
      };
  
      const animate = () => {
        updateParticles();
        drawParticles();
        if (particlesRef.current.length > 0) {
          requestAnimationFrame(animate);
        }
      };
  

      createParticles(canvas.width / 2 + Math.random() * 200 - 100, canvas.height / 2);
      animate();
  
    }, [show]);
  
    return (
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />
    );
}

export default Fireworks

