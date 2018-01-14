import db from '../../models/';

export const getDashboardList = async (req, res) => {
	db.dashboard
		.findAll()
		.then(dashboards => {
			if (dashboards) {
				res.json({ success: true, list: dashboards });
			} else {
				res.json({ success: false });
			}
		})
		.catch(err => {
			console.log(err);
			res.json({ success: false });
		});
};
