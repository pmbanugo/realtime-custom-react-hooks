import { useState, useEffect } from "react";
import Hamoni from "hamoni-sync";

const useHamoni = (accountId, appId) => {
  const [hamoni, setHamoni] = useState();

  useEffect(() => {
    const initialiseHamoniSync = async () => {
      // recommended to generate this from your backend and send to your client apps.
      const response = await fetch("https://api.sync.hamoni.tech/v1/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ accountId, appId }),
      });

      const token = await response.json();
      const hamoniSync = new Hamoni(token);
      await hamoniSync.connect();

      setHamoni(hamoniSync);
    };

    initialiseHamoniSync();
  }, [accountId, appId]);

  return hamoni;
};

export default useHamoni;
