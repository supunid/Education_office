/**
 * Created by supun on 11/2/2017.
 */
'use strict';

angular.module('myApp.add-account', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/add-account', {
            templateUrl: 'views/add-account/add-account.html',
            controller: 'add-accountctrl'
        });
    }])
    .controller('add-accountctrl',function($http, $scope,$location, $window) {
        console.log("add-account");

        var baseurl = '/api';



        $scope.Add_Account= function () {
         var Req_Num= $scope.account.Req_No = $scope.Req_No;
            console.log(Req_Num);
            var  account_arry={name:$scope.account.name,
                Req_No:Req_Num,
                occupation:$scope.account.occupation,
                occupation_place:$scope.account.occupation_place,
                tele_no:$scope.account.tele_no,
                address:$scope.account.address,
                reason:$scope.account.reason,
                Se_depart:"Account",
                Status:"NOT FINISH"

            }

            $http.post(baseurl+'/add_account',account_arry).success(function (respons) {
                console.log(respons);
                if(respons=="success"){
                    console.log("asass1521254")
                    $location.path("/home");
                }

            })
            
            
            
        }
        var getLastReqNo = function () {
            $http.get(baseurl + '/last_req_no').success(function (response1) {
                // getShipNo(response1);
                getReqNo(response1);
                console.log(response1)
            });
        }
        
        
        
        var getReqNo = function (lastNo) {
            console.log("as@asdsddsd")
            var year = new Date().getFullYear();
            if (lastNo == "") {
                var str = "" + 1;
                var pad = "00000";
                var ans = pad.substring(0, pad.length - str.length) + str;
                $scope.Req_No = 'ACCOUNT/' + year + "/" + ans;
            } else {
                var splitRes = lastNo.split('/');
                var autoNumber = splitRes[2];
                autoNumber++;
                var str = "" + autoNumber;
                var pad = "00000";
                var ans = pad.substring(0, pad.length - str.length) + str;
                $scope.Req_No = 'ACCOUNT/' + year + "/" + ans;
            }
        }
     
        getLastReqNo();
        
        
        var getOccupation=function () {
            $http.get(baseurl+'/all_occupation').success(function (allOccupation) {
                console.log(allOccupation);
                $scope.occupation = allOccupation;
                $scope.occupation.value = "Select supplier...."
                
            })
        }

        getOccupation()

    });