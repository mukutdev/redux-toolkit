const store = require("./app/store")
const { fetchRelatedVideos } = require("./features/relatedVideos/relatedVideos")
const { fetchVideos } = require("./features/videos/videoSlice")

store.dispatch(fetchVideos())
.unwrap()
.then((video) =>{
    store.dispatch(fetchRelatedVideos(video.tags))
})
.catch(err => console.log(err))