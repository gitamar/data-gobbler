import { Crypto } from './crypto';

describe('Testing if the crypto methods are defined', () => {
  let crypto: Crypto;

  beforeEach(async () => {
    crypto = new Crypto();
  });

  it('should be defined - crypto', () => {
    expect(crypto).toBeDefined();
  });

  it('should be defined - decrypt', () => {
    expect(crypto.decrypt).toBeDefined();
  });

  it('should be defined - encrypt', () => {
    expect(crypto.encrypt).toBeDefined();
  });
});

describe('Testing Encrypt method and Decrypt method', () => {
  let crypto: Crypto;
  const key = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
  const trueData = { price: 20, quantity: 300, name: 'brush' };
  const data = Buffer.from(JSON.stringify(trueData));
  const encryptedData = {
    iv: 'ddc755c63f3632a0646571f36c6a2f58',
    encryptedData:
      'd90557e1610325350302ca7303a7fb7abeb51e63031005bad0041cc117f8b69ce7e8957346fecea927e5581be81e1db1',
  };

  beforeEach(async () => {
    crypto = new Crypto();
  });

  it('should encrypt a given payload data', async () => {
    expect(await crypto.encrypt(data, key)).toHaveProperty('iv');
    expect(await crypto.encrypt(data, key)).toHaveProperty('encryptedData');
  });

  it('should decrypt a given encrypted data', async () => {
    const d = await crypto.decrypt(encryptedData, key);
    console.log(d);

    expect(await crypto.decrypt(encryptedData, key)).toBe(
      JSON.stringify(trueData),
    );
  });
});
