import { differenceInCalendarDays, parseISO } from "date-fns";
import { hotels , discountHotel } from "./data.js";
import readline from "readline";


export function consecutiveDate(dates){
  for(let i = 1;i < dates.length; i++){
    const previousDay = parseISO(dates[i-1]);
    const actualDay = parseISO(dates[i]);
    console.log("dia anterior" + previousDay)
    console.log("dia atual" + actualDay)
    const difference = differenceInCalendarDays(actualDay,previousDay);
    if(difference !== 1){
      return false;// não é consecutivo
    }
    return true// é consecutivo
  }  

}
const datas1 = ["2025-09-20", "2025-09-21", "2025-09-22", "2025-09-25"];
const datas2 = ["2025-09-20", "2025-09-22", "2025-09-23","2025-09-24","2025-09-25"];
console.log(consecutiveDate(datas1))
console.log(consecutiveDate(datas2))

export function validateDates(dates) {

  return dates.map((data) => {

    const cleanDateString = data.replace(/\(.*\)/, "");
    const parsedDate = new Date(cleanDateString);

    console.log(parsedDate)
    if(!isNaN(parsedDate.getTime())){
      throw new Error("Invalid date" + data)
    }
    
    const dayIndex = parsedDate.getDay();
    const isWeekend = dayIndex === 0 || dayIndex === 6;
    return isWeekend;
  });
}


export function hotelsTotalPrice(clientType, weekendFlag, dates) {
  return hotels.map((hotel) => {
    let total = 0;

    const isConsecutive = consecutiveDate(dates)
    console.log(isConsecutive)
    weekendFlag.forEach((wknd) => {
      if (wknd) {
        total += hotel.prices[clientType].weekend;
      } else {
        total += hotel.prices[clientType].weekday;
      }

    });
    return {
      name: hotel.name,
      stars: hotel.stars,
      totalPrice: weekendFlag.length > 3  && isConsecutive ? total - (total * discountHotel[clientType] / 100) : total,
      
    };
  });
}



export function cheaperHotel(hotelsTotalPrice) {
  return hotelsTotalPrice.reduce((cheap, atual) =>
    atual.totalPrice < cheap.totalPrice ||
    (atual.totalPrice === cheap.totalPrice && atual.stars> cheap.stars)
      ? atual
      : cheap
  );
}

export function compareHotel(inputClient) {
  if(inputClient === null){
    throw new Error("Parameter cannot be null")
  }
  const inputParts = inputClient.trim().split(":");
  const clientType = inputParts[0].toLowerCase();
  if(clientType !== "regular" && clientType !== "reward"){
    throw new Error("Invalid client type, use 'Regular' or 'Reward' for client types")
  }

  const dates = inputParts[1].split(",");
  const weekendFlag = validateDates(dates);
  const hotelTotalPrice = hotelsTotalPrice(clientType, weekendFlag, dates);
  const hotel = cheaperHotel(hotelTotalPrice);
  console.log(hotel.name);
  console.log(hotel.totalPrice)
  return `${inputClient}`;
}


// ---- interface terminal ---- {não mexer, dá choque}
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Digite os dados (ou "sair" para encerrar):');

rl.on("line", (answer) => {
  if (answer.trim().toLowerCase() === "sair") {
    rl.close();
    return;
  }

  try {
    compareHotel(answer);
  } catch (err) {
    console.error("Erro:", err.message);
  }

  console.log('\nDigite outro input ou "sair":');
});

// compareHotel(`ReGuLar: 26Mar2009(thur)110, 27Mar2009(fri)110, 28Mar2009(sat)90`);
// compareHotel(`Regular: 20Mar2009(fri), 21Mar2009(sat), 22Mar2009(sun)`);
// compareHotel(`Reward: 26Mar2009(thur), 27Mar2009(fri), 28Mar2009(sat)`);
// compareHotel(`Reward: 26Mar2009(thur), 27Mar2009(fri), 28Mar2009(sat)`);
// if (day[0] + 4 === day[3] ){
//            temD}
// compareHotel(`Reward: 26Mar2009(thur), 27Mar2009(fri), 28Mar2009(sat)`);
// compareHotel(`Reward: 26M200(thur), 210Mar09(fri), -1Mar2009(sat)`);
// compareHotel(`Regular: -5Mar2(thirsday), 27Mar2009(fru), 28Mar2009(sei)`);
// compareHotel(`Regular: banana(thirsday), jaca(fru), 28Mar2009(sei)`);

// Desafio 
// 10% para regular para 3 dias consecutivo, e 
// 20% para rewards para 3 dias consecutivo


// fazer MAIS testes compare hotels
// tratamento de datas 
// tratamento do tipo de cliente

//

// obter o tipo de cliente
// obter as datas do input
// obter tipo de data a partir do numero do dia
// obter o preco baseado no tipo de cliente e o dia
// fazer o calculo baseado no tipo de
// calcular total de cada hotel
// comparar os totais dos diferentes hoteis
// obter o mais barato
// mostrar o mais barato
