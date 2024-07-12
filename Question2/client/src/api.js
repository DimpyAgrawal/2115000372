// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNzc2NjY3LCJpYXQiOjE3MjA3NzYzNjcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6Ijc4MWEwMDRiLWU0OWYtNGQ1Ny05MDRlLTc0MTEzM2RmNTE3MSIsInN1YiI6ImRpbXB5LmFncmF3YWxfY3MyMUBnbGEuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJHTEEgVW5pdmVyc2l0eSIsImNsaWVudElEIjoiNzgxYTAwNGItZTQ5Zi00ZDU3LTkwNGUtNzQxMTMzZGY1MTcxIiwiY2xpZW50U2VjcmV0IjoielBPbHloa3FkcVBzSnRVWCIsIm93bmVyTmFtZSI6IkRpbXB5IEFncmF3YWwiLCJvd25lckVtYWlsIjoiZGltcHkuYWdyYXdhbF9jczIxQGdsYS5hYy5pbiIsInJvbGxObyI6IjIxMTUwMDAzNzIifQ.QD82kP9pK5RhFwDZ_ftWQZtJw1ptV0RH0npYeeLT87c`
  }
});

export default api;
