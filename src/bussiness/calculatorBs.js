const additionBs = (actualBalance, ammount) => actualBalance +ammount


const substractionBs = (actualBalance, ammount) => actualBalance - ammount;

const multiplicationBs = (actualBalance, ammount) => actualBalance * ammount;

const divisionBs = (actualBalance, ammount) => actualBalance / ammount;

const squareRootBs = (actualBalance) => Math.sqrt(actualBalance);


const randomNumberBs = () => console.log('random number')



module.exports = {
  additionBs,
  substractionBs,
  multiplicationBs,
  divisionBs,
  squareRootBs,
  randomNumberBs,
}