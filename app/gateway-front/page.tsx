'use client'

export default function MyAppNew(props:any) {

   
    const handleAPICall= async()=>{
        try{
            const response = await fetch('/api/gateway-casas/hotels');
            const data = await response.json();
            console.log(data);

        }catch(err){

        }

    }

    
    return (
        <>
           <button onClick={handleAPICall}>call API</button>

        </>
    )
}