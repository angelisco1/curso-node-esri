function fn() {
  const c = 'eee'
  var a = 1;
  let b = 1;
  if (true) {
    var a = 2;
    let b = 2;
    console.log(a, b, c);
  }
  console.log(a, b, c);
  // c = 'aaa'
}

const arNums = [1, 2, 3];
arNums.push(4);
// arNums = [2, 3]
console.log(arNums);

const persona = {nombre: 'Angel', apellido: 'Villalba'};
persona.nombre = 'AAAA';
persona = {nombre: 'AAAA'};
console.log(persona);

// const num = 1;
// num++;
// console.log(num);

fn();