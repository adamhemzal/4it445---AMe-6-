import db from '../../models/';

export const saveDashboardController = async (req, res) => {
	const { dashboardId, name, description, url, layoutId, layout } = req.body;

	if (!dashboardId || dashboardId === '') {
		let newDashboardId = generateNewId();

		db.dashboard
			.create({
				id: newDashboardId,
				name: name,
				description: description,
				url: url,
				layout: layout,
				layoutId: layoutId,
			})
			.then(result => {
				res.json({ success: true, id: newDashboardId });
			})
			.catch(err => {
				res.json({ success: false });
			});
	} else {
		db.dashboard
			.update(
				{
					name: name,
					description: description,
					url: url,
					layout: layout,
					layoutId: layoutId,
				},
				{ where: { id: dashboardId } },
			)
			.then(result => {
				res.json({ success: true, id: false });
			})
			.catch(err => {
				res.json({ success: false });
			});
	}
};

export const getDashboardController = async (req, res) => {
	const { dashboardId } = req.params;

	db.dashboard
		.findOne({ where: { id: dashboardId } })
		.then(dashboard => {
			if (dashboard) {
				res.json({
					success: true,
					id: dashboard.id,
					name: dashboard.name,
					description: dashboard.description,
					url: dashboard.url,
					layoutId: dashboard.layoutId,
					layout: dashboard.layout,
				});
			} else {
				res.json({ success: false });
			}
		})
		.catch(err => {
			console.log(err);
			res.json({ success: false });
		});
};

export const removeDashboardController = async (req, res) => {
	const { id } = req.params;
	var newId = 2;

	db.dashboard
		.destroy({ where: { id: id } })
		.then(result => {
			db.dashboard.min('id').then(result1 => {
				newId = result1;
				res.json({ success: true, id: id, newId: newId });
			});
		})
		.catch(err => {
			res.json({ success: false });
		});
};

const generateNewId = () => {
	let text = '';
	let possible = '0123456789';
	let length = 6;

	for (let i = 0; i < length; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
};
