import { metadata } from "../layout";
import dataMenu from "@/data/Menu-data.json";
import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import Fotter from "@/components/Fotter";

export default function Menu() {
  return (
    <div>
      <div className="p-6 space-y-10">
        <Navbar />
        <h1 className="text-3xl font-bold mb-6">Halaman Menu</h1>
        {dataMenu.map((group, idx) => (
          <div key={idx}>
            <h2 className="text-2xl font-semibold mb-4">{group.plan}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {group.menuSelection.map((meal, index) => (
                <Card key={index} meal={meal} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <Fotter />
    </div>
  );
}

metadata.title = "Menu | SEA Catering";
metadata.description = "Halaman Menu SEA Catering";
