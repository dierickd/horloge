// init variables
typeHours = 12;


// Initialisation après chargement du DOM
document.addEventListener('DOMContentLoaded', function () {
    const oJauges = document.querySelectorAll('.progress-circle');
    let i, nb = oJauges.length;
    for (i = 0; i < nb; i += 1) {
        initJauge(oJauges[i]);
    }
});

function createJauge(elem) {
    if (elem) {
        // on commence par un clear
        while (elem.firstChild) {
            elem.removeChild(elem.firstChild);
        }
        // création des éléments
        const oMask = document.createElement('div');
        const oBarre = document.createElement('div');
        const oSup = document.createElement('div');
        const clock = document.createElement('div');
        // affectation des classes
        oMask.className = 'progress-masque';
        oBarre.className = 'progress-barre';
        oSup.className = 'progress-sup';
        // construction de l'arbre
        for (let i = 0; i < typeHours * 2; i++) {
            createHours(i, clock);
        }

        // test pie chart
        // const pie = document.createElement('div');
        // pie.classList.add("pieID");
        // pie.classList.add("pie");
        // pie.setAttribute('data-value', '50');
        //
        oMask.appendChild(oBarre);
        oMask.appendChild(oSup);
        elem.appendChild(clock);
        elem.appendChild(oMask);
        // elem.appendChild(pie);
        createPie(
            [
                ['22:00', '23:30'],
                ['14:00', '17:00'],
                ['16:00', '18:00'],
                ['19:00', '23:00'],
                ['12:00', '13:00'],
            ],
            ".pieID.pie");
    }
    return elem;
}

function createHours(i, clock) {
    const hour = document.createElement('div');
    const timeNumber = document.createElement('div');
    clock.classList.add('clock');
    hour.classList.add('hour');
    hour.classList.add('type-hour-' + typeHours);
    timeNumber.classList.add('time_number');
    if (i % 2 !== 0) {
        timeNumber.innerText = Math.floor(i / 2 + 1).toString() + 'h';
    }
    hour.appendChild(timeNumber);
    clock.appendChild(hour);
}

function initJauge(elem) {
    createJauge(elem);
    const hrDecimal = getHourDecimal();
    const oBarre = elem.querySelector('.progress-barre');

    refresh(elem, oBarre, hrDecimal);
    const nInterval = setInterval(() => {
        // if (hrDecimal > 99.9) clearInterval(nInterval);
        refresh(elem, oBarre, hrDecimal);
    }, 1000);
}

/**
 *
 * @param elem
 * @param oBarre
 */
const refresh = (elem, oBarre) => {
    const hrDecimal = getHourDecimal();
    let angle = getAngle(hrDecimal);
    oBarre = elem.querySelector('.progress-barre');

    elem.setAttribute('data-value', hrDecimal.toFixed(1));
    oBarre.style.transform = 'rotate(' + angle + 'deg)';
};

/**
 *
 * @returns {number}
 */
const getHourDecimal = () => {
    const ratio = 100 / typeHours; //100% / 24 heures ou 12 heures
    let hrs = new Date().getHours(); //récupére l'heure actuelle
    const min = new Date().getMinutes(); //récupére les minutes actuelles

    // si le typeHours est en 12h alors on converti l'heure ex: 14:32 => 2:32
    if (typeHours === 12) {
        hrs = formatHours12_24(hrs);
    }
    // converti les heures/minute en decimal => ex: 8:30 en 8.5
    const hrDecimal = Number(hrs + '.' + Math.round(min / 60 * 100));
    return hrDecimal * ratio;
};

function formatHours12_24(hrs) {
    hrs = hrs % 12;
    hrs = hrs ? hrs : 12; // the hour '0' should be '12'
    return hrs;
}

/**
 *
 * @param hrDecimal
 * @returns {number}
 */
const getAngle = (hrDecimal) => {
    return hrDecimal * 360 / 100;
};


// arc.X (100): axe X => 100, correspond à la largeur de la forme
// arc.Y (100): axe Y => 100, correspond à la hauteur de la forme
// --------------------
// lineTo.X (50): correspond à départ du trait axe x
// lineTo.Y (50): correspond à départ du trait axe y
// --------------------
// radius correspont à l'angle radius de l'arc de cercle, 50 correspond à rayon du cercle 100 (arc.x et arc.y)

// ctx.arc(100, 100, 50, degToRad(10), degToRad(20), false);
// ctx.fillStyle = colors[1];
// ctx.lineTo(100, 100);
// ctx.fill();
