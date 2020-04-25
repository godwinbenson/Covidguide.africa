import { useState, useEffect } from "react";
const isServer = typeof window === "undefined";
function defaultMatch(query) {
  if (isServer) {
    return undefined;
  }
  return window.matchMedia(query).matches;
}
export const useMedia = query => {
  let [matches, setMatches] = useState(defaultMatch(query));

  useEffect(() => {
    if (!isServer) {
      let media = window.matchMedia(query);
      let listener = () => setMatches(media.matches);
      media.addListener(listener);
      listener();
      return () => media.removeListener(listener);
    }
  }, [query]);

  return matches;
};
