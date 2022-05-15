import Client from "./api";

export const deletePost = async (data) => {
    try {
        const res = await Client.delete(`/posts/feed`,data)
        // console.log(res.data)
        return res.data
    } catch (error) {
        throw error
    }
}