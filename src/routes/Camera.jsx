import React, { useRef, useState, useEffect } from "react";
import { Camera as ReactCamera, CameraType } from "react-camera-pro";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
  outline: none;
  color: white;
  opacity: 1;
  background: transparent;
  background-color: transparent;
  background-position-x: 0%;
  background-position-y: 0%;
  background-repeat: repeat;
  background-image: none;
  padding: 0;
  text-shadow: 0px 0px 4px black;
  background-position: center center;
  background-repeat: no-repeat;
  pointer-events: auto;
  cursor: pointer;
  z-index: 2;
  filter: invert(100%);
  border: none;
  &:hover {
    opacity: 0.7;
  }
`;

const TakePhotoButton = styled(Button)`
  width: 80px;
  height: 80px;
  border: solid 4px black;
  border-radius: 50%;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const ChangeFacingCameraButton = styled(Button)`
  background: url(https://img.icons8.com/ios/50/000000/switch-camera.png);
  background-position: center;
  background-size: 40px;
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  padding: 40px;
  &:disabled {
    opacity: 1;
    cursor: default;
  }
  @media (max-width: 400px) {
    padding: 40px 5px;
  }
`;

const ImagePreview = styled.div`
  width: 120px;
  height: 120px;
  ${({ image }) => (image ? `background-image:  url(${image});` : "")}
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  @media (max-width: 400px) {
    width: 50px;
    height: 120px;
  }
`;

const Camera = () => {
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [image, setImage] = useState(null);
  const camera = useRef(null);
  return (
    <div className="fixed w-full h-screen z-10">
      <ReactCamera
        ref={camera}
        aspectRatio="cover"
        numberOfCamerasCallback={setNumberOfCameras}
      />
      <div className="flex justify-between fixed bottom-0 w-full">
        <Link to="/question" state={{ image: image }} className="w-1/3">
          <ImagePreview image={image} />
        </Link>
        <TakePhotoButton
         className="w-1/3"
          onClick={() => {
            if (camera.current) {
              const photo = camera.current.takePhoto();
              setImage(photo);
            }
          }}
        />
        {numberOfCameras > 1 ? (
          <ChangeFacingCameraButton
          className="w-1/3"
            onClick={() => {
              if (camera.current) {
                const result = camera.current.switchCamera();
              }
            }}
          />
        ) : <span className="w-1/3" />}
      </div>
    </div>
  );
};

export default Camera;
