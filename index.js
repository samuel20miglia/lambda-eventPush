'use strict'

var AWS = require('aws-sdk');
var appId = null;
var ddb = new AWS.DynamoDB();
var pinpoint = new AWS.Pinpoint();

// strart
exports.pusHandler = function(event) {

		appId = '67ce6742902e4423875d38aa29d9fa72';
	var params = {ApplicationId: appId};

    /* type of event */
    var eventAction = event.Records[0].eventName;

    var eventData = event.Records[0].dynamodb;

     /* check if modify */
    if(eventAction !== 'MODIFY'){
    	console.log("Not modify skipped");
    	return;
    }

    eventData = eventData.NewImage;

    console.log(eventData);

    var promocode = false;
    if (typeof(eventData.promocode) != "undefined"){
    	promocode = eventData.promocode.S;
    }
    var dateTimeStart = "";
    if (typeof(eventData.dateTimeStart) != "undefined"){
    	dateTimeStart = eventData.dateTimeStart.S;
    }
    var dateTimeStop = "";
    if (typeof(eventData.dateTimeStop) != "undefined"){
    	dateTimeStop = eventData.dateTimeStop.S;
    }
    var dateCreation = "";
    if (typeof(eventData.dateCreation) != "undefined"){
    	dateCreation = eventData.dateCreation.S;
    }
    var eventType = "";
    if (typeof(eventData.eventType) != "undefined"){
    	eventType = eventData.eventType.S;
    }
    var pointId = false;
    if (typeof(eventData.pointId) != "undefined"){
    	pointId = eventData.pointId.S;
    }
    var mobilePhone = "";
    if (typeof(eventData.mobilePhone) != "undefined"){
    	mobilePhone = eventData.mobilePhone.S;
    }
    var rangeKm = "";
    if (typeof(eventData.rangeKm) != "undefined"){
    	rangeKm = eventData.rangeKm.S;
    }
    var price = "";
    if (typeof(eventData.price) != "undefined"){
    	price = eventData.price.S;
    }
    var category = "";
    if (typeof(eventData.category) != "undefined"){
    	category = eventData.category.S;
    }
    var email = "";
    if (typeof(eventData.email) != "undefined"){
    	email = eventData.email.S;
    }
    var maxUser = "";
    if (typeof(eventData.maxUser) != "undefined"){
    	maxUser = eventData.maxUser.S;
    }
    var status = true;
    if (typeof(eventData.status) != "undefined"){
    	status = eventData.status.BOOL;
    }
    var deleted = "";
    if (typeof(eventData.deleted) != "undefined"){
    	deleted = eventData.deleted.BOOL;
    }
    var dateUpdate = "";
    if (typeof(eventData.dateUpdate) != "undefined"){
    	dateUpdate = eventData.dateUpdate.S;
    }

    var paymentRef = "";
    if (typeof(eventData.paymentRef) != "undefined"){
    	 paymentRef = eventData.paymentRef.S;
    }

    var eventId = "";
    if (typeof(eventData.eventId) != "undefined"){
    	 eventId = eventData.eventId.S;
    }

    var description = "A new wonderfull event was sheduled";
    if (typeof(eventData.description) != "undefined"){
    	 description = eventData.description.S;
    }

    var logoUrl = "";
    if (typeof(eventData.logoUrl) != "undefined"){
    	 logoUrl = eventData.logoUrl.S;
    }

    var title = "Great, there is a new event";
    if (typeof(eventData.title) != "undefined"){
    	 title = eventData.title.S;
    }

    /* check if the event is paid or with promocode */
    if((!paymentRef || paymentRef.length == 0
    		|| paymentRef == 'null' || paymentRef == 'np')
    		&& (!promocode || promocode == null || promocode.length <= 3)){
    	console.log("Not paid or wjthout promocode. skipped");
    	return;
    }

    var gpsLng = 0;
    var gpsLat = 0;
    var pointLogo = "";
    if(pointId){

         var table = {
              Key: {
               "pointId": {
                 S: pointId
                }
              },
          TableName: "cocconappdev-mobilehub-130310095-static_point"
          };
       ddb.getItem(table, function(err, pointData) {
         if (err) console.log(err, err.stack); // an error occurred
         else     console.log(pointData);           // successful response

         //console.log(data.Item.gpsLat);
         if (typeof(pointData) != "undefined"){
    	        gpsLat = pointData.Item.gpsLat.N;
         }

         if (typeof(pointData.Item.gpsLng) != "undefined"){
    	        gpsLng = pointData.Item.gpsLng.N;
         }
         if (typeof(pointData.Item.logoUrl) != "undefined"){
    	        pointLogo = pointData.Item.logoUrl.S;
         }
       });

    }
	// get the segment
	pinpoint.getSegments(params, function(err, data) {
	  if (err){
	   console.log(err, err.stack); // an error occurred
	   return;
	 }

	  var obj = {
			  "eventId":eventId,
			  "dateTimeStart":dateTimeStart,
			  "dateTimeStop":dateTimeStop,
			  "dateCreation":dateCreation,
			  "eventType":eventType,
			  "pointId":pointId,
			  "mobilePhone":mobilePhone,
			  "rangeKm":rangeKm,
			  "price":price,
			  "category":category,
			  "email":email,
			  "maxUser":maxUser,
			  "status":status,
			  "deleted":deleted,
			  "dateUpdate":dateUpdate,
			  "promocode":promocode,
			  "gpsLng": gpsLng,
			  "gpsLat": gpsLat,
			  "eventLogo":logoUrl,
			  "pointLogo": pointLogo
	  };

	  console.log(obj);
	  var dataJSON = JSON.stringify(obj);

      var push = {
        Action: 'OPEN_APP',
        Body: description,
        ImageIconUrl: logoUrl,
        ImageSmallIconUrl: '',
        ImageUrl: logoUrl,
        JsonBody: dataJSON,
        MediaUrl: '',
        RawContent: '',
        SilentPush: true,
        Title: title,
        Url: ''
      };

      obj= null;
      dataJSON = null;

      var d = new Date();
      var n = d.toISOString();

        var params = {
				ApplicationId: appId, /* required */
				WriteCampaignRequest: { /* required */
			    Description: 'Event Push',
			    HoldoutPercent: 0,
			    IsPaused:false,
			    MessageConfiguration: {
			      APNSMessage: push,
			      GCMMessage: push
			    },
			    Name: 'Silent event: '+eventId,
			    Schedule: {
			      Frequency: 'ONCE',
			      StartTime: n,
			      IsLocalTime: false
			    },
			    SegmentId: data.SegmentsResponse.Item[0].Id,
			    SegmentVersion: 1
			  }
			};

        /* create the campaign */
		pinpoint.createCampaign(params, function(err, data) {
		  if (err){
			 console.log(err, err.stack); // an error occurred
			 return "Error create campaign";
		  }
		    // successful response
		  	console.log(data);
		});

	});
	return "Finish execution";
};