'use strict';

var AWS = require('aws-sdk');

var pinpoint = new AWS.Pinpoint();
// Create the DynamoDB service object
var dynamoDb = new AWS.DynamoDB({apiVersion: '2012-10-08'});

exports.handler = async (event) => {

	/* start only for event 'modify' */
	const eventName = event.Records.eventName;

	/* table name for dev */
	const tableName = "cocconappdev-mobilehub-130310095-event";

	/* object to bring fom table */
	var record = event.Records.dynamodb;

	/* eventId */
	const eventId = record.eventId;

	var params = {
			  Key: {
			   "eventId": {
			     S:'20180510204032468177'
			    }
			  },
			  TableName: tableName
			 };
	/*  search the event data */
	dynamoDb.getItem(params, function(err, data) {
	    if (err){
		   console.log(err, err.stack); // an error occurred
	    }
		   console.log(data);           // successful response
		   console.log(event.Records);
//	        var params = {
//				ApplicationId: 'STRING_VALUE', /* required */
//				WriteCampaignRequest: { /* required */
//			    AdditionalTreatments: [
//			      {
//			        MessageConfiguration: {
//			          ADMMessage: {
//			            Action: 'OPEN_APP',
//			            Body: 'STRING_VALUE',
//			            ImageIconUrl: 'STRING_VALUE',
//			            ImageSmallIconUrl: 'STRING_VALUE',
//			            ImageUrl: 'STRING_VALUE',
//			            JsonBody: 'STRING_VALUE',
//			            MediaUrl: 'STRING_VALUE',
//			            RawContent: 'STRING_VALUE',
//			            SilentPush: true || false,
//			            Title: 'STRING_VALUE',
//			            Url: 'STRING_VALUE'
//			          },
//			          APNSMessage: {
//			            Action: OPEN_APP | DEEP_LINK | URL,
//			            Body: 'STRING_VALUE',
//			            ImageIconUrl: 'STRING_VALUE',
//			            ImageSmallIconUrl: 'STRING_VALUE',
//			            ImageUrl: 'STRING_VALUE',
//			            JsonBody: 'STRING_VALUE',
//			            MediaUrl: 'STRING_VALUE',
//			            RawContent: 'STRING_VALUE',
//			            SilentPush: true || false,
//			            Title: 'STRING_VALUE',
//			            Url: 'STRING_VALUE'
//			          },
//			          BaiduMessage: {
//			            Action: OPEN_APP | DEEP_LINK | URL,
//			            Body: 'STRING_VALUE',
//			            ImageIconUrl: 'STRING_VALUE',
//			            ImageSmallIconUrl: 'STRING_VALUE',
//			            ImageUrl: 'STRING_VALUE',
//			            JsonBody: 'STRING_VALUE',
//			            MediaUrl: 'STRING_VALUE',
//			            RawContent: 'STRING_VALUE',
//			            SilentPush: true || false,
//			            Title: 'STRING_VALUE',
//			            Url: 'STRING_VALUE'
//			          },
//			          DefaultMessage: {
//			            Action: OPEN_APP | DEEP_LINK | URL,
//			            Body: 'STRING_VALUE',
//			            ImageIconUrl: 'STRING_VALUE',
//			            ImageSmallIconUrl: 'STRING_VALUE',
//			            ImageUrl: 'STRING_VALUE',
//			            JsonBody: 'STRING_VALUE',
//			            MediaUrl: 'STRING_VALUE',
//			            RawContent: 'STRING_VALUE',
//			            SilentPush: true || false,
//			            Title: 'STRING_VALUE',
//			            Url: 'STRING_VALUE'
//			          },
//			          EmailMessage: {
//			            Body: 'STRING_VALUE',
//			            FromAddress: 'STRING_VALUE',
//			            HtmlBody: 'STRING_VALUE',
//			            Title: 'STRING_VALUE'
//			          },
//			          GCMMessage: {
//			            Action: OPEN_APP | DEEP_LINK | URL,
//			            Body: 'STRING_VALUE',
//			            ImageIconUrl: 'STRING_VALUE',
//			            ImageSmallIconUrl: 'STRING_VALUE',
//			            ImageUrl: 'STRING_VALUE',
//			            JsonBody: 'STRING_VALUE',
//			            MediaUrl: 'STRING_VALUE',
//			            RawContent: 'STRING_VALUE',
//			            SilentPush: true || false,
//			            Title: 'STRING_VALUE',
//			            Url: 'STRING_VALUE'
//			          },
//			          SMSMessage: {
//			            Body: 'STRING_VALUE',
//			            MessageType: TRANSACTIONAL | PROMOTIONAL,
//			            SenderId: 'STRING_VALUE'
//			          }
//			        },
//			        Schedule: {
//			          EndTime: 'STRING_VALUE',
//			          Frequency: ONCE | HOURLY | DAILY | WEEKLY | MONTHLY,
//			          IsLocalTime: true || false,
//			          QuietTime: {
//			            End: 'STRING_VALUE',
//			            Start: 'STRING_VALUE'
//			          },
//			          StartTime: 'STRING_VALUE',
//			          Timezone: 'STRING_VALUE'
//			        },
//			        SizePercent: 0,
//			        TreatmentDescription: 'STRING_VALUE',
//			        TreatmentName: 'STRING_VALUE'
//			      },
//			      /* more items */
//			    ],
//			    Description: 'STRING_VALUE',
//			    HoldoutPercent: 0,
//			    Hook: {
//			      LambdaFunctionName: 'STRING_VALUE',
//			      Mode: DELIVERY | FILTER,
//			      WebUrl: 'STRING_VALUE'
//			    },
//			    IsPaused: true || false,
//			    Limits: {
//			      Daily: 0,
//			      MaximumDuration: 0,
//			      MessagesPerSecond: 0,
//			      Total: 0
//			    },
//			    MessageConfiguration: {
//			      ADMMessage: {
//			        Action: OPEN_APP | DEEP_LINK | URL,
//			        Body: 'STRING_VALUE',
//			        ImageIconUrl: 'STRING_VALUE',
//			        ImageSmallIconUrl: 'STRING_VALUE',
//			        ImageUrl: 'STRING_VALUE',
//			        JsonBody: 'STRING_VALUE',
//			        MediaUrl: 'STRING_VALUE',
//			        RawContent: 'STRING_VALUE',
//			        SilentPush: true || false,
//			        Title: 'STRING_VALUE',
//			        Url: 'STRING_VALUE'
//			      },
//			      APNSMessage: {
//			        Action: OPEN_APP | DEEP_LINK | URL,
//			        Body: 'STRING_VALUE',
//			        ImageIconUrl: 'STRING_VALUE',
//			        ImageSmallIconUrl: 'STRING_VALUE',
//			        ImageUrl: 'STRING_VALUE',
//			        JsonBody: 'STRING_VALUE',
//			        MediaUrl: 'STRING_VALUE',
//			        RawContent: 'STRING_VALUE',
//			        SilentPush: true || false,
//			        Title: 'STRING_VALUE',
//			        Url: 'STRING_VALUE'
//			      },
//			      BaiduMessage: {
//			        Action: OPEN_APP | DEEP_LINK | URL,
//			        Body: 'STRING_VALUE',
//			        ImageIconUrl: 'STRING_VALUE',
//			        ImageSmallIconUrl: 'STRING_VALUE',
//			        ImageUrl: 'STRING_VALUE',
//			        JsonBody: 'STRING_VALUE',
//			        MediaUrl: 'STRING_VALUE',
//			        RawContent: 'STRING_VALUE',
//			        SilentPush: true || false,
//			        Title: 'STRING_VALUE',
//			        Url: 'STRING_VALUE'
//			      },
//			      DefaultMessage: {
//			        Action: OPEN_APP | DEEP_LINK | URL,
//			        Body: 'STRING_VALUE',
//			        ImageIconUrl: 'STRING_VALUE',
//			        ImageSmallIconUrl: 'STRING_VALUE',
//			        ImageUrl: 'STRING_VALUE',
//			        JsonBody: 'STRING_VALUE',
//			        MediaUrl: 'STRING_VALUE',
//			        RawContent: 'STRING_VALUE',
//			        SilentPush: true || false,
//			        Title: 'STRING_VALUE',
//			        Url: 'STRING_VALUE'
//			      },
//			      EmailMessage: {
//			        Body: 'STRING_VALUE',
//			        FromAddress: 'STRING_VALUE',
//			        HtmlBody: 'STRING_VALUE',
//			        Title: 'STRING_VALUE'
//			      },
//			      GCMMessage: {
//			        Action: OPEN_APP | DEEP_LINK | URL,
//			        Body: 'STRING_VALUE',
//			        ImageIconUrl: 'STRING_VALUE',
//			        ImageSmallIconUrl: 'STRING_VALUE',
//			        ImageUrl: 'STRING_VALUE',
//			        JsonBody: 'STRING_VALUE',
//			        MediaUrl: 'STRING_VALUE',
//			        RawContent: 'STRING_VALUE',
//			        SilentPush: true || false,
//			        Title: 'STRING_VALUE',
//			        Url: 'STRING_VALUE'
//			      },
//			      SMSMessage: {
//			        Body: 'STRING_VALUE',
//			        MessageType: TRANSACTIONAL | PROMOTIONAL,
//			        SenderId: 'STRING_VALUE'
//			      }
//			    },
//			    Name: 'STRING_VALUE',
//			    Schedule: {
//			      EndTime: 'STRING_VALUE',
//			      Frequency: ONCE | HOURLY | DAILY | WEEKLY | MONTHLY,
//			      IsLocalTime: true || false,
//			      QuietTime: {
//			        End: 'STRING_VALUE',
//			        Start: 'STRING_VALUE'
//			      },
//			      StartTime: 'STRING_VALUE',
//			      Timezone: 'STRING_VALUE'
//			    },
//			    SegmentId: 'STRING_VALUE',
//			    SegmentVersion: 0,
//			    TreatmentDescription: 'STRING_VALUE',
//			    TreatmentName: 'STRING_VALUE'
//			  }
//			};
//
//
//	pinpoint.createCampaign(params, function(err, data) {
//	  if (err){
//		  console.log(err, err.stack); // an error occurred
//	  }
//	  else {
//		  console.log(data);           // successful response
//		  return "Finish execution";
//	  }
//	});

	});// end getItem dynamoDb
	return "End execution";
};
