var Quartile = function Quartile(data_set) {
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
//    console.log(this.data_set);
}


/*
 * This returns the specified quartile from the data set
 */
Quartile.prototype.getQuartile = function (quartile) {
    var median = this.getMedian(this.data_set);
    if (quartile == 2) return median;
    var newArray = [];
    for (var i in this.data_set) {
        if (quartile == 1) {
            if (this.data_set[i] < median) newArray.push(this.data_set[i]);
            else break;
        }
        else {
            if (this.data_set[i] > median) newArray.push(this.data_set[i]);
        }
    }
    var newQuartile = (this.getMedian(newArray));
    return newQuartile;
}

Quartile.prototype.getFirstQuartile = function () {
    return this.getQuartile(1)
}

Quartile.prototype.getThirdQuartile = function () {
        return this.getQuartile(3)
}

/*
 * Returns the  Inner Quartile Range of the set
 */
Quartile.prototype.getIQR = function () {
    return this.getQuartile(3) - this.getQuartile(1);
}

/*
 * Determines if a number is an outlier in the set
 */
Quartile.prototype.isOutlier = function (n) {
    var IQR = this.getIQR();
    return (n < this.getQuartile(1) - 1.5 * IQR || n > this.getQuartile(3) + 1.5 * IQR);
}

/*
 * This gives us the median of a given array or the median of the data set
 * if no array is given
 */
Quartile.prototype.getMedian = function (data_set) {
        if (!data_set) data_set = this.data_set;
        if (!this.data_set) console.log("We are screwed!", this.data_set, data_set);
        var length = data_set.length;
        var median = (length % 2 == 0) ? (data_set[length / 2] + data_set[(length / 2) - 1]) / 2 : data_set[Math.ceil(length / 2) - 1];
        return median;
}
    // Quartile Test Run
    /*
        var quart = new Quartile([3, 7, 8, 5, 12, 14, 21, 13, 18]);
        console.log(quart.getThirdQuartile());
    */
