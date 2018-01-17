import db from '../../models/';

export const createWidgetController = async (req, res) => {
	const { dashboardId, widgetName } = req.body;
	db.widget
		.create({
			dashboardId: dashboardId,
			name: widgetName,
		})
		.then(result => {
			res.json({ success: true, widgetId: result.id });
		})
		.catch(err => {
			res.json({ success: false });
		});
};

export const removeWidgetController = async (req, res) => {
	const { id } = req.params;

	db.widget
		.destroy({ where: { id: id } })
		.then(result => {
			res.json({ success: true });
		})
		.catch(err => {
			res.json({ success: false });
		});
};
