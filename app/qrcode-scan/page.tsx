// app/scan/page.tsx
'use client';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

function ScanPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId'); // User who generated the QR code
  const qrId = searchParams.get('qrId'); // Unique QR code ID
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUseConnected, setIsUserConnect] = useState(false);

  useEffect(() => {
    // Check if user is logged in then call API otherwise show button to connect with wallet:
    const store:any = localStorage.getItem('dynamic_store');
    const storeJson = JSON.parse(store);
    const email = storeJson?.state?.user?.email;
    if(email){
        setIsUserConnect(true);
        logScan();
    }
  }, []);

  const logScan = async () => {
    try {
        setLoading(true);
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, qrId }),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error('Failed to log scan');
      }

      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Processing your scan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
            {
                isUseConnected ? <div className="card shadow">
                <div className="card-body text-center">
                  <h1 className="card-title mb-4">Scan Successful!</h1>
                  <p className="lead">
                    Thank you for scanning the QR code.
                  </p>
                  <p>
                    The user who generated this code has been notified.
                  </p>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={() => window.location.href = '/'}
                  >
                    Go Back Home
                  </button>
                </div>
              </div>: <DynamicAuthButton/>
            }
          
        </div>
      </div>
    </div>
  );
}


const DynamicAuthButton = () => {
    const { setShowAuthFlow } = useDynamicContext();
  
  const handleAuthClick = () => {
    setShowAuthFlow(true); // Open the Dynamic authentication flow
  };

  return (
    <div className="text-center m-5">
    <p className="mb-3">You are not logged in. Please click the button below to connect your wallet.</p>
    <button
      onClick={handleAuthClick}
      className="btn btn-primary btn-lg"
    >
      Connect Wallet or Log In
    </button>
  </div>
  );
};


export default function SuspenseWrapper(props: any) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScanPage {...props} />
    </Suspense>
  );
}