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
interface Override {
  newPass: string;
}
interface HomeBannerType {
  id: number;
  header: string;
  sub_header: string;
  img: string;
  key: string; // Adding a key for antd table row
  link: string;
  position: number;
}

interface BannerPosition {
  id: number;
  position: number;
}
interface AddHomeBanner {
  header: string;
  sub_header: string;
  img: string;
  link: string;
}
