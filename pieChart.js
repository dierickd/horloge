// const $ = jQuery;

// const sliceSize = (dataNum, dataTotal) => {
//     console.log(dataNum, dataTotal);
//     return (dataNum / dataTotal) * 360;
// };
//
// const addSlice = (sliceSize, pieElement, offset, sliceID, color) => {
//     $(pieElement).append("<div class='slice " + sliceID + "'><span></span></div>");
//     // offset = offset - 1;
//     let sizeRotation = 4.194444444444 * sliceSize;
//     // $("." + sliceID).css({ "transform": "rotate(0deg) translate3d(0,0,0)" });
//     $("." + sliceID + " span").css({
//         "transform": "rotate(0deg) translate3d(0,0,0)",
//         "background-color": color
//     });
// };
//
// const iterateSlices = (sliceSize, pieElement, offset, dataCount, sliceCount, color) => {
//     let sliceID = "s" + dataCount + "-" + sliceCount;
//     // let maxSize = 179;
//     // if (sliceSize <= maxSize) {
//     addSlice(sliceSize, pieElement, offset, sliceID, color);
//     // } else {
//     //     addSlice(maxSize, pieElement, offset, sliceID, color);
//     //     iterateSlices(sliceSize - maxSize, pieElement, offset + maxSize, dataCount, sliceCount + 1, color);
//     // }
// };

const createPie = (dataElement, pieElement) => {
    // let dataElement = dataElement;
    // $(dataElement + " span").each(function () {
    //     dataElement.push(Number($(this).html()));
    // });
    // let listTotal = 0;
    // for (let i = 0; i < dataElement.length; i++) {
    //     listTotal += dataElement[i];
    // }

    // let offset = 0;
    const colors = [
        "cornflowerblue",
        "olivedrab",
        "orange",
        "tomato",
        "crimson",
        "purple",
        "turquoise",
        "forestgreen",
        "navy",
        "gray"
    ];
    draw(dataElement, colors);
    // for (let i = 0; i < dataElement.length; i++) {
    //     // const size = sliceSize(dataElement[i], listTotal);
    //     iterateSlices(dataElement[i][0], pieElement, dataElement[i][1], i, 0, colors[i]);
    //     // $(dataElement + " li:nth-child(" + (i + 1) + ")").css("border-color", color[i]);
    //     // offset += size;
    // }
};

// createPie([2, 1.5], ".pieID.pie");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function degToRad(degrees) {
    return ((degrees - 90) * Math.PI) / 180;
}

const draw = (dataElement, colors) => {
    console.log(dataElement);
    dataElement = dataElement.sort(sortTableByASC);
    console.log(dataElement);
    let radius = 195;
    let lastDrawEnd = 0;

    for (let i = 0; i < dataElement.length; i++) {
        const drawStart = convertHoursToFloatNumber(dataElement[i][0]);
        const drawEnd = convertHoursToFloatNumber(dataElement[i][1]);
        lastDrawEnd > drawStart ? radius -= 30 : radius = 195;
        lastDrawEnd = drawEnd;

        ctx.beginPath();
        ctx.arc(200, 200, radius, degToRad(drawStart), degToRad(drawEnd), false);
        ctx.fillStyle = colors[i];
        ctx.lineTo(200, 200);
        ctx.fill();
    }
};

/**
 *
 * @param hour
 * @returns {number}
 */
const convertHoursToFloatNumber = (hour) => {
    const minStart = hour.length - 2;
    const minEnd = hour.length;
    const hrStart = hour;
    const hrEnd = hour.length - 3;

    let min = hour.substring(minStart, minEnd);
    let hrs = hour.substring(hrStart, hrEnd);
    if (typeHours === 12 && parseInt(hrs) === 12) hrs = 0;
    if (typeHours === 12 && parseInt(hrs) > 12) hrs -= 12;

    const ratio = 100 / (100 / 3) * 10;
    const hrDecimal = Number(hrs + '.' + Math.round(min / 60 * 100));
    return hrDecimal * ratio;
};

/**
 *
 * @param a
 * @param b
 * @returns {number}
 */
function sortTableByASC(a, b) {
    const x = a[0];
    const y = b[0];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}
