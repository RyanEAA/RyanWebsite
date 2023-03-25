/* add code below this */
//creates an array of days
const days = new Array("Mon", "Tues", "Wed", "Thur", "Fri");
//creates an array of months
const months = ['jan', 'feb', 'mar'];
//creates an array of years
const years = [];
//adds 2010 to years array
years[0] = 2010;

//adds 2011 to years array
years[1] = 2011;

//prints days, months, and years to console
console.log(days);
console.log(months);
console.log(years);

//prints length of months to console
console.log(months.length);
//days.push("Sat");
days.push("Sat"); //adds Sat to end of days array
days.unshift("Sun"); //adds Sun to beginning of days array
console.log(days); //prints days to console
months.pop(); //removes last element of months array
console.log(months); //prints months to console

for (let i = 0; i < days.length; i++) { //loops through days array
  console.log('index=' + i + ' value=' + days[i]) //prints index and value of days array

  for (let mon of months) { //loops through months array
    console.log(mon); //prints months array
  }
}
