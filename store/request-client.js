export class RequestClient {
  constructor(axios) {
    this.axios = axios
  }

  // GETリクエストの送信で使用するgetメソッドを定義する
  async get(uri, params = {}) {
    // クエリパラメータを付与する場合は、引数で渡される場合は、引数で渡されるparamsからクエリーを組み立てる
    const queryString = Object.keys(params).map(key => key + '=' +
                                                     params[key]).join('&');
    const query = queryString.length > 0 ? `${uri}?${queryString}` : uri
    return await this.axios.$get(query)
  }
}

// RequestClientのインスタンスを生成する際はcreateRequestClient を使用する
export function createRequestClient(axios) {
  return new RequestClient(axios)
}
