import a3_0x46c099 from 'input';
import { Helper } from '../utils/helper.js';
import { Api, TelegramClient } from 'telegram';
import { StoreSession } from 'telegram/sessions/StoreSession.js';
import a3_0x507b1f from '../utils/logger.js';
import { FloodWaitError } from 'telegram/errors/RPCErrorList.js';
import { Config } from '../../config/config.js';
import { HttpsProxyAgent } from 'https-proxy-agent';
export class Telegram {
  ['storeSession'];
  constructor() {
    this.accountName = "accounts";
    this.url = 'https://tonclayton.fun/';
    this.bot = "claytoncoinbot";
  }
  async ['init']() {
    try {
      await this.onBoarding();
    } catch (_0x52bcad) {
      console.log(_0x52bcad);
      a3_0x507b1f.error('' + JSON.stringify(_0x52bcad));
      throw _0x52bcad;
    }
  }
  async ["onBoarding"]() {
    try {
      let _0x535c46 = "Welcome to Bot \nBy : Widiskel \n \nLets getting started.\n\nYour Session List:\n";
      const _0x540e4a = Helper.getSession("accounts");
      if (_0x540e4a.length == 0x0) {
        _0x535c46 += '<empty>';
      } else {
        for (const _0x470106 of _0x540e4a) {
          _0x535c46 += "- " + _0x470106 + "\n";
        }
      }
      _0x535c46 += "\n \nPlease Choose a menu: \n";
      _0x535c46 += "\n \n1. Create Account \n2. Reset Account \n3. Start Bot\n4. Query modification\n \nInput your choice :";
      const _0x1de6f7 = await a3_0x46c099.text(_0x535c46);
      if (_0x1de6f7 == 0x1) {
        await this.accountType();
      } else {
        if (_0x1de6f7 == 0x2) {
          Helper.resetAccounts();
          await Helper.delay(0xbb8);
          await this.onBoarding();
        } else {
          if (_0x1de6f7 == 0x3) {
            if (Helper.getSession(this.accountName)?.["length"] == 0x0) {
              console.info("You don't have any Accounts, please create first");
              await this.onBoarding();
            }
          } else if (_0x1de6f7 == 0x4) {
            await this.queryModificaiton();
          } else {
            console.error("Invalid input, Please try again");
            await this.onBoarding();
          }
        }
      }
    } catch (_0x330aa9) {
      throw _0x330aa9;
    }
  }
  async ["queryModificaiton"]() {
    try {
      const _0x5478c2 = Helper.getSession("accounts");
      const _0x5e5965 = _0x5478c2.filter(_0x2c8cd3 => _0x2c8cd3.includes("query"));
      let _0x109a51 = "Your Query Account List :\n \n";
      for (const _0x1fce0a of _0x5e5965) {
        _0x109a51 += _0x5478c2.indexOf(_0x1fce0a) + 0x1 + ". " + _0x1fce0a + "\n";
      }
      if (_0x5e5965.length == 0x0) {
        console.log("You dont have any Query Account.");
        await this.onBoarding();
      } else {
        _0x109a51 += "\n \nPlease Select Query Account for modification:";
      }
      const _0x37715e = await a3_0x46c099.text(_0x109a51);
      if (_0x5e5965[_0x37715e - 0x1] != undefined) {
        const _0x5cea61 = _0x5e5965[_0x37715e - 0x1];
        this.accountName = 'accounts/' + _0x5cea61;
        const _0x2856a7 = "Old Query : " + Helper.readQueryFile(this.accountName + "/query.txt") + "\n \nPlease Enter New Query ";
        const _0xb34565 = await a3_0x46c099.text(_0x2856a7);
        await Helper.saveQueryFile(this.accountName, _0xb34565);
        await Helper.delay(0xbb8);
        await this.onBoarding();
      } else {
        console.error("Invalid input, Please try again");
        await this.queryModificaiton();
      }
    } catch (_0x3564fb) {
      throw _0x3564fb;
    }
  }
  async ["sessionCreation"]() {
    try {
      if (Config.TELEGRAM_APP_ID == undefined || Config.TELEGRAM_APP_HASH == undefined) {
        throw new Error("Please configure your TELEGRAM_APP_ID and TELEGRAM_APP_HASH first");
      }
      const _0xeb47dc = Helper.getSession("accounts");
      let _0x373ca8 = "Your Account List :\n \n";
      for (const _0x19cf37 of _0xeb47dc) {
        _0x373ca8 += _0xeb47dc.indexOf(_0x19cf37) + 0x1 + ". " + _0x19cf37 + "\n";
      }
      if (_0xeb47dc.length == 0x0) {
        _0x373ca8 += "<empty> \n \nPlease enter Session Name :";
      } else {
        _0x373ca8 += "\n \nYou already have sessions, cancel(CTRL+C) or create new Session :";
      }
      const _0x5ecdb5 = await a3_0x46c099.text(_0x373ca8);
      this.accountName = Helper.createDir("sessions-" + _0x5ecdb5);
      await this.useSession(this.accountName);
      await this.disconnect();
      a3_0x507b1f.info("Session " + this.accountName + " - Created");
      console.log("Session " + _0x5ecdb5 + " - Created, Please Restart The Bot Again");
      this.storeSession.save();
      await Helper.delay(0xbb8);
      process.exit();
    } catch (_0x2ce219) {
      throw _0x2ce219;
    }
  }
  async ['queryCreation']() {
    try {
      const _0x37e4c5 = Helper.getSession("accounts");
      let _0xcce349 = "Your Account List :\n \n";
      for (const _0xad394a of _0x37e4c5) {
        _0xcce349 += _0x37e4c5.indexOf(_0xad394a) + 0x1 + ". " + _0xad394a + "\n";
      }
      if (_0x37e4c5.length == 0x0) {
        _0xcce349 += "<empty> \n \nPlease enter Account Name :";
      } else {
        _0xcce349 += "\n \nYou already have Account, cancel(CTRL+C) or create new Account :";
      }
      const _0x4d45c7 = await a3_0x46c099.text(_0xcce349);
      this.accountName = Helper.createDir("query-" + _0x4d45c7);
      const _0x169a34 = await a3_0x46c099.text("Please Enter Telegram Query : ");
      await Helper.saveQueryFile(this.accountName, _0x169a34);
      a3_0x507b1f.info("Query " + this.accountName + " - Created");
      console.log("Query " + _0x4d45c7 + " - Created, Please Restart The Bot Again");
      await Helper.delay(0xbb8);
      process.exit();
    } catch (_0x1868f8) {
      throw _0x1868f8;
    }
  }
  async ["accountType"]() {
    try {
      const _0x5766b7 = Helper.getSession("accounts");
      let _0x1a1d90 = "Your Account List :\n \n";
      if (_0x5766b7.length > 0x0) {
        for (const _0x545f3d of _0x5766b7) {
          _0x1a1d90 += _0x5766b7.indexOf(_0x545f3d) + 0x1 + ". " + _0x545f3d + "\n";
        }
      } else {
        _0x1a1d90 += "<empty>\n";
      }
      _0x1a1d90 += "\n \nAvailable Account Type: \n1. Session \n2. Query\n \nPlease Entery Your Choice : ";
      const _0x1586ee = await a3_0x46c099.text(_0x1a1d90);
      if (_0x1586ee == 0x1) {
        await this.sessionCreation();
      } else if (_0x1586ee == 0x2) {
        await this.queryCreation();
      } else {
        console.log("Invalid Input");
        await this.accountType();
      }
    } catch (_0x3aa519) {
      throw _0x3aa519;
    }
  }
  async ["useSession"](_0x3d0880, _0x44e1c7) {
    try {
      this.proxy = _0x44e1c7;
      const _0x5be6a4 = {
        'connectionRetries': 0x5
      };
      if (this.proxy) {
        _0x5be6a4.agent = new HttpsProxyAgent(this.proxy);
      }
      this.storeSession = new StoreSession(_0x3d0880);
      this.client = new TelegramClient(this.storeSession, Config.TELEGRAM_APP_ID, Config.TELEGRAM_APP_HASH, _0x5be6a4);
      this.storeSession.save();
      await this.client.start({
        'phoneNumber': async () => await a3_0x46c099.text("Enter your Telegram Phone Number ?"),
        'password': async () => await a3_0x46c099.text("Enter your Telegram Password?"),
        'phoneCode': async () => await a3_0x46c099.text("Enter your Telegram Verification Code ?"),
        'onError': _0x1fc536 => {
          console.log(_0x1fc536.message);
        }
      });
      console.log();
    } catch (_0x449629) {
      throw _0x449629;
    }
  }
  async ["resolvePeer"]() {
    try {
      a3_0x507b1f.info("Session " + this.session + " - Resolving Peer");
      while (this.peer == undefined) {
        try {
          this.peer = await this.client.getEntity(this.bot);
          break;
        } catch (_0x50ade2) {
          if (_0x50ade2 instanceof FloodWaitError) {
            const _0x256f7f = _0x50ade2.seconds;
            a3_0x507b1f.warn(this.client.session.serverAddress + " | FloodWait " + _0x50ade2);
            a3_0x507b1f.info(this.client.session.serverAddress + " | Sleep " + _0x256f7f + 's');
            await Helper.delay((_0x256f7f + 0x3) * 0x3e8);
          } else {
            throw _0x50ade2;
          }
        }
      }
    } catch (_0x355b58) {
      throw _0x355b58;
    }
  }
  async ["disconnect"]() {
    await this.client.disconnect();
    await this.client.destroy();
    this.peer = undefined;
    this.accountName = undefined;
  }
  async ['initWebView']() {
    try {
      const _0x31659a = await this.client.invoke(new Api.messages.RequestWebView({
        'peer': this.peer,
        'bot': this.peer,
        'fromBotMenu': true,
        'url': this.url,
        'platform': "android"
      }));
      a3_0x507b1f.info("Session " + this.session + " - Webview Connected");
      const _0x47da60 = _0x31659a.url;
      return Helper.getTelegramQuery(_0x47da60, 0x3);
    } catch (_0x3b90fe) {
      throw _0x3b90fe;
    }
  }
}