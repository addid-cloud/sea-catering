import { metadata } from "../layout";
import dataMenu from "@/data/Menu-data.json";
import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import Fotter from "@/components/Fotter";
import CardGroup from "@/components/CardGroub";

export default function Menu() {
  return (
    <div>
      <div className="p-6 space-y-10">
        <Navbar />
        <h1 className="text-3xl font-bold mb-6">Halaman Menu</h1>
        {dataMenu.map((group, idx) => (
          <div key={group.plan || idx}>
            <h2 className="text-2xl font-semibold mb-4">{group.plan}</h2>
            <CardGroup menuSelection={group.menuSelection} />
          </div>
        ))}
      </div>
      <Fotter />
    </div>
  );
}

metadata.title = "Menu | SEA Catering";
metadata.description = "Halaman Menu SEA Catering";
