import { useEffect, useState } from 'react'
import { GenreResponseProps } from '../App'
import { api } from '../services/api'
import { Button } from './Button'

export interface SideBarProps {
    selectedGenre: GenreResponseProps
    setSelectedGenre: (selectedGenreId: GenreResponseProps) => void
}

export function SideBar({ selectedGenre, setSelectedGenre }: SideBarProps) {
    const [genres, setGenres] = useState<GenreResponseProps[]>([])

    useEffect(() => {
        api.get<GenreResponseProps[]>('genres').then((response) => {
            setGenres(response.data)
            setSelectedGenre(genres[0])
        })
    }, [])

    function handleClickButton(genre: GenreResponseProps) {
        setSelectedGenre(genre)
    }

    return (
        <nav className="sidebar">
            <span>
                Watch<p>Me</p>
            </span>

            <div className="buttons-container">
                {genres.map((genre) => (
                    <Button
                        key={String(genre.id)}
                        title={genre.title}
                        iconName={genre.name}
                        onClick={() => handleClickButton(genre)}
                        selected={selectedGenre.id === genre.id}
                    />
                ))}
            </div>
        </nav>
    )
}
