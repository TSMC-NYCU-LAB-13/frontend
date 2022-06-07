import HomeView from '@/views/HomeView'
import { defineComponent } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { Bar } from 'vue-chartjs'
import { BarElement } from 'chart.js'
import {
  exampleArticles,
  exampleKeywords,
  exampleStatistics
} from '../fake'

const mockExampleKeywords = exampleKeywords
const mockExampleStatistics = exampleStatistics
const mockExampleArticles = exampleArticles

jest.mock('@/api.js', () => jest.fn().mockImplementation(() => ({
  getKeywords: jest.fn(async () => ({ data: mockExampleKeywords })),
  getWeeklyStatistics: jest.fn(async (limit = 10) => ({ data: mockExampleStatistics })),
  getArticles: jest.fn(async (keyword, start, end) => ({ data: mockExampleArticles }))
})))

test('renders a chart and a conditional table', async () => {
  const HomeViewComponent = defineComponent({
    components: { HomeView },
    template: '<Suspense><HomeView/></Suspense>'
  })

  const wrapper = mount(HomeViewComponent)

  await flushPromises()

  const chart = wrapper.get('.chart-container')
  expect(chart).toBeTruthy()

  expect(wrapper.find('table').exists()).toBe(false)

  const elem = {
    element: new BarElement(),
    datasetIndex: 1,
    index: 1
  }

  await wrapper.getComponent(Bar).props('chartOptions').onClick({}, [elem])

  await flushPromises()

  expect(wrapper.find('.table').exists()).toBe(true)
})
