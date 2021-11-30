import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-black-readable text-white-readable">
      <Header />
      <div className="h-[90vh]">Hello World</div>
      <Footer />
    </div>
  );
}
