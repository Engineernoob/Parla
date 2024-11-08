// parla-frontend/app/layout.tsx

export const metadata = {
  title: 'Parla',
  description: 'Chat application with AI assistant',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          {/* Navbar and main content layout */}
          {children}
        </div>
      </body>
    </html>
  );
}
