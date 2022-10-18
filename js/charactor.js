export class Charactor {
  constructor(name, bounty, interestPercentage, imgUrl, amountOfCrew) {
    this.name = name;
    this.bounty = bounty;
    this.interestPercentage = interestPercentage;
    this.imgUrl = imgUrl;
    this.amountOfCrew = amountOfCrew;
  }
  createCharactorDiv() {
    let container = document.createElement("div");
    container.innerHTML = ` 
          <div class="col-12  d-flex charactor ">
              <img src="${this.imgUrl}" class="charactor-image col-4" />
              <div class="text-right col-8">
                <div>${this.name}</div>
                <div>bounty: $${this.bounty}</div>
                <div>interest: ${this.interestPercentage}%</div>
                <div>amountOfCrew: ${this.amountOfCrew}</div>
          </div>
    `;

    return container;
  }
}
