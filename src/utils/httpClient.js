import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const http = axios.create({
    baseURL: BASE_URL,
    responseType: 'json'
})
const getHeaders = (isSecured) => {
    let options = {
        'Content-Type': 'application/json'
    }
    if (isSecured) {
        options['Authorization'] = localStorage.getItem('token')
    }
    return options;
}

const GET = (url, isSecured = false, params = {}) => {
    return http.get(url, {
        headers: getHeaders(isSecured),
        params
    })
}

const POST = (url, data, isSecured = false, params = {}) => {
    return http.post(url, data, {
        headers: getHeaders(isSecured),
        params
    })
}

const PUT = (url, data, isSecured = false, params = {}) => {
    return http.put(url, data, {
        headers: getHeaders(isSecured),
        params
    })
}

const DELETE = (url, isSecured = false, params = {}) => {
    return http.delete(url, {
        headers: getHeaders(isSecured),
        params
    })
}

const UPLOAD = (method, url, data, files = []) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        if (files.length > 0) {
            files.forEach(file => {
                formData.append('image', file, file.name);
            })
        }
        for (let key in data) {
            formData.append(key, data[key])
        }
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                }
                else {
                    reject(xhr.response);
                }
            }
        }
        xhr.open(method, `${BASE_URL}${url}?token=${localStorage.getItem('token')}`, true);
        xhr.send(formData);
    })

}
export const HttpClient = {
    GET,
    POST,
    PUT,
    DELETE,
    UPLOAD
}