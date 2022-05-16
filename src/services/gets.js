import Client from "./api";

export const getPosts = async () => {
    try {
        const res = await Client.get(`/posts/feed`)
        // console.log(res.data)
        return res.data
    } catch (error) {
        throw error
    }
}
export const getUserPosts = async (userId) => {
    try {
        const res = await Client.get(`/posts/feed/${userId}`)
        // console.log(res.data)
        return res.data
    } catch (error) {
        throw error
    }
}