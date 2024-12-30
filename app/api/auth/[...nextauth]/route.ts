// import { authOptions } from "@/lib/auth";
// import NextAuth from "next-auth";

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

import { handlers } from "../../../../auth";
console.log(handlers);
export { handlers as GET, handlers as POST };
