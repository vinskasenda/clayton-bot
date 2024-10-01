import { createLogger, format, transports } from 'winston';
import a5_0x232cc3 from 'fs';
const {
  combine,
  timestamp,
  printf,
  colorize
} = format;
const customFormat = printf(({
  level: _0x19c5b2,
  message: _0x2821fd,
  timestamp: _0x5777cc
}) => {
  return _0x5777cc + " [" + _0x19c5b2 + "]: " + _0x2821fd;
});
class Logger {
  constructor() {
    this.logger = createLogger({
      'level': "debug",
      'format': combine(timestamp({
        'format': "YYYY-MM-DD HH:mm:ss"
      }), colorize(), customFormat),
      'transports': [new transports.File({
        'filename': 'log/app.log'
      })],
      'exceptionHandlers': [new transports.File({
        'filename': "log/app.log"
      })],
      'rejectionHandlers': [new transports.File({
        'filename': "log/app.log"
      })]
    });
  }
  ["info"](_0x2fb6cf) {
    this.logger.info(_0x2fb6cf);
  }
  ["warn"](_0x21bd30) {
    this.logger.warn(_0x21bd30);
  }
  ["error"](_0x2cbe74) {
    this.logger.error(_0x2cbe74);
  }
  ['debug'](_0x4da8b1) {
    this.logger.debug(_0x4da8b1);
  }
  ["setLevel"](_0xf6595f) {
    this.logger.level = _0xf6595f;
  }
  ["clear"]() {
    a5_0x232cc3.truncate("log/app.log", 0x0, _0x315b03 => {
      if (_0x315b03) {
        this.logger.error("Failed to clear the log file: " + _0x315b03.message);
      } else {
        this.logger.info("Log file cleared");
      }
    });
  }
}
export default new Logger();