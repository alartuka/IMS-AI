"use client";

import { Button, Stack } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { storage } from '@/firebase';
// import { uploadImages } from '@/firebase';
// import { classifyImages } from '../utils/vertexAI';
import { firestore, setDoc, doc } from 'firebase/firestore';
// import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {Camera} from "react-camera-pro";
import { useRouter } from 'next/navigation';

function CameraPg() {
    const camera = useRef();
    const [numberOfCameras, setNumberOfCameras] = useState(0);
    // const [image, setImage] = useState(null);
    const [imageDataUrls, setImageDataUrls] = useState([]);
    const { push } = useRouter();
    const [uploading, setUploading] = useState(false);

    const handleCapture = () => {
        if (camera.current) {
        const photo = camera.current.takePhoto();
        setImageDataUrls((prevImages) => [...prevImages, image]);
    }
    }

    const retakePhotos = () => {
        setImageDataUrls([]);
    }

    const submitPhotos = async () => {
        // if (imageDataUrls.length === 0) {
        //     alert('Please capture some images first!');
        //     return;
        //   }
      
        //   setUploading(true);
      
        //   try {
        //     // Upload images to Firebase Storage
        //     const imageUrls = await uploadImages(imageDataUrls);
      
        //     // Classify images using Vertex AI
        //     const classificationResults = await classifyImages(imageUrls);
      
        //     // Save classification results to Firestore
        //     const savePromises = classificationResults.map((result) =>
        //       setDoc(doc(firestore, 'image-classifications', uuidv4()), {
        //         imageUrl: result.imageUrl,
        //         predictions: result.prediction,
        //       })
        //     );
      
        //     await Promise.all(savePromises);
      
        //     alert('Images uploaded and classified successfully!');
        //     setImageDataUrls([]); // Clear images after successful upload
        //   } catch (error) {
        //     console.error('Error uploading and classifying images:', error);
        //     alert('Failed to upload images!');
        //   } finally {
        //     setUploading(false);
        //   }
    };

    const switchCamera = async () => {
        camera.current.switchCamera();
    }

  return (
    <main>
    <div id="camera">
        <Camera 
        ref={camera} 
        numberOfCamerasCallback={setNumberOfCameras}  
        />
        <Stack direction='row' spacing={2} sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <Button variant="contained" color="primary" onClick={() => handleCapture()} disabled={imageDataUrls.length >= 5}>Take photo</Button>
            <Button
            variant="contained" color="primary"
            hidden={numberOfCameras <= 1}
            onClick={() => switchCamera()}>Switch Camera</Button>
            <Button variant="contained" color="primary" onClick={() => retakePhotos()}>Retake</Button>
            <Button variant="contained" color="primary" onClick={() => submitPhotos()} disabled={uploading || imageDataUrls.length === 0}>
            {uploading ? 'Uploading...' : 'Upload Images'}</Button>
        </Stack>

        {/* <div>
        {imageDataUrls.map((image, index) => (
          <img key={index} src={image} alt={`Captured ${index}`} width={100} />
        ))}
      </div> */}
       
    </div>
    </main>
  )
}

export default CameraPg;