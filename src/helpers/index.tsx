import { message } from 'antd';

export const cookieLog = 'mchi_user_presence';

export const handleError = (err: any) => {
  if (err.response) {
    const dataMessage = err.response?.data;
    if (dataMessage === '') {
      message.error(err.response.statusText);
    } else {
      message.error(err.response?.data);
    }
  } else {
    message.error(err.message);
  }
  console.log(err);
};
