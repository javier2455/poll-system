export class UserController {
  static getAll = async (req, res) => {
    try {
      console.log('working')
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static getById = async (req, res) => {
    try {
      console.log('working')
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static create = async (req, res) => {
    try {
      console.log('working')
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static update = async (req, res) => {
    try {
      console.log('working')
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static delete = async (req, res) => {
    try {
      console.log('working')
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
