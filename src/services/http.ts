import axios from 'axios';
import { APPCONFIG } from '@/components/constants/Config';

const axiosIstance = axios.create({
      baseURL: APPCONFIG.linkProducao,
      headers: {
            'Content-type' : 'application/json',
      },
})

// if (APPCONFIG.authToken != '') {
//       APPCONFIG.authToken = ``
// }
// if (localStorage.getItem('TOKEN')) {
//       localStorage.removeItem('TOKEN')
// }

axiosIstance.interceptors.request.use(
      config => {
            if (APPCONFIG.authToken != '') {
                  config.headers.authorization = `Bearer ${APPCONFIG.authToken}`
                  // config.headers.authorization = ``
            }
            if (localStorage.getItem('TOKEN')) {
                  config.headers.authorization = `Bearer ${localStorage.getItem('TOKEN')}`
                  // config.headers.authorization = ``
            }
            return config;
      }
)

axiosIstance.interceptors.response.use((response)=>{
      return response
}, (error) => {
      if (error.response) {
            return Promise.reject(error.response.data)
      }
      return Promise.reject(error)
})

export default axiosIstance;