import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import FooterGate from "@/components/FooterGate";

export const metadata = {
  title: "MentorLagbe - Find Your Ideal Tutor",
  description: "Search verified tutors and tuition batches by subject, class level, mode and budget.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <Providers>
          <Navbar />
          <main className="min-h-[70vh]">{children}</main>
          <FooterGate />
        </Providers>
      </body>
    </html>
  );
}
