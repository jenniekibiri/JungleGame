import Weapons from './weapon.js';

// instantiate the objects
const sword = new Weapons('sword', 'sword.png', 18);
const gun = new Weapons('gun', 'gun.png', 15);
const bow = new Weapons('bow', 'bow.png', 14);
const dagger = new Weapons('dagger', 'dagger.png', 12);

// call the position method
sword.setWeaponposition();
dagger.setWeaponposition();
gun.setWeaponposition();
bow.setWeaponposition();