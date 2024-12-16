import Link from "next/link";
import React, { FC } from "react";

interface scanProps {
  scanLink: string;
}

const ScanLink: FC<scanProps> = ({ scanLink }) => {
  console.log(scanLink);
  return (
    <Link href={scanLink} rel="noopener noreferrer" target="_blank">
      Scan Url
      <svg
        fill="#000000"
        width="15px"
        height="15px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="ml-2"
      >
        <path d="M15.5 2.25a.75.75 0 01.75-.75h5.5a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0V4.06l-6.22 6.22a.75.75 0 11-1.06-1.06L19.94 3h-3.69a.75.75 0 01-.75-.75z" />
        <path d="M2.5 4.25c0-.966.784-1.75 1.75-1.75h8.5a.75.75 0 010 1.5h-8.5a.25.25 0 00-.25.25v15.5c0 .138.112.25.25.25h15.5a.25.25 0 00.25-.25v-8.5a.75.75 0 011.5 0v8.5a1.75 1.75 0 01-1.75 1.75H4.25a1.75 1.75 0 01-1.75-1.75V4.25z" />
      </svg>
    </Link>
  );
};

export default ScanLink;
