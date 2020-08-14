 //variables
  const  map = document.getElementById('map')
  var cell;
  var arr=[]


 function createMap(numberCells){
     for(i=0;i<numberCells;i++){
         gridCells = document.createElement('div')
         gridCells.id=i
         gridCells.classList.add('grid')
         map.appendChild(gridCells)
     }
 }
 createMap(100)

function weapons(name,image,damage){
this.name=name;
this.image=image;
this.damage=damage;

}
weapons.prototype.setWeaponposition=function(){
cell=availableCell()
arr[cell]=this.name
const weaponBox=document.getElementById(cell)
weaponBox.classList.add(this.name)
}

//instantiate the objects
const sword = new weapons('sword','sword.png',20)
const dagger = new weapons('dagger','dagger.png',12)
const gun= new weapons('gun','gun.png',15)
const bow = new weapons('bow','bow.png',10)
sword.setWeaponposition()
dagger.setWeaponposition()
gun.setWeaponposition()
bow.setWeaponposition()
//findAvailableCell
function availableCell(){
    do{
        cell=Math.floor((Math.random()*100))

    }
    while(!arr[cell]==null)
    return cell

}


