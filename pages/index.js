import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WelcomeCard from "../components/homepage/WelcomeCard";

export default function Home() {
  return (
    <div className="bg-black-readable text-white-readable">
      <Header />
      <WelcomeCard />
      <Footer />
    </div>
  );
}
