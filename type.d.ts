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

interface Services {
  id: number;
  title: string;
}

interface UpsertServices {
  title: string;
}

interface ServicesImg {
  id: number;
  img: string;
}

interface AddServicesImg {
  img: string;
}

interface EditServicesImg {
  img: string;
  prevImg: string | null;
}

interface NewsEvents {
  id: number;
  title: string;
  slug: string;
  description: string;
  date: date;
  type: string;
  img: string;
}

interface AddNewsEvents {
  title: string;
  description: string;
  type: string;
  img: string;
}

interface EditNewsEvents {
  title: string;
  description: string;
  type: string;
  img: string;
  prevImg: string | null;
}

interface FeaturedService {
  id: number;
  title: string;
  description: string;
  img: string;
}

interface AddFeaturedService {
  title: string;
  description: string;
  img: string;
}

interface EditFeaturedService {
  title: string;
  description: string;
  img: string;
  prevImg: string | null;
}

interface Careers {
  id: number;
  title: string;
  slug: string;
  slots: number;
  salary_range: string;
  job_type: string;
  date_posted: string;
  date_modified: string;
  job_summary: string;
  qualifications: string;
  is_enabled: boolean;
}

interface UpsertCareers {
  title: string;
  slots: number;
  salary_range: string;
  job_type: string;
  job_summary: string;
  qualifications: string;
  is_enabled: boolean;
}

interface CareerStatus {
  id: number;
  is_enabled: boolean;
}

interface Appointment {
  id: number;
  fname: string;
  mname: string;
  lname: string;
  email: string;
  contact_no: string;
  birth_date: string;
  service: string;
  procedures: string;
  preferred_date: string;
  date_created: string;
}

interface AppointmentStatus {
  status: boolean;
  message: string;
}
interface Patient {
  id: string;
  fname: string;
  mname: string;
  lname: string;
  patient_no: string;
  email: string;
  contact_no: string;
  password: string;
  is_verify: boolean;
}
interface PatientEmail {
  id: string;
  email: string;
}

interface PatientPassword {
  id: string;
  newPassword: string;
}

interface Doctor {
  id: string;
  fname: string;
  mname: string;
  lname: string;
  doctor_code: string;
  email: string;
  contact_no: string;
  password: string;
  is_verify: boolean;
}
interface DoctorEmail {
  id: string;
  email: string;
}
interface DoctorPassword {
  id: string;
  newPassword: string;
}
interface TermsPrivacy {
  id: number;
  terms_and_conditions: string;
  privacy_policy: string;
  last_modified: string;
}
interface UpdateTerms {
  terms_and_conditions: string;
}
interface UpdatePrivacy {
  privacy_policy: string;
}

interface ChartAppointment {
  count: number;
  date: string;
  status: string;
}
interface Doctors {
  id: number;
  fname: string;
  mname: string;
  lname: string;
  schedule: string;
  contact: string;
  img: string;
  specialty: Specialties[];
}

interface Specialties {
  id: number;
  doctorId: number;
  specialty: string;
}
interface AddDoctors {
  fname: string;
  mname: string | null;
  lname: string;
  schedule: string | null;
  contact: string;
  img: string | null;
  specialties: string[];
}

interface EditDoctors {
  fname: string;
  mname: string | null;
  lname: string;
  schedule: string | null;
  contact: string;
  img: string | null;
  prevImg: string | null;
  specialties: string[];
}
interface Specialty {
  id: number;
  specialty: string;
}

interface UpsertSpecialty {
  specialty: string;
}

interface Institution {
  id: number;
  logo: string;
  logo_white: string;
  hero_background: string;
  contact_no: string;
  address: string;
  email_general_info: string;
  email_careers: string;
  email_hmo_approval: string;
  email_appointment: string;
}

interface EditInstitution {
  id: number;
  logo: string;
  logo_white: string;
  hero_background: string;
  prevLogo: string | null;
  prevLogo_white: string | null;
  prevHero_background: string | null;
  contact_no: string;
  address: string;
  email_general_info: string;
  email_careers: string;
  email_hmo_approval: string;
  email_appointment: string;
}
