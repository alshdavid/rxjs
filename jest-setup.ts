import * as nodeCrypto from 'crypto';
// @ts-ignore
window.crypto = {
  getRandomValues (buffer: any) {
    return nodeCrypto.randomFillSync(buffer);
  },
};