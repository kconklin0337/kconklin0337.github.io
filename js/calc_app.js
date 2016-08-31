var Calculator = {
  current: 0,
  memory: 0,
  add: add,
  subtract: subtract,
  multiply: multiply,
  divide: divide,
  result: result,
  reset: reset,
  memAdd: memAdd,
  memSub: memSub,
  memClear: memClear,
  memDisplay: memDisplay,
  squareRoot: squareRoot,
  percentage: percentage,
  backspace: backspace,
}

function add(num){
  this.current += num;
}

function subtract(num){
  this.current -= num;
}

function multiply(num){
  this.current *= num;
}

function divide(num){
  this.current /= num;
}

function result(){
  return this.current;
}

function reset(num){
  this.current = 0;
}

function memAdd(num){
  this.memory += num;
}

function memSub(num){
  this.memory -= num;
}

function memClear(){
  this.memory = 0;
}

function memDisplay(){
  return this.memory;
}

function squareRoot(num){
  this.current = Math.sqrt(num);
}

// function percentCal(num){
//   this.current /100 = num;
// }
function backspace(){
  this.current =  value.length - 1;
  }
