export class User {
  constructor(name, password, balance, spendDays, bonusPerTime, charactors) {
    this.name = name;
    this.password = password;
    this.balance = balance;
    this.spendDays = spendDays;
    this.bonusPerTime = bonusPerTime;
    this.charactors = charactors;
  }
  increaseBalanceByClick() {
    this.balance += 2000;
  }
  increaseBalancePerTime() {
    this.balance += 100;
    this.balance += this.bonusPerTime;
  }
  increaseSpendDaysPerTime() {
    this.spendDays += 1;
  }
}
