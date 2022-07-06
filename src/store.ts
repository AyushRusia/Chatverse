export class inMemoryStore {
  onlineUser: Map<string, string>;
  constructor() {
    this.onlineUser = new Map();
  }

  setValue(id: string) {
    this.onlineUser.set(id, 'online');
  }

  getAllValue() {
    let res = new Array<string>();
    this.onlineUser.forEach((val, key) => {
      res.push(key);
    });
    return res;
  }

  deleteValue(id: string) {
    this.onlineUser.delete(id);
  }
}
