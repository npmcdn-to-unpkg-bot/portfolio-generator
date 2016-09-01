
var Quartile = function (data_set){

    /*
     * This returns the specified quartile from the data set
     */
    function getQuartile(quartile) {
        var median = getMedian(data_set);
        if (quartile == 2) return median;
        var newArray = [];
        for (var i in data_set) {
            if (quartile == 1) {
                if (data_set[i] < median) newArray.push(data_set[i]);
                else break;
            }
            else {
                if (data_set[i] > median) newArray.push(data_set[i]);
            }
        }
        var newQuartile = (getMedian(newArray));
        return newQuartile;
    }


    function getFirstQuartile(){
        return getQuartile(1)
    }

    function getThirdQuartile(){
        return getQuartile(3)
    }

    /*
     * Returns the  Inner Quartile Range of the set
     */
    function getIQR(){
        return getQuartile(3) - getQuartile(1);
    }

    /*
     * Determines if a number is an outlier in the set
     */
    function isOutlier(n){
        var IQR = getIQR();
        return (n  < getQuartile(1) - 1.5 * IQR || n > getQuartile(3) + 1.5 * IQR );
    }

    /*
     * This gives us the median of a given array or the median of the data set
     * if no array is given
     */
    function getMedian(data_set) {
        if(!data_set) data_set = this.data_set;
        var length = data_set.length;
        var median = (length % 2 == 0) ? (data_set[length / 2] + data_set[(length / 2) - 1]) / 2 : data_set[Math.ceil(length / 2) - 1];
        return median;
    }

    /*
     * This sorts the given array from least to greatest
     */
    function sortAscending(data_set) {
        var result = data_set.sort((a, b) => {
            if (a > b) return 1;
            if (a < b) return -1;
            else return 0;
        });
        return result;
    }

    this.data_set = sortAscending(data_set);

    // This adds the public methods to the class
    this.constructor.prototype.getFirstQuartile = getFirstQuartile;
    this.constructor.prototype.getThirdQuartile = getThirdQuartile;
    this.constructor.prototype.isOutlier = isOutlier;
    this.constructor.prototype.getMedian = getMedian;

}

// Quartile Test Run
/*
    var quart = new Quartile([3, 7, 8, 5, 12, 14, 21, 13, 18]);
    console.log(quart.getThirdQuartile());
*/
