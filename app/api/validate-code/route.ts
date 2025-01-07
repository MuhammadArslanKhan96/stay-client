export const dynamic = "force-dynamic";
import { stat } from "fs";
import prisma from "../../../prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { code } = reqBody;
  try {
    const findCode = await prisma?.earlyAccess.findUnique({
      where: {
        code: parseInt(code),
      },
    });
    if (findCode) {
      const redeemCode = await prisma?.earlyAccess.update({
        where: {
          code: parseInt(code),
        },
        data: {
          isUsed: true,
        },
      });
      if (redeemCode) {
        return NextResponse.json({ success: "Code redeemed" }, { status: 200 });
      }
    } else {
      return NextResponse.json({ error: "Invalid Code" }, { status: 404 });
    }
  } catch (error: any) {
    console.error(error.message);
  }
}
