angular.module('starter')
  .factory("userService", function($http, $localStorage, $ionicLoading) {
    var apiUrl = 'https://rockchoir.magentrix.com/';
	//var FileUrl = 'http://girdtechnologies.com/test/RC/www/';
	var FileUrl = 'http://britanniaadmin.lets-go-digital.co.uk/TestRC/';

    return {
      authenticate: function(username, password, success) {
        $http.defaults.useXDomain = true;
        $http({
            //url: apiUrl + 'rest/2.0/login?un=' +username+ '&pw='+password,
            url: FileUrl+'login.php?username='+username+'&password='+password,
            method: "GET",
            skipAuthorization: true
          })
          .success(function(data) {
            success(data);
          });
      },
	  
	  UserId: function(success) {
       // console.log($localStorage.username);
        $http({
            method: "GET",
            url: FileUrl+'api.php?url=' + encodeURI('query?q=FROM%20User%20WHERE%20Email%20=%20"'+ $localStorage.username+'"') + '&token=' + $localStorage.userData.SessionId
          })
          .success(function(data) {
		//$localStorage.PersonalInfoData = data;
            success(data);
            console.log(data);
          });
      },
	  
      SongList: function(success) {
       // console.log($localStorage.username);
        $http({
            method: "GET",
            url: FileUrl+'api.php?url=' + encodeURI('query?q=FROM%20Document%20WHERE%20!String.IsNullOrEmpty(Name)%20ORDER%20BY%20Name%20ASC') + '&token=' + $localStorage.userData.SessionId
          })
          .success(function(data) {
		//$localStorage.PersonalInfoData = data;
            success(data);
           
          });
      }, 
	  
	  BillingHistory: function(success) {
       // console.log($localStorage.username);
        $http({
            method: "GET",
            url: FileUrl+'api.php?url=' + encodeURI('query?q=FROM%20Force.Force__Payment__c%20WHERE%20Status__c%20!=%20"Pending"') + '&token=' + $localStorage.userData.SessionId
          })
          .success(function(data) {
		//$localStorage.PersonalInfoData = data;
            success(data);
            //console.log(data);
          });
      },

	  getSomething: function(success) {
        //console.log($localStorage.UserId);
        $http({
            method: "GET",
            url: FileUrl+'api.php?url=' + encodeURI('query?q=FROM%20Force.Force__Contact%20WHERE%20Email="'+ $localStorage.username +'"') + '&token=' + $localStorage.userData.SessionId
          })
          .success(function(data) {
		//$localStorage.PersonalInfoData = data;
            success(data);
          // console.log(data);
          });
      },

      SessionCalender: function(sessionId, success) {
        //console.log($localStorage.userData.SessionId);
        $http({
            method: "GET",
            url: FileUrl+'api.php?url=' + encodeURI('query?q=FROM%20Force.Force__Attendance__c&options={%20"Take":3,%20"Skip":2%20}') + '&token=' + $localStorage.userData.SessionId
          })
          .success(function(data) {
            success(data);
          });
      },
      PersonalInfoFormSubmit: function(PersonalInfoForm, success) {
		   console.log(PersonalInfoForm.Birthdate);
		 $http({
            method: "GET",
            url: FileUrl+'UpdateData.php?FirstName=' + PersonalInfoForm.FirstName + '&LastName=' + PersonalInfoForm.LastName +    '&Email=' + PersonalInfoForm.Email +  '&Name=' + PersonalInfoForm.FirstName +' '+ PersonalInfoForm.LastName+'&OtherState=' + PersonalInfoForm.OtherState +  '&OtherStreet=' + PersonalInfoForm.OtherStreet +'&Birthdate='+ PersonalInfoForm.Birthdate + '&OtherCity=' + PersonalInfoForm.OtherCity +  '&OtherCountry=' + PersonalInfoForm.OtherCountry +  '&OtherPostalCode=' + PersonalInfoForm.OtherPostalCode +  '&Phone=' + PersonalInfoForm.Phone + '&Id=' + PersonalInfoForm.Id + '&Voice_Type__c=' + PersonalInfoForm.Voice_Type__c + '&Gender__c=' + PersonalInfoForm.Gender__c +  '&token=' + $localStorage.userData.SessionId
          
		  })
          .success(function(data) {
          
		   console.log(data);
		   success(data);
       });
      },

		
	     EmergencyContact: function(success) {
        $http({
            method: "GET",
            url: FileUrl+'api.php?url=' + encodeURI('query?q=FROM%20Force__Emergency_Contact__c') + '&token=' + $localStorage.userData.SessionId
          })
          .success(function(data) {
		//$localStorage.PersonalInfoData = data;
            success(data);
            console.log( data);
          });
      },
	  
	  
	    MedicalInfoFormSubmit: function(Medical_Conditions__c, success) {
		console.log($localStorage.UserId);
      
		 $http({
            method: "GET",
            url: FileUrl+'UpdateMedicalinfo.php?Medical_Conditions__c=' + Medical_Conditions__c +  '&Id=' + $localStorage.UserId +  '&token=' + $localStorage.userData.SessionId +  '&Type=MedicalInfoForm'
          
		  })
          .success(function(data) {
			console.log(data);
            success(data);
       });
      },
	
	
	    EmergencyContactFormSubmit: function(Id,First_Name__c,Last_Name__c,Home_Phone__c,Mobile_Phone__c,Description__c,FIRST_NAME,LAST_NAME,TELEPHONE_NUMBER,MOBILE_NUMBER,DESCRIPTION, success) {
		   //console.log($localStorage.UserId);
      
		 $http({
            method: "GET",
            url: FileUrl+'UpdateEmergencyContact.php?Id=' + Id +  '&Choir_Member__c=Addy Test Member&First_Name__c=' + First_Name__c +  '&Last_Name__c=' + Last_Name__c +  '&Home_Phone__c=' + Home_Phone__c +'&Mobile_Phone__c=' + Mobile_Phone__c + '&Description__c=' + Description__c +  '&FIRST_NAME=' + FIRST_NAME +  '&LAST_NAME=' + LAST_NAME +  '&TELEPHONE_NUMBER=' + TELEPHONE_NUMBER +'&MOBILE_NUMBER=' + MOBILE_NUMBER + '&DESCRIPTION=' + DESCRIPTION +'&token=' + $localStorage.userData.SessionId
          
		  })
          .success(function(data) {
			//console.log(data);
            success(data);
       });
      },
	  
	  	DocumentListFilter: function(Character,success) {
       //console.log(Character);
        $http({
            method: "GET",
            url: FileUrl+'api.php?url=' + encodeURI('query?q=FROM%20Document%20WHERE%20Name.StartsWith("'+ Character +'")') + '&token=' + $localStorage.userData.SessionId
          })
          .success(function(data) {
		//$localStorage.PersonalInfoData = data;
            success(data);
           // console.log(data);
          });
      },
	  
	  BillingHistoryFilter: function(BillingHistory1,success) {
		
				var date1 = new Date(BillingHistory1.To);
				mnth1 = ("0" + (date1.getMonth()+1)).slice(-2),
				day1  = ("0" + date1.getDate()).slice(-2);
				var To = date1.getFullYear() + '-' + mnth1 + '-' + day1+'T09:38:01';
				
				var date = new Date(BillingHistory1.From);
				mnth = ("0" + (date.getMonth()+1)).slice(-2),
				day  = ("0" + date.getDate()).slice(-2);
				var From = date.getFullYear() + '-' + mnth + '-' + day+'T09:38:01';
				
				$http({
					method: "GET",
					url: FileUrl+'api.php?url=' + encodeURI('query?q=FROM%20Force.Force__Payment__c%20WHERE%20SystemModstamp%20<=%20"'+To+'"%20AND%20SystemModstamp%20>=%20"'+From+'"%20AND%20Status__c%20!=%20"Pending"') + '&token=' + $localStorage.userData.SessionId
				  })
				  .success(function(data) {
				//$localStorage.PersonalInfoData = data;
					success(data);
				//	console.log(data);
				  });
	
         
      },
	  
	   Download: function(id,name,success) {
       console.log(id);   
	   console.log(name);
        $http({
            method: "GET",
            url: FileUrl+'download.php?url=' + encodeURI('https://rockchoir.magentrix.com/rest/2.0//Document/'+id) + '&name='+name+'&FileUrl='+FileUrl+'&token=' + $localStorage.userData.SessionId
          })
          .success(function(data) {
		//$localStorage.PersonalInfoData = data;
            success(data);
            console.log(data);
          }); 
      },
	  
	  
	
    }
  });
