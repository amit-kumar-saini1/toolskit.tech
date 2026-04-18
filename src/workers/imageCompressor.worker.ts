// Web Worker for KB Converter - runs image processing off main thread

interface CompressMessage {
  type: 'compress';
  imageBitmap: ImageBitmap;
  targetBytes: number;
  originalWidth: number;
  originalHeight: number;
}

interface ProgressMessage {
  type: 'progress';
  percent: number;
  status: string;
}

interface ResultMessage {
  type: 'result';
  blob: Blob;
  width: number;
  height: number;
}

interface ErrorMessage {
  type: 'error';
  message: string;
}

type WorkerMessage = CompressMessage;
type WorkerResponse = ProgressMessage | ResultMessage | ErrorMessage;

const postProgress = (percent: number, status: string) => {
  self.postMessage({ type: 'progress', percent, status } as ProgressMessage);
};

const tryQualityBinarySearch = async (
  canvas: OffscreenCanvas,
  ctx: OffscreenCanvasRenderingContext2D,
  img: ImageBitmap,
  scale: number,
  targetBytes: number
): Promise<Blob | null> => {
  const w = Math.max(1, Math.floor(img.width * scale));
  const h = Math.max(1, Math.floor(img.height * scale));
  
  canvas.width = w;
  canvas.height = h;
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);

  let lo = 0.1, hi = 0.95, bestBlob: Blob | null = null;

  for (let i = 0; i < 8; i++) {
    const mid = (lo + hi) / 2;
    const blob = await canvas.convertToBlob({ type: 'image/jpeg', quality: mid });
    
    if (blob.size <= targetBytes) {
      bestBlob = blob;
      lo = mid; // try higher quality
    } else {
      hi = mid; // reduce quality
    }
  }
  
  return bestBlob;
};

const compressImage = async (
  imageBitmap: ImageBitmap,
  targetBytes: number
): Promise<Blob> => {
  const canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  // Smart starting scale based on megapixels
  const megapixels = (imageBitmap.width * imageBitmap.height) / 1_000_000;
  const startScale = megapixels > 8 ? 0.5 : megapixels > 4 ? 0.7 : 1.0;

  // Generate scales to try
  const scales: number[] = [];
  for (let s = startScale; s >= 0.2; s -= 0.15) {
    scales.push(parseFloat(s.toFixed(2)));
  }
  if (!scales.includes(0.2)) scales.push(0.2);

  let resultBlob: Blob | null = null;

  for (let i = 0; i < scales.length; i++) {
    const s = scales[i];
    const percent = Math.round((i / scales.length) * 100);
    postProgress(percent, `Processing at ${Math.round(s * 100)}% scale...`);

    const blob = await tryQualityBinarySearch(canvas, ctx, imageBitmap, s, targetBytes);
    if (blob) {
      resultBlob = blob;
      break;
    }
  }

  // Last resort: smallest scale at lowest quality
  if (!resultBlob) {
    postProgress(95, 'Finalizing...');
    const w = Math.max(1, Math.floor(imageBitmap.width * 0.15));
    const h = Math.max(1, Math.floor(imageBitmap.height * 0.15));
    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(imageBitmap, 0, 0, w, h);
    resultBlob = await canvas.convertToBlob({ type: 'image/jpeg', quality: 0.3 });
  }

  postProgress(100, 'Done!');
  return resultBlob;
};

self.onmessage = async (e: MessageEvent<WorkerMessage>) => {
  const { type, imageBitmap, targetBytes } = e.data;

  if (type === 'compress') {
    try {
      const blob = await compressImage(imageBitmap, targetBytes);
      self.postMessage({ type: 'result', blob, width: imageBitmap.width, height: imageBitmap.height } as ResultMessage);
    } catch (err) {
      self.postMessage({ type: 'error', message: err instanceof Error ? err.message : 'Unknown error' } as ErrorMessage);
    } finally {
      imageBitmap.close(); // Clean up
    }
  }
};

export {}; // Make this a module
