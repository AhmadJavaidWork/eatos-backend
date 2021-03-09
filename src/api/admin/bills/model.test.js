import { Bills } from '.'
import { User } from '../user'

let user, bills

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  bills = await Bills.create({ user, amount: 'test', participents: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = bills.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(bills.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.amount).toBe(bills.amount)
    expect(view.participents).toBe(bills.participents)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = bills.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(bills.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.amount).toBe(bills.amount)
    expect(view.participents).toBe(bills.participents)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
