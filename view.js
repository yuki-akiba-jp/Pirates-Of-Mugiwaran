import { config, charactors } from "./config.js";
import { Charactor } from "./charactor.js";
import { User } from "./user.js";

export class View {
  static updateUserInfoInMainPageInterval;
  static addSaveBtnFunc(user) {
    let saveBtn = document.querySelectorAll(".save-btn")[0];
    saveBtn.addEventListener("click", () => {
      localStorage.setItem(user.name, JSON.stringify(user));
      alert("your data is saved");
    });
  }
  static addSignOutBtnFunc(user) {
    let signOut = document.querySelectorAll(".signout-btn")[0];
    signOut.addEventListener("click", () => {
      confirm(
        "if you didn't save data, your data is going to be discarded. is it ok?"
      );
      this.claerUpdateUserInfoInMainPage();
      this.createLoginPage();
    });
  }

  static updateUserInfoInMainPagePerSec(user) {
    this.updateUserInfoInMainPageInterval = setInterval(() => {
      user.increaseBalancePerTime();
      user.increaseSpendDaysPerTime();
      this.updateUserInfoInMainPageHelper(user);
    }, 1000);
  }
  static claerUpdateUserInfoInMainPage() {
    clearInterval(this.updateUserInfoInMainPageInterval);
  }

  static createLoginPage() {
    let container = document.createElement("div");
    container.innerHTML = `
        <div
      class="vh-100 bg-gray align-items-center justify-content-center d-flex"
    >
      <div class="bg-white col-3">
        <form>
          <div class="mb-3 ">
            <label for="username" class="form-label">username</label>
            <input type="text" class="form-control inputUsername" name="username" value="aaa" required />
            <div id="" class="form-text"></div>
          </div>
          <div class="mb-3 ">
            <label for="password" class="form-label">Password</label>
            <input type="password" name="password" class="form-control inputPassword" value="aaa"id="password" required />
          </div>
          <div class="buttons mb-3">
            <button type="button" class="btn btn-outline-primary mr-3 loginBtn"> login </button>
            <button type="button" class="btn btn-primary registerBtn">register</button>
          </div>
        </form>
      </div>
    </div>
  </div>
    `;

    config.loginPage.append(container);

    let loginBtn = document.querySelectorAll(".loginBtn")[0];

    loginBtn.addEventListener("click", () => {
      this.loginUser();
    });

    let registerBtn = document.querySelectorAll(".registerBtn")[0];
    registerBtn.addEventListener("click", () => {
      this.registerUser();
    });
  }

  static hideAllPage() {
    for (let [key, value] of Object.entries(config)) {
      value.innerHTML = "";
    }
  }

  static updateUserInfoInMainPageHelper(user) {
    let userBalance = document.querySelectorAll(".user-balance")[0];
    userBalance.innerHTML = `balance:$${user.balance}`;
    let spendDays = document.querySelectorAll(".user-spendDays")[0];
    spendDays.innerHTML = `spend days: ${user.spendDays}`;
  }

  static createBasePage(user) {
    let container = document.createElement("div");
    container.innerHTML = `
    <div class="vh-100 bg-gray align-items-center justify-content-center d-flex" >
      <div class="bg-lightgreen col-8 d-flex flex-wrap">
        <div class="balanceInfo col-8">
          <h2 class="user-balance">balance:$${user.balance}</h2>
        </div>
        <div class="userInfo text-right col-4">
          <h3>username: ${user.name}</h3>
          <h3 class="user-spendDays">spend days: ${user.spendDays}</h3>
          <i class="icon-signout icon-3x signout-btn"></i>
          <i class="icon-save save-btn icon-3x"></i> 
        </div>
        <div class="earn col-4 justify-content-center align-items-center d-flex">
        <div>
          <h2>Click Here</h2>
          <h2>To Earn $2000</h2>
          <img src="./images/treasure_box.png" class="treasure_box">
        </div>

        </div>
        <div style="height: 20rem " class="d-flex col-8  justify-content-center">
          <div class="charactors"></div>
          <div class="charctorsInfo d-flex align-items-center bg-lightblue"></div>
        </div>
      </div>
    </div>
    `;

    return container;
  }
  static createMainPage(user) {
    window.history.pushState({}, document.title, window.location.pathname);
    this.hideAllPage();
    let container = this.createBasePage(user);

    config.mainPage.append(container);

    let charactorsDiv = document.querySelectorAll(".charactors")[0];
    charactorsDiv.classList.add("col-12", "font13");
    for (let charactor of user.charactors) {
      let charactorDiv = charactor.createCharactorDiv();

      charactorDiv.addEventListener("click", () => {
        charactorsDiv.classList.remove("col-12");
        this.claerUpdateUserInfoInMainPage();
        this.createCharctorsInfoPage(charactor, user);
      });
      charactorsDiv.append(charactorDiv);
    }
    let treasure_box = document.querySelectorAll(".treasure_box")[0];

    treasure_box.addEventListener("click", () => {
      user.increaseBalanceByClick();
    });
    this.addSaveBtnFunc(user);
    this.addSignOutBtnFunc(user);
    this.updateUserInfoInMainPagePerSec(user);
  }

  static createCharctorsInfoPage(charactor, user) {
    this.hideAllPage();
    let container = this.createBasePage(user);
    config.charctorsInfoPage.innerHTML = "";
    config.charctorsInfoPage.append(container);

    let charctorsInfo = document.querySelectorAll(".charctorsInfo")[0];
    charctorsInfo.classList.add("col-12", "font13");
    charctorsInfo.innerHTML = `
              <div class="col-12 d-flex align-items-center justify-content-center">
                <img src="${charactor.imgUrl}" class="charactor-image col-3" />
                <div class="text-right">
                  <div>${charactor.name}</div>
                  <div>bounty: $${charactor.bounty}</div>
                  <div>interest: ${charactor.interestPercentage}%</div>
                  <form>
                    <div class="form-group">
                      <label for="amount of charactor">how many charactor do you  take in your ship?</label>
                      <input
                        type="number"
                        class="form-control charactor-amount"
                        id="inputNumber"
                        placeholder=""
                      />
                    <button type="button" class="backToMainPageBtn btn btn-outline-primary">
                      back
                    </button>
                    <button type="button" class="confirmBtn btn btn-primary">
                      confirm
                    </button>
                    </div>
                  </form>
                </div>
            </div>
    `;

    let charactorAmountInputTag =
      document.querySelectorAll(".charactor-amount")[0];
    charactorAmountInputTag.value = Math.floor(user.balance / charactor.bounty);
    let confirmBtn = document.querySelectorAll(".confirmBtn")[0];

    confirmBtn.addEventListener("click", () => {
      let charactorAmount = parseInt(
        document.querySelectorAll(".charactor-amount").item(0).value
      );
      if (isNaN(charactorAmount)) {
        alert("enter number");
        return;
      }

      if (charactor.bounty * charactorAmount <= user.balance) {
        user.balance -= charactor.bounty * charactorAmount;
        user.bonusPerTime += Math.floor(
          (charactor.bounty * charactorAmount * charactor.interestPercentage) /
            100
        );

        charactor.amountOfCrew += charactorAmount;
        charctorsInfo.classList.remove("col-12");
        this.createMainPage(user);
      } else {
        alert("you can't take this amount of crew");
      }
    });
    this.addSaveBtnFunc(user);
    this.addSignOutBtnFunc(user);

    let backToMainPageBtn = document.querySelectorAll(".backToMainPageBtn")[0];
    backToMainPageBtn.addEventListener("click", () => {
      this.createMainPage(user);
    });
  }

  static registerUser() {
    let inputUsername = document
      .querySelectorAll(".inputUsername")
      .item(0).value;

    let inputPassword = document
      .querySelectorAll(".inputPassword")
      .item(0).value;
    if (inputUsername == "" || inputPassword == "") return;

    if (
      JSON.parse(localStorage.getItem(inputUsername)) != null &&
      JSON.parse(localStorage.getItem(inputUsername))["name"] == inputUsername
    ) {
      alert("this username is already used");
      return;
    }

    let initialbalance = 0;
    const user = new User(inputUsername, inputPassword, 0, 0, 0, charactors);

    localStorage.setItem(user.name, JSON.stringify(user));

    this.createMainPage(user);
  }

  static loginUser() {
    let inputUsername = document
      .querySelectorAll(".inputUsername")
      .item(0).value;

    let inputPassword = config.loginPage
      .querySelectorAll(".inputPassword")
      .item(0).value;

    let username = JSON.parse(localStorage.getItem(inputUsername))["name"];
    let userPassword = JSON.parse(localStorage.getItem(inputUsername))[
      "password"
    ];

    let userBalance = JSON.parse(localStorage.getItem(inputUsername))[
      "balance"
    ];
    let userSpendDays = JSON.parse(localStorage.getItem(inputUsername))[
      "spendDays"
    ];
    let userBonusPerTime = JSON.parse(localStorage.getItem(inputUsername))[
      "bonusPerTime"
    ];
    let userCharactors = [];
    let userCharactorsJson = JSON.parse(localStorage.getItem(inputUsername))[
      "charactors"
    ];
    for (let userCharactorJson of userCharactorsJson) {
      const charactor = new Charactor(
        userCharactorJson["name"],
        userCharactorJson["bounty"],
        userCharactorJson["interestPercentage"],
        userCharactorJson["imgUrl"],
        userCharactorJson["amountOfCrew"]
      );
      userCharactors.push(charactor);
    }

    const user = new User(
      username,
      userPassword,
      userBalance,
      userSpendDays,
      userBonusPerTime,
      userCharactors
    );

    if (user.password == inputPassword) {
      this.createMainPage(user);
    } else {
      alert("username or password is wrong");
      return;
    }
  }
  static initGame() {
    this.createLoginPage();
  }
}
