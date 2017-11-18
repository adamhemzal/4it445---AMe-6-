import db from '../../models/';

export const adminIndexController = async (req, res) => {
  // console.log("admin_index");
  // console.log(req.user);
  // db.sequelize
  // .authenticate()
  // .then(() => {
  //   console.log('Connection has been established successfully.');
  // })
  // .catch(err => {
  //   console.error('Unable to connect to the database:', err);
  // });
  res.send("admin_index");
}
