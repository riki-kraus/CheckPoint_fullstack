
import React, { useRef, useEffect } from 'react';
import SignaturePad from 'react-signature-canvas';

interface SignatureDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (dataUrl: string) => void;
}

const SignatureDialog: React.FC<SignatureDialogProps> = ({ open, onClose, onSave }) => {
  const sigPadRef = useRef<SignaturePad>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  
  // useEffect(() => {
  //   if (open) {
  //     const timeout = setTimeout(() => {
  //       if (sigPadRef.current) {
  //         sigPadRef.current.penColor = 'white';
  //       }
  //     }, 100); // או אפילו 0 – תלוי כמה מהר נטענת הקומפוננטה
  
  //     return () => clearTimeout(timeout);
  //   }
  // }, [open]);
  
  // Close on clicking outside or pressing ESC
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [open, onClose]);

  const clear = () => {
    sigPadRef.current?.clear();
  };

  const save = () => {
    if (sigPadRef.current && !sigPadRef.current.isEmpty()) {
      // Get the signature data with white on transparent background
      const canvas = sigPadRef.current.getCanvas();
      const context = canvas.getContext('2d');
      
      // Create a new canvas to convert white to black
      const targetCanvas = document.createElement('canvas');
      targetCanvas.width = canvas.width;
      targetCanvas.height = canvas.height;
      const targetContext = targetCanvas.getContext('2d');
      
      if (context && targetContext) {
        // Get the original image data
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Create new image data with black instead of white
        const targetImageData = targetContext.createImageData(canvas.width, canvas.height);
        const targetData = targetImageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
          // If pixel has white (255,255,255), convert to black (0,0,0)
          targetData[i] = 0; // R
          targetData[i + 1] = 0; // G
          targetData[i + 2] = 0; // B
          targetData[i + 3] = data[i + 3]; // Keep original alpha
        }
        
        // Put the black signature on the new canvas
        targetContext.putImageData(targetImageData, 0, 0);
        
        // Get data URL of the black signature
        const dataUrl = targetCanvas.toDataURL('image/png');
        onSave(dataUrl);
        onClose();
      }
    }
  };

  if (!open) return null;

  return (
    <div className="signature-dialog-overlay">
      <div className="signature-dialog" ref={dialogRef}>
        <div className="signature-dialog-header">
          <span className="signature-dialog-title">✍️ Sign Here</span>
          <button className="signature-dialog-close" onClick={onClose}>×</button>
        </div>
        
        <div className="signature-dialog-content">
          <p className="signature-dialog-instructions">
            Use your mouse or finger (on mobile) to sign
          </p>
          
          <div className="signature-canvas-container">
            <SignaturePad
              ref={sigPadRef}
              canvasProps={{
                className: 'signature-canvas',
                width: 500,
                height: 200
              }}
            />
          </div>
        </div>
        
        <div className="signature-dialog-actions">
          <button className="signature-button-clear" onClick={clear}>
            Clear
          </button>
          <div className="signature-button-group">
            <button className="signature-button-cancel" onClick={onClose}>
              Cancel
            </button>
            <button className="signature-button-save" onClick={save}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureDialog;