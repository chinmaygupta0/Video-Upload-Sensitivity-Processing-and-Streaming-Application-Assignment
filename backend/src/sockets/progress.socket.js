
let ioInstance = null;

const initSocket = (io) => {
  ioInstance = io;
};

const emitProgress = (videoId, progress, status) => {
  if (!ioInstance) return;

  ioInstance.emit("video-progress", {
    videoId,
    progress,
    status
  });
};

module.exports = {
  initSocket,
  emitProgress
};
