import axios from "axios";

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTY5Mjk0ODcxMCwiZXhwIjoxNjkyOTUyMzEwLCJuYmYiOjE2OTI5NDg3MTAsImp0aSI6IlpHelJDbG5qa1hJNnVDNTYiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.eTBGKRYti4tyQWHnFgyxPI-5qfVsDC9e5QeU7aT_ZAE',
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    },
})