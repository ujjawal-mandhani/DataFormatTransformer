arr = ["csv", "json", "parquet"]
let choosen_to_be_deleted = ''
let messageIsRaised = 0
let expected_format = ''
path_of_check = ``
let responseFromApi
let responseFromSparkApi
path = []

function callSparkApi() {
    const payloadinput = {
        "from": choosen_to_be_deleted,
        "to": expected_format
    }
    console.log(payloadinput);
    fetch('http://0.0.0.0:10050/convertUsingSpark/', { // Replace with the appropriate URL and port
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payloadinput)
    })
        .then(response => response.json())
        .then(data => {
            // Handle response from the server
            console.log(data);
            // {
            //     "conversion": "success",
            //     "response": 200
            //   }
            if (data.conversion === "success") {
                $('body').text(``)
                let final_html = `<h1 class="just-center">Thank you for using my app, your ${choosen_to_be_deleted} file is converted to ${expected_format} file</h1>`
                $('body').append(final_html)

            }
        })
        .catch(error => {
            // Handle error
            console.error(error);
        });
}
function uploadFiles() {
    const fileInput = document.getElementById("file-manager-button");
    const files = fileInput.files;


    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        console.log(files[i]);
        formData.append('hello', files[i]);
    }
    fetch('http://0.0.0.0:10404/uploadFiles/', { // Replace with the appropriate URL and port
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            // Handle response from the server
            console.log(data);
            if (data.message === 'success') {
                // {
                //       "from": "json",
                //       "to": "parquet"
                //   }
                callSparkApi()
            }
        })
        .catch(error => {
            // Handle error
            console.error(error);
        });
}

function openFileManager() {
    if ($("#file-manager-button").prop('files').length !== 0) {
        for (let i = 0; i < $("#file-manager-button").prop('files').length; i++) {
            path.push($("#file-manager-button").prop('files')[i]['path'])
        }
        console.log(path);

        uploadFiles()
        // {
        //     "message": "success"
        //   }
        $('body').text(``)
        spinner = `<div id="spinner-rotated" class="d-flex justify-content-center align-items-center spinner-border" role="status">
                <span class="sr-only"></span>
            </div>
            <h4 id="loading-test" class="d-flex justify-content-center align-items-center">Please wait untill process complete API Calling started</h4>`
        $('body').append(spinner)
    } else {
        if (messageIsRaised !== 1) {
            $('body').append(`<h3 class="text-bg-danger d-flex justify-content-center align-items-center size-danger" id="this-needs-to-be-deleted-if-success">Path Canot be empty</h3>`)
        }
        // console.log(responseFromApi);
        messageIsRaised = 1
        return
    }
}


function pressInputButton() {
    if ($('input').val().length === 0) {
        if (messageIsRaised !== 1) {
            $('body').append(`<h3 class="text-bg-danger d-flex justify-content-center align-items-center size-danger" id="this-needs-to-be-deleted-if-success">Path Canot be empty</h3>`)
        }
        messageIsRaised = 1
        return
    }
    path.push($('#input_manually').val())
    $('body').text(``)
    spinner = `<div id="spinner-rotated" class="d-flex justify-content-center align-items-center spinner-border" role="status">
        <span class="sr-only"></span>
    </div>
    <h4 id="loading-test" class="d-flex justify-content-center align-items-center">Please wait untill process complete API Calling started</h4>`
    console.log(path);
    $('body').append(spinner)
}

function expectedformat(id) {
    expected_format = id
    if (choosen_to_be_deleted === id) {
        if (($('.text-bg-danger').text()).length === 0) {
            $('body').append(`<h3 class="text-bg-danger d-flex justify-content-center align-items-center size-danger" id="this-needs-to-be-deleted-if-success"> Conversion with same format is not allowed </h3>`)
        }
        return
    }
    for (i = 0; i <= arr.length; i++) {
        if (($('.text-bg-danger').text()).length > 0) {
            $('body #this-needs-to-be-deleted-if-success').remove()
        }
        if (id === arr[i]) {

        } else {
            let containerDiv = $('#to_be_deleted');
            let Button = containerDiv.find(`#${arr[i]}`);
            Button.remove();
        }
    }
    path_of_input = `
    <!-- <div id="path_input" class="input-group mb-3">
        <input id="input_manually" type="text" class="form-control" placeholder="Path To ${choosen_to_be_deleted}" aria-describedby="basic-addon1">
    </div> -->
    <div class="cotainer">
        <div class="row">
            <!-- <div class="col">
                <button id="submit-button" type="button" class="btn btn-success" onclick=pressInputButton()>Enter Parent
                    Path</button>
            </div> -->
            <div class="col">
                <input id="file-manager-button" class="form-control form-control-lg" multiple type="file" accept=".json, .csv, .parquet" name="hello" required>
                <button type="button" id="file-manager-button" class="btn btn-success" onclick=openFileManager()>Confirm</button>
            </div>
        </div>
    </div>
    `
    if (path_of_check === 'DONE') {
        return
    }
    $('body').append(path_of_input)
    $('h1').text(`Please enter path of ${choosen_to_be_deleted}`)
    path_of_check = 'DONE'
}

function returnFormat(id) {
    choosen_to_be_deleted = id
    to_rescue_parent = $(`#${id}`).parent().html()
    to_rescue_parent_parent = $(`#${id}`).parent().parent().html()
    for (i = 0; i < arr.length; i++) {
        $(`#${arr[i]}`).parent().remove();
    }
    to_add = `
        <h1 class="text-center">Choose the input source</h1>
        <div class='container'>
            <div class="row">
                <div class="col align-items-center max-width d-flex justify-content-center">
                    ${to_rescue_parent.replace("returnFormat", "")}
                </div>
                <div class="col align-items-center max-width d-flex justify-content-center">
                    <hr class="hr-line">
                </div>
                <div id="to_be_deleted" class="col">
                    ${to_rescue_parent_parent.replace("returnFormat", "expectedformat").replace("returnFormat", "expectedformat").replace("returnFormat", "expectedformat")}
                </div>
            </div>
        </div>
    `
    $('body').html(to_add)

}
