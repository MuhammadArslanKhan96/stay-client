import jwt, { JwtPayload, Secret, VerifyErrors } from "jsonwebtoken";

export const validateJWT = async (
  token: string
): Promise<JwtPayload | null> => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  try {
    const decodedToken = await new Promise<JwtPayload | null>(
      (resolve, reject) => {
        jwt.verify(
          token,
          process.env.JWT_SECRET as Secret,
          { algorithms: ["RS256"] },
          (
            err: VerifyErrors | null,
            decoded: string | JwtPayload | undefined
          ) => {
            if (err) {
              reject(err);
            } else if (typeof decoded === "object" && decoded !== null) {
              resolve(decoded as JwtPayload);
            } else {
              reject(new Error("Invalid token format"));
            }
          }
        );
      }
    );
    return decodedToken;
  } catch (error) {
    console.error("Token validation failed:", error);
    return null;
  }
};

// app/lib/authHelpers.ts

export const getKey = (
  headers: any,
  callback: (err: Error | null, key?: Secret) => void
): void => {
  console.log("calling getKey");

  // Define the options for the fetch request
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_DYNAMIC_BEARER_TOKEN}`,
    },
  };

  // Perform the fetch request asynchronously
  fetch(
    `https://app.dynamicauth.com/api/v0/environments/${process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID}/keys`,
    options
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const publicKey = json.key.publicKey;
      const pemPublicKey = Buffer.from(publicKey, "base64").toString("ascii");
      callback(null, pemPublicKey); // Pass the public key to the callback
    })
    .catch((err) => {
      console.error(err);
      callback(err); // Pass the error to the callback
    });
};
