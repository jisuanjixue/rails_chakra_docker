import axios from 'axios'

const list = () => axios.get('/category')
// const create = (task) => axios.post('/api/tasks', task)
// const update = (task) => axios.put(`/api/tasks/${task.id}`, task)
// const remove = (task) => axios.delete(`/api/tasks/${task.id}`)

const categoriesApi = {
    list
}

export default categoriesApi