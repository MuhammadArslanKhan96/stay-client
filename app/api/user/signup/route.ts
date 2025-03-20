import prisma from "@/prisma/prisma";
import { createUser, getUserByEmail } from "@/util/services/user";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    // Parse the request body
    const { username, email, referralCode, wallet } = await request.json();
    console.log({ username, email, referralCode, wallet });

    // Validate input
    if (!email) {
      return NextResponse.json(
        { error: 'email is required.' },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists.' },
        { status: 400 }
      );
    }

    // Find the referrer if a referral code is provided
    let referredByUserId = null;
    if (referralCode) {
      const referrer = await prisma.user.findUnique({
        where:{
          referralCode
        }
      });

      if (!referrer) {
        return NextResponse.json(
          { error: 'Invalid referral code.' },
          { status: 400 }
        );
      }
      referredByUserId = referrer.id;
    }

    // Generate a unique referral code for the new user
    const newReferralCode = generateReferralCode();

    // Create the new user
    const newUser = await prisma.user.create({
      data:{
        username: username||email.split("@")[0],
        email,
        referralCode: newReferralCode,
        referredBy: referredByUserId,
        wallet
      }
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json(
      { error: 'An error occurred during registration.' },
      { status: 500 }
    );
  }
  
}

export const generateReferralCode = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

generateReferralCode();
