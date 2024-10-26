import axios from 'axios';
import { APPCONFIG } from '@/components/constants/Config';

const axiosIstance = axios.create({
      baseURL: APPCONFIG.linkProducao,
      headers: {
            'Content-type' : 'application/json',
            // 'Authorization': APPCONFIG.authToken
      },
      // auth: 'token'
})

export default axiosIstance;