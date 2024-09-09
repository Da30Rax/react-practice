import { useEffect, useState } from "react";

export function UseCatImage({fact}){
    const [imageUrl, setImageUrl] = useState()

    useEffect(() => {
        if (!fact) return

        const threeFirstWords = fact.split(" ", 3).join(" ")

        setImageUrl(`https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=red`)

    }, [fact])

    return {imageUrl}
}