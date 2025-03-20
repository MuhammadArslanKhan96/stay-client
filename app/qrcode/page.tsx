// app/page.tsx
'use client';
import { useState } from 'react';
import QRCodeComponent from '@/components/QrCodeComponent';

export default function Home() {
  const [qrValue, setQrValue] = useState('');

  const handleGenerate = () => {
    const store:any = localStorage.getItem('dynamic_store');
    const storeJson = JSON.parse(store);
    const email = storeJson?.state?.user?.email;
    if(email){
        const qrId = Math.random().toString(36).substring(7);
        const jsonUser:any = localStorage.getItem('dbuser') || {};
        const dbUser = JSON.parse(jsonUser);
        const url = `${window.location.origin}/qrcode-scan?userId=${dbUser?.id}&qrId=${qrId}`;
        setQrValue(url);
    }else{
        alert("Login to generate the qr code.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">QR Code Generator</h4>
              <button
                onClick={handleGenerate}
                className="btn btn-success w-100 mb-3"
              >
                Generate QR Code
              </button>
              {qrValue && (
                <div className="mt-4">
                  <QRCodeComponent value={qrValue} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}