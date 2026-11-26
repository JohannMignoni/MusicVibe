// Carrega os modelos
const User = require('../modules/user/userModel');
const Video = require('../modules/video/videoModel');
const Like = require('../modules/like/likeModel');
const Comment = require('../modules/comment/commentModel');
const Playlist = require("../modules/playlist/playlistModel");
const PlaylistVideo = require("../modules/playlist/playlistVideoModel");

// Associações Vídeo e User
User.hasMany(Video, { foreignKey: 'userId' });
Video.belongsTo(User, { foreignKey: 'userId' });

// Associações para Likes
User.hasMany(Like, { foreignKey: 'userId' });
Like.belongsTo(User, { foreignKey: 'userId' });
Video.hasMany(Like, { foreignKey: 'videoId' });
Like.belongsTo(Video, { foreignKey: 'videoId' });

// Associações para Comments
User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });
Video.hasMany(Comment, { foreignKey: 'videoId' });
Comment.belongsTo(Video, { foreignKey: 'videoId' });

// Associações para Playlists
User.hasMany(Playlist, { foreignKey: "userId" });
Playlist.belongsTo(User, { foreignKey: "userId" });

Playlist.belongsToMany(Video, { through: PlaylistVideo, foreignKey: "playlistId" });
Video.belongsToMany(Playlist, { through: PlaylistVideo, foreignKey: "videoId" });

// Associações explícitas para o modelo PlaylistVideo
PlaylistVideo.belongsTo(Playlist, { foreignKey: "playlistId" });
PlaylistVideo.belongsTo(Video, { foreignKey: "videoId" });