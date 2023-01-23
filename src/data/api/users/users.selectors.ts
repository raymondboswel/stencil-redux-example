import { getMemoizedSelector } from "../get-memoized-selector";
import { GetUserDetailsSelector, GetUserDetailsSelectorCreator, usersApi } from "./users.api";

export function getUserDetailsSelector() {
  return getMemoizedSelector<GetUserDetailsSelector, GetUserDetailsSelectorCreator>(
    // This is set when initiating the call to the endpoint, 
    // and reflects the latest args the endpoint was called with
    {},
    "getUserDetails",
    usersApi.endpoints.getUserDetails.select);
}


