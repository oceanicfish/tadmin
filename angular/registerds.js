/**
 * Created by yangwei on 10/6/15.
 */
var app = angular.module('registerApp', []);

app.controller('studentController', ['$http', function($http){

    var ds = this;
    ds.student = [];
    ds.errors = [];

    //begin to setting default value
    ds.gender = 'Male';
    ds.monday = [];
    ds.tuesday = [];
    ds.wednesday = [];
    ds.thursday = [];
    ds.friday = [];
    ds.saturday = [];
    ds.sunday = [];
    //end of setting default value

    /**
     * submit student's info
     */
    ds.save = function(){

        console.log(ds);

        var studentObj = {
            name : ds.name,
            gender : ds.gender,
            age : ds.age,
            job : ds.job,
            listening : ds.listening,
            speaking : ds.speaking,
            reading : ds.reading,
            writing : ds.writing,
            toeic : ds.toeic,
            esl : ds.esl,
            wechat : ds.wechat,
            qq : ds.qq,
            skype : ds.skype,
            mobile : ds.mobile,
            monday : {
                time : ds.monday.time,
                length : ds.monday.length
            },
            tuesday : {
                time : ds.tuesday.time,
                length : ds.tuesday.length
            },
            wednesday : {
                time : ds.wednesday.time,
                length : ds.wednesday.length
            },
            thursday : {
                time : ds.thursday.time,
                length : ds.thursday.length
            },
            friday : {
                time : ds.friday.time,
                length : ds.friday.length
            },
            saturday : {
                time : ds.saturday.time,
                length : ds.saturday.length
            },
            sunday : {
                time : ds.sunday.time,
                length : ds.sunday.length
            },
            requirement : ds.requirement,
            background : ds.background,
            target : ds.target,
            note : ds.note
        };

        $http.post("php/json/register.php", studentObj)
            .then(function(response){

                console.log(response.data);
                if(response.data.success) {
                    alert(ds.name + "'s profile has been created");
                }else {
                    //alert(response.data);
                    alert(response.data.message);
                }
            }, function(){
                console.log('http call failed');
            });
    };

}]);