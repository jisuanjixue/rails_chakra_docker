import axios from 'axios'

const list = () => axios.get('/category')
const create = (data) => axios.post('/category', data)
// const update = (task) => axios.put(`/api/tasks/${task.id}`, task)
// const remove = (task) => axios.delete(`/api/tasks/${task.id}`)

const categoriesApi = {
    list,
    create
}

export default categoriesApi