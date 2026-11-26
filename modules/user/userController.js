const userService = require("./userService");
const videoService = require("../video/videoService");
const asyncHandler = require("../../middlewares/asyncHandler");

exports.register = asyncHandler(async (req, res) => {
    const { username, email, password, fullName } = req.body;

    await userService.registerUser(username, email, password, fullName);
    req.flash("success", "Conta criada com sucesso! Faça seu login.");
    res.redirect("/login");
});

exports.login = asyncHandler(async (req, res) => {

    const { login, password } = req.body;
    const user = await userService.loginUser(login, password);
    const userData = await userService.getUserProfile(user.id);
    req.session.user = userData;

    req.flash("success", `Bem-vindo de volta, ${userData.username}!`);
    res.redirect("/feed");
});

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
};

exports.getProfile = asyncHandler(async (userId) => {
    return await userService.getUserProfile(userId);
});

exports.updateProfile = asyncHandler(async (req, res) => {
    const { fullName, bio } = req.body;
    const userId = req.session.user.id;
    const newProfilePictureFilename = req.file ? req.file.filename : null;

    const updatedUser = await userService.updateUserProfile(userId, fullName, bio, newProfilePictureFilename);

    req.session.user = updatedUser;
    req.flash("success", "Perfil atualizado com sucesso!");
    res.redirect("/profile/edit");
});

exports.renderPublicProfile = asyncHandler(async (req, res) => {
    const username = req.params.username;
    const user = await userService.getPublicProfile(username);
    const isOwner = req.session.user && req.session.user.id === user.id;

    res.render("profile", { title: `@${user.username} | MusicVibe`, profileUser: user, isOwner });
});

exports.renderRegisterForm = (req, res) => {
    res.render("register", { title: "Criar Conta" });
};

exports.renderLoginForm = (req, res) => {
    res.render("login", { title: "Entrar" });
};

exports.renderFeed = asyncHandler(async (req, res) => {
    // Busca todos os vídeos, incluindo as informações do usuário que os publicou
    const videos = await videoService.getAllVideos();
    res.render("feed", { title: "Feed | MusicVibe", videos });
});

exports.renderEditProfileForm = async (req, res) => {
    // O objeto 'user' já está disponível via res.locals.user
    res.render("edit-profile", { title: "Editar Perfil | MusicVibe" });
};