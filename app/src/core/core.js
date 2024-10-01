import { API } from '../api/api.js';
import { Helper } from '../utils/helper.js';
import '../utils/logger.js';
export class Core extends API {
  constructor(_0x4f6328, _0x3d5d57, _0x238ad6, _0x38fc02) {
    super(_0x3d5d57, "https://tonclayton.fun", _0x38fc02);
    this.account = _0x4f6328;
    this.query = _0x3d5d57;
    this.queryObj = _0x238ad6;
  }
  async ["login"](_0x50a64c = false) {
    try {
      if (_0x50a64c) {
        await Helper.delay(0x1f4, this.account, "Try to Login...", this);
      }
      const _0x1587f7 = await this.fetch("/api/user/auth", 'POST', undefined);
      if (_0x1587f7.status == 0xc8) {
        if (_0x50a64c) {
          await Helper.delay(0x1f4, this.account, "Successfully Login", this);
        }
        this.user = _0x1587f7.user;
        this.dailyClaimToday = _0x1587f7.dailyClaimToday;
      } else {
        if (_0x50a64c) {
          await Helper.delay(0x1f4, this.account, "Failed To Login", this);
        }
      }
    } catch (_0x5dfdf7) {
      throw _0x5dfdf7;
    }
  }
  async ["start"](_0x1b18cc = false) {
    try {
      if (_0x1b18cc) {
        await Helper.delay(0x1f4, this.account, "Try to Claim Daily Reward...", this);
      }
      const _0x4b5a42 = await this.fetch('/api/user/daily-claim', "POST", undefined);
      if (_0x4b5a42.status == 0xc8) {
        if (_0x1b18cc) {
          await Helper.delay(0x1f4, this.account, "Successfully Claim Daily", this);
        }
      } else {
        if (_0x1b18cc) {
          await Helper.delay(0x1f4, this.account, "Failed : " + _0x4b5a42.error, this);
        }
      }
    } catch (_0x2efadb) {
      throw _0x2efadb;
    }
  }
  async ['getUserStats'](_0x399bb6 = false) {
    try {
      if (_0x399bb6) {
        await Helper.delay(0x1f4, this.account, "Getting User Stats...", this);
      }
      const _0x233219 = await this.fetch("/api/user/stats", "POST", undefined);
      if (_0x233219.status == 0xc8) {
        if (_0x399bb6) {
          await Helper.delay(0x1f4, this.account, "Successfully Get User Stats", this);
        }
        this.stats = _0x233219;
      } else {
        await Helper.delay(0x1f4, this.account, "Failed to get user stats", this);
      }
    } catch (_0x412821) {
      throw _0x412821;
    }
  }
  async ["getDefaultTask"](_0x36bbee = false) {
    try {
      if (_0x36bbee) {
        await Helper.delay(0x1f4, this.account, "Getting Task...", this);
      }
      const _0x21ab2c = await this.fetch('/api/tasks/default-tasks', "GET", undefined);
      if (_0x21ab2c.status == 0xc8) {
        const _0x486cc1 = _0x21ab2c.filter(_0x4f8b97 => _0x4f8b97.hasOwnProperty("task_id"));
        this.task.push(..._0x486cc1);
        if (_0x36bbee) {
          await Helper.delay(0x1f4, this.account, "Successfully Get Task", this);
        }
      }
    } catch (_0x1f8f19) {
      await Helper.delay(0x3e8, this.account, "Something wrong with default tasks, skipping.", this);
    }
  }
  async ["getDailyTask"](_0xd32810 = false) {
    try {
      if (_0xd32810) {
        await Helper.delay(0x1f4, this.account, "Getting Daily Task...", this);
      }
      const _0x5937c5 = await this.fetch("/api/tasks/daily-tasks", "GET", undefined);
      if (_0x5937c5.status == 0xc8) {
        const _0xd37ce6 = _0x5937c5.filter(_0x362576 => _0x362576.hasOwnProperty("task_id"));
        this.task.push(..._0xd37ce6);
        if (_0xd32810) {
          await Helper.delay(0x1f4, this.account, "Successfully Get Daily Task", this);
        }
      }
    } catch (_0xb20b4f) {
      await Helper.delay(0x3e8, this.account, "Something wrong with daily tasks, skipping.", this);
    }
  }
  async ["getPartner"](_0x2eae96 = false) {
    try {
      if (_0x2eae96) {
        await Helper.delay(0x1f4, this.account, "Getting Partner Task...", this);
      }
      const _0x4301c9 = await this.fetch("/api/tasks/partner-tasks", "GET", undefined);
      if (_0x4301c9.status == 0xc8) {
        const _0x391cb7 = _0x4301c9.filter(_0x35cdc2 => _0x35cdc2.hasOwnProperty('task_id'));
        this.task.push(..._0x391cb7);
        if (_0x2eae96) {
          await Helper.delay(0x1f4, this.account, "Successfully Get Partner Task", this);
        }
      }
    } catch (_0x6b73e) {
      await Helper.delay(0x3e8, this.account, "Something wrong with partner tasks, skipping.", this);
    }
  }
  async ['startTask'](_0x26c356) {
    try {
      await Helper.delay(0x1f4, this.account, "Starting Task " + _0x26c356.task.description + "...", this);
      const _0x1d1723 = {
        'task_id': _0x26c356.task_id
      };
      const _0x1c90e1 = await this.fetch("/api/tasks/complete", "POST", undefined, _0x1d1723);
      if (_0x1c90e1.status == 0xc8) {
        await Helper.delay(0x1f4, this.account, "Task " + _0x26c356.task.description + " Started Successfully", this);
        await this.claimTask(_0x26c356);
      } else {
        await Helper.delay(0x1f4, this.account, _0x1c90e1.error, this);
      }
    } catch (_0x1ca385) {
      throw _0x1ca385;
    }
  }
  async ["claimTask"](_0x52009e) {
    try {
      await Helper.delay(0x1f4, this.account, "Completing Task " + _0x52009e.task.description + '...', this);
      const _0xfbe398 = {
        'task_id': _0x52009e.task_id
      };
      const _0x1b3598 = await this.fetch("api/tasks/claim", "POST", undefined, _0xfbe398);
      if (_0x1b3598.status == 0xc8) {
        await this.getPartner();
        await this.login();
        await this.getUserStats();
        await Helper.delay(0x1f4, this.account, "Task " + _0x52009e.task.description + " Claimed Got " + _0x1b3598.reward_tokens + " CL...", this);
      } else {
        await Helper.delay(0x1f4, this.account, _0x1b3598.error, this);
      }
    } catch (_0x52db53) {
      await Helper.delay(0x1f4, this.account, "Failed to Claim Task " + _0x52009e.task.description + " Skipping...", this);
    }
  }
  async ["startFarming"]() {
    try {
      await Helper.delay(0x1f4, this.account, "Starting Farming...", this);
      const _0x391bc4 = await this.fetch("/api/user/start", "POST", undefined);
      if (_0x391bc4.status == 0xc8) {
        await Helper.delay(0x1f4, this.account, "Farming Started", this);
      } else {
        await Helper.delay(0x1f4, this.account, "Farming Already Started", this);
      }
    } catch (_0x5e8af2) {
      throw _0x5e8af2;
    }
  }
  async ["claimFarming"]() {
    try {
      await Helper.delay(0x1f4, this.account, "Claiming Farming Reward...", this);
      const _0x6c6528 = await this.fetch("/api/user/claim", 'POST', undefined);
      if (_0x6c6528.status == 0xc8) {
        await Helper.delay(0x1f4, this.account, "Successfully Claim Farming Reward", this);
        await this.login();
        await this.getUserStats();
      } else {
        await Helper.delay(0x7d0, this.account, "Error : " + _0x6c6528.error, this);
      }
    } catch (_0x25a639) {
      throw _0x25a639;
    }
  }
  async ['playTileGame']() {
    try {
      await Helper.delay(0x1f4, this.account, "Start Playing Tile Game...", this);
      const _0x24f3bc = await this.fetch("/api/game/start", "POST", undefined);
      if (_0x24f3bc.status == 0xc8) {
        await Helper.delay(0x1f4, this.account, _0x24f3bc.message, this);
        const _0x3c7dbf = {
          'maxTile': 2048
        };
        const _0x4c9db1 = await this.fetch('/api/game/save-tile', "POST", undefined, _0x3c7dbf);
        await Helper.delay(0x1f4, this.account, _0x4c9db1.message, this);
        await Helper.delay(0xea60, this.account, "Delaying for 60 Second Before game end with max tile score is 2048", this);
        const _0x1fae57 = {
          'multiplier': 0x2
        };
        const _0x431a69 = await this.fetch("/api/game/over", "POST", undefined, _0x1fae57);
        await Helper.delay(0x1388, this.account, "Game finished got " + _0x431a69.earn + " CL and " + _0x431a69.xp_earned + " EXP", this);
        await this.login();
        await this.getUserStats();
      } else {
        await Helper.delay(0x7d0, this.account, "Error : " + _0x24f3bc.error, this);
      }
    } catch (_0x2d474b) {
      throw _0x2d474b;
    }
  }
  async ["playStackGame"]() {
    try {
      await Helper.delay(0x1f4, this.account, "Start Playing Stack Game...", this);
      const _0x5751bd = await this.fetch("/api/stack/start", "POST", undefined);
      if (_0x5751bd.status == 0xc8) {
        await Helper.delay(0x1f4, this.account, "Stack Game Started ", this);
        const _0x5e55ec = {
          'score': 0x0
        };
        for (const _0x302753 of Array(0xc)) {
          _0x5e55ec.score += 0xa;
          await Helper.delay(0x2328, this.account, "Updating Stack Game score to 0", this);
          const _0x2c84c0 = await this.fetch("/api/stack/update", "POST", undefined, _0x5e55ec);
          await Helper.delay(0x1f4, this.account, "Stack Game " + _0x2c84c0.message + " to " + 0x0, this);
        }
        _0x5e55ec.score += 0x1;
        const _0x509455 = await this.fetch('/api/stack/end', 'POST', undefined, _0x5e55ec);
        await Helper.delay(0x1388, this.account, "Game finished got " + _0x509455.earn + " CL and " + _0x509455.xp_earned + " EXP", this);
        await this.login();
      } else {
        await Helper.delay(0x7d0, this.account, "Error : " + _0x5751bd.error, this);
      }
    } catch (_0xe68ede) {
      throw _0xe68ede;
    }
  }
}