/**
 * Created by yangwei on 10/3/15.
 */
var app = angular.module('assignmentApp', []);

app.controller('assignmentController',[ '$http', function($http){

    var ds = this;
    var entries = 6;

    //pagenation variable
    ds.recordLength = 0;
    ds.limit = entries;
    ds.currentPageNumber = 1;
    ds.begin = 0;

    //data source vaiable
    ds.students = [];
    ds.pStudent = null;
    ds.schedules = [];
    ds.teachers = [];
    ds.selectedTeacher = null;

    //fetch all incomes
    $http.get("php/json/students.php?waiting=true")
        .success(function(data) {
            if(data != "null") {
                ds.students = data;
            }
            ds.pagenate(ds.students);
        });

    //fetch all teachers
    $http.get("php/json/teachers.php")
        .success(function(data) {
            if(data != "null") {
                ds.teachers = data;
                console.log(ds.teachers);
            }
        });

    /**
     * show student profile when a student is clicked
     * @param wechat
     */
    ds.showProfile = function(wechat){
        console.log(wechat);
        for(i = 0; i < ds.students.length; i++) {
            if (ds.students[i].wechat == wechat) {
                ds.pStudent = ds.students[i];
                console.log(ds.pStudent.requirement);
                ds.getSchedule(wechat);
            }
        }
    }

    /**
     * get the schedule of the selected student
     * @param wechat
     */
    ds.getSchedule = function(wechat) {
        $http.get("php/json/schedules.php?student=" + wechat)
            .success(function(data) {
                if(data != "null") {
                    ds.schedules = data;
                }
            });
    }

    /**
     * assign a teacher to student
     */
    ds.assign = function() {
        ds.pStudent.teacher = ds.selectedTeacher.name;
        console.log(ds.pStudent);
        //ajax submit to php
        $http.post("php/json/assign.php?student=" +
            ds.pStudent.wechat + "&teacher=" +
            ds.selectedTeacher.name + "&tid=" +
            ds.selectedTeacher.id)
            .then(function(response){
                if(response.data.success) {
                    alert(ds.selectedTeacher.name + "has been assigned to " + ds.pStudent.name);
                }else {
                    alert(response.data.message);
                }
            }, function(){
                console.log('http call failed');
            });
    }

    /**
     * pagenate function
     * @param data
     */
    ds.pagenate = function(data) {
        ds.recordLength = data.length;
        var pNumber = Math.round(ds.recordLength/ds.limit);
        if (Math.round(ds.recordLength % ds.limit) < 3) {
            pNumber = pNumber + 1;
        }
        ds.pages = [];
        for (i=0; i<pNumber; i++) {
            ds.pages.push( i+1 );
        }
    }

    /**
     * previous page function
     */
    ds.prevPage = function() {
        if (ds.currentPageNumber > 1) {
            ds.setPage(ds.currentPageNumber - 1);
        }
    };

    /**
     * next page function
     */
    ds.nextPage = function() {
        if (ds.currentPageNumber < ds.pages.length) {
            ds.setPage(ds.currentPageNumber + 1);
        }
    };

    /**
     * set page according the page number
     * @param pageNumber
     */
    ds.setPage = function(pageNumber) {
        ds.currentPageNumber = pageNumber;
        ds.begin = ds.currentPageNumber * entries - entries;
    };

}]);



