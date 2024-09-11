interface Login {
  username: string;
  password: string;
}
interface AccessToken {
  username: string;
  role: string;
  token: string;
}
interface Administrators {
  id: string;
  username: string;
  role: string;
}

interface AddAdministrators {
  userName: string;
  password: string;
  role: string;
}
interface Password {
  oldPassword: string;
  newPassword: string;
}
