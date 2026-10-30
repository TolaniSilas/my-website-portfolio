import test from 'node:test';
import assert from 'node:assert/strict';
import { recoveryFragment, recoveryOrigin, validateNewPassword } from '../src/lib/cms/password-recovery.ts';

test('recovery redirects stay on the requesting site', () => {
  assert.equal(recoveryOrigin('https://silas.example', 'silas.example'), 'https://silas.example');
  assert.equal(recoveryOrigin('http://localhost:3000', 'localhost:3000'), 'http://localhost:3000');
  assert.throws(() => recoveryOrigin('https://evil.example', 'silas.example'));
  assert.throws(() => recoveryOrigin('http://silas.example', 'silas.example'));
  assert.throws(() => recoveryOrigin(null, null));
});
test('password updates enforce matching passwords without trimming spaces', () => {
  const password = ' a sufficiently long passphrase ';
  assert.equal(validateNewPassword(password, password), password);
  assert.throws(() => validateNewPassword('short', 'short'));
  assert.throws(() => validateNewPassword(password, 'different'));
  assert.throws(() => validateNewPassword('a'.repeat(129), 'a'.repeat(129)));
});
test('only complete recovery fragments are forwarded to the server', () => {
  assert.deepEqual(recoveryFragment('#access_token=access&refresh_token=refresh&type=recovery'), { accessToken: 'access', refreshToken: 'refresh' });
  assert.equal(recoveryFragment('#access_token=access&refresh_token=refresh&type=signup'), null);
  assert.equal(recoveryFragment('#type=recovery'), null);
  assert.equal(recoveryFragment('#access_token='+'a'.repeat(8193)+'&refresh_token=r&type=recovery'), null);
});
