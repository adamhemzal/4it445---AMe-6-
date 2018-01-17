export const getOutlookController = async (req, res) => {
	const { params, query } = req;
	const calendarId = req.params.calendarId;
	const timespanFrom = String(req.params.timespanFrom);
	const timespanTo = String(req.params.timespanTo);
	var ews = require('ews-javascript-api');
	var exch = new ews.ExchangeService(ews.ExchangeVersion.Exchange2013);

	const fromDay = timespanFrom.substring(0, 2);
	const toDay = timespanTo.substring(0, 2);
	const fromMonth = timespanFrom.substring(2, 4);
	const toMonth = timespanTo.substring(2, 4);
	const fromYear = timespanFrom.substring(4, 8);
	const toYear = timespanTo.substring(4, 8);

	//exch.Credentials = new ews.ExchangeCredentials(calendarId, req.body.pass);
	//exch.Credentials = new ews.ExchangeCredentials('agileame@outlook.com', "4ef0deb28aef6b1a641");
	exch.Credentials = new ews.ExchangeCredentials(
		'team6ame@outlook.com',
		'team6karkulka',
	);

	exch.Url = new ews.Uri('https://outlook.office365.com/Ews/Exchange.asmx');

	var f = new ews.FolderId(
		ews.WellKnownFolderName.Calendar,
		new ews.Mailbox(calendarId),
	);

	// var cv = new ews.CalendarView(
	//   new ews.DateTime(Number(fromYear), Number(fromMonth), Number(fromDay)),
	//   new ews.DateTime(Number(toYear), Number(toMonth), Number(toDay))
	// );

	var cv = new ews.CalendarView(ews.DateTime.Now, ews.DateTime.Now.AddDays(20));

	ews.EwsLogging.DebugLogEnabled = false;
	var events = [];

	exch.FindAppointments(f, cv).then(
		function(FindItemsResults) {
			FindItemsResults.Items.forEach(function(item) {
				events.push({
					summary: item.Subject.toString(),
					start: item.Start.Format('DD.MM.Y HH:MM'),
					date: item.Start.toString(),
					location: item.Location.toString(),
				});
			});
			res.json(events);
		},
		function(errors) {},
	);
};
