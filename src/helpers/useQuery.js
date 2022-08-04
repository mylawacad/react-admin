import { useLocation, useHistory } from "react-router-dom";

export function useQuery() {
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const setQuery = (payload) => {
    Object.keys(payload).forEach((key) => {
      // clean out updated keys
      if (query.has(key)) {
        query.delete(key);
      }
      // clean out after list item deletion
      if (query.has("_delId")) {
        query.delete("_delId");
      }
      query.append(key, payload[key]);
    });

    // ensure parameters appear in order
    query.sort();

    // format array parameters i.e page[limit] in a more
    // human readable way than query.toString() does
    const paramsArr = [];
    query.forEach(function (value, key) {
      paramsArr.push(`${key}=${encodeURIComponent(value)}`);
    });
    const queryStr = paramsArr.join("&");

    // apply the result
    if (queryStr) {
      history.push(`?${queryStr}`);
    }
  };
  return {
    query,
    setQuery,
    history,
  };
}
