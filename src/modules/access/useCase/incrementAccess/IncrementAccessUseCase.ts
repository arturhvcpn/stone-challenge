import { AxiosResponse } from "axios";
import { api } from "../../api";

class IncrementAccessUseCase {
  public async execute(): Promise<AxiosResponse> {
    const { data } = await api.get('ton.com.br/visits');

    return data.value;
  }
}

export { IncrementAccessUseCase };