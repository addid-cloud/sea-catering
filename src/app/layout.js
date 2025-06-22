import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Pacifico, Quicksand } from "next/font/google";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
});

const quicksand = Quicksand({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export const metadata = {
  title: "SEA Catering",
  description: "Healthy Meals, Anytime, Anywhere",
  icons: {
    icon: "logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${pacifico.variable} ${quicksand.variable}`}>
      <body className="font-quicksand">{children}</body>
    </html>
  );
}
