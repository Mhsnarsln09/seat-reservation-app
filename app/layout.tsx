import './globals.css';

export const metadata = {
  title: 'Uçak Koltuk Rezervasyonu',
  description: 'Koltuk seçimi ve rezervasyon uygulaması',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}
