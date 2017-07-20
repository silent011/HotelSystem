const baseUrl = 'http://localhost:5000'
const authHeaders = {
    'Content-Type':'application/json',
    'Authorization': 'token ' + localStorage.getItem('token')
}
const baseHeader = {
     'Content-Type':'application/json'
}

const requester = {
    post: (endpoint, data, auth = false) => {
        let headers = auth ? authHeaders : baseHeader
        console.log(headers)
        return window.fetch(baseUrl + endpoint, {
            method:'POST',
            mode:'cors',
            headers,
            body: JSON.stringify(data)
        }).then(res => res.json())
    },
    get: (endpoint, auth = false) => {
        let headers = auth ? authHeaders : baseHeader
        return window.fetch(baseUrl + endpoint,{
            method:'GET',
            headers,
            mode:'cors'
        }).then(res => res.json())
    }
}

export default requester