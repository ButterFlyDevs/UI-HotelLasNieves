/*
function myConfirmation() {
    console.log('Desaprovisionando el sistema.');

    return 'Are you sure you want to quit?';
}

window.onbeforeunload = myConfirmation;
*/

function aprovisionar(){

  console.log('Aprovisionando sistema!');

  localStorage.setItem('prueba', 'valorPrueba');
  var value = localStorage.getItem('prueba');
  //alert(value);
};
