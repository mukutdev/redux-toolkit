const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")
const { default: fetch } = require("node-fetch")


const initialState = {
    loading : false,
    videos : [],
    error : ""
} 


const fetchRelatedVideos = createAsyncThunk("relatedVideos/fetchRelatedVideos" , async(tags)=>{

    const queryString = tags.reduce((queryString , currentTag)=>{
        if(!queryString){
            queryString += `tags_like=${currentTag}`
        }else{
            queryString += `&tags_like=${currentTag}`
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
            state.error = ""
        })
        builder.addCase(fetchRelatedVideos.fulfilled , (state , action) =>{
            state.loading = false,
            state.videos = action.payload.length > 0 ?
                           action.payload.sort((a , b) => parseFloat(b.views) - parseFloat(a.views)) : []
            state.error = ""
        })
        builder.addCase(fetchRelatedVideos.rejected , (state , action) =>{
            state.loading = false,
            state.videos = []
            state.error = action.error.message
        })
    }
})

module.exports = relatedVideosSlice.reducer
module.exports.fetchRelatedVideos = fetchRelatedVideos