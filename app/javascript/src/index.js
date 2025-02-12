import $ from 'jquery';

import {
    indexTasks,
    postTask,
    markTask,
    deleteTask
} from "./requests.js";

var filterAll = true;
var filterCompleted = false;

var refreshTasks = function(){

    indexTasks(function (response) {
        var htmlString = response.tasks.map(function(task) {
            let taskColor = "";
            let taskButton = "";
            if (task.completed == false){
                taskColor = "text-white bg-primary";
                taskButton = "Complete";
            }
            else if (task.completed == true) {
                taskColor = "text-white bg-info";
                taskButton = "Activate";
            }
            if (filterAll === true || task.completed === filterCompleted){
               return "<div class='col-10 " + taskColor + " mb-3 p-2 border rounded task' data-id='" + task.id + "'>" + task.content + "</div>" +
                "<div class='col-1'><input type='button' class='btn btn-secondary btn-inline completeButton' id='completeButton"+ task.id +"' data-status='"+ 
                task.completed +"' data-id='" + task.id + "' value='"+ taskButton +"'/></div>" + "<div class='col-1'><div type='button' class='btn btn-secondary \
                btn-inline deleteButton' id='deleteButton"+ task.id +"' data-status='"+ task.completed +"' data-id='" + task.id + "'> Delete </div></div>";
            } else {
                return '';
            }
        });
    
        $("#tasks").html(htmlString);

        $(".completeButton").on("click", function(){
            markTask($(this).data("id"),$(this).data("status")), refreshTasks();
        });

        $(".deleteButton").on("click", function(){
            deleteTask($(this).data("id")), refreshTasks();
        })

        $(".submitNewTask").off().on("click", function(){
            postTask($('#newTaskContent').val()), refreshTasks();
        });

        $(".filterButton").off().on('click', function(){

            $(".filterButton").removeClass("btn-lg active").addClass("btn-sm");
            $(this).removeClass("btn-sm").addClass("btn-lg active");
            switch ($(this).attr('id')){
                case 'all':
                    filterAll = true;
                    filterCompleted = false;
                    break;
                case 'inProgress':
                    filterAll = false;
                    filterCompleted = false;
                    break;
                case 'completed':
                    filterAll = false;
                    filterCompleted = true;
                    break;
            }
            refreshTasks();
        });
})};

refreshTasks();
