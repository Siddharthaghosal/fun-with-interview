import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './Api.css';



const fetchData = async (url: string) => {
    try {
        const res = await axios.get(url)
        const { results } = res.data
        return results
    } catch (error) {
        console.error(error)
    }
}

const flattenObject: any = (obj: any, flatObj: any = {}) => {
    Object.keys(obj).forEach(key => {
        const value = obj[key]
        flatObj = typeof value !== 'object' ? { ...flatObj, ...{ [key]: value } } : flattenObject(value, flatObj) || {}
    })
    return flatObj || {}
}



const toString = (obj: any) => {
    // if not already flatten make it flat
    const flatObj = flattenObject(obj)
    return Object.keys(flatObj).reduce((acc, key, idx, arr) =>
        arr.length !== idx + 1 ? (acc + flatObj[key] + ', ') : (acc + flatObj[key])
        , '')

}


const Api = () => {
    // API endpoint
    const api = 'https://randomuser.me/api/?results=20'
    const [people, setPeople] = useState([])
    const [locations, setLocations] = useState([])

    useEffect(() => {
        fetchData(api).then(data => {
            setPeople(data)
            setLocations(data.map(({ location }: any) => flattenObject(location)))
        })
    }, [api])


    const Address = ({ person: { location } }: any) => (
        <div style={{ textAlign: 'left' }}>
            {
                `${toString(location.street)},\n${location.city}, ${location.state},\n${location.country}-${location.postcode}`
            }
        </div>

    )
    const Timezone = ({ person: { location } }: any) => (
        <div style={{ textAlign: 'left' }}>
            {
                `GMT${toString(location.timezone)}`}
        </div>

    )

    return (
        <div className="App">
            <h1>Hello Candidate</h1>
            <h2>Show some coding skills</h2>
            <p>Place components here...</p>
            <h3>Location as a String</h3>

            <table>
                <thead>

                    <tr>

                        <th>Address</th>
                        <th>Timezone</th>
                        <th>Map</th>
                    </tr>

                </thead>
                <tbody>

                    {

                        people.map((person: any, idx) => (
                            <tr key={idx}>
                                <td key={person}>
                                    <Address key={idx} person={person} />
                                </td>
                                <td key={idx}>
                                    <Timezone key={idx} person={person} />

                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>





            <h2>Debug Messages....</h2>

            <h4> Flat Location JSON</h4>
            <pre className="json">
                {JSON.stringify(locations, null, 2) ?? 'No person with coding skills'}
            </pre>

            <h4>People JSON</h4>
            <pre className="json">
                {JSON.stringify(people, null, 2) ?? 'No person with coding skills'}

            </pre>

        </div>
    );
}

export default Api