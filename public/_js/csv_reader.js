
/*
 * CSV Reader Class
 */
function CSV_Reader(input_id, onComplete, item_id_col = 1) {

    /*
     * recieves the file for processing when the user uploads it
     */
    function fileToObject(event) {
        var file = event.target.files[0],
            reader = new FileReader();


        // begins reading the csv file
        reader.onload =csv=> {
             text = csv.target.result;
                //Removes any escaped commas
                text = text.replace(/([,]+\s)/g, " ");
                text = text.replace(/"/g, "");
                //Parses to objects
                items = text.split("\n");
                header = items[0].split(",");
                csvObject = {};

            for (var j = 1; j < items.length; j++) {
                var course_data = items[j].split(",");
                for (var i in header)
                    if (i != item_id_col) {

                        if (!csvObject[course_data[item_id_col]])
                            csvObject[course_data[item_id_col]] = {};

                        csvObject[course_data[item_id_col]][header[i]] = course_data[i];
                    }

            }

            onComplete(csvObject);
        }


        reader.readAsText(file);
    }

    // checks if the browser is capeable of reading the csv file. If so, it listens for the file input on the DOM from the specified ID
     (window.File && window.FileReader && window.FileList && window.Blob) ?
         document.getElementById(input_id).addEventListener("change", fileToObject) : console.error("File System Not Supported!");
}

//Degubbing
//var reader = new CSV_Reader("item", object => {console.log(object);},2);
