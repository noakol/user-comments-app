export const getCommentsList = async (api, url) => {
    try {
        const res = await api.getMethod(url);
        return res;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const addComment = async (api, url, payload) => {
    try {
        const res = await api.postMethod(url, payload);
        return res;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const retriveMessagesByEmail = async (api, url, payload) => {
    try {
        const res = await api.getMethod(url, payload);
        return res;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export default {
    getCommentsList,
    addComment,
    retriveMessagesByEmail
}