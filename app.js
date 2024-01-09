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
        const oSup50 = document.createElement('div');
        const clock = document.createElement('div');
        // affectation des classes
        oMask.className = 'progress-masque';
        oBarre.className = 'progress-barre';
        oSup50.className = 'progress-sup';
        // construction de l'arbre
        for (let i = 0; i < 12; i++) {
            createHours(i, clock);
        }

        // test pie chart
        const pie = document.createElement('div');
        pie.classList.add("pieID");
        pie.classList.add("pie");
        // pie.setAttribute('data-value', '50');
        //
        oMask.appendChild(oBarre);
        oMask.appendChild(oSup50);
        elem.appendChild(clock);
        elem.appendChild(oMask);
        elem.appendChild(pie);
        createPie([718, 531, 868, 344, 1145], ".pieID.pie");
    }
    return elem;
}

function createHours(i, clock) {
    const hour = document.createElement('div');
    const timeNumber = document.createElement('div');
    clock.classList.add('clock');
    hour.classList.add('hour');
    timeNumber.classList.add('time_number');
    if (i === 11) {
        timeNumber.innerText = (i + 1).toString() + 'h - 0h';
    } else {
        timeNumber.innerText = (i + 1).toString() + 'h';
    }
    hour.appendChild(timeNumber);
    clock.appendChild(hour);
}

function initJauge(elem) {
    let oBarre;
    let angle;
    let valeur;
    //
    createJauge(elem);
    oBarre = elem.querySelector('.progress-barre');
    valeur = elem.getAttribute('data-value');
    valeur = valeur ? valeur * 1 : 0;
    elem.setAttribute('data-value', valeur.toFixed(1));
    angle = 360 * valeur / 100;

    if (oBarre) {
        const nInterval = setInterval(() => {
            valeur += 0.1;
            console.log('loop');
            if (valeur > 99.9) clearInterval(nInterval);
            angle = 360 * valeur / 100;
            elem.setAttribute('data-value', valeur.toFixed(1));

            oBarre.style.transform = 'rotate(' + angle + 'deg)';
        }, 864); // 60min => 3600000ms
    }
}
