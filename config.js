import { Charactor } from "./charactor.js";
export const config = {
  loginPage: document.getElementById("loginPage"),
  mainPage: document.getElementById("mainPage"),
  charctorsInfoPage: document.getElementById("charctorsInfoPage"),
};
export const charactors = [
  new Charactor("lufy", 999999999, 20, "./images/luffy.png", 0),
  new Charactor("bruck", 11111111, 5, "./images/bruck.png", 0),
  new Charactor("chopper", 1000, 30, "./images/chopper.png", 0),
  new Charactor("frankey", 777777777, 7, "./images/frankey.png", 0),
  new Charactor("jinbee", 1010101010, 10, "./images/jinbee.png", 0),
  new Charactor("nami", 73737373, 37, "./images/nami.png", 0),
  new Charactor("robin", 252525, 25, "./images/robin.png", 0),
  new Charactor("sanji", 333333, 33, "./images/sanji.png", 0),
  new Charactor("zoro", 66666666, 36, "./images/zoro.png", 0),
];
