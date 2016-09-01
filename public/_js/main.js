var sectionLists;
var ticketLists;
var studentsList;

var sectionsQuartile;
var ticketsQuartile;
var studentsQuartile;


var options = {
    sectionsRow : "Sections",
    ticketsRow: "Ticket Count\r",
    studentRow: "Ticket Count\r"
};


var sectionReader = new CSV_Reader("section",data=>{sectionLists = data; check();},2);
var studentReader = new CSV_Reader("student",data=>{studentsList = data; check();},0);
var ticketReader = new CSV_Reader("tickets",data=> {ticketLists = data; check();},0);

function check(){
    if(sectionLists && ticketLists &&  studentsList)
        buildQuartiles();
}

function buildQuartiles(){

    // tickets quartile
    var tickets = [];
    for(var i in ticketLists){
        var j = parseInt(ticketLists[i][options.ticketsRow]);
        if(j)
        tickets.push(j);
    }
    console.log((ticketLists));
    ticketsQuartile = (new Quartile(tickets));

    //sections quartile
    var sections = [];
    for(var i in sectionLists){
        var j = parseInt(sectionLists[i][options.sectionsRow]);
        if(j)
        sections.push(j);
    }
    console.log((sectionLists));
    sectionsQuartile = (new Quartile(sections));

    //students quartile
    var students = [];
    for(var i in studentsList){
        if(i != undefined){
            var j = parseInt(studentsList[i][options.studentRow]);
            console.log(j);
            if(j >= 0)
                students.push(j);
        }
    }
    console.log((students));
    studentsQuartile = (new Quartile(students));

    rankData();

}

function rankData(){
    var courses = [];
    for(var i in sectionLists){

        if(!ticketLists[i]){
            ticketLists[i] = {};
            ticketLists[i][options.ticketsRow] = ticketsQuartile.getMedian();
        }
        courses.push(new Course(i,sectionLists[i]["Email"],sectionLists[i].Sections,ticketLists[i][options.ticketsRow],sectionLists[i].Department_Name));
        //console.log(courses[200].getScore({section:sectionsQuartile,ticket:ticketsQuartile}),courses[200]);
    }

    var students = [];

    for(var i in studentsList){
        console.log(studentsList[i]);
        students.push(new Student(i,studentsList[i]["Full Time Weight"], studentsList[i][options.studentRow]));
    }

    console.log(students[13].getCapacity(studentsQuartile));

}






