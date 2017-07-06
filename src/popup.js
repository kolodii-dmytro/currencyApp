var USD = {};
var getdata = {
    requestc: function () {
        var req = new XMLHttpRequest();
        req.open("GET", 'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5', true);
        req.onload = this.getCourse.bind(this);
        req.send(null);
    }
    , getCourse: function (e) {
        var c = e.target.responseXML.querySelectorAll('exchangerate');
        USD.buy = c[2].getAttribute("buy");
        USD.sale = c[2].getAttribute("sale");
        this.load();
    }
    , load: function (e) {
        document.getElementById("sale").innerText = parseFloat(USD.sale).toFixed(2);
        document.getElementById("buy").innerText = parseFloat(USD.buy).toFixed(2);
    }
}

function currencyConverter(cur) {
    var usd = document.getElementById('usd');
    var uah = document.getElementById('uah');
    var usdcount = usd.value.trim().replace(',', '.');
    var uahcount = uah.value.trim().replace(',', '.');
    var sale = parseFloat(document.getElementById('sale').innerText.trim().replace(',', '.'));
    var buy = parseFloat(document.getElementById('buy').innerText.trim().replace(',', '.'));
    var saleBuy = document.getElementById("saleBuy").value;
    if (cur == 'usd') {
        if (saleBuy == 'sale') {
            uah.value = (usdcount * sale).toFixed(2);
        }
        else {
            uah.value = (usdcount * buy).toFixed(2);
        }
    }
    else if (cur == 'uah') {
        if (saleBuy == 'sale') {
            usd.value = (uahcount / sale).toFixed(2);
        }
        else {
            usd.value = (uahcount / buy).toFixed(2);
        }
    }
}
getdata.requestc();
$(document).ready(function () {
    $('#usd').on('keyup', function () {
        currencyConverter('usd');
    });
    $('#uah').on('keyup', function () {
        currencyConverter('uah');
    });
    $("#saleBuy").change(function () {
        currencyConverter('usd');
    });
});