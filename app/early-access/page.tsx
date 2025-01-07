"use client";
// import { useState } from "react";
import { toast } from "sonner";

// const EarlyAccessPage = () => {
//   const [code, setCode] = useState(["", "", "", "", "", ""]);

//   const handleCodeChange = (index: any, value: any) => {
//     if (value.length > 1) return; // Only allow single characters

//     const newCode = [...code];
//     newCode[index] = value;
//     setCode(newCode);

//     // Auto-focus next input
//     if (value && index < 5) {
//       const nextInput = document.querySelector(
//         `input[name="code-${index + 1}"]`
//       );
//       //   nextInput?.focus();
//     }
//   };

//   const handleKeyDown = (index: any, e: any) => {
//     // Handle backspace
//     if (e.key === "Backspace" && !code[index] && index > 0) {
//       const prevInput = document.querySelector(
//         `input[name="code-${index - 1}"]`
//       );
//       //   prevInput?.focus();
//     }
//   };

//   return (
//     <div className="min-h-screen d-flex-column items-center justify-center  p-4">
//       <h1 className="text-4xl md:text-6xl font-bold mb-16">EARLY ACCESS</h1>

//       <div className="w-full max-w-2xl">
//         <h2 className="text-lg mb-6">INVITE CODE</h2>

//         <div className="grid grid-cols-6 gap-4 mb-12 d-flex justify-center">
//           {code.map((digit, index) => (
//             <div key={index} className="relative">
//               <input
//                 name={`code-${index}`}
//                 type="text"
//                 maxLength={1}
//                 value={digit}
//                 onChange={(e) => handleCodeChange(index, e.target.value)}
//                 onKeyDown={(e) => handleKeyDown(index, e)}
//                 className="w-full aspect-[3/4]  border-2 border-gray-700 rounded-lg text-center text-2xl "
//               />
//               <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gray-700" />
//             </div>
//           ))}
//         </div>

//         <button
//           onClick={() => toast.success("Code entered", { duration: 2000 })}
//           className="w-full bg-red-500 hover:bg-red-600 py-4 rounded-lg text-xl font-medium transition-colors"
//         >
//           Enter Code
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EarlyAccessPage;

import React, { useState, KeyboardEvent, ChangeEvent } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

const EarlyAccessPage: React.FC = () => {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);

  const handleCodeChange = (index: number, value: string): void => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector<HTMLInputElement>(
        `input[name="code-${index + 1}"]`
      );
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.querySelector<HTMLInputElement>(
        `input[name="code-${index - 1}"]`
      );
      prevInput?.focus();
    }
  };

  const handleSubmit = async () => {
    const fullCode = code.join("");
    console.log("Submitted code:", fullCode);
    const validatedCode = fetch("/api/validate-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: fullCode,
      }),
      // Add your submission logic here
    });
    toast.promise(validatedCode, {
      loading: "Validating code",
      success: "Invite accepted",
      error: "Invalid code",
    });
    // toast.promise("Invite accepted", { duration: 2000 });
  };

  return (
    <div className="min-vh-100 bg-light d-flex flex-column align-items-center justify-content-center p-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 text-center">
            <h1 className="display-4 fw-bold mb-5">EARLY ACCESS</h1>

            <div className="mb-4">
              <h2 className="text-uppercase fs-5 mb-4">INVITE CODE</h2>

              <div className="row g-3 mb-5">
                {code.map((digit, index) => (
                  <div key={index} className="col-2">
                    <div className="position-relative">
                      <input
                        type="text"
                        name={`code-${index}`}
                        maxLength={1}
                        value={digit}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleCodeChange(index, e.target.value)
                        }
                        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                          handleKeyDown(index, e)
                        }
                        className="form-control form-control-lg text-center border-2 rounded-3"
                        style={{
                          height: "80px",
                          fontSize: "24px",
                          backgroundColor: "white",
                        }}
                      />
                      <div
                        className="position-absolute bottom-0 start-50 translate-middle-x"
                        style={{
                          width: "50%",
                          height: "2px",
                          backgroundColor: "#dee2e6",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSubmit}
                className="btn btn-primary btn-lg w-100 text-uppercase py-3 my-4"
                style={{
                  backgroundColor: "#0d6efd",
                  fontSize: "1.25rem",
                }}
              >
                Enter Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarlyAccessPage;
