import { Twisters } from 'twisters';
import './helper.js';
import a6_0x5eaf87 from './logger.js';
import { Core } from '../core/core.js';
class Twist {
  constructor() {
    this.twisters = new Twisters();
  }
  ['log'](_0x25760a = '', _0x1f5384 = '', _0x54b2f2 = new Core(), _0x49c273) {
    if (_0x49c273 == undefined) {
      a6_0x5eaf87.info(_0x1f5384.id + " - " + _0x25760a);
      _0x49c273 = '-';
    }
    const _0x92dca7 = _0x54b2f2.user ?? {};
    const _0x5cbaaa = _0x92dca7.daily_attempts ?? '-';
    const _0x25673c = _0x54b2f2.stats ?? {};
    const _0x13c2f2 = _0x25673c.tokens ?? '-';
    const _0x5e81f4 = _0x25673c.level ?? '-';
    this.twisters.put(_0x1f5384.id, {
      'text': "\n================= Account " + _0x1f5384.id + " =============\nName         : " + _0x1f5384.firstName + " " + _0x1f5384.lastName + " - Level : " + _0x5e81f4 + "\nToken        : " + _0x13c2f2 + " CL\nAttempt      : " + _0x5cbaaa + " Ticket\n\nStatus : " + _0x25760a + "\nDelay : " + _0x49c273 + "\n=============================================="
    });
  }
  ['info'](_0x3f0df9 = '') {
    this.twisters.put(0x2, {
      'text': "\n==============================================\nInfo : " + _0x3f0df9 + "\n=============================================="
    });
    return;
  }
  ["clearInfo"]() {
    this.twisters.remove(0x2);
  }
  ['clear'](_0x572d32) {
    this.twisters.remove(_0x572d32);
  }
}
export default new Twist();