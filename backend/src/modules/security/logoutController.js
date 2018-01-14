export const logoutController = async (req, res) => {
	req.logout();
	res.json({ success: true });
};
