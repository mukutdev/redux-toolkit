const { configureStore } = require("@reduxjs/toolkit");
const videoReducer = require("../features/videos/videoSlice")
const {createLogger} = require("redux-logger")

const logger = createLogger()

const store = configureStore({

    reducer : {
        videos : videoReducer
    },
    middleware : (getDefaultMiddlewares) => getDefaultMiddlewares().concat(logger)
    
})

module.exports = store