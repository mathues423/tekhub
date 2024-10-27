import axios from 'axios';
import { APPCONFIG } from '@/components/constants/Config';

const axiosIstance = axios.create({
      baseURL: APPCONFIG.linkProducao,
      headers: {
            'Content-type' : 'application/json',
      },
})



export default axiosIstance;