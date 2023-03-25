// define functions in this file


const stock1 = { //creates stock1 object
    symbol: "GOOGL",//creates symbol property
    name: " Alphabet Inc.", //creates name property
    prices: [200, 198, 202, 197, 203], //creates prices property
    location: { //creates location property
        address: " 1600 Amphitheater Parkway", //creates address property
        city: " Mountain View" //creates city property
    }
}
console.log(`${stock1.name}  Address: //prints stock1 name and address
${stock1.location.address}`); //prints stock1 location address

const stock2 = {}; stock2.symbol = // creates stock2 object
    "GOOGL"; stock2.price = 309.88; //creates symbol and price properties
console.log(`${stock2.symbol}  Open:  ${stock2.price}`); //prints stock2 symbol and price

console.log(stock1); console.log(stock1['name']); //prints stock1 name
console.log(stock1['location'].address); //prints stock1 location address
console.log(stock1['location']['city']); //prints stock1 location city

for (let i = 0; i < stock1.prices.length; i++) { //prints stock1 prices
    console.log(stock1.prices[i]); //prints stock1 prices

    for (let p of stock1.prices) { //prints stock1 prices
        console.log(p);//prints stock1 prices
    }
}
for (let property in stock1) {//prints stock1 properties
    //console.log(property);
    let value = stock1[property]; //creates value variable
    console.log(property + "=" + value); //prints stock1 properties and values
}

const someStocks = [stock1, stock2];//creates someStocks array
for (let i = 0; i < someStocks.length; i++) {//prints someStocks
    console.log(someStocks[i].symbol);
}
for (let ss of someStocks) {//prints someStocks
    console.log(ss.symbol);
}

const portfolio = [//creates portfolia array
    { symbol: "AAPL", price: 138.20, quantity: 20 },
    { symbol: "ADBE", price: 275.20, quantity: 10 },
    { symbol: "GOOGL", price: 95.65, quantity: 5 }
];

for (let item of portfolio) {//prints portfolio
    let worth = item.price * item.quantity;
    console.log(`${item.symbol} = $${worth}`);
}