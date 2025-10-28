// Node built-in crypto를 사용해 ES256(JWT) 생성
// 실행 예: node generate-apple-client-secret-crypto.js \
//   --key "/Users/yujin/Downloads/AuthKey_5CL5MYX8KC.p8" \
//   --team NBR7DCZ9L4 --client com.luwei.system.signin --kid 5CL5MYX8KC

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function parseArgs(){
  const a = process.argv.slice(2);
  const out = {};
  for (let i=0;i<a.length;i++){
    if (a[i].startsWith('--')){
      const key = a[i].slice(2);
      const val = a[i+1];
      out[key] = val;
      i++;
    }
  }
  return out;
}

function b64url(input){
  return Buffer.from(input).toString('base64')
    .replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_');
}

function b64urlJSON(obj){
  return b64url(JSON.stringify(obj));
}

(function main(){
  const { key: keyPath, team, client, kid } = parseArgs();
  if (!keyPath || !team || !client || !kid){
    console.error('Usage: node generate-apple-client-secret-crypto.js --key <path.p8> --team <TEAM_ID> --client <CLIENT_ID> --kid <KEY_ID>');
    process.exit(1);
  }
  const absKey = path.resolve(keyPath);
  if (!fs.existsSync(absKey)){
    console.error('Key not found:', absKey);
    process.exit(1);
  }
  const privateKey = fs.readFileSync(absKey, 'utf8');

  const now = Math.floor(Date.now()/1000);
  const header = { alg: 'ES256', kid, typ: 'JWT' };
  const payload = {
    iss: team,
    iat: now,
    exp: now + 60*60*24*180,
    aud: 'https://appleid.apple.com',
    sub: client,
  };

  const unsigned = b64urlJSON(header) + '.' + b64urlJSON(payload);
  const signature = crypto.sign('sha256', Buffer.from(unsigned), { key: privateKey, dsaEncoding: 'ieee-p1363' });
  const jwt = unsigned + '.' + signature.toString('base64')
    .replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_');

  console.log('\nApple Client Secret (JWT):\n');
  console.log(jwt);
  console.log('\n사용한 키:', absKey);
})();


