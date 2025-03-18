// components/ReferralLinkGenerator.tsx
'use client';

import React, { useState, useEffect } from 'react';

const ReferralLinkGenerator = ({ referralCode, loading }: { referralCode: string, loading:boolean }) => {
  const [referralLink, setReferralLink] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // Generate the referral link dynamically
    const link = `${window.location.origin}/register?ref=${referralCode}`;
    setReferralLink(link);
  }, [referralCode]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset "Copied" message after 2 seconds
    });
  };

  return (
    <div className="card p-4 dark:bg-dark">
      <h2 className="h4 mb-3 text-dark dark:text-light">Your Referral Link</h2>
      <div className="input-group">
        {
          loading ? <input
          type="text"
          value={'Loading...'}
          readOnly
          className="form-control bg-white dark:bg-dark text-dark dark:text-light"
          aria-label="Referral Link"
        />:
        <input
        type="text"
        value={`${referralCode ? referralLink :"Please log in to generate the link"}`}
        readOnly
        className="form-control bg-white dark:bg-dark text-dark dark:text-light"
        aria-label="Referral Link"
      />
        }
        
          
        
        {referralCode && (<button
          className="btn btn-primary"
          type="button"
          onClick={handleCopyLink}
        >
          {isCopied ? 'Copied!' : 'Copy'}
        </button>)}
      </div>
      {isCopied && (
        <p className="mt-2 mb-0 text-success">Link copied to clipboard!</p>
      )}
    </div>
  );
};

export default ReferralLinkGenerator;