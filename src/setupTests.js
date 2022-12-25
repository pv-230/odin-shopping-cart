import '@testing-library/jest-dom';

const crypto = require('crypto');
window.crypto = {
  randomUUID() {
    return crypto.randomUUID();
  },
};
