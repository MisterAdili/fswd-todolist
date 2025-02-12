import $ from 'jquery';

$.ajaxSetup({
    headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
});

export var indexTasks = function (successCB, errorCB) {
    var request = {
        type: 'GET',
        url: 'api/tasks?api_key=1',
        success: successCB,
        error: errorCB
    }

    $.ajax(request);
};

export var deleteTask = function(id, successCB, errorCB) {
    var request = {
        type: 'DELETE',
        url: 'api/tasks/'+ id +'?api_key=1',
        success: successCB,
        error: errorCB
    }

    $.ajax(request);
};

export var postTask = function (content, successCB, errorCB) {
    var request = {
        type: 'POST',
        url: 'api/tasks?api_key=1',
        data: {
            task: {
                content: content
            }
        },
        success: successCB,
        error: errorCB
    }

    $.ajax(request);
};

export var markTask = function (id, isComplete, successCB, errorCB) {
    
    let taskStatus = "";
    switch (isComplete){
        case false:
            taskStatus = "complete";
            break;
        case true:
            taskStatus = "active";
            break;
    }

    console.log("taskStatus =" + taskStatus);
    var request = {
        type: 'PUT',
        url: 'api/tasks/'+ id +'/mark_' + taskStatus + '?api_key=1',
        data: {
        },
        success: successCB,
        error: errorCB
    }

    $.ajax(request);
};

