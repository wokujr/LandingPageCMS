import {API_URL} from "../constant";

// const API_URL = 'localhost://3000/api/v1'

async function fetchAllPosts() {
        const response = await fetch(`${API_URL}/companies`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
        console.log(response)
}




export{fetchAllPosts}