import { Wallets } from '.'
import { User } from '../user'

let user, wallets

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  wallets = await Wallets.create({ user, amount: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = wallets.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(wallets.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.amount).toBe(wallets.amount)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = wallets.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(wallets.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.amount).toBe(wallets.amount)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
