"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Props {
  className?: string;
}

export default function CircuitLineAnimation({ className }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // -------- Renderer --------
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    if (!renderer) {
        console.error("WebGL Renderer failed to initialize.");
        return;
    }

    renderer.setSize(width, height);
    renderer.setClearColor(0x1e1e1e, 1);
    mountRef.current.appendChild(renderer.domElement);

    // -------- Camera --------
    const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      -1000,
      1000
    );
    camera.position.z = 1;

    const scene = new THREE.Scene();

    const isMobile = window.innerWidth < 768;
    const gridSize = 4;
    const totalLinePaths = isMobile ? 150 : 400;
    const maxAnimatedLines = isMobile ? 20 : 60;
    
    type Point2D = { x: number; y: number };
    
    // ------------------------------------
    // PERMANENT BACKGROUND SETUP (New)
    // ------------------------------------
    // স্থায়ীভাবে সব ব্যাকগ্রাউন্ড লাইন রাখার জন্য একটি ডাইনামিক বাফার
    const permanentGeometry = new THREE.BufferGeometry();
    const permanentPositions: number[] = [];
    let permanentLine: THREE.LineSegments | null = null; 

    // ব্যাকগ্রাউন্ডের ম্যাটেরিয়াল
    const backgroundMaterial = new THREE.LineBasicMaterial({
        color: 0x333333,
        linewidth: 1,
    });

    /**
     * নতুন পথকে স্থায়ী ব্যাকগ্রাউন্ড বাফারে যুক্ত করে।
     */
    function mergePathPermanent(path: Point2D[]) {
        for (let i = 0; i < path.length - 1; i++) {
            const p1 = path[i];
            const p2 = path[i + 1];
            // দুটি পয়েন্টের 6টি কম্পোনেন্ট (x1, y1, z1, x2, y2, z2)
            permanentPositions.push(p1.x, p1.y, 0, p2.x, p2.y, 0);
        }

        // Geometry এবং Attribute আপডেট করা
        permanentGeometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(permanentPositions, 3)
        );
        
        // লাইনটি এখনও দৃশ্যে যোগ না হয়ে থাকলে যোগ করা 
        if (!permanentLine) {
            permanentLine = new THREE.LineSegments(permanentGeometry, backgroundMaterial);
            scene.add(permanentLine);
        } else {
            // যদি লাইনটি থাকে, তবে ডেটা আপডেট করা
            permanentGeometry.attributes.position.needsUpdate = true;
        }
    }
    
    // -----------------------------
    // ANIMATED LINE SETUP (No longer needed to be a circular buffer)
    // -----------------------------
    // অস্থায়ীভাবে কোনো FIFO বাফারের দরকার নেই, কারণ লাইনগুলো এখন স্থায়ী বাফারে যাচ্ছে।
    // এই অংশটি আগের কোড থেকে সরানো হলো।
    
    
    const animatedLines: AnimatedLine[] = [];

    function pathToVec3(path: Point2D[]) {
      return path.map((p) => new THREE.Vector3(p.x, p.y, 0));
    }

    // -------- Create Random Paths --------
    const availablePaths: Point2D[][] = [];

    function createRandomPath(): Point2D[] {
      const path: Point2D[] = [];
      let x = Math.random() * width - width / 2;
      let y = Math.random() * height - height / 2;
      path.push({ x, y });

      const length = (Math.random() * 50 + 20) * 3; 
      let direction = Math.floor(Math.random() * 4);

      for (let i = 0; i < length; i++) {
        switch (direction) {
          case 0: x += gridSize; break;
          case 1: y += gridSize; break;
          case 2: x -= gridSize; break;
          case 3: y -= gridSize; break;
        }

        x = Math.min(Math.max(x, -width / 2), width / 2);
        y = Math.min(Math.max(y, -height / 2), height / 2);

        if (path[path.length - 1].x !== x || path[path.length - 1].y !== y) {
            path.push({ x, y });
        }

        if (Math.random() < 0.3) direction = Math.floor(Math.random() * 4);
      }
      return path;
    }

    function initializeAvailablePaths() {
      availablePaths.length = 0;
      for (let i = 0; i < totalLinePaths; i++) {
        availablePaths.push(createRandomPath());
      }
    }

    initializeAvailablePaths();

    // -----------------------------
    // PRE-POPULATE PERMANENT LINES
    // -----------------------------
    const initialBackgroundLines = isMobile ? 50 : 150; 
    for (let i = 0; i < initialBackgroundLines; i++) {
      const path = createRandomPath(); 
      mergePathPermanent(path); // 💡 স্থায়ী বাফারে যোগ করা 
    }

    // -----------------------------
    // ANIMATED LINE CLASS 
    // -----------------------------
    class AnimatedLine {
      path: Point2D[];
      geometry: THREE.BufferGeometry;
      line: THREE.Line;

      index = 1;
      speed: number;
      fading = false;
      opacity = 1;
      fadeStep: number;
      totalPoints: number;

      constructor(path: Point2D[]) {
        this.path = path;
        this.totalPoints = path.length;

        const pts = pathToVec3(path);
        this.geometry = new THREE.BufferGeometry().setFromPoints(pts);
        this.geometry.setDrawRange(0, 1);

        const material = new THREE.LineBasicMaterial({
          color: 0xb7ff6f,
          transparent: true,
          opacity: 1,
          linewidth: 1,
        });

        this.line = new THREE.Line(this.geometry, material);
        scene.add(this.line);

        const baseSpeed = Math.random() * 1.5 + 0.75;
        this.speed = baseSpeed * 3; 

        this.fadeStep = 1 / (60 * 1.5); 
      }

      update() {
        if (!this.fading) {
          this.index += this.speed;

          if (this.index >= this.totalPoints) {
            this.index = this.totalPoints;
            this.fading = true;

            // 💡 লাইন সম্পূর্ণ হলে স্থায়ী বাফারে যোগ করা 
            mergePathPermanent(this.path); 
          }

          this.geometry.setDrawRange(0, Math.floor(this.index));
        }

        if (this.fading) {
          this.opacity -= this.fadeStep;
          (this.line.material as THREE.LineBasicMaterial).opacity = this.opacity;

          if (this.opacity <= 0) {
            this.dispose();
            return true; 
          }
        }
        return false; 
      }

      dispose() {
        if (this.line.parent) {
          scene.remove(this.line);
          this.geometry.dispose();
          (this.line.material as THREE.LineBasicMaterial).dispose(); 
        }
      }
    }

    // -----------------------------
    // ANIMATION LOOP 
    // -----------------------------
    let lastTime = 0;
    const spawnInterval = 150; 

    function animate(time: number) {
      requestAnimationFrame(animate);

      if (time - lastTime > spawnInterval) {
        if (animatedLines.length < maxAnimatedLines) {
          const randomIndex = Math.floor(Math.random() * availablePaths.length);
          const randomPath = availablePaths[randomIndex];
          animatedLines.push(new AnimatedLine(randomPath));
        }
        lastTime = time;
      }

      for (let i = animatedLines.length - 1; i >= 0; i--) {
        if (animatedLines[i].update()) animatedLines.splice(i, 1);
      }

      renderer.render(scene, camera);
    }

    animate(0); 

    // -----------------------------
    // RESIZE HANDLER
    // -----------------------------
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      renderer.setSize(width, height);

      camera.left = width / -2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = height / -2;
      camera.updateProjectionMatrix();

      animatedLines.forEach((line) => line.dispose());
      animatedLines.length = 0;

      // 💡 স্থায়ী বাফার রিসেট করা
      permanentPositions.length = 0; 
      if (permanentLine) {
        scene.remove(permanentLine);
        permanentLine = null;
      }

      initializeAvailablePaths();
      // ব্যাকগ্রাউন্ড আবার পূরণ করা
      for (let i = 0; i < initialBackgroundLines; i++) {
        const path = createRandomPath();
        mergePathPermanent(path);
      }
    };

    window.addEventListener("resize", handleResize);

    // -----------------------------
    // CLEANUP
    // -----------------------------
    return () => {
      window.removeEventListener("resize", handleResize);
      
      animatedLines.forEach((line) => line.dispose()); 
      
      // 💡 স্থায়ী জিনিস ডিসপোজ করা
      permanentGeometry.dispose();
      backgroundMaterial.dispose();
      if (permanentLine) {
        scene.remove(permanentLine);
      }

      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className={`${className} absolute`}>
      <div ref={mountRef} className="w-full h-full absolute top-0 left-0" />
    </div>
  );
}