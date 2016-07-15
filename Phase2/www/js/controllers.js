/**
 * Login Controller
 * */
app.controller('loginPage', function($state, $scope, $ionicPopup, $timeout, $ionicLoading, $http, $localStorage, userService , $element) {
  var userData = $localStorage.userData;
  if (typeof userData !== "undefined" && userData.IsSuccess == true) {
    $state.go('home');
  }
  var user = {
    "username": '',
    "password": ''
  }

  //authenticate user
  $scope.doLogin = function(user) {

   // console.log(user);
    $ionicLoading.show({
      content: 'processing...',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

     userService.authenticate(user.username, user.password, function(data) {
      console.log(data);
        if (data.IsSuccess == true) {
        $localStorage.userData = data;
		  
		$localStorage.SessionId = $scope.SessionId = data.SessionId;
		
		  $localStorage.username = user.username;
		  
		  
	
	
		  $ionicLoading.hide();
          $state.go('home');
		
        } else {
          $scope.showAlert();
          $ionicLoading.hide();
        }

      });

    

    //$state.go('home');

  };

  $scope.showAlert = function(msg) {
    if ((msg == '') || (msg == undefined)) {
      msg = 'Username or Password is invalid';
    }
    var alertPopup = $ionicPopup.alert({
      title: 'Error',
      template: msg
    });
    alertPopup.then(function(res) {});
  };
});

/**
 * appCtrl Controller
 * */

app.controller('appCtrl', function($window, $state, $filter, $scope, $ionicPopup, $timeout, $ionicLoading, $http, $localStorage, userService, $stateParams, $cordovaBarcodeScanner, $ionicActionSheet, $sessionStorage ,$anchorScroll, $location) {

if(typeof $localStorage.userData == "undefined")
  {
	$state.go('app');
  }
  $scope.count = 0;


    var BillingHistory1 = {
    "To": '',
    "From": ''
  }
  
   $scope.PersonalInfoData = $localStorage.PersonalInfoData;
	$scope.MedicalInfoData = $localStorage.MedicalInfoData;
	$scope.EmergencyContactData = $localStorage.EmergencyContactData;
	$scope.SessionCalenderData = $localStorage.SessionCalenderData;
	$scope.SongListData = $localStorage.SongListData;
	$scope.BillingHistoryData = $localStorage.BillingHistoryData;
 	// $scope.BillingHistory1.To = $localStorage.BillingHistory1.To;
	// $scope.BillingHistory1.From = $localStorage.BillingHistory1.From;
	
 
 /**
 * Logout
 * */
 
 $scope.logOut = function() {
    $localStorage.$reset();
    localStorage.clear();
    location.href = "#/login";
  };
  

  
   /****************** Document List code *******************/
   $scope.songlist1 = function() {
    $ionicLoading.show({
      content: 'processing...',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
	
	$ionicLoading.hide();
	$state.go('songlist1');
	  
  }; 
  
   /****************** Document List code *******************/
   $scope.SongList = function() {
    $ionicLoading.show({
      content: 'processing...',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
	
	
	 userService.SongList(function(data) {
        console.log(data);
		if(data == '"Session expired or invalid"')
		{
			$ionicLoading.hide();
			$scope.showAlert("Session expired. Please Login ");
			$localStorage.$reset();
			localStorage.clear();
			location.href = "#/login";
		}
		else
		{
			if (data.Records.length > 0) {
		   
			$scope.SongListData = data;
			$localStorage.SongListData = data.Records;
		   //console.log($scope.SongListData); 
			$ionicLoading.hide();
			$state.go('SongList');
		   }
		   else
		   {
				$ionicLoading.hide();
				$scope.showAlert("No Records Found");
				
		   }
			
		}
	   
		
    });
	  
  }; 
  
    /****************** Document List code end *******************/
	
	  /****************** Home Page code *******************/
    $scope.home = function() {
    $ionicLoading.show({
      content: 'processing...',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
	
	


     $ionicLoading.hide();
      $state.go('home');
    
  };
  
  	/****************** Home Page code end *******************/
	

	  /****************** Billing History Filter code *******************/
	  
    $scope.BillingHistoryFilter = function(BillingHistory1) {
		
   $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
	
	 userService.BillingHistoryFilter(BillingHistory1, function(data) {
		 console.log(data);
		if(data == '"Session expired or invalid"')
		{
			$ionicLoading.hide();
			$scope.showAlert("Session expired. Please Login ");
			$localStorage.$reset();
			localStorage.clear();
			location.href = "#/login";
		
		}
		else
		{
			 if (data.Records.length > 0) {
			    $scope.BillingHistoryData = $localStorage.BillingHistoryData=data.Records;
				$ionicLoading.hide();
				$state.go('BillingHistory');
			   
		   }else
		   {
			   $scope.BillingHistoryData = $localStorage.BillingHistoryData=data.Records;
			   $scope.showAlert("No Records Found");
			   $ionicLoading.hide();
			   $state.go('BillingHistory');
			} 
       
			
		}
         
	  
      }); 
	};  
  
    /****************** Billing History Filter code end *******************/
	
	
	  /****************** Login Page code *******************/
	  
  $scope.login = function() {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
     $ionicLoading.hide();
      $state.go('login');
    
  };
    /****************** Login Page code end *******************/
	 
	 
	 
	    $scope.BillingHistory1 = function() {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
	
	$ionicLoading.hide();
	$state.go('BillingHistory1');
	  
  }; 
  
  
	/****************** Payments Page code *******************/
	 
   $scope.Payments = function() {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
     $ionicLoading.hide();
      $state.go('Payments');
    
  };
  
   $scope.SessionCalender1 = function() {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
     $ionicLoading.hide();
      $state.go('SessionCalender1');
    
  };

  /****************** Payments Page code end *******************/
	
 /****************** Personal Info  Page code *******************/
	
 $scope.PersonalInfoPage = function() {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
	
	
	 userService.getSomething(function(data) {
       
	   if(data == '"Session expired or invalid"')
		{
			$ionicLoading.hide();
			$scope.showAlert("Session expired. Please Login ");
			$localStorage.$reset();
			localStorage.clear();
			location.href = "#/login";
		
		}
		else
		{
			  //console.log(data.Records.length); 
			  /*var pBirthDate = '';
			  for( var _obj in data.Records )
			  {
				  if( data.Records[_obj].Birthdate ) {
				     pBirthDate = data.Records[_obj].Birthdate;
					 if (data.Records[_obj].Birthdate.indexOf('T') !== -1)
					 {
					    var array = data.Records[_obj].Birthdate.split('T');
						var currdate = array[0].split('-');
						//console.log(currdate); 
						//data.Records[_obj].Birthdate = currdate[1]+"-"+currdate[2]+"-"+currdate[0];//array[0];
						data.Records[_obj].Birthdate = currdate[0]+"-"+currdate[1]+"-"+currdate[2];
				 	 }
					 break;
				  }
			  }*/

			  
			  //console.log(data.Records);  	  
			  if (data.Records.length > 0) {
			    $scope.PersonalInfoData = data;
				$localStorage.PersonalInfoData = data.Records;
				
				$ionicLoading.hide();
				$state.go('PersonalInfoPage');
			   
		   }else
		   {
			   $scope.BillingHistoryData = $localStorage.BillingHistoryData=data.Records;
			   $scope.showAlert("Your are not valid user to get personal information . Please login with valid user.");
			   $ionicLoading.hide();
			   $state.go('PersonalInfo');
			} 
       
			
		}
		
		
		
    });
	  
  }; 

   /****************** Personal Info  Page code end *******************/
  
   /****************** Session Calender Page code *******************/
   
  $scope.SessionCalender = function() {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
	 userService.SessionCalender($localStorage.SessionId ,function(data) {
		 console.log(data);
		 if(data == '"Session expired or invalid"')
		{
			$ionicLoading.hide();
			$scope.showAlert("Session expired. Please Login ");
			$localStorage.$reset();
			localStorage.clear();
			location.href = "#/login";
		
		}
		else
		{
			if (data.Records.length > 0) {
			    $scope.SessionCalenderData = data;
				$localStorage.SessionCalenderData = data.Records;
				$ionicLoading.hide();
				$state.go('SessionCalender');
		
			}
			else
		    {
			   $scope.showAlert("No Records Found");
			   $ionicLoading.hide();
				
			}
       
			
		}
		
		   
		
     });
	};  
   /****************** Session Calender Page code end *******************/
   
 /****************** Personal Info Menu Page code *******************/
	
  
 $scope.PersonalInfo = function() {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
	
	
$ionicLoading.hide();
    $state.go('PersonalInfo');
  }; 
  
   /****************** Personal Info Menu Page code end *******************/
	
	 /****************** Medical Info Page code *******************/
	
    $scope.MedicalInfo = function() {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
		userService.getSomething(function(data) {
       console.log(data);
	   
	   	 if(data == '"Session expired or invalid"')
		{
			$ionicLoading.hide();
			$scope.showAlert("Session expired. Please Login ");
			$localStorage.$reset();
			localStorage.clear();
			location.href = "#/login";
		
		}
		else
		{
					if (data.Records.length > 0) {
			
			
			$scope.MedicalInfoData = data;
			$scope.MedicalInfoData = []; 
			$scope.UserId= $localStorage.UserId = data.Records[0].Id;
			console.log(data.Records[0].Medical_Conditions__c );
			var Medical_Conditions=data.Records[0].Medical_Conditions__c ;
			if(Medical_Conditions === null  )
			{
				
			}
			else
			{

				var stringData= data.Records[0].Medical_Conditions__c;
				if (stringData.indexOf('!') !== -1)
				{
				
				 var array = stringData.split('!');
				 $scope.count= array.length;
				 //console.log($scope.MedicalInfoData);
					for(var $sl=0;$sl < array.length; $sl++)
					{
						var obj= "Medical_Conditions__c"+$sl;
			
		
						
							$scope.MedicalInfoData.push({
							name: obj,
							value: array[$sl]
						});
		 
					}
				}
			}
			
			$localStorage.MedicalInfoData=$scope.MedicalInfoData;
			//console.log($scope.MedicalInfoData);
			$ionicLoading.hide();
			$state.go('MedicalInfo');
		   
			}
			else
			{
					
				$scope.BillingHistoryData = $localStorage.BillingHistoryData=data.Records;
			   $scope.showAlert("Your are not valid user to get medical information . Please login with valid user.");
			   $ionicLoading.hide();
			   $state.go('PersonalInfo');
			   }
		}
		
		
	});
	
 }; 

 /****************** Medical Info Page code end  *******************/
	


 /****************** Emergency Contact Page code *******************/
		
  $scope.EmergencyContact = function() {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
	
	userService.EmergencyContact(function(data) {
       
	   console.log(data);
	   if(data == '"Session expired or invalid"')
		{
			$ionicLoading.hide();
			$scope.showAlert("Session expired. Please Login ");
			$localStorage.$reset();
			localStorage.clear();
			location.href = "#/login";
		
		}
		else
		{
			$scope.UserId= $localStorage.UserId = data.Records[0].Id;
        
			/* var stringData1= data.Records[0].Emergency_Contact_Phone__c;
			var stringData2= data.Records[0].Emergency_Contact_Summary__c;
			if (stringData1.indexOf('!') !== -1)
				{
					$scope.EmergencyContactData = []; 
					 var Phone = stringData1.split('!');
					 var Desc  = stringData2.split('<!--!>');
					 //$scope.count= array.length;
					 console.log(stringData1);
						for(var $sl=0;$sl < Phone.length; $sl++)
						{
							var count = +$sl + +1;
							var obj= "Emergency Contact ";
				
							$scope.EmergencyContactData.push({
								name: obj,
								number: Phone[$sl],
								description: Desc[$sl],
								
							});
						
			 
						}
				}
			$scope.EmergencyContactCount=Phone.length; */
			$localStorage.EmergencyContactData=$scope.EmergencyContactData=data.Records;
				/* 	$scope.EmergencyContactCount = []; 
			$scope.EmergencyContactCount.push(Phone.length);
			console.log($scope.EmergencyContactCount);  */
			//console.log(data.Records);
			//console.log($scope.EmergencyContactData);  
			$ionicLoading.hide();
			$state.go('EmergencyContact');
			$("#EmergencyContactCount").val(Phone.length);
			$("#EmergencyContactCount").text(Phone.length);
		   
			
		} 
		
	   $ionicLoading.hide();
		
	});
	 }; 
  
  /****************** Emergency Contact Page code *******************/
	
	
   $scope.PaymentPage = function() {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
     $ionicLoading.hide();
      $state.go('PaymentPage');
    
  }; 
  
  
  /****************** Billing History Page code *******************/
	
	
    $scope.BillingHistory = function() {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
	
		userService.BillingHistory(function(data) {
			console.log(data);
        if(data == '"Session expired or invalid"')
		{
			$ionicLoading.hide();
			$scope.showAlert("Session expired. Please Login ");
			$localStorage.$reset();
			localStorage.clear();
			location.href = "#/login";
		
		}
		else
		{
			 if (data.Records.length > 0) {
			    $scope.BillingHistoryData = data;
				$localStorage.BillingHistoryData = data.Records;
				//$localStorage.BillingHistory1.To = $localStorage.BillingHistory1.From ='2016-01-01T09:38:01';
				
				$ionicLoading.hide();
				$state.go('BillingHistory');
			   
		   }else
		   {
			   $scope.showAlert("No Records Found");
			   $ionicLoading.hide();
			   //$state.go('BillingHistory');
			}
       
			
		}
	   
	    
		
		
    });
			   
 }; 
  
   /****************** Billing History Page code *******************/
	
 /****************** Personal Info Form Submit code *******************/
   
  $scope.PersonalInfoFormSubmit = function(PersonalInfo) {

    //console.log(PersonalInfo);
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    if (PersonalInfo.FirstName.length > 0) {
      userService.PersonalInfoFormSubmit(PersonalInfo, function(data) {
          $localStorage.username = PersonalInfo.Email;
		  //console.log($localStorage.username); 
        if (data.HasError == false) {
		 $scope.showAlert("Data Updated Successfully");
		  $ionicLoading.hide();
          $state.go('PersonalInfoPage');
        } else {
         $scope.showAlert("Data Updated Successfully");
          $ionicLoading.hide();
        }

      });

    
    } else {
      $scope.showAlert();
      $ionicLoading.hide();
    }

    //$state.go('home');

  };
  
  /****************** Personal Info Form Submit code *******************/

   /****************** Medical Info Form Submit code *******************/
  
  $scope.MedicalInfoFormSubmit = function() {

  // console.log( $('#MedicalInfoSubmit').serialize());
	var string = $('#MedicalInfoSubmit').serialize();
	//console.log(string);
	var finalString=[];
	if (string.indexOf('&') !== -1)
	{
		var array = string.split('&');
		//console.log(array);
		for(var $sl=0;$sl < array.length; $sl++)
					{
						var array1 = array[$sl].split('=');
						finalString.push(array1[1].replace("+", " "));
		 
					}
		
	}
	var Medical_Conditions__c = finalString.join('!');
	//console.log(Medical_Conditions__c);
	$ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

  $ionicLoading.hide();
   
      userService.MedicalInfoFormSubmit(Medical_Conditions__c, function(data) {
        //console.log(data);
        if (data.HasError == false) {
		 $scope.showAlert("Data Updated Successfully");
		  $ionicLoading.hide();
          $state.go('MedicalInfo');
        } else {
           $scope.showAlert("Fail to Update. Please try again");
          $ionicLoading.hide();
        }

      });

    
    
  };
  
 /****************** Medical Info Form Submit code *******************/
  
  
   /****************** Emergency Contact Form Submit Submit code *******************/
      
  $scope.EmergencyContactFormSubmit = function() {
	
	var Id=[];
	var First_Name__c=[];
	var Last_Name__c=[];
	var Home_Phone__c=[];
	var Mobile_Phone__c=[];
	var Description__c=[];
	var FIRST_NAME=[];
	var LAST_NAME=[];
	var TELEPHONE_NUMBER=[];
	var MOBILE_NUMBER=[];
	var DESCRIPTION=[];
	var dataArray = $("#EmergencyContactSubmit").serializeArray();
	console.log(dataArray);
	 
	for (i=0; i<dataArray.length; i += 1) {
    if (dataArray[i].name === "Id") {
       Id.push(dataArray[i].value);
    }
	else if (dataArray[i].name === "First_Name__c") {
      
		First_Name__c.push(dataArray[i].value);
    }
	else if (dataArray[i].name === "Last_Name__c") {
       
		Last_Name__c.push(dataArray[i].value);
    }
	else if (dataArray[i].name === "Home_Phone__c") {
      
		Home_Phone__c.push(dataArray[i].value);
    }
	else if (dataArray[i].name === "Mobile_Phone__c") {
      
		Mobile_Phone__c.push(dataArray[i].value);
    }
	else if (dataArray[i].name === "Description__c") {
       
		Description__c.push(dataArray[i].value);
    }
	
	else if (dataArray[i].name === "FIRST_NAME") {
      
		FIRST_NAME.push(dataArray[i].value);
    }
	else if (dataArray[i].name === "LAST_NAME") {
       
		LAST_NAME.push(dataArray[i].value);
    }
	else if (dataArray[i].name === "MOBILE_NUMBER") {
      
		MOBILE_NUMBER.push(dataArray[i].value);
    }
	else if (dataArray[i].name === "TELEPHONE_NUMBER") {
      
		TELEPHONE_NUMBER.push(dataArray[i].value);
    }
	else if (dataArray[i].name === "DESCRIPTION") {
       
		DESCRIPTION.push(dataArray[i].value);
    }
	
	}
	
	// console.log(Id);
	// console.log(First_Name__c);
	// console.log(Last_Name__c);
	// console.log(Home_Phone__c);
	// console.log(Mobile_Phone__c);
	// console.log(Description__c);

	
     $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    if (Id.length > 0) {
      userService.EmergencyContactFormSubmit(Id,First_Name__c,Last_Name__c,Home_Phone__c,Mobile_Phone__c,Description__c,FIRST_NAME,LAST_NAME,TELEPHONE_NUMBER,MOBILE_NUMBER,DESCRIPTION, function(data) {
		  console.log(data);
       /* if (data.HasError == false) {
		 $scope.showAlert("Data Updated Successfully");
		  $ionicLoading.hide();
          $state.go('EmergencyContact');
        } else {
         $scope.showAlert("Fail to Update. Please try again");
		  $ionicLoading.hide();
          $state.go('EmergencyContact');
        }*/
		 $scope.showAlert("Data Updated Successfully");
		  $ionicLoading.hide();
          $state.go('EmergencyContact');
      });

    
    } else {
      $scope.showAlert();
      $ionicLoading.hide();
    } 

  };
    
   /****************** Emergency Contact Form Submit Submit code *******************/
     
	 
	 
	 
   /****************** Medical Info Form Submit code *******************/
  
  $scope.DocumentListFilter = function(character) {

    //console.log(character);
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    if (character.length > 0) {
      userService.DocumentListFilter(character, function(data) {
		 
		  if(data == '"Session expired or invalid"')
		{
			$ionicLoading.hide();
			$scope.showAlert("Session expired. Please Login ");
			$localStorage.$reset();
			localStorage.clear();
			location.href = "#/login";
		
		}
		else
		{
			 if (data.Records.length > 0) {
			    $scope.SongListData = $localStorage.SongListData=data.Records;
				$ionicLoading.hide();
				$state.go('SongList');
			   
		   }else
		   {
			   $scope.SongListData = $localStorage.SongListData=data.Records;
			   $scope.showAlert("No Records Found");
			   $ionicLoading.hide();
			   $state.go('SongList');
			}
       
			
		}
		
        
       
      });

    
    } else 
	{
       userService.SongList(function(data) {
       
	    if(data == '"Session expired or invalid"')
		{
			$ionicLoading.hide();
			$scope.showAlert("Session expired. Please Login ");
			$localStorage.$reset();
			localStorage.clear();
			location.href = "#/login";
		
		}
		else
		{
			$scope.SongListData = $localStorage.SongListData=data.Records;
			//console.log($scope.SongListData); 
			$ionicLoading.hide();
			$state.go('SongList');
       
			
		}
		
		
		
    });
    }

  };
  
 /****************** Medical Info Form Submit code *******************/
  
  
    
  $scope.NameSplit = function(string) {
	var charcter= string.charAt(0);
	var res = charcter.toUpperCase();
	return res;
   
};

  
  
  $scope.DateSplit = function(string,nb) {
	if (string.indexOf('T') !== -1)
	{
		 var array = string.split('T');
			return array[nb];
	}
   
};
  $scope.Venue_Details__cSplit = function(string) {
	var re = /<br>/gi;
    var array = string.replace(re,',');
	 var re1 = /,/gi;
	var array1 = array.replace(re1,' -');
	return array1
};

  
  $scope.showAlert = function(msg) {
    if ((msg == '') || (msg == undefined)) {
      msg;
    }
    var alertPopup = $ionicPopup.alert({
      title: 'Notice',
      template: msg
    });
    alertPopup.then(function(res) {});
  };


  $scope.gotoAnchor = function(x) {
	  console.log(x)
        var newHash = 'anchor' + x;
        if ($location.hash() !== newHash) {
          // set the $location.hash to `newHash` and
          // $anchorScroll will automatically scroll to it
          $location.hash('anchor' + x);
        } else {
          // call $anchorScroll() explicitly,
          // since $location.hash hasn't changed
          $anchorScroll();
        }
      };
 
 
 
 	
	
    $scope.Download = function(id,name) {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
	
		userService.Download(id,name,function(data) {
			console.log(data);

			setTimeout(function () {
                       window.open(data);
						$ionicLoading.hide();
						
                    }, 1000);  
					

			
        
	  //$scope.showAlert(data);
    });
			   
 }; 
  

});

