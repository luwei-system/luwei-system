// generate-apple-client-secret.js
// 사용 전: 프로젝트 루트에 Apple private key 파일(AuthKey_5CL5MYX8KC.p8)을 두세요.
// 실행: node generate-apple-client-secret.js

const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

// Apple Sign In 설정값
const TEAM_ID = 'NBR7DCZ9L4';                 // Apple Team ID
const CLIENT_ID = 'com.luwei.system.login';    // Service ID (Identifier)
const KEY_ID = '5CL5MYX8KC';                   // Key ID

// Private Key 파일 경로 (루트에 위치한다고 가정)
const KEY_FILE = path.resolve(__dirname, 'AuthKey_5CL5MYX8KC.p8');

if (!fs.existsSync(KEY_FILE)) {
  console.error(`Private key 파일이 없습니다: ${KEY_FILE}`);
  console.error('AuthKey_5CL5MYX8KC.p8 파일을 같은 폴더(프로젝트 루트)에 둔 뒤 다시 실행하세요.');
  process.exit(1);
}

const PRIVATE_KEY = fs.readFileSync(KEY_FILE, 'utf8');

// 유효기간: 최대 6개월(180일)
const now = Math.floor(Date.now() / 1000);
const token = jwt.sign(
  {
    iss: TEAM_ID,
    iat: now,
    exp: now + 60 * 60 * 24 * 180,
    aud: 'https://appleid.apple.com',
    sub: CLIENT_ID,
  },
  PRIVATE_KEY,
  { algorithm: 'ES256', keyid: KEY_ID }
);

console.log('\nApple Client Secret (JWT):\n');
console.log(token);
console.log('\n복사하여 Supabase(또는 서버) 설정에 입력하세요.');


