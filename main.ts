import chalk from "chalk";
import inquirer from "inquirer";
import Choices from "inquirer/lib/objects/choices.js";

let apiLink="https://v6.exchangerate-api.com/v6/de9aa4036492596363e0ee0d/latest/PKR";

let fetchData= async(data:any)=>{
    let fetchData=await fetch(data);
    let res =await fetchData.json();
    return res.conversion_rates;

};

let data = await fetchData(apiLink);
let countries=Object.keys(data);
let firstCountry=await inquirer.prompt({
    type:"list",
    name:"name",
    message:"enter your first country",
    choices:countries,
});
let userMoney=await inquirer.prompt({
    type:"number",
    name:"rupee",
    message:"enter your ammount",
    
});
console.log(` converting from ${chalk.greenBright.bold(firstCountry.name)}`);

let secondCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "enter your second country",
    choices: countries,

});
let cnv=`https://v6.exchangerate-api.com/v6/de9aa4036492596363e0ee0d/pair/${firstCountry.name}/${secondCountry}`;

let cnvData= async(data:any)=>{
    let cnvData=await fetch(data);
    let res =await cnvData.json();
    return res.conversion_rate;

};
let cnvRate =await cnvData(cnv)
let convertedRate=userMoney.rupee *cnvRate;
console.log(`your${chalk.greenBright.bold(firstCountry.name)}${chalk.bold.greenBright(userMoney.rupee)}in${chalk.bold.greenBright(secondCountry.name)}is${chalk.bold.greenBright(convertedRate)}`);
