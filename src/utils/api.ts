import ky from 'ky';
import Cookies from 'js-cookie';

export const api = ky.extend({
  hooks: {
    beforeRequest: [
      request => {
        const token = Cookies.get('token');

        if (token) {
          request.headers.set('Authorization', token);
        }
      },
    ],
  },
  timeout: 5000,
});
