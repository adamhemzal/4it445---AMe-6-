export const loginController = async (req, res) => {
       // console.log("login_route");
       // console.log(req.user);
       res.send(req.flash("error"));
}
