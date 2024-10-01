import a4_0xdd936d from 'moment-timezone';
import a4_0x598b23 from 'fs';
import a4_0xd5d02d from 'path';
import { parse } from 'querystring';
import a4_0x3cc882 from './twist.js';
export class Helper {
  static ["delay"] = (_0x4fc7ad, _0x37bec2, _0x459fe2, _0x1e9c83) => {
    return new Promise(_0xe8ad08 => {
      let _0x35202f = _0x4fc7ad;
      if (_0x37bec2 != undefined) {
        a4_0x3cc882.log(_0x459fe2, _0x37bec2, _0x1e9c83, "Delaying for " + this.msToTime(_0x4fc7ad));
      } else {
        a4_0x3cc882.info("Delaying for " + this.msToTime(_0x4fc7ad));
      }
      const _0x5efb57 = setInterval(() => {
        _0x35202f -= 0x3e8;
        if (_0x37bec2 != undefined) {
          a4_0x3cc882.log(_0x459fe2, _0x37bec2, _0x1e9c83, "Delaying for " + this.msToTime(_0x35202f));
        } else {
          a4_0x3cc882.info("Delaying for " + this.msToTime(_0x35202f));
        }
        if (_0x35202f <= 0x0) {
          clearInterval(_0x5efb57);
          _0xe8ad08();
        }
      }, 0x3e8);
      setTimeout(async () => {
        clearInterval(_0x5efb57);
        await a4_0x3cc882.clearInfo();
        if (_0x37bec2) {
          a4_0x3cc882.log(_0x459fe2, _0x37bec2, _0x1e9c83);
        }
        _0xe8ad08();
      }, _0x4fc7ad);
    });
  };
  static ["randomUserAgent"]() {
    const _0x5987e7 = ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/125.2535.60 Mobile/15E148 Safari/605.1.15", "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374", "Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374"];
    return _0x5987e7[Math.floor(Math.random() * _0x5987e7.length)];
  }
  static ['readTime'](_0x4fa9f5) {
    const _0x503147 = a4_0xdd936d.unix(_0x4fa9f5);
    return _0x503147.format("YYYY-MM-DD HH:mm:ss");
  }
  static ["getCurrentTimestamp"]() {
    const _0x2e9648 = a4_0xdd936d().tz("Asia/Singapore").unix();
    return _0x2e9648.toString();
  }
  static ["getSession"](_0x2ffbed) {
    try {
      if (!a4_0x598b23.existsSync("accounts")) {
        a4_0x598b23.mkdirSync("accounts");
      }
      const _0x1edd1b = a4_0x598b23.readdirSync(a4_0xd5d02d.resolve(_0x2ffbed));
      const _0x4b66b3 = [];
      _0x1edd1b.forEach(_0x864444 => {
        _0x4b66b3.push(_0x864444);
      });
      return _0x4b66b3;
    } catch (_0x32dd48) {
      throw Error("Error reading sessions directory: " + _0x32dd48 + ',');
    }
  }
  static ["resetAccounts"]() {
    try {
      const _0x7f0a76 = a4_0xd5d02d.resolve("accounts");
      const _0x13963b = a4_0x598b23.readdirSync(_0x7f0a76);
      console.log("Deleting Accounts...");
      _0x13963b.forEach(_0x114813 => {
        const _0x512bbc = a4_0xd5d02d.join(_0x7f0a76, _0x114813);
        console.log(_0x512bbc);
        a4_0x598b23.rm(_0x512bbc, {
          'recursive': true,
          'force': true
        }, _0x44e904 => {
          if (_0x44e904) {
            console.error("Error deleting file " + _0x512bbc + ':', _0x44e904);
          }
        });
      });
      console.info("Account reset successfully. Please restart the bot.");
    } catch (_0xa48ad2) {
      console.error("Error deleting accounts: " + _0xa48ad2);
      throw _0xa48ad2;
    }
  }
  static ["getTelegramQuery"](_0x49b596, _0x5ecacf) {
    const _0x1aba59 = _0x49b596.indexOf('#');
    if (_0x1aba59 === -0x1) {
      throw new Error("No query string found in the URL.");
    }
    const _0x1424f8 = _0x49b596.substring(_0x1aba59 + 0x1);
    const _0x3915bf = _0x1424f8.split('&');
    const _0x22bac3 = _0x3915bf[0x0].split('&')[0x0].replace("tgWebAppData=", '');
    if (!_0x22bac3) {
      throw new Error("Param not found in the query string.");
    }
    if (_0x5ecacf == '1') {
      return _0x22bac3;
    } else {
      if (_0x5ecacf == '2') {
        return this.decodeQueryString(_0x22bac3);
      } else {
        const _0x352a7c = this.decodeQueryString(_0x22bac3);
        return this.jsonToInitParam(_0x352a7c);
      }
    }
  }
  static ["jsonToInitParam"](_0x10bd4d) {
    const _0xcbd1aa = parse(_0x10bd4d);
    if (_0xcbd1aa.user) {
      const _0x4fc297 = JSON.parse(_0xcbd1aa.user);
      _0xcbd1aa.user = encodeURIComponent(JSON.stringify(_0x4fc297));
    }
    const _0xc7ebbb = [];
    for (const [_0x53f79b, _0x2949d9] of Object.entries(_0xcbd1aa)) {
      _0xc7ebbb.push(_0x53f79b + '=' + _0x2949d9);
    }
    const _0x2b0801 = _0xc7ebbb.join('&');
    return _0x2b0801;
  }
  static ["decodeQueryString"](_0x21ba46) {
    const _0x508f58 = decodeURIComponent(_0x21ba46);
    const _0x77fe09 = _0x508f58.split('&');
    const _0x547b46 = {};
    _0x77fe09.forEach(_0x404648 => {
      const [_0x2c570f, _0x298325] = _0x404648.split('=');
      if (_0x2c570f === "user") {
        _0x547b46[_0x2c570f] = JSON.parse(decodeURIComponent(_0x298325));
      } else {
        _0x547b46[_0x2c570f] = _0x298325;
      }
    });
    const _0x37e088 = [];
    for (const [_0x3660fb, _0x3590fb] of Object.entries(_0x547b46)) {
      if (_0x3660fb === "user") {
        _0x37e088.push(_0x3660fb + '=' + JSON.stringify(_0x3590fb));
      } else {
        _0x37e088.push(_0x3660fb + '=' + _0x3590fb);
      }
    }
    return _0x37e088.join('&');
  }
  static ["createDir"](_0x3791a7) {
    try {
      const _0x35aad9 = a4_0xd5d02d.join("accounts", _0x3791a7);
      if (!a4_0x598b23.existsSync("accounts")) {
        a4_0x598b23.mkdirSync("accounts");
      }
      a4_0x598b23.mkdirSync(_0x35aad9, {
        'recursive': true
      });
      console.log(_0x35aad9);
      return _0x35aad9;
    } catch (_0x2fe5c0) {
      throw new Error("Error creating directory: " + _0x2fe5c0);
    }
  }
  static ['saveQueryFile'](_0x71a9ff, _0x2cccc0) {
    const _0x55bd76 = a4_0xd5d02d.resolve(_0x71a9ff, "query.txt");
    a4_0x598b23.writeFile(_0x55bd76, _0x2cccc0, "utf8", _0x1ea0e5 => {
      if (_0x1ea0e5) {
        console.error("Error writing file:", _0x1ea0e5);
      } else {
        console.log("Query File Created/Modified Successfully.");
      }
    });
  }
  static ["random"](_0xe3bddc, _0x428eb7) {
    const _0x79f5af = Math.floor(Math.random() * (_0x428eb7 - _0xe3bddc + 0x1)) + _0xe3bddc;
    return _0x79f5af;
  }
  static ['msToTime'](_0x51a4c6) {
    const _0x304714 = Math.floor(_0x51a4c6 / 3600000);
    const _0x497ea6 = _0x51a4c6 % 3600000;
    const _0x48fae4 = Math.floor(_0x497ea6 / 60000);
    const _0x4c5661 = _0x497ea6 % 60000;
    const _0x3af419 = Math.round(_0x4c5661 / 0x3e8);
    return _0x304714 + " Hours " + _0x48fae4 + " Minutes " + _0x3af419 + " Seconds";
  }
  static ['queryToJSON'](_0x4c790e) {
    try {
      const _0x554633 = {};
      const _0x153e5d = _0x4c790e.split('&');
      _0x153e5d.forEach(_0x203393 => {
        const [_0xa942a5, _0x47ac22] = _0x203393.split('=');
        if (_0xa942a5 === "user") {
          _0x554633[_0xa942a5] = JSON.parse(decodeURIComponent(_0x47ac22));
        } else {
          _0x554633[_0xa942a5] = decodeURIComponent(_0x47ac22);
        }
      });
      return _0x554633;
    } catch (_0x3a04f1) {
      throw Error("Invalid Query");
    }
  }
  static ["generateRandomString"](_0x2417a6) {
    let _0x163d84 = '';
    const _0x36102a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".length;
    for (let _0xc9eab4 = 0x0; _0xc9eab4 < _0x2417a6; _0xc9eab4++) {
      _0x163d84 += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * _0x36102a));
    }
    return _0x163d84;
  }
  static ["readQueryFile"](_0x4bf1e9) {
    try {
      const _0x2eb6b5 = a4_0xd5d02d.resolve(_0x4bf1e9);
      const _0x31d249 = a4_0x598b23.readFileSync(_0x2eb6b5, "utf8");
      return _0x31d249;
    } catch (_0x1d9b63) {
      console.log("No query.txt Files Found");
    }
  }
  static ['showSkelLogo']() {
    console.log("\nVIKITOSHI\n");
  }
}