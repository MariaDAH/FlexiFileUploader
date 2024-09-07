export const getUniqueValues = (array: any) => (
    array.reduce((accumulator:any, currentValue: any) => (
        accumulator.includes(currentValue) ? accumulator : [...accumulator, currentValue]
    ), [])
)

export const getCountsForEachElement = (array: any) => {
    const counts: any = {};
    array.forEach((x: any) => {
        counts[x] = (counts[x] || 0) + 1;
    });
    //console.log("RESULT", counts);
    return counts;
}

export const getArrayOfRandomColors = (n: number) => {
    const colors = [];
    for (let i = 0; i < n; i++) {
        const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        colors.push(randomColor);
    }
    console.log('COLOR++++++++++++++++++',colors);
    return colors;
}