var option = {
    tickets: 5
}
var studentData = {};
var courseData = {};

function generatePortfolio(students, courses) {
    var student_capacity;
    var ca = 0;
    for (var i in courses) {
        ca += courses[i].getScore({
            section: sectionsQuartile
            , ticket: ticketsQuartile
        });
        if (!courseData[`${courses[i].department}`]) courseData[`${courses[i].department}`] = {
            score: 0
            , courses: []
        };
        courseData[`${courses[i].department}`].courses.push(courses[i]);
    }
    var sa = 0;
    for (var i in students) {
        sa += students[i].getCapacity(studentsQuartile);
        if (!studentData[`${students[i].getCapacity(studentsQuartile)}`]) studentData[`${students[i].getCapacity(studentsQuartile)}`] = [];
        studentData[`${students[i].getCapacity(studentsQuartile)}`].push(students[i]);
    }
    var student_capacity = Math.ceil(ca / sa);
    console.log(courseData);
    sortCourseData(student_capacity);

    console.log(courseData);
    assignCourses(student_capacity);
    console.log(studentData, courseData);

//   / new Renderer(studentData).drawJSON(studentData);
}

function assignCourses(student_capacity) {
    var t = 0;
    var indexes = getIndexes(courseData);
    var currentIndex = 0;
    var t = 0;
    var anythingGoes = false;
    var last = {};
    var studentIndexes = getIndexes(studentData);
    studentIndexes.sort((a, b) => {
        var a1 = parseInt(a);
        var b1 = parseInt(b);
        if (a1 > b1) return 1;
        else if (b1 > a1) return -1;
        return 0;
    });
    for (var i in studentData) {
        studentData[i].sort(
            (a, b) => {
                if (parseFloat(a.ticket_count) < parseFloat(b.ticket_count)) return -1;
                else if (parseFloat(a.ticket_count) > parseFloat(b.ticket_count)) return 1;
                return 0;
            });
    }
    console.log(studentIndexes);
    var currentStudent = 0;
    var currentRange = 0;
    var studentsFull = 0;
    while (!last.error) {
        var student = studentData[studentIndexes[currentRange]][currentStudent];
        var tickets = [];
        for (var i in studentData[studentIndexes[currentRange]]) tickets.push(parseInt(studentData[studentIndexes[currentRange]][i].ticket_count));
        var quartile = new Quartile(tickets);
        console.log(quartile.getFirstQuartile(), quartile.getMedian(), quartile.getThirdQuartile());
        if (!student.full) {
            var maxCapacity = (student_capacity * student.getCapacity());
            console.log("---------", currentStudent);
            last = grabCourse(maxCapacity - student.load, !(student.ticket_count >= quartile.getThirdQuartile));
            if (!last.error) student.addDepartment(last);
            else {
                maxCapacity = (student_capacity * (student.getCapacity() + 0.5));
                console.log(maxCapacity, student.load);
                last = grabCourse(maxCapacity - student.load, !(student.ticket_count >= quartile.getThirdQuartile))
                if (!last.error) student.addDepartment(last);

                    else {
                        student.full = true;
                        last = {};
                    }
                    //studentData[studentIndexes[currentRange]].splice(studentData[studentIndexes[currentRange]].indexOf(student),1);

            }
            (currentStudent < studentData[studentIndexes[currentRange]].length - 1) ? currentStudent++ : currentStudent = 0;
            //console.log(last.score);
            console.log("*********");
        }
        else {
            console.log("Student is full!", last);
            studentsFull++;
            if (studentsFull >= studentData[studentIndexes[currentRange]].length) {
                currentRange++;
                if (currentRange >= studentIndexes.length) last = {
                    error: "Reached Last Slot"
                }
                currentStudent = 0;
            }
            else(currentStudent < studentData[studentIndexes[currentRange]].length - 1) ? currentStudent++ : currentStudent = 0;
        }
    }
    console.log(last.error);
}

function grabCourse(capacity, lower) {
    var selected = {
        error: "Nothing Found!"
        , capacity: capacity
        , i: 0
        , j: 0
    };
    for (var i in courseData) {
        var found = false;
        for (var j in courseData[i]) {
            //console.log("Running...");
            if (courseData[i][j].score <= capacity + 1.5) {
                try {
                    var sel = courseData[selected.i][selected.j];
                    var qual = (!lower) ? (courseData[i][j].score > sel.score) : (courseData[i][j].score < sel.score)
                    if (qual) {
                        selected.i = i;
                        selected.j = j;
                        selected.error = "No Errors Found!";
                    }
                }
                catch (e) {
                    selected.i = i;
                    selected.j = j;
                    selected.error = "Could Not Find Value";
                }
            }
        }
        if (found) break;
    }
    console.log(`Deleting: ${selected.j}`)
    if (selected.j == 0) {
        return selected;
    }
    else {
        var sel = courseData[selected.i][selected.j];
        delete courseData[selected.i][selected.j];
        if (sizeOf(courseData[selected.i] <= 0)) delete courseData[selected.i];
        return sel;
    }
}

function sortCourseData(student_capacity) {
    var last;
    for (var i in courseData) {
        var score = 0;
        var split = false;
        var current = 0;
        var tab;
        for (var j in courseData[i].courses) {
            if (!last) last = j;
            var append = " (" + String.fromCharCode(65 + current) + ")";
            score += courseData[i].courses[j].getScore();
            if (split) {
                if (!(courseData[i + append])) {
                    courseData[i + append] = {
                        score: 0
                        , courses: []
                    };
                }
                courseData[i + append].courses.push(courseData[i].courses[j]);
                //courseData[i].courses.splice(courseData[i].courses.indexOf(courseData[i].courses[j],1));
            }
            if (score > student_capacity*1.5 && !split && courseData[i].courses[last].course_lead != courseData[i].courses[j].course_lead) {
                if (!(courseData[i].courses.length - parseInt(j) < student_capacity * .5)) {
                    courseData[i].score = score;
                    split = true;
                    score = 0;
                    current++;
                    tab = j;
                }
            }
            last = j;
        }
        if (!split) courseData[i].score = score;
        else {
            courseData[i + append].score = score;
            append = " (" + String.fromCharCode(65) + ")";
            courseData[i + append] = {
                score: 0
                , courses: []
            }
            courseData[i + append].score = courseData[i].score;
            for (var a = 0; a < tab; a++) {
                courseData[i + append].courses.push(courseData[i].courses[a]);
            }
            delete courseData[i];
        }
    }
    var data = {};
    var courseLoads = [2, 1.5, 1, .5];
    for (var i in courseLoads) {
        data[courseLoads[i]] = {};
        console.log("Data: ", data);
        for (var j in courseData) {
            if (j != "undefined") {
                if (courseData[j].score >= student_capacity * courseLoads[i]) {
                    data[courseLoads[parseInt(i)]][j] = (courseData[j]);
                    delete courseData[j];
                }
            }
        }
    }
    courseData = data;
    console.log("COURSE DATA", student_capacity);
}

function sizeOf(object) {
    var size = 0;
    for (var i in object) size++;
    return size;
}

function getIndexes(object) {
    var index = [];
    for (var i in object) index.push(i)
    return index;
}
/* 67132
 * /Course Files/Course Schedule.html
 * /
 */
