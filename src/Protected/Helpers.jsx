
// export const URL_LINK = 'http://localhost:8000';
export const URL_LINK = 'https://node-api-beryl.vercel.app';

const user = JSON.parse(localStorage.getItem('users')) ? JSON.parse(localStorage.getItem('users')) : undefined;
// console.log(user)
function checkUser(data) {
    if (data !== undefined) {
        return data.token
    }
    return "fghjkjhghjkjhgjk"
}

export const TOKEN_LINK = checkUser(user)
// console.log(TOKEN_LINK)

