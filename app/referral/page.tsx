// app/dashboard/page.tsx
'use client';

import ReferralLinkGenerator from '@/components/elements/ReferralLinkGenerator';
import React, { useEffect, useState} from 'react';


const DashboardPage = () => {
  const [userReferralCode, setUserReferralCode] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(()=>{
    (async function(){
      const store:any = localStorage.getItem('dynamic_store');
      const storeJson = JSON.parse(store);
      const email = storeJson?.state?.user?.email;
        setLoading(true);
        try{
            const response = await fetch(`/api/user/user?email=${email}`);
            const user = await response.json();
            console.log(user);
            setUserReferralCode(user?.referralCode);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }

    })();

  }, []);

  return (
    <div>
      <ReferralLinkGenerator referralCode={userReferralCode} loading={loading} />
    </div>
  );
};

export default DashboardPage;