import ky from 'ky';

export const api = ky.extend({
  hooks: {
    beforeRequest: [
      request => {
        const token = localStorage.getItem('token');

        if (token) {
          request.headers.set('Authorization', token);
        }
      },
    ],
  },
});
