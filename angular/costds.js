/**
 * Created by yangwei on 10/3/15.
 */
var app = angular.module('costApp', []);

app.controller('costController',[ '$http', function($http){

    var ds = this;
    var entries = 6;

    //pagenation variable
    ds.recordLength = 0;
    ds.limit = entries;
    ds.currentPageNumber = 1;
    ds.begin = 0;

    //data source vaiable
    ds.costs = [];

    //fetch all incomes
    $http.get("php/json/cost.php")
        .success(function(data) {
            if(data != "null") {
                ds.costs = data;
            }
            ds.pagenate(ds.costs);
        });

    /**
     * submit new cost
     */
    ds.save = function() {

        //prepare income data
        ds.cost = {
            name : ds.name,
            cdate : Math.round(Date.now() / 1000),
            type : ds.type,
            amount : ds.amount,
            description : ds.description
        };

        //ajax submit to php
        $http.post("php/json/newCost.php", ds.cost)
            .then(function(response){

                console.log(response.data);
                if(response.data.success) {
                    ds.costs.unshift(ds.cost);
                    ds.pagenate(ds.costs);
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
        for(i = 0; i < ds.costs.length; i++) {
            totalAmount += parseInt(ds.costs[i].amount);
        }
        return totalAmount;
    }

    /**
     * get current date
     */
    ds.getDate = function() {
        return Date.now();
    }

}]);



