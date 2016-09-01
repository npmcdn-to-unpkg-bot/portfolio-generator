var sectionLists;
var ticketLists;
var studentsList;

var sectionsQuartile;
var ticketsQuartile;
var studentsQuartile;


var options = {
    sectionsColumn : "Sections",
    ticketsColumn: "Ticket Count\r",
    studentColumn: "Ticket Count\r",
    shifts: 5,

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
        var j = parseInt(ticketLists[i][options.ticketsColumn]);
        if(j)
        tickets.push(j);
    }

    ticketsQuartile = (new Quartile(tickets));

    //sections quartile
    var sections = [];
    for(var i in sectionLists){
        var j = parseInt(sectionLists[i][options.sectionsColumn]);
        if(j)
        sections.push(j);
    }

    sectionsQuartile = (new Quartile(sections));



    //students quartile
    var students = [];
    for(var i in studentsList){
        if(i != undefined){
            var j = parseInt(studentsList[i][options.studentColumn]);

            if(j >= 0)
                students.push(j);
        }
    }

    studentsQuartile = (new Quartile(students));


    rankData();

}

function rankData(){
    var courses = [];
    for(var i in sectionLists){

        if(!ticketLists[i]){
            ticketLists[i] = {};
            ticketLists[i][options.ticketsColumn] = ticketsQuartile.getMedian();
        }
        courses.push(new Course(i,sectionLists[i]["Email"],sectionLists[i].Sections,ticketLists[i][options.ticketsColumn],sectionLists[i].Department_Name));
    }

    var students = [];

    for(var i in studentsList){

        students.push(new Student(i,studentsList[i]["Full Time Weight"], studentsList[i][options.studentColumn]));
    }



    generatePortfolio(students,courses);

}






