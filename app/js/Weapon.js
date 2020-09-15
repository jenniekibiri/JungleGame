import availableCell from './helper.js'
// weapon class
export class Weapons {
  constructor(name, image, damage) {
    this.name = name;
    this.image = image;
    this.damage = damage;
  }

  // set weapons on the the grid
  setWeaponposition() {
    cell = availableCell();
    arr[cell] = this.name;
    const weaponBox = document.getElementById(cell);
    weaponBox.classList.add(this.name);
  }
}