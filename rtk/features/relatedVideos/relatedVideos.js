const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")
const { default: fetch } = require("node-fetch")


const initialState = {
    loading : false,
    videos : [],
    error : ""
} 


const fetchRelatedVideos = createAsyncThunk("videos/fetchRelatedVideos" , async(tags)=>{

    const queryString = tags.reduce((queryString , currentTag)=>{
        if(!queryString){
            queryString += `tags_like=${currentTag}`
        }else{
            queryString += `tags_like=${currentTag}`
        }
        return queryString;
    } , "")

    const response = await fetch(`http://localhost:9000/videos?${queryString}`)
    const video = await response.json()
    return video;
})

const relatedVideosSlice = createSlice({
    name  : "relatedVideos",
    initialState,
    extraReducers : (builder)=>{
        builder.addCase(fetchRelatedVideos.pending , (state , action) =>{
            state.loading = true,
            state.error = action.message.error
        })
        builder.addCase(fetchRelatedVideos.fulfilled , (state , action) =>{
            state.loading = true,
            state.videos = action.payload,
            state.error = action.message.error
        })
        builder.addCase(fetchRelatedVideos.pending , (state , action) =>{
            state.loading = true,
            state.videos = []
            state.error = action.message.error
        })
    }
})

module.exports = relatedVideosSlice.reducer
module.exports.fetchRelatedVideos = fetchRelatedVideos