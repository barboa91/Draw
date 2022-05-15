import Client from "./api";

export const deletePost = async (data) => {
    try {
        console.log(data)
        const res = await Client.delete(`/posts/delete/${data}`)
        // console.log(res.data)
        return res.data
    } catch (error) {
        throw error
    }
}