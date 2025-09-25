export const hotels = [
  {
    name: "lakewood",
    stars: 3,
    prices: {
      regular: {
        weekday: 110,
        weekend: 90,
      },
      reward: {
        weekday: 80,
        weekend: 80,
      },
    },
  },
  {
    name: "bridgewood",
    stars: 4,
    prices: {
      regular: {
        weekday: 160,
        weekend: 60,
      },
      reward: {
        weekday: 110,
        weekend: 50,
      },
    },
  },
  {
    name: "ridgewood",
    stars: 5,
    prices: {
      regular: {
        weekday: 220,
        weekend: 150,
      },
      reward: {
        weekday: 100,
        weekend: 40,
      },
    },
  },
];
export const discountHotel = 
  {
    regular: 10,
    reward: 20,
  };

// function aplicarCupom(preco, cupom) {
//   let descontos = {
//     PROMO10: 10,
//     BLACKFRIDAY: 50,
//     NOVIDADE: 5
//   };

//   let desconto = descontos[cupom] || 0; // se não existir cupom, desconto é 0
//   return preco - (preco * (desconto / 100));
// }

// console.log(aplicarCupom(100, "PROMO10"));     // 90
// console.log(aplicarCupom(100, "BLACKFRIDAY")); // 50
// console.log(aplicarCupom(100, "INVALIDO"));    // 100

// let preco = 100; // preço original
// let desconto = 10; // desconto em porcentagem

// let valorFinal = preco - (preco * (desconto / 100));

// console.log("Preço com desconto: €" + valorFinal);

// Desafio
// 10% para regular para 3 dias consecutivo, e
// 20% para rewards para 3 dias consecutivo
