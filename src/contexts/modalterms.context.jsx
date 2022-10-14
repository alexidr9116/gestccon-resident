import { createContext } from "react";

export const ModalTermsContext = createContext({
  open: () => {},
  close: () => {},
  opened: false,
});


