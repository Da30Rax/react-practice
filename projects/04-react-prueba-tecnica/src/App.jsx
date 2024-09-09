import { useEffect, useState } from "react"
import { getRandomFact } from "./services/facts"
import { UseCatImage } from "./hooks/UseCatImage"
import { UseCatFact } from "./hooks/UseCatFact"
import "./App.css"


export function App () {
    const [fact, refreshFact] = UseCatFact()
    const { imageUrl} = UseCatImage({fact})

    useEffect(() => {
        getRandomFact().then(newFact => setFact(newFact))
    }, [])

    const handleClick = async () => {
        refreshFact()
    }

    return (
        <main>
            <h1>Gatos</h1>
            <button onClick={handleClick}>Get new Fact</button>
            { fact && <p>{fact}</p>}
            { imageUrl && <img src={imageUrl} alt="hola"></img>}
        </main>
    )
}