import { CHART_COLORS, color } from '@/utils/color'

describe('color.js', () => {
  it('has predefined colors when passed', function () {
    expect(Array.isArray(CHART_COLORS)).toBe(true)
    for (const c of CHART_COLORS) {
      expect(c.startsWith('rgb(')).toBe(true)
    }
  })

  it('generates colors when passed', function () {
    expect(color(0) === color(1)).toBe(false)

    const c1 = color(1)
    expect(color(1, 0.712).startsWith(c1.substring(0, -1))).toBe(true)
    expect(color(1, 0.712).indexOf('0.712')).toBeGreaterThanOrEqual(0)
  })
})
