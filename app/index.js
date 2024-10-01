import './config/config.js';
import { proxyList } from './config/proxy_list.js';
import { Core } from './src/core/core.js';
import { Telegram } from './src/core/telegram.js';
import { Helper } from './src/utils/helper.js';
import a0_0x453699 from './src/utils/logger.js';
import a0_0x58c1ea from './src/utils/twist.js';
async function operation(_0x3dd497, _0x2b49e6, _0x12ec81, _0xfecd96) {
  try {
    const _0x3b60f0 = new Core(_0x3dd497, _0x2b49e6, _0x12ec81, _0xfecd96);
    await _0x3b60f0.login(true);
    await _0x3b60f0.start(true);
    await _0x3b60f0.getUserStats(true);
    _0x3b60f0.task = [];
    await _0x3b60f0.getDefaultTask(true);
    await _0x3b60f0.getDailyTask(true);
    await _0x3b60f0.getPartner(true);
    const _0x3fcc93 = [0x9, 0x2];
    _0x3b60f0.task = _0x3b60f0.task.filter(_0x303eff => !_0x3fcc93.includes(_0x303eff.task_id));
    while (_0x3b60f0.user.daily_attempts != 0x0) {
      await _0x3b60f0.playTileGame();
    }
    for (const _0x2cbb5b of _0x3b60f0.task) {
      if (_0x2cbb5b.is_completed == false) {
        await _0x3b60f0.startTask(_0x2cbb5b);
      }
      if (_0x2cbb5b.is_completed == true && _0x2cbb5b.is_rewarded == false) {
        await _0x3b60f0.claimTask(_0x2cbb5b);
      }
    }
    await Helper.delay(28800000, _0x3dd497, "Account " + _0x3dd497.id + " Processing Complete, Restarting in 8 Hours", _0x3b60f0);
    await operation(_0x3dd497, _0x2b49e6, _0x12ec81, _0xfecd96);
  } catch (_0x346b0c) {
    if (_0x346b0c.message.includes("401")) {
      if (_0x3dd497.type == "query") {
        await Helper.delay(0x3e8, _0x3dd497, "Error : " + _0x346b0c.message + ", Query Is Expired, Please Get New Query");
      } else {
        await Helper.delay(0x1388, _0x3dd497, "Error : " + _0x346b0c.message + ", Query Is Expired, Getting New Query in 5 Seconds");
        const _0x3e64a7 = new Telegram();
        await _0x3e64a7.useSession(_0x3dd497.accounts, _0xfecd96);
        const _0x232554 = await _0x3e64a7.client.getMe();
        _0x232554.type = "sessions";
        _0x232554.accounts = _0x3dd497.accounts;
        _0x232554.id = _0x232554.id.value;
        const _0x205e16 = await _0x3e64a7.resolvePeer().then(async () => {
          return await _0x3e64a7.initWebView();
        })["catch"](_0x2fb268 => {
          throw _0x2fb268;
        });
        const _0x5d4c74 = Helper.queryToJSON(_0x205e16);
        await _0x3e64a7.disconnect();
        await Helper.delay(0x1388, _0x232554, "Successfully get new query");
        await operation(_0x232554, _0x205e16, _0x5d4c74, _0xfecd96);
      }
    } else {
      await Helper.delay(0x1388, _0x3dd497, "Error : " + _0x346b0c.message + ", Retrying after 5 Seconds");
      await operation(_0x3dd497, _0x2b49e6, _0x12ec81, _0xfecd96);
    }
  }
}
let init = false;
async function startBot() {
  return new Promise(async (_0x1b6746, _0x4ab974) => {
    try {
      a0_0x453699.info("BOT STARTED");
      const _0x45c8a4 = await new Telegram();
      if (init == false) {
        await _0x45c8a4.init();
        init = true;
      }
      const _0x1be689 = Helper.getSession('accounts');
      const _0x17cbdb = [];
      if (proxyList.length > 0x0) {
        if (_0x1be689.length != proxyList.length) {
          _0x4ab974("You have " + _0x1be689.length + " Session but you provide " + proxyList.length + " Proxy");
        }
      }
      for (const _0x40795a of _0x1be689) {
        const _0x3ebd90 = _0x1be689.indexOf(_0x40795a);
        const _0x3856dc = proxyList.length > 0x0 ? proxyList[_0x3ebd90] : undefined;
        if (!_0x40795a.includes("query")) {
          await _0x45c8a4.useSession('accounts/' + _0x40795a, _0x3856dc);
          _0x45c8a4.session = _0x40795a;
          const _0x1940f1 = await _0x45c8a4.client.getMe();
          _0x1940f1.type = "sessions";
          _0x1940f1.accounts = 'accounts/' + _0x40795a;
          _0x1940f1.id = _0x1940f1.id.value;
          const _0x513c83 = await _0x45c8a4.resolvePeer().then(async () => {
            return await _0x45c8a4.initWebView();
          })["catch"](_0x5f3e9d => {
            throw _0x5f3e9d;
          });
          const _0x1f4092 = Helper.queryToJSON(_0x513c83);
          await _0x45c8a4.disconnect();
          _0x17cbdb.push([_0x1940f1, _0x513c83, _0x1f4092, _0x3856dc]);
        } else {
          const _0x5330cc = Helper.readQueryFile("accounts/" + _0x40795a + "/query.txt");
          const _0x708719 = Helper.queryToJSON(_0x5330cc);
          const _0x120e93 = _0x708719.user;
          _0x120e93.type = "query";
          _0x120e93.firstName = _0x120e93.first_name;
          _0x120e93.lastName = _0x120e93.last_name;
          _0x17cbdb.push([_0x120e93, _0x5330cc, _0x708719, _0x3856dc]);
        }
      }
      const _0x332c9e = _0x17cbdb.map(async _0x27dbb6 => {
        await operation(_0x27dbb6[0x0], _0x27dbb6[0x1], _0x27dbb6[0x2], _0x27dbb6[0x3]);
      });
      await Promise.all(_0x332c9e);
      _0x1b6746();
    } catch (_0x5c6a04) {
      a0_0x453699.info("BOT STOPPED");
      a0_0x453699.error(JSON.stringify(_0x5c6a04));
      _0x4ab974(_0x5c6a04);
    }
  });
}
(async () => {
  try {
    a0_0x453699.clear();
    a0_0x453699.info('');
    a0_0x453699.info("Application Started");
    console.log("Clayton BOT");
    console.log();
    Helper.showSkelLogo();
    await startBot();
  } catch (_0x8563eb) {
    a0_0x58c1ea.clear();
    a0_0x58c1ea.clearInfo();
    console.log("Error During executing bot", _0x8563eb);
    await startBot();
  }
})();