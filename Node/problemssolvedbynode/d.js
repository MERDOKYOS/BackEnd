var AAfirst = 12;
var AAsomefunction = () => {
  let first = {
    Asec : 14,
    call(){
        console.log(this.Asec);
    }
  }
  
  first.call();
}

(function AAsomefunction() {
  let Bsec = 15;
  console.log(Bsec);  
})() ;

