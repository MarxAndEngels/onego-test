function number_format(number, decimals, dec_point, thousands_sep) {
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        toFixedFix = function (n, prec) {
            // Fix for IE parseFloat(0.55).toFixed(0) = 0;
            var k = Math.pow(10, prec);
            return Math.round(n * k) / k;
        },
        s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

export default {
    filters: {
        run(value) {
            if (!value) return ''
            return new Intl.NumberFormat("ru-RU").format(value);
        },
        engineVolume: function (volume) {
            return number_format(volume, 1, '.', '');
        },
        toCurrency(value) {
            if (!value) return ''
            if (typeof value !== "number") {
                return value;
            }
            let formatter = new Intl.NumberFormat("ru-RU", {
                style: "currency",
                currency: "RUB",
                minimumFractionDigits: 0,
            });
            return formatter.format(value);
        },
        access_acredit(price) {
            let procent = 4.9;
            let n = 84;
            let coef_i = procent / 12 / 100;
            let K =
                (coef_i * Math.pow(1 + coef_i, n)) / (Math.pow(1 + coef_i, n) - 1);
            let A = Math.round(K * price);
            let formatter = new Intl.NumberFormat("ru-RU", {
                style: "currency",
                currency: "RUB",
                minimumFractionDigits: 0,
            });
            return formatter.format(A);
        },

        old_price_generation(value) {
            let add = 0;
            if (value <= 500000) {
                add = 150000
            }
            if (value > 500000 && value <= 700000) {
                add = 200000
            }
            if (value > 700000 && value <= 1000000) {
                add = 300000
            }
            if (value > 1000000) {
                add = 400000
            }
            return value + add
        }
    }
}
