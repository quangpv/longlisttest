export class PostNumberRandom {
  constructor() {
    this._used = {};
  }

  _randomNumber() {
    return Math.round((Math.abs(Math.random() % 10) + 1) * 1000000000);
  }

  randomNext() {
    while (true) {
      const nextNumber = this._randomNumber();
      if (!this._used.hasOwnProperty(nextNumber)) {
        this._used[nextNumber] = true;
        return nextNumber;
      }
    }
  }
}
