import { createContext } from "react";

export const MediaContext = createContext({
    media: "desktop",
    changeMedia: () => {}
})