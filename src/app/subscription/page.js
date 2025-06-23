import SubcriptionForm from "@/components/SubcriptionForm";
import { metadata } from "../layout";
import Navbar from "@/components/Navbar";

export default function Subscription() {
  return (
    <div>
      <Navbar />
      <SubcriptionForm />
    </div>
  );
}
metadata.title = "Subcription | SEA Catering";
metadata.description = "Halaman Subcription SEA Catering";
