import { Contact } from "@/components/Contact";
import { metadata } from "../layout";
import Navbar from "@/components/Navbar";

export default function contact() {
  return (
    <div>
      <Navbar />
      <Contact />
    </div>
  );
}
metadata.title = "Contact | SEA Catering";
metadata.description = "Halaman Contact SEA Catering";
