import axios, { AxiosResponse } from 'axios';
import { api } from '../../api'

class ConsultAccessUseCase {
  public async execute(): Promise<number> {
    const { data } = await api.get('ton.com.br/visits');
    
    const accessNumber = data.value - 1;
    
    return accessNumber;
  }
}

export { ConsultAccessUseCase };