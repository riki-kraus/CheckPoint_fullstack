

// import { FC, useState } from 'react';
// import SignatureDialog from './SignatureDialog';
// import '../styles/Signature.css';

// type Props = {
//   onSignature: (signature: string) => void;
// };

// const Signature: FC<Props> = ({ onSignature }) => {
//   const [open, setOpen] = useState(false);
//   const [signature, setSignature] = useState<string | null>(null);
  
//   const handleSave = (dataUrl: string) => {
//     setSignature(dataUrl);
//     onSignature(dataUrl);
//     setOpen(false);
//   };
  
//   return (
//     <div className="signature-wrapper">
//       <button 
//         className="signature-button"
//         onClick={() => setOpen(true)}
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
//           <polyline points="22 4 12 14.01 9 11.01"></polyline>
//         </svg>
//         {signature ? 'Change Signature' : 'Add Signature'}
//       </button>
      
//       <SignatureDialog
//         open={open}
//         onClose={() => setOpen(false)}
//         onSave={handleSave}
//       />
      
//       {signature && (
//         <div className="signature-preview">
//           <span>Signature added</span>
//           <div className="signature-thumbnail">
//             <img src={signature} alt="Your signature" />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Signature;


import { FC, useState } from 'react';
import SignatureDialog from './SignatureDialog';
import '../styles/Signature.css';

type Props = {
  onSignature: (signature: string) => void;
};

const Signature: FC<Props> = ({ onSignature }) => {
  const [open, setOpen] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  
  const handleSave = (dataUrl: string) => {
    setSignature(dataUrl);
    onSignature(dataUrl);
    setOpen(false);
  };
  
  return (
    <div className="signature-wrapper">
      <button 
        className="signature-button"
        onClick={() => setOpen(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        {signature ? 'Change Signature' : 'Add Signature'}
      </button>
      
      <SignatureDialog
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
      
      {signature && (
        <div className="signature-preview">
          <span>Signature added</span>
          <div className="signature-thumbnail">
            <img src={signature} alt="Your signature" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Signature;