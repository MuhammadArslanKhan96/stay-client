import { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeComponentProps {
  value: string;
  size?: number;
  fgColor?: string;
  bgColor?: string;
}

export default function QRCodeComponent({
  value,
  size = 256,
  fgColor = '#000000',
  bgColor = '#ffffff',
}: QRCodeComponentProps) {
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    const svg = qrCodeRef.current?.querySelector('svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const url = 'data:image/svg+xml;base64,' + btoa(svgData); // Convert the SVG to a data URL
      const link = document.createElement('a');
      link.href = url;
      link.download = 'qrcode.svg'; // File name for download
      document.body.appendChild(link); // Append the link to the DOM
      link.click(); // Trigger the download
      document.body.removeChild(link); // Clean up
    }
  };

  return (
    <div className="text-center">
      <div ref={qrCodeRef}>
        <QRCodeSVG value={value} size={size} fgColor={fgColor} bgColor={bgColor} />
      </div>
      <button onClick={downloadQRCode} className="btn btn-primary mt-3">
        Download QR Code
      </button>
    </div>
  );
}
