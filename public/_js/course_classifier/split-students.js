var Renderer = function Renderer() {};
Renderer.prototype.sortStudents = (students, groups) => {
    function getIndexes(object) {
        var index = [];
        for (var i in object) index.push(i)
        index.sort((a, b) => {
            var c = parseInt(a);
            var d = parseInt(b);
            if (c > d) return 1;
            if (d < c) return -1
            else return 0;
        });
        return index;
    }

    function sizeOf(object) {
        var size = 0;
        for (var i in object) size++;
        return size;
    }
    var options = getIndexes(students);
    console.log(options);
    var shifts = {};
    for (var i = 0; i < groups; i++) shifts[`Group ${i+1}`] = {};
    var total = 0;
    var data = {};
    var highest = options[0];
    for (var i in options) {
        total += students[options[i]].length;
        var amount = students[options[i]].length / groups
        data[options[i]] = Math.ceil(amount)// (amount < 1) ? 1 : Math.round(amount);
        if (data[options[i]] > data[highest]) highest = options[i]
    }
    var max = Math.ceil(total / groups);
    console.log(max, total);
    //data[highest]--;
    console.log(data);
    var to = 0 ;
    var t = 0;
    var tick = 0;
    var s = "";
    while(t < total && to < 1000){
        t = 0;
        for (var i in students)
            for (var j in students[i]){
                if(injectStudent(students[i][j], data)){
                    students[i].splice(students[i].indexOf(students[i][j]),1);
                    tick++;
                }
            }
        for (var i in shifts) t += shifts[i].size;
        //console.log(t)
        to++;
        if(to > 999) console.warn("Loop exceeded maximium runtime");
    }

    for(var i in shifts)
        for(var j in shifts[i])
            if(j != "size")
            s+=j+"\n";

    console.log(s);
    console.log(students,tick);
    console.log(shifts);

    function injectStudent(student, data) {
        var op = getIndexes(shifts);
        var added = false;
        if (!student.capacity) student.capacity = 10;
        var limit = data[student.capacity];
        var g = shifts;

        for (var i in g) {
            var gt = 0;
            var found = 0;
            for (var j in g[i]){
                if (g[i][j].capacity == student.capacity) found++;
                gt++;
            }
//            if(op.indexOf(i) >= op.length - 1)
              //  console.log(op.indexOf(i))
            if (!(found >= limit) && gt <= max /*|| op.indexOf(i) >= op.length - 1*/) {
                g[i][student.name] = student;
                added = true;
                break;
            }
            //console.log(i);
        }
        for (var i in shifts) shifts[i].size = sizeOf(shifts[i]) - 1;
        shifts = g;
        if(!added)
        console.log(limit);
        return added;
    }
}
var studentData = JSON.parse(localStorage.sud);
new Renderer().sortStudents(studentData, 5);
