import crypto from "crypto";

const API_KEY = process.env.NEXT_HOTEL_API_KEY as string;
const API_SECRET = process.env.NEXT_HOTEL_API_SECRET;

// Function to generate authentication headers
const generateAuthHeaders = (): { [key: string]: string } => {
  const timestamp = Math.floor(Date.now() / 1000).toString();

  const stringToSign = `${API_KEY}${API_SECRET}${timestamp}`;

  const signature = crypto
    .createHash("sha256")
    .update(stringToSign)
    .digest("hex");
  return {
    "api-key": API_KEY,
    "x-signature": signature,
  };
};

export default generateAuthHeaders;
