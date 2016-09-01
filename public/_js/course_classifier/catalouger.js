var option = {
    tickets: 5,
}

function generatePortfolio(students, courses){
    var ca = 0;

    var studentData = {};
    var courseData = {};

    for(var i in courses){
        ca += courses[i].getScore({section:sectionsQuartile, ticket:ticketsQuartile});
        if(!courseData[`${courses[i].department}`])
            courseData[`${courses[i].department}`] = {score:0,courses:[]};
        courseData[`${courses[i].department}`].courses.push(courses[i]);
    }



    console.log("Courses", ca);

    var sa = 0;

    for(var i in students){
        sa += students[i].getCapacity(studentsQuartile);
        if(!studentData[`${students[i].getCapacity(studentsQuartile)}`])
            studentData[`${students[i].getCapacity(studentsQuartile)}`] = [];
        studentData[`${students[i].getCapacity(studentsQuartile)}`].push(students[i]);
    }

    console.log("Students", sa);

    var student_capacity = Math.ceil(ca/sa);
    console.log("Student Capacity: "+student_capacity);

    for(var i in courseData){
        var score = 0;
        var split = false;
        var current = 0;
        var tab;
        for(var j in courseData[i].courses){
            var append = " ("+String.fromCharCode(65+current)+")";
            score += courseData[i].courses[j].getScore();
            if(split){
                if(!(courseData[i+append])){
                  courseData[i +append] = {score:0,courses:[]};
                  console.log("!BRAND NEW!",i);
                }

                  courseData[i +append].courses.push(courseData[i].courses[j]);
                console.log(courseData[i+append]);
                  //courseData[i].courses.splice(courseData[i].courses.indexOf(courseData[i].courses[j],1));
            }
            if(score > student_capacity*2 && !split){
                courseData[i].score = score;
                split = true;
                score = 0;
                current++;
                tab = j;
            }
        }
        if(!split)
            courseData[i].score = score;
        else{
            courseData[i +append].score = score;
            append = " ("+String.fromCharCode(65)+")";
            courseData[i+append] = {score:0,courses:[]}
            courseData[i+append].score = courseData[i].score;
            for(var a = 0; a < tab; a++){
                courseData[i+append].courses.push(courseData[i].courses[a]);
            }
            delete courseData[i];
        }
    }


    console.log(studentData,courseData);

}

function sizeOf(object){
    var size = 0;
    for(var i in object)
       size++;
    return size;

}

function getIndexes(object){
    var index = [];
    for(var i in object)
        index.push(i)
    return index;
}
