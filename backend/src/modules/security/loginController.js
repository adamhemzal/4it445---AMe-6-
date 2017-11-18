export const loginController = async (req, res) => {
  const successMessage = req.flash("success");
  const errorMessage = req.flash("error");
  let responseData = {};

  // send user data if successful login
  if (successMessage.length > 0) {
    responseData = {
      success: true,
      username: req.user.username,
      message: successMessage[0]
    }
  } else if (errorMessage.length > 0) {
    responseData = {
      success: false,
      username: "",
      message: errorMessage[0]
    }
  } else {
    responseData = {
      success: false,
      username: "",
      message: "Access denied, please log in"
    }
  }
  res.json(responseData);
}
