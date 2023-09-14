import React, {useEffect, useState} from 'react';

const API_URL = 'http://localhost:3000/api/v1'

function Contact() {
    const [contacts, setContacts] = useState(null)

    useEffect( ()=> {
        async function fetchContact(){
            const response = await fetch(`${API_URL}/contacts/`,{
                method: 'GET',
            })
            if (response.ok){
                const json = await response.json()
                setContacts(json)
                console.log(json)
            }
            else{
                throw new Error("Error fetching contacts")
            }
        }
        fetchContact()
    }, [])

    return (
        <div>
            <div>

            </div>
        </div>
    );
}

export default Contact;