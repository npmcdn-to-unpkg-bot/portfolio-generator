var Student = function Student(name, full_time_weight, ticket_count){
    this.name = name;
    this.full_time_weight = full_time_weight;
    this.ticket_count = ticket_count;
}



Student.prototype.getCapacity = function(student_quartile){
    function roundToTens(number){
        return Math.ceil(number/10)*10;
    }
    var capacity = 1;

    if(this.full_time_weight >= 2)
        return 2;
    if(this.ticket_count <= roundToTens(student_quartile.getFirstQuartile())){
        return.5;
    }else if(this.ticket_count >= roundToTens(student_quartile.getThirdQuartile())){
        return 1.5;
    }

    return capacity;

}

//Debugging

/*
function roundToTens(number){return Math.ceil(number/10)*10;}
var student = new Student("Eric", 1, 195);
var studentData = [195,150,114,112,108,88,78,70,64,58,56,54,52,43,41,34,33,32,31,31,22,15,13,12,3,0,0,0,0];
var SQ = new Quartile(studentData);
console.log("Capacity: "+student.getCapacity(SQ))
console.log(roundToTens(SQ.getFirstQuartile()), roundToTens(SQ.getMedian()), roundToTens(SQ.getThirdQuartile()) );
*/
