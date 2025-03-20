import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {
  try {
    const email:any = request.nextUrl.searchParams.get("email");
    if(!email){
        return NextResponse.json({ status: 404 });
    }
    const user = await prisma?.user.findUnique({where:{
        email
    }})
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}