import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { exampleKeywords } from '../fake'

export function mockGetKeywords (mock = null) {
  mock ??= new MockAdapter(axios)
  mock.onGet(process.env.VUE_APP_BASEURL + '/api/keywords').reply(200, exampleKeywords)
  return mock
}

export function mockGetWeeklyStatistics (responseData, mock = null) {
  mock ??= mockGetKeywords()
  mock.onGet(process.env.VUE_APP_BASEURL + '/api/statistics?limit=10&keywords=氖氣&keywords=光阻液')
    .reply(200, responseData)
  mock.onGet(process.env.VUE_APP_BASEURL + '/api/statistics?limit=9&keywords=氖氣&keywords=光阻液')
    .reply(200, responseData)
  return mock
}

export function mockGetArticles (responseData, mock = null) {
  mock ??= new MockAdapter(axios)
  mock.onGet(process.env.VUE_APP_BASEURL + '/api/articles?keyword=氖氣&start=a&end=b').reply(200, responseData)
  return mock
}
