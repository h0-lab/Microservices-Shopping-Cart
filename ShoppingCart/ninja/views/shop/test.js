input_csv_array = [
    "1,28,300.1,San Francisco",
    "1,5,209.1,San Francisco",
    "20,7,208.1,San Francisco",
    "23,8,207.1,San Francisco",
    "16,10,206.1,Oakland",
    "1,16,205.1,San Francisco",
    "6,29,204.1,San Francisco",
    "7,20,203.1,San Francisco",
    "8,21,202.1,San Francisco",
    "2,18,201.1,San Francisco",
    "2,30,200.1,San Francisco",
    "15,27,109.1,Oakland",

    "10,13,108.1,Oakland",
    "11,26,107.1,Oakland",
    "12,9,106.1,Oakland",
    "13,1,105.1,Oakland",
    // "22,17,104.1,Oakland",
    // "1,2,103.1,Oakland",
    // "28,24,102.1,Oakland",
    // "18,14,11.1,San Jose",
    // "6,25,10.1,Oakland",
    // "19,15,9.1,San Jose",
    // "3,19,8.1,San Jose",
    // "3,11,7.1,Oakland",
    //
    // "27,12,6.1,Oakland",
    // "1,3,5.1,Oakland",
    // "25,4,4.1,San Jose",
    // "5,6,3.1,San Jose",
    // "29,22,2.1,San Jose",
    // "30,23,1.1,San Jose"
];

console.log("Niral");
var x =hostCrowd(input_csv_array);
console.log(x);

function hostCrowd(input_csv_array) {
    const result = [[]];
    let pageCount = 0;
    const map = new Map();
    const buffer = [];
    const perPage = 5;
    const lastPage = Math.floor(input_csv_array.length/perPage);

    for (let i = 0; i < input_csv_array.length; i++) {
        const value = input_csv_array[i];
        const hostID = value.match(/([0-9]+),/)[1];

        if ( map.has(hostID) && lastPage !== pageCount) {
            buffer.push(value);
        } else {
            result[pageCount].push(value);
            map.set(hostID, true);
        }

        if (result[pageCount].length === perPage) {
            map.clear();
            pageCount++;
            result[pageCount] = [];

            // Check buffer first
            for (let j = 0; j < buffer.length; j++) {
                const hostID = buffer[j].match(/([0-9]+),/)[1];
                if (map.has(hostID) && lastPage !== pageCount){
                    continue;
                } else {
                    map.set(hostID, true);
                    result[pageCount].push(buffer[j]);
                    buffer.splice(j, 1);
                    j--;
                }
            }
        }
    }
    return result;
}