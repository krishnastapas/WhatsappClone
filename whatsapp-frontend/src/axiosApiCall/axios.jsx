import axios from "axios"

const instsnce=axios.create({
    baseURL:'http://localhost:9000',
})

export default instsnce;