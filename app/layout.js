import { Fugaz_One, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/Context/AuthContext";
import Head from "./head";
import Logout from "@/Components/LogOut";

const inter = Inter({ subsets: ["latin"]});
const fugaz = Fugaz_One({ subsets: ["latin"] , weight: ['400']})

export const metadata = {
  title: "Mood Tracker",
  description: "Trackers your mood Daily",
};

export default function RootLayout({ children }) {
  const header=(
    <header className="p-4 sm:p-8 flex items-center justify-between
    gap-4">
      <Link href="/">
      <h1 className={'text-base sm:text-lg textGradient ' + fugaz.className }>Mood Tracker</h1>
      </Link>
      <Logout/>
    </header>
  )

  const footer=(
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className={'text-green-400 ' + fugaz.className}>created by @Smoljames <br></br> tutorial followed by Biruk</p>
    </footer>
  )
  return (
    <html lang="en">
      <Head />
      <AuthProvider>
      <body className={"w-full max-w-[1000px] mx-auto text-sm sm:text-base in-h min-h-screen flex flex-col text-slate-800"  + inter.className}>
        {header}

        {children}

        {footer}
      </body>
      </AuthProvider>
    </html>
  );
}
