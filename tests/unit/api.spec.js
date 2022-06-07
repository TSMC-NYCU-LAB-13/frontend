import Api from '@/api.js'
import {
  mockGetArticles,
  mockGetKeywords,
  mockGetWeeklyStatistics
} from '../mocks/api'
import { exampleArticles, exampleKeywords, exampleStatistics } from '../fake'

describe('api.js', () => {
  it('generate url with baseUrl when passed', async () => {
    const api1 = new Api('Eren')
    expect(api1._url('/Yeager')).toEqual('Eren/Yeager')

    const old = process.env.VUE_APP_BASEURL

    const api2 = new Api()
    expect(api2._url('/Yeager')).toEqual(process.env.VUE_APP_BASEURL + '/Yeager')

    delete process.env.VUE_APP_BASEURL

    const api3 = new Api()
    expect(api3._url('/Yeager')).toEqual('/Yeager')

    process.env.VUE_APP_BASEURL = old
  })

  it('fetch keywords when passed', async () => {
    mockGetKeywords()

    const api = new Api()
    expect((await api.getKeywords()).data).toMatchObject(exampleKeywords)
  })

  it('fetch weekly statistics when passed', async () => {
    mockGetWeeklyStatistics(exampleStatistics)

    const api = new Api()

    expect((await api.getWeeklyStatistics()).data).toEqual(exampleStatistics)
    expect((await api.getWeeklyStatistics(9)).data).toEqual(exampleStatistics)
  })

  it('fetch articles when passed', async () => {
    mockGetArticles(exampleArticles)

    const api = new Api()
    expect((await api.getArticles('氖氣', 'a', 'b')).data).toEqual(exampleArticles)
  })
})
