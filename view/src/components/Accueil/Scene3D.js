import { model } from 'mongoose';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


const Scene3D = () => {

    const containerRef = useRef();

    useEffect(() => {
        // Créer une scène
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(150, 800/900, 0.1, 1000);
        camera.position.set(-1, 2, 3);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(2, 5, 2); // Définir la direction de la lumière
        scene.add(directionalLight);

       

        const geometry = new THREE.BoxGeometry(1, 3, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x19f974 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = 0.6;
        
        scene.add(mesh);

        let positionDuFond = 0;

        const loader = new GLTFLoader();
        const lstAsset3D = [
            {name: 'fond', path: 'decor.glb', scale : { x: 0.5, y: 3, z: 3 },  position: { x: 0, y: -1, z: 0}},           
            {name: 'bonhomme', path: 'test3D.glb', scale : { x: 1, y: 1, z: 1 },  position: { x: 2, y: 0, z: 0 }},
            ];



        lstAsset3D.forEach((asset) => {

            loader.load(
                asset.path, // Assurez-vous que le chemin d'accès est correct
                (gltf) => {
    
                    const modelTest = gltf.scene;
    
                    modelTest.scale.set(asset.scale.x, asset.scale.y, asset.scale.z);
                    modelTest.position.set(asset.position.x, asset.position.y, asset.position.z);
    
                    if(asset.name == 'fond')
                    {
                        modelTest.rotation.y = -1.555;
                        //modelTest.position.z = 1.5;
                        //positionDuFond = asset.position;
                       
                    }

                    
                    scene.add(modelTest);
                },
                undefined,
                (error) => {
                    console.error('An error happened', error);
                }
            );

        })
        
       
        // Créer un rendu
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(800, 800);

        containerRef.current.appendChild(renderer.domElement);

        const animate = () => {
            requestAnimationFrame(animate);

            //mesh.rotation.y += 0.003;
            //camera.rotation.y += 0.02;
           

            // Mettre à jour la logique de votre animation ici

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            // Nettoyer les ressources WebGL lorsque le composant est démonté
            renderer.dispose();
            if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
                containerRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={containerRef} />;
};

export default Scene3D;
