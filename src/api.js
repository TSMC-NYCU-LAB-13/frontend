import axios from 'axios'

export default class Api {
  constructor (baseUrl = null) {
    this.baseUrl = baseUrl ?? process.env.VUE_APP_BASEURL ?? ''
  }

  _url (url) {
    return this.baseUrl + url
  }

  async getKeywords () {
    return await axios.get(this._url('/api/keywords'))
    // return ['氖氣', '光阻液']
  }

  async getWeeklyStatistics (limit = 10) {
    const keywords = (await this.getKeywords()).data.keywords
    return await axios.get(this._url(`/api/statistics?limit=${limit}` + keywords.map(w => `&keywords=${w}`).join('')))
    /* return {
      data: [
        {
          keyword: '氖氣',
          data: [
            {
              start_at: '2022-01-01T14:15:03',
              value_avg: 12.5,
              count: 15
            },
            {
              start_at: '2022-01-08T14:15:03',
              value_avg: 7.6,
              count: 31
            },
            {
              start_at: '2022-01-15T14:15:03',
              value_avg: 8.5,
              count: 38
            },
            {
              start_at: '2022-01-22T14:15:03',
              value_avg: 13.1,
              count: 26
            },
            {
              start_at: '2022-01-29T14:15:03',
              value_avg: 14.2,
              count: 21
            },
            {
              start_at: '2022-02-05T14:15:03',
              value_avg: 11.9,
              count: 18
            }
          ]
        },
        {
          keyword: '光阻液',
          data: [
            {
              start_at: '2022-01-01T14:15:03',
              value_avg: 33.5,
              count: 78
            },
            {
              start_at: '2022-01-08T14:15:03',
              value_avg: 36.1,
              count: 91
            },
            {
              start_at: '2022-01-15T14:15:03',
              value_avg: 32.1,
              count: 107
            },
            {
              start_at: '2022-01-22T14:15:03',
              value_avg: 38.4,
              count: 48
            },
            {
              start_at: '2022-01-29T14:15:03',
              value_avg: 29.1,
              count: 172
            },
            {
              start_at: '2022-02-05T14:15:03',
              value_avg: 25.3,
              count: 431
            }
          ]
        }
      ]
    } */
  }

  async getArticles (keyword, start, end) {
    return await axios.get(this._url(`/api/articles?keyword=${keyword}&start=${start}&end=${end}`))
    /* return {
      data: [
        {
          title: 'tt',
          url: 'ttt',
          keyword: 'tsmc',
          created_at: '2022-06-07T14:14:55',
          time: '2022-06-07T14:14:47',
          id: 2,
          content: 'werwrwe',
          emotional_value: 3.3
        },
        {
          title: '123',
          url: 'httpss://',
          keyword: 'tsmc',
          created_at: '2022-06-06T23:28:53',
          time: '2022-06-06T23:28:53',
          id: 10,
          content: '123',
          emotional_value: 5.0
        },
        {
          title: 'test',
          url: 'https://',
          keyword: 'tsmc',
          created_at: '2022-06-06T23:28:53',
          time: '2022-06-06T23:28:42',
          id: 1,
          content: 'tsdjflkwjkrwlekfjc,klsdjl',
          emotional_value: 10.0
        }
      ]
    } */
  }
}
