import { readJSONFile } from '../utils/utils.js'
import { randomUUID } from 'node:crypto'
const movies = readJSONFile('../movies.json')

export class MovieModel {
  static getAll = async ({ genre }) => {
    if (genre) {
      return movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return movies
  }

  static getById = async ({ id }) => {
    const movie = movies.find((movie) => movie.id === id)
    return movie
  }

  static create = async ({ input }) => {
    // en bases de datos
    const newMovie = {
      id: randomUUID(),
      ...input
    }
    movies.push(newMovie)
    return newMovie
  }

  static delete = async ({ id }) => {
    console.log('In development', id)
  }

  static update = async ({ id, input }) => {
    const movieIndex = movies.findIndex((movie) => movie.id === id)
    if (movieIndex === -1) {
      return false
    }
    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input
    }
    return movies[movieIndex]
  }
}
