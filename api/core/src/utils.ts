import * as crypto from 'crypto';

export default class Utils {
  static getSha256FromString(content: string) {
    return crypto.createHash('sha256').update(content).digest('hex');
  }
}