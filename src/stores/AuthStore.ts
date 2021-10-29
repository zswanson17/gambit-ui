import { reactive } from "vue";
import { BaseStore } from "./BaseStore";

class AuthStore extends BaseStore<AuthState> {
  public state: AuthState;

  constructor() {
    super();
    this.state = reactive({
      id: -1,
      firstName: "",
      lastName: "",
      email: "",
      lastLoggedInOn: "",
      tokenExpiresOn: "",
    });
  }
}

interface AuthState {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  lastLoggedInOn: Date | string;
  tokenExpiresOn: Date | string;
}

export default new AuthStore();
