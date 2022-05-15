import Client from "./api";
export const addPost = async (data) => {
    try {
        const res = await Client.post(`/posts/addDrawing`,data)
        // console.log(res.data)
        return res.data
    } catch (error) {
        throw error
    }
}

export const changeProfile = async(data) =>{
    try {
        console.log("data")
        const res = await Client.put(`/posts/changePic`,data)
        // console.log(res.data)
        return res.data
    } catch (error) {
        throw error
    }

}