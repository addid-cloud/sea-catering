import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import React from "react";

const Fotter = () => {
  return (
    <div className=" flex flex-col items-center justify-center bg-[#151E15] text-primary-white py-8">
      <div className="flex space-x-4 mb-4 items-center justify-center">
        <img src="/logo.svg" alt="SEA Catering Logo" className="w-8 h-8" />
        <div>
          <div>
            <p>© 2025 SEA Catering. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fotter;
