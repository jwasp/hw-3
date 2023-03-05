import React from "react";

export interface ILOcalStore {
  destroy(): void;
}
export const useLocalStore = <T extends ILOcalStore>(creator: () => T): T => {
  const container = React.useRef<null | T>(null);
  if (container.current === null) {
    container.current = creator();
  }

  React.useEffect(() => {
    return () => container.current?.destroy();
  }, []);

  return container.current;
};
