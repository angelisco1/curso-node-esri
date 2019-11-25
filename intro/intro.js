// const p = {
//   nombre: 'Angel',
//   addApellido: function(apellido) {
//     this.apellido = apellido;
//     // var self = this
//     // const mostrar = function () {
//     //   console.log(self);
//     // }
//     const mostrar = () => {
//       console.log(this);
//     }
//     mostrar();
//   }
// }

// p.addApellido('Villalba');


// function hazAlgo() {
//   console.log(Math.random());
// }

// setTimeout(hazAlgo, 2000);


// console.log('1:' + Math.random());
// setTimeout(() => {
//   console.log('2:' + Math.random());
//   console.log('3:' + Math.random());
// }, 2000);

// fun setTimeout(cb) {
//   sleep 2seg
//   cb()
// }


function getProm() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const msg = 'Un mensaje';
      resolve(msg);
    }, 2000);
  })
}

function getOtraProm(msg) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve(msg + '!');
      reject('Hay un error');
    }, 1000)
  })
}

getProm()
  .then((msg) => {
    console.log(msg);
    return getOtraProm(msg)
  })
  .then((newMsg) => {
    console.log(newMsg);
  })
  .catch((err) => {
    console.error(err);
  })

// Promise.all()
