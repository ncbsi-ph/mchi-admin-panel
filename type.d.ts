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

interface EditHomeBanner {
  header: string;
  sub_header: string;
  img: string | null;
  link: string;
  prevImg: string | null;
}
interface Delete {
  img: string;
}

interface History {
  id: number;
  history: string;
}

interface MissionVision {
  id: number;
  mission: string;
  vision: string;
}

interface EditMissionVision {
  mission: string;
  vision: string;
}

interface HMO {
  id: number;
  name: string;
  img: string;
}

interface AddHMO {
  name: string;
  img: string;
}

interface EditHMO {
  name: string;
  img: string;
  prevImg: string | null;
}

interface HomeAbout {
  id: number;
  title: string;
  sub_title: string;
  description: string;
}

interface EditHomeAbout {
  title: string;
  sub_title: string;
  description: string;
}
