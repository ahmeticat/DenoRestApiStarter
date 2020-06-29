export class BaseSchema {
  createdTime: Date;
  isActive = true;
  isDeleted = false;
  constructor() {
    this.createdTime = new Date();
  }
}
