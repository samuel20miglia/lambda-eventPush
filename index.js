'use strict'

var AWS = require('aws-sdk');
var env = require('env.json');
var appId = null;

var pinpoint = new AWS.Pinpoint();

// strart
exports.pusHandler = function(event) {

	if(env === 'development'){
		appId ='67ce6742902e4423875d38aa29d9fa72';
	}else {
		appId = '738c8516cfd04b71844a415581eba7c0';
	}

	var params = {ApplicationId: appId, /* required */};

    /* type of event */
    var eventAction = event.Records[0].eventName;

    var eventData = event.Records[0].dynamodb;
    eventData = eventData.NewImage;

    var promocode = false;
    if (typeof(eventData.promocode) != "undefined"){
    	promocode = eventData.promocode.S;
    }
    var dateTimeStart = false;
    if (typeof(eventData.dateTimeStart) != "undefined"){
    	dateTimeStart = eventData.dateTimeStart.S;
    }
    var dateTimeStop = false;
    if (typeof(eventData.dateTimeStop) != "undefined"){
    	dateTimeStop = eventData.dateTimeStop.S;
    }
    var dateCreation = false;
    if (typeof(eventData.dateCreation) != "undefined"){
    	dateCreation = eventData.dateCreation.S;
    }
    var eventType = false;
    if (typeof(eventData.eventType) != "undefined"){
    	eventType = eventData.eventType.S;
    }
    var pointId = false;
    if (typeof(eventData.pointId) != "undefined"){
    	pointId = eventData.pointId.S;
    }
    var mobilePhone = false;
    if (typeof(eventData.mobilePhone) != "undefined"){
    	mobilePhone = eventData.mobilePhone.S;
    }
    var rangeKm = false;
    if (typeof(eventData.rangeKm) != "undefined"){
    	rangeKm = eventData.rangeKm.S;
    }
    var price = false;
    if (typeof(eventData.price) != "undefined"){
    	price = eventData.price.S;
    }
    var category = false;
    if (typeof(eventData.category) != "undefined"){
    	category = eventData.category.S;
    }
    var email = false;
    if (typeof(eventData.email) != "undefined"){
    	email = eventData.email.S;
    }
    var maxUser = false;
    if (typeof(eventData.maxUser) != "undefined"){
    	maxUser = eventData.maxUser.S;
    }
    var status = false;
    if (typeof(eventData.status) != "undefined"){
    	status = eventData.status.BOOL;
    }
    var deleted = false;
    if (typeof(eventData.deleted) != "undefined"){
    	deleted = eventData.deleted.BOOL;
    }
    var dateUpdate = false;
    if (typeof(eventData.dateUpdate) != "undefined"){
    	dateUpdate = eventData.dateUpdate.S;
    }

    /* check if the event is paid or with promocode */
    if((!eventData.paymentRef.S || eventData.paymentRef.S.lenght == 0
    		|| eventData.paymentRef.S == 'null' || eventData.paymentRef.S == 'np')
    		&& (!promocode || promocode == null || promocode.lenght <= 3)){
    	console.log("Not paid or wjthout promocode. skipped");
    	return;
    }

    /* check if modify */
    if(eventAction !== 'MODIFY'){
    	console.log("Not modify skipped");
    	return;
    }
	// get the segment
	pinpoint.getSegments(params, function(err, data) {
	  if (err){
	   console.log(err, err.stack); // an error occurred
	   return;
	 }
	  var eventId = eventData.eventId.S;
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
			  "promocode":promocode
	  };
	  var dataJSON = JSON.stringify(obj);

      var push = {
        Action: 'OPEN_APP',
        Body: eventData.description.S,
        ImageIconUrl: eventData.logoUrl.S,
        ImageSmallIconUrl: '',
        ImageUrl: eventData.logoUrl.S,
        JsonBody: dataJSON,
        MediaUrl: '',
        RawContent: '',
        SilentPush: true,
        Title: eventData.title.S,
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
			      IsLocalTime: true
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