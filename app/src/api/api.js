import { HttpsProxyAgent } from 'https-proxy-agent';
import { Helper } from '../utils/helper.js';
import a1_0x51ae50 from '../utils/logger.js';
import a1_0x24bdfe from 'axios';
export class API {
  constructor(_0x388ecd, _0x116a2a, _0x456ecd) {
    this.url = _0x116a2a;
    this.origin = _0x116a2a;
    this.ua = Helper.randomUserAgent();
    this.query = _0x388ecd;
    this.proxy = _0x456ecd;
  }
  ["generateHeaders"](_0x47544b) {
    const _0x47ac75 = {
      'Accept': "application/json, text/plain, */*",
      'Accept-Language': "en-US,en;q=0.9,id;q=0.8",
      'Content-Type': "application/json",
      'Sec-Fetch-Dest': "empty",
      'Sec-Fetch-Site': "same-site",
      'Sec-Fetch-Mode': "cors",
      'Host': this.host,
      'Origin': this.origin,
      'Referer': this.origin + '/',
      'init-data': this.query
    };
    if (_0x47544b) {
      _0x47ac75.Authorization = "Bearer " + _0x47544b;
    }
    return _0x47ac75;
  }
  async ['fetch'](_0x24a5c5, _0xd474b1, _0x381634, _0x1e7aa6 = {}, _0x356f82 = {}) {
    try {
      return this.proxy ? await this.fetchWithProxy(_0x24a5c5, _0xd474b1, _0x381634, _0x1e7aa6, _0x356f82) : await this.fetchWithoutProxy(_0x24a5c5, _0xd474b1, _0x381634, _0x1e7aa6, _0x356f82);
    } catch (_0x209081) {
      throw _0x209081;
    }
  }
  async ["fetchWithoutProxy"](_0x2d9962, _0x467c1a, _0x27eece, _0x56fe0c = {}, _0x3d0dda = {}) {
    try {
      const _0x5d37f1 = '' + this.url + _0x2d9962;
      const _0x1fd513 = {
        ..._0x3d0dda,
        ...this.generateHeaders(_0x27eece)
      };
      const _0x21f458 = {
        'headers': _0x1fd513,
        'method': _0x467c1a
      };
      a1_0x51ae50.info(_0x467c1a + " : " + _0x5d37f1);
      a1_0x51ae50.info("Request Header : " + JSON.stringify(_0x1fd513));
      if (_0x467c1a !== 'GET') {
        _0x21f458.body = '' + JSON.stringify(_0x56fe0c);
        a1_0x51ae50.info("Request Body : " + _0x21f458.body);
      }
      const _0x1d2c1f = await fetch(_0x5d37f1, _0x21f458);
      a1_0x51ae50.info("Response : " + _0x1d2c1f.status + " " + _0x1d2c1f.statusText);
      if (_0x1d2c1f.ok || _0x1d2c1f.status == 0x190 || _0x1d2c1f.status == 0x193) {
        const _0x158421 = _0x1d2c1f.headers.get("content-type");
        let _0x20f52f;
        if (_0x158421 && _0x158421.includes('application/json')) {
          _0x20f52f = await _0x1d2c1f.json();
          _0x20f52f.status = _0x1d2c1f.status;
        } else {
          _0x20f52f = {
            'status': _0x1d2c1f.status,
            'message': await _0x1d2c1f.text()
          };
        }
        if (_0x1d2c1f.ok) {
          _0x20f52f.status = 0xc8;
        }
        let _0x246b00 = JSON.stringify(_0x20f52f);
        if (_0x246b00.length > 0x1f4) {
          _0x246b00 = _0x246b00.substring(0x0, 0x1f4) + "...";
        }
        a1_0x51ae50.info("Response Data : " + _0x246b00);
        return _0x20f52f;
      } else {
        throw new Error(_0x1d2c1f.status + " - " + _0x1d2c1f.statusText);
      }
    } catch (_0x311cd5) {
      a1_0x51ae50.error("Error : " + _0x311cd5.message);
      throw _0x311cd5;
    }
  }
  async ["fetchWithProxy"](_0xd1e7ff, _0x91300a = "GET", _0x3fad60, _0x29b3f3 = {}, _0x3377f6 = {}) {
    try {
      const _0x43b20b = '' + this.url + _0xd1e7ff;
      const _0x2f82d0 = {
        ..._0x3377f6,
        ...(await this.generateHeaders(_0x3fad60))
      };
      this.axiosInstance = a1_0x24bdfe.create({
        'baseURL': _0x43b20b,
        'headers': {}
      });
      a1_0x51ae50.info(_0x91300a + " : " + _0x43b20b + " " + (this.proxy ? this.proxy : ''));
      a1_0x51ae50.info("Request Header : " + JSON.stringify(_0x2f82d0));
      const _0xdbb80 = {
        'method': _0x91300a,
        'url': _0x43b20b,
        'headers': _0x2f82d0,
        'httpsAgent': new HttpsProxyAgent(this.proxy)
      };
      if (_0x91300a !== "GET") {
        _0xdbb80.data = _0x29b3f3;
        a1_0x51ae50.info("Request Body : " + JSON.stringify(_0x29b3f3));
      }
      const _0x30c2f8 = await this.axiosInstance.request(_0xdbb80);
      const _0x39f302 = _0x30c2f8.data;
      _0x39f302.status = _0x30c2f8.status;
      a1_0x51ae50.info("Response : " + _0x30c2f8.status + " " + _0x30c2f8.statusText);
      let _0x12589d = JSON.stringify(_0x30c2f8.data);
      if (_0x12589d.length > 0x1f4) {
        _0x12589d = _0x12589d.substring(0x0, 0x1f4) + "...";
      }
      a1_0x51ae50.info("Response Data : " + _0x12589d);
      return _0x39f302;
    } catch (_0x354984) {
      a1_0x51ae50.error("Error : " + _0x354984.message);
      if (_0x354984.response && _0x354984.status === 0x190) {
        const _0x7aa88b = _0x354984.response.data;
        _0x7aa88b.status = _0x354984.status;
        return _0x7aa88b;
      } else {
        throw _0x354984;
      }
    }
  }
}