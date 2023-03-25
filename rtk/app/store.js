const { configureStore } = require("@reduxjs/toolkit");
const videoReducer = require("../features/videos/videoSlice")
const relatedVideoReducer = require("../features/relatedVideos/relatedVideos")
const {createLogger} = require("redux-logger")

const logger = createLogger()

const store = configureStore({

    reducer : {
        videos : videoReducer,
        relatedVideos : relatedVideoReducer
    },
    middleware : (getDefaultMiddlewares) => getDefaultMiddlewares().concat(logger)
    
})

module.exports = store