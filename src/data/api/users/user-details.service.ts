import { store } from "../../store/store";
import { usersApi } from "./users.api";

export class UserDetailsService {
  private getUserDetails = usersApi.endpoints.getUserDetails.initiate;

  constructor() { }

  initiateUserDetailsRequest() {

    return store.dispatch(this.getUserDetails({}));
  }
}
export const userDetailsService = new UserDetailsService();
