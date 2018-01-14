import db from '../../models/';

export const saveDashboardLayoutController = async (req, res) => {
	const { dashboardId, layout } = req.body;

	db.dashboard
		.update({ layout: layout }, { where: { id: dashboardId } })
		.then(result => {
			res.json({ success: true });
		})
		.catch(err => {
			res.json({ success: false });
		});
};

export const getDashboardLayoutController = async (req, res) => {
	const { dashboardId } = req.params;

	db.dashboard
		.findOne({ where: { id: dashboardId } })
		.then(dashboard => {
			if (dashboard) {
				res.json({ success: true, layout: dashboard.layout });
			} else {
				res.json({ success: false });
			}
		})
		.catch(err => {
			console.log(err);
			res.json({ success: false });
		});
};
