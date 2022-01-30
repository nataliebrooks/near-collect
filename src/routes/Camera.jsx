import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Camera as ReactCamera, CameraType } from 'react-camera-pro';

const Camera = () => {
  const [image, setImage] = useState(null);
  const camera = useRef(null);

  return (
    <div>
      <ReactCamera ref={camera} />
      <button onClick={() => setImage(camera.current.takePhoto())}>Take photo</button>
      <img src={image} alt='Taken photo'/>
    </div>
  );
};

export default Camera;