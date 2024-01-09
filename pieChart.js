const $ = jQuery;

const sliceSize = (dataNum, dataTotal) => {
    return (dataNum / dataTotal) * 360;
}

const addSlice = (sliceSize, pieElement, offset, sliceID, color) => {
    $(pieElement).append("<div class='slice " + sliceID + "'><span></span></div>");
    offset = offset - 1;
    let sizeRotation = -179 + sliceSize;
    $("." + sliceID).css({
        "transform": "rotate(" + offset + "deg) translate3d(0,0,0)"
    });
    $("." + sliceID + " span").css({
        "transform": "rotate(" + sizeRotation + "deg) translate3d(0,0,0)",
        "background-color": color
    });
}

const iterateSlices = (sliceSize, pieElement, offset, dataCount, sliceCount, color) => {
    let sliceID = "s" + dataCount + "-" + sliceCount;
    let maxSize = 179;
    if (sliceSize <= maxSize) {
        addSlice(sliceSize, pieElement, offset, sliceID, color);
    } else {
        addSlice(maxSize, pieElement, offset, sliceID, color);
        iterateSlices(sliceSize - maxSize, pieElement, offset + maxSize, dataCount, sliceCount + 1, color);
    }
}

const createPie = (dataElement, pieElement) => {
    // let dataElement = dataElement;
    // $(dataElement + " span").each(function () {
    //     dataElement.push(Number($(this).html()));
    // });
    let listTotal = 0;
    for (let i = 0; i < dataElement.length; i++) {
        listTotal += dataElement[i];
    }

    let offset = 0;
    const color = [
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
    for (let i = 0; i < dataElement.length; i++) {
        const size = sliceSize(dataElement[i], listTotal);
        iterateSlices(size, pieElement, offset, i, 0, color[i]);
        // $(dataElement + " li:nth-child(" + (i + 1) + ")").css("border-color", color[i]);
        offset += size;
    }
}
createPie([718, 531, 868, 344, 1145], ".pieID.pie");