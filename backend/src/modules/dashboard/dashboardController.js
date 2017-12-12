import db from '../../models/';

export const saveDashboardController = async (req, res) => {

  const { dashboardId, name, description, url, layout } = req.body;

  db.dashboard.update(
    {
      name: name,
      description: description,
      url: url,
      //layout: layout
    },
    {where: {id: dashboardId}})
    .then(result => {
      res.json({success: true});
    }).catch(err => {
      res.json({success: false});
    });
  }

  export const getDashboardController = async (req, res) => {

    const { dashboardId } = req.params;

    db.dashboard.findOne({where: {id: dashboardId}})
    .then(dashboard => {
      if (dashboard) {
        res.json(
          {
            success: true,
            id: dashboard.id,
            name: dashboard.name,
            description: dashboard.description,
            url: dashboard.url,
            layout: dashboard.layout,
          }
        )
      } else {
        res.json({success: false});
      }
    }).catch(err => {
      console.log(err);
      res.json({success: false});
    });
  }
