angular.module('myApp', ['objectTable'])
.controller('boekController', boekController);

boekController.$inject = ['$http', '$timeout']; // minify safe
function boekController($http, $timeout) {
  // 0. Initialisaties
  var vm = this,
      url = 'http://localhost:3000/api/boeken';
  vm.formVisible = false;
  vm.result = '';

  //filterv


  // 1. Boeken ophalen.
  $http({
    method: 'get',
    url   : url
  }).then(function (boeken) {
    vm.boeken = boeken.data;
  }).catch(function (err) {
    alert('Error: er is een fout opgetreden ' + err);
  });

  // 2. Formulier zichtbaar maken
  vm.showForm = function () {
    vm.formVisible = !vm.formVisible;
  };
  // 3. Boek toevoegen
  vm.addBook = function () {
    $http({
      method: 'post',
      url   : url,
      data  : {
        titel : vm.titel,
        auteur: vm.auteur,
        isbn  : vm.isbn
      }
    }).then(function (newBook) {
      vm.boeken.push(newBook.data);
      vm.result = 'Boek toegevoegd!';
      $timeout(function () {
        // reset velden
        vm.formVisible = false;
        vm.result = '';
        vm.titel = vm.auteur = vm.isbn = '';
      }, 1500)
    }).catch(function (err) {
      alert('Error: er is een fout opgetreden ' + err);
    });
  };

  // 4. Boek verwijderen
  vm.deleteBook = function (book) {
    if (confirm(book.titel + ' wordt verwijderd. Weet u het zeker?')) {
      $http({
        method: 'delete',
        url   : url + '/' + book._id
      }).then(function (removed) {
        vm.boeken.forEach(function(huidigBoek, index){
          if(huidigBoek._id === book._id){
            vm.boeken.splice(index, 1);
          }
        });
      }).catch(function (err) {
        alert('Error: er is een fout opgetreden ' + err);
      });
    }
  };
}
