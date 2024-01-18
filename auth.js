//immidiately function expression ()()
(function ()  {
    const sha1 = require('js-sha1')
    let date = new Date();
    let dataAutoryzacja = date.getFullYear() * 1e4 + (date.getMonth() + 1) * 100 + date.getDate() + ''; // "20211124"
    let sha1Password = sha1('IaIpAWeL1987!!')
    let sha1Acces = sha1(dataAutoryzacja+sha1Password)
    return (
        sha1Acces
    )
    
})()