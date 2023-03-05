import { useState, useEffect } from "react"
import axios from "axios"
import { BACKEND_API_URL } from "../utils"

const usePinata = () => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    // useEffect(() => {

    //   fetchData();
    // }, [body]);

    const fetchData = async (body) => {
        console.log(body)
        try {
            setLoading(true)
            // make a post request to ML model
            const response = await axios.get(`${BACKEND_API_URL}/uploadToIpfs`, {
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
            setData(response.data)
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }

    return { data, error, loading, fetchData }
}

export default usePinata
