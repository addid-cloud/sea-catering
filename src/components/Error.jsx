// pages/index.js
"use client";

import { useEffect } from "react";

export default function Error() {
  useEffect(() => {
    console.error(`
      Error: Uncaught EmotionalOverflowException: Cannot handle ambiguous signals.
      at Heart.react (/feelings/core.js:21:12)
      at Brain.ignore (/logic/process.js:88:44)
      at Timeline.lag (/destiny/now.ts:7:11)

      [INFO]
      EncodedMessage: a2FtdSBpbmlpIGdhIHBla2EgYXBhIGVtYW5nIHB1cmEtcHVyYSBnYSB0YXVzaQ==

      Hint: Try decoding at https://www.base64decode.org
    `);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white text-center px-6">
      <div>
        <h1 className="text-2xl font-bold text-red-500">
          503 - Emotional Server Timeout
        </h1>
        <p className="text-sm text-gray-400 mt-4">
          Signal not received. Please try again with clarity.
        </p>
      </div>
    </main>
  );
}
