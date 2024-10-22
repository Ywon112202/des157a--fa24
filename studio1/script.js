(function () {

    'use strict';
    console.log("reading js");

    document.querySelector('.open').addEventListener('click' , function(event){
        event.preventDefault();
        document.querySelector('#overlay').className= 'showing';

    });

    document.querySelector('.close').addEventListener('click' , function(event){
        event.preventDefault();
        document.querySelector('#overlay').className= 'hidden';
        
    });

    document,addEventListener('keydown' , function(event){
        if (event.key == 'Escape') {
            document.querySelector('#overlay').className= 'hidden';
        }

    });

   


})();