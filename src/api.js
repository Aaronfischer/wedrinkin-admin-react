import axios from 'axios';

export default {
  user: {
    login: credentials =>
      axios.post('/api/auth', { credentials }).then(res => res.data.user),
    signup: user =>
      axios.post('/api/users', { user }).then(res => res.data.user),
    confirm: token =>
      axios
        .post('/api/auth/confirmation', { token })
        .then(res => res.data.user),
    resetPasswordRequest: email =>
      axios.post('/api/auth/reset-password-request', { email }),
    validateToken: token => axios.post('/api/auth/validate-token', { token }),
    resetPassword: data => axios.post('/api/auth/reset-password', { data })
  },
  drinks: {
    fetchAll: () => axios.get('/api/drinks').then(res => res.data.drinks),
    fetch: id =>
      axios.get(`/api/drinks/${id}`).then(res => {
        console.log('res', res);
        return res.data.drinks;
      }),
    create: drink =>
      axios.post('/api/drinks', { drink }).then(res => res.data.drinks),
    update: drink =>
      axios
        .patch(`/api/drinks/${drink._id}`, { drink })
        .then(res => res.data.drinks),
    delete: drink =>
      axios
        .delete(`/api/drinks/${drink._id}`, { drink })
        .then(res => res.data.drinks)
  }
};
