import { UserBills } from '.'
import { User } from '../user'

let user, userBills

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  userBills = await UserBills.create({ user, userId: 'test', amount: 'test', chapati: 'test', salan: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = userBills.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(userBills.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.userId).toBe(userBills.userId)
    expect(view.amount).toBe(userBills.amount)
    expect(view.chapati).toBe(userBills.chapati)
    expect(view.salan).toBe(userBills.salan)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = userBills.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(userBills.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.userId).toBe(userBills.userId)
    expect(view.amount).toBe(userBills.amount)
    expect(view.chapati).toBe(userBills.chapati)
    expect(view.salan).toBe(userBills.salan)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
