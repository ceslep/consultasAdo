function whichTransitionEvent() {
    var t,
        el = document.createElement("fakeelement");

    var transitions = {
        "transition": "transitionend",
        "OTransition": "oTransitionEnd",
        "MozTransition": "transitionend",
        "WebkitTransition": "webkitTransitionEnd"
    }

    for (t in transitions) {
        if (el.style[t] !== undefined) {
            return transitions[t];
        }
    }
}

jQuery.fn.redraw = function() {
    return this.hide(0, function() {
        $(this).show();
    });
};

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});

Date.prototype.toTimeInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(11, 19);
});

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

const validarEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});

function getAbsolutePath() {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}


const getColors = n => {

    let colors = Array.from(Array(n - 1), (_, i) => i + 1);

    return colors.map(color => {
        let color1 = parseInt(255 * Math.random());
        color1 = color1 < 100 ? 255 - color1 : color1;
        let color2 = parseInt(255 * Math.random());
        color2 = color2 < 100 ? 255 - color2 : color2;
        let color3 = parseInt(255 * Math.random());
        color3 = color2 < 100 ? 255 - color3 : color3;
        return `rgba(${color1},${color2},${color3}, 0.2)`
    });
}

const getBorders = n => {
    let borders = Array.from(Array(n - 1), (_, i) => i + 1);

    return borders.map(color => {
        let color1 = parseInt(255 * Math.random());
        color1 = color1 < 100 ? 255 - color1 : color1;
        let color2 = parseInt(255 * Math.random());
        color2 = color2 < 100 ? 255 - color2 : color2;
        let color3 = parseInt(255 * Math.random());
        color3 = color3 < 100 ? 255 - color3 : color3;
        return `rgba(${color1},${color2},${color3}, 1)`
    });
}


var servidor = getAbsolutePath();