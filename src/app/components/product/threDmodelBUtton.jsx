"use client";

import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import css from "./product.module.css";
import { AiOutlineClose } from "react-icons/ai";

function Model({ setModelPivot, productData, modelColor }) {
  const { scene } = useGLTF(productData.model3dFile);

  const modelRef = useRef();

  useEffect(() => {
    if (scene && modelRef.current) {
      // Центруємо модель і масштабуємо
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      scene.position.sub(center);

      const size = box.getSize(new THREE.Vector3()).length();
      scene.scale.set(0.002, 0.002, 0.002);

      const pivot = new THREE.Group();
      pivot.add(scene);
      scene.position.set(-5.5, -1, 0);
      setModelPivot(pivot);

      // **Додаємо зміну кольору**
      scene.traverse((object) => {
        if (object.isMesh) {
          object.material.color.set(modelColor); // Встановлюємо колір матеріалу
        }
      });
    }
  }, [scene, setModelPivot, modelColor]); // Додаємо залежність від modelColor

  return <primitive object={scene} ref={modelRef} />;
}

export default function ThreDmodelBUtton({ productData }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [modelPivot, setModelPivot] = useState(null);
  const [modelColor, setModelColor] = useState("#3c3d5b"); // Додаємо стан для кольору моделі
  console.log("productData.model3dFile", productData);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Функція для зміни кольору
  const handleColorChange = (e) => {
    setModelColor(e.target.value);
  };

  return (
    <div className={css.threDmodelBUtton}>
      <div className={css.theThreDButton} onClick={openPopup}>
        3D model
      </div>

      {isPopupOpen && (
        <div className={css.popupOverlay}>
          <div className={css.popupContent}>
            <button className={css.closeButton} onClick={closePopup}>
              <AiOutlineClose className={css.wrapAiOutlineClose} />
            </button>
            <div className={css.modelContainer}>
              {/* Додаємо вибір кольору */}
              <input
                type="color"
                value={modelColor}
                onChange={handleColorChange}
                className={css.colorPicker}
              />

              <Canvas
                style={{ height: "100%", width: "100%" }}
                camera={{ position: [0.5, 5, 15], fov: 50 }}
              >
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <Model
                  setModelPivot={setModelPivot}
                  productData={productData}
                  modelColor={modelColor} // Передаємо колір у компонент Model
                />
                <Environment preset="studio" />
                {modelPivot && (
                  <OrbitControls
                    enableZoom={true}
                    maxPolarAngle={Math.PI / 2}
                    minDistance={10}
                    maxDistance={30}
                    target={[0, 0, 0]}
                    object={modelPivot}
                  />
                )}
              </Canvas>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
