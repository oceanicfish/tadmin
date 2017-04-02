/**
 * Created by yangwei on 10/3/15.
 */
var app = angular.module('incomeApp', []);

app.controller('incomeController',[ '$http', function($http){

    var ds = this;
    var entries = 6;
    ds.students = [];
    ds.contacts = [];
    ds.incomes = [];
    ds.recordLength = 0;
    ds.limit = entries;
    ds.currentPageNumber = 1;
    ds.begin = 0;
    ds.hours = 10;
    ds.rate = 200;
    ds.total = ds.rate * ds.hours;
    ds.expired = 31;
    ds.agent = "Jessie";


    //fetch all students
    $http.get("php/json/students.php")
        .success(function(data) {
            if(data != "null") {
                ds.students = data;
            }
        });

    //fetch all incomes
    $http.get("php/json/income.php")
        .success(function(data) {
            if(data != "null") {
                ds.incomes = data;
                ds.pagenate(ds.incomes);
            }
        });

    /**
     * submit new payment
     */
    ds.pay = function() {

        //prepare income data
        ds.income = {
            name : ds.name.name,
            wechat : ds.name.wechat,
            hours : ds.hours,
            agent : ds.agent,
            pdate : Math.round(Date.now() / 1000),
            expired : Math.round(Date.now() / 1000) + (ds.expired * 86400),
            rate : ds.rate,
            amount : ds.total,
            description : ds.description
        };

        //ajax submit to php
        $http.post("php/json/newPayment.php", ds.income)
            .then(function(response){
                if(response.data.success) {
                    ds.incomes.unshift(ds.income);
                    ds.pagenate(ds.incomes);
                }else {
                    //alert(response.data);
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
        console.log(ds.recordLength);
        var pNumber = Math.round(ds.recordLength/ds.limit);
        if (Math.round(ds.recordLength % ds.limit) < 3) {
            pNumber = pNumber + 1;
        }
        console.log(pNumber);
        ds.pages = [];
        for (i=0; i<pNumber; i++) {
            ds.pages.push( i+1 );
        }
        console.log(ds.pages);
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

    /**
     * calculate total amount
     */
    ds.cal = function() {
        ds.total = ds.rate * ds.hours;
    }

    /**
     * get total amount
     * @returns {number}
     */
    ds.getTotalAmount = function() {
        var totalAmount = 0;
        for(i = 0; i < ds.incomes.length; i++) {
            totalAmount += parseInt(ds.incomes[i].amount);
        }
        return totalAmount;
    }

    /**
     * get total hours
     * @returns {number}
     */
    ds.getTotalHours = function() {
        var totalHours = 0;
        for(i = 0; i < ds.incomes.length; i++) {
            totalHours += parseInt(ds.incomes[i].hours);
        }
        return totalHours;
    }

    /**
     * get current date
     */
    ds.getDate = function() {
        return Date.now();
    }

}]);



