/**
 * Created by yangwei on 10/3/15.
 */
var app = angular.module('recordApp', []);

app.controller('recordController',[ '$http', function($http){

    var ds = this;
    var entries = 10;

    //pagenation variable
    ds.recordLength = 0;
    ds.limit = entries;
    ds.currentPageNumber = 1;
    ds.begin = 0;

    //data source vaiable
    ds.records = [];
    ds.students = [];
    ds.teacherName = "";
    ds.tid = "";
    ds.clength = 1;

    //fetch all students who was matched the teacher, empty stands for all teachers
    $http.get("php/json/myStudents.php?tid=" + ds.tid)
        .success(function(data) {
            if(data != "null") {
                ds.students = data;
            }
        });

    //fetch all records related this teacher, empty stands for all teachers
    $http.get("php/json/records.php?tid=" + ds.tid)
        .success(function(data) {
            if(data != "null") {
                ds.records = data;
                ds.pagenate(ds.records);
            }
        });

    ds.save = function() {
        ds.record = {
            student : ds.student.name,
            sid : ds.student.wechat,
            teacher : ds.teacherName,
            tid : ds.tid,
            cdate : ds.date,
            cfrom : ds.cfrom,
            clength : ds.clength,
            note : ds.note
        }

        //ajax submit to php
        $http.post("php/json/newRecord.php", ds.record)
            .then(function(response){
                if(response.data.success) {
                    ds.records.unshift(ds.record);
                    ds.pagenate(ds.records);
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
        if (Math.round(ds.recordLength % ds.limit) < 5) {
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



