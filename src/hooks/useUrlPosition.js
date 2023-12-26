/* eslint-disable no-unused-vars */
import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchParam, setSearchParam] = useSearchParams();
  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");
  //   console.log("urlPosition: ", lat, lng);
  return { lat, lng };
}
