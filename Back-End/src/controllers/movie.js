import { MovieModel } from '../models/movie.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
  static getAll = async (req, res) => {
    try {
      const { genre } = req.query
      const movies = await MovieModel.getAll({ genre })
      res.json(movies)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static getById = async (req, res) => {
    try {
      const { id } = req.params
      const movie = await MovieModel.getById({ id })
      if (movie) return res.status(200).json(movie)
      return res.status(404).json({ message: 'Movie not found' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static create = async (req, res) => {
    try {
      const result = validateMovie(req.body)

      if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }
      const newMovie = await MovieModel.create({ input: result.data })
      res.status(201).json(newMovie)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static update = async (req, res) => {
    try {
      const result = validatePartialMovie(req.body)
      if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }
      const { id } = req.params
      const updatedMovie = await MovieModel.update({ id, input: result.data })

      if (updatedMovie === false) {
        return res.status(400).json({ message: 'Movie not found' })
      }

      return res.status(200).json({ message: 'Updated movie', updatedMovie })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
