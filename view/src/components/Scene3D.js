import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Scene3D = () => {

    const containerRef = useRef();

    useEffect(() => {
        // Créer une scène
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 1000);

        const geometry = new THREE.BoxGeometry(1, 1, 1);

        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

        const mesh = new THREE.Mesh(geometry, material);

        scene.add(mesh);

        camera.position.set(0, 0, 2);

        // Créer un rendu
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(300, 300);

        containerRef.current.appendChild(renderer.domElement);

        const animate = () => {
            requestAnimationFrame(animate);

            // Mettre à jour la logique de votre animation ici

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            // Nettoyer les ressources WebGL lorsque le composant est démonté
            renderer.dispose();
        };
    }, []);

    return <div ref={containerRef} />;
};

export default Scene3D;
