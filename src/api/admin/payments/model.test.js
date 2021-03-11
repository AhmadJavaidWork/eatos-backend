import { Payments } from '.'
import { User } from '../user'

let user, payments

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  payments = await Payments.create({ user, userId: 'test', amount: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = payments.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(payments.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.userId).toBe(payments.userId)
    expect(view.amount).toBe(payments.amount)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = payments.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(payments.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.userId).toBe(payments.userId)
    expect(view.amount).toBe(payments.amount)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
