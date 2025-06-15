const { getWeatherByCity } = require('../weatherService');

global.fetch = jest.fn()

describe('getWeatherByCity', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  it('throws an error if city is empty', async () => {
    await expect(getWeatherByCity('')).rejects.toThrow("City name is required")
  })

  it('calls fetch with correct URL', async () => {
    const mockData = { name: 'Nairobi', main: { temp: 25 } }
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    })

    const result = await getWeatherByCity('Nairobi')

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('q=Nairobi'))
    expect(result).toEqual(mockData)
  })

  it('throws error if fetch response is not ok', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "city not found" })
    })

    await expect(getWeatherByCity('InvalidCity')).rejects.toThrow("city not found")
  })

  it('encodes city names with spaces', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ name: 'New York' })
    })

    await getWeatherByCity('New York')

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('q=New%20York'))
  })
})
