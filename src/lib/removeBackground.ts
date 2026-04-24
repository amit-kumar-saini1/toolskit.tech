import { AutoModel, AutoProcessor, env, RawImage } from '@huggingface/transformers';

// Configure transformers.js to always download models
env.allowLocalModels = false;
env.useBrowserCache = true;

let model: any = null;
let processor: any = null;

const loadModel = async () => {
  if (!model || !processor) {
    console.log('Loading RMBG-1.4 model...');
    model = await AutoModel.from_pretrained('briaai/RMBG-1.4', {
      device: 'webgpu',
    });
    processor = await AutoProcessor.from_pretrained('briaai/RMBG-1.4');
    console.log('Model loaded successfully');
  }
  return { model, processor };
};

export const removeBackground = async (imageElement: HTMLImageElement): Promise<Blob> => {
  try {
    console.log('Starting background removal process...');
    
    const { model, processor } = await loadModel();
    
    // Create canvas from image element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');
    
    canvas.width = imageElement.naturalWidth;
    canvas.height = imageElement.naturalHeight;
    ctx.drawImage(imageElement, 0, 0);
    
    // Convert canvas to blob and then to RawImage
    const imageBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to create blob'));
      }, 'image/png');
    });
    
    const image = await RawImage.fromBlob(imageBlob);
    
    // Process image
    console.log('Processing image with RMBG model...');
    const { pixel_values } = await processor(image);
    const { output } = await model({ input: pixel_values });
    
    // Get mask data
    const maskData = await RawImage.fromTensor(output[0].mul(255).to('uint8')).resize(image.width, image.height);
    
    // Create output canvas with transparency
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = image.width;
    outputCanvas.height = image.height;
    const outputCtx = outputCanvas.getContext('2d');
    if (!outputCtx) throw new Error('Could not get output canvas context');
    
    // Draw original image
    outputCtx.drawImage(imageElement, 0, 0);
    
    // Apply mask to alpha channel
    const outputImageData = outputCtx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const data = outputImageData.data;
    
    for (let i = 0; i < maskData.data.length; i++) {
      data[i * 4 + 3] = maskData.data[i]; // Set alpha from mask
    }
    
    outputCtx.putImageData(outputImageData, 0, 0);
    console.log('Background removed successfully');
    
    return new Promise((resolve, reject) => {
      outputCanvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Failed to create blob'));
        },
        'image/png',
        1.0
      );
    });
  } catch (error) {
    console.error('Error removing background:', error);
    throw error;
  }
};

export const loadImage = (file: Blob): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

export const applyBackgroundColor = (
  imageBlob: Blob, 
  backgroundColor: string
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Fill with background color
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw the transparent image on top
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Failed to create blob'));
        },
        'image/png',
        1.0
      );
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(imageBlob);
  });
};
