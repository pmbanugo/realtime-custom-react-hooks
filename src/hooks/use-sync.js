import { useState, useContext, useEffect } from "react";
import { HamoniContext } from "../App";

function useSyncState(name) {
  const hamoni = useContext(HamoniContext);
  const [syncPrimitive, setSyncPrimitive] = useState(null);

  useEffect(() => {
    if (hamoni) {
      const getState = async () => {
        try {
          const listPrimitive = await hamoni.get(name);
          setSyncPrimitive(listPrimitive);
        } catch (error) {
          console.log(("Hamoni Sync Error", error));
        }
      };
      getState();
    }
  }, [hamoni, name]);

  return syncPrimitive;
}

export default useSyncState;
