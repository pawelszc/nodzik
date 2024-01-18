const data = require('./data/data.json')
let arrayCopy = data.map(x => {
    const dateString = x.date;
    const parts = dateString.split("-");
    const formattedDate = parts[2] + "-" + parts[1] + "-" + parts[0];
    const valueString = x.amount;
    const parsedValue = parseFloat(valueString.replace(",", "."));
    const formattedValue = parsedValue.toFixed(2);
    let prefix
     
    if (x.vat.startsWith("DE")){
        prefix = "DE"
        number = x.vat.substring(2, 12);
    }
        else {
            prefix = "ATU"
            number = x.vat.substring(3,13)

        }
    

    return (
        {"SprzedazWiersz":
            {"LpSprzedazy": 1 + data.indexOf(x),
            "KodKrajuNadaniaTIN": prefix,
            "NrKontrahenta": number,
            "NazwaKontrahenta": x.name,
            "DowodSprzedazy": x.invoice,
            "DataWystawienia": formattedDate,
            "DataSprzedazy": formattedDate,
            "K_21": formattedValue
            }
        }
    )
  })

  //console.log output (xml string)
console.log(JSON.stringify(arrayCopy)) 