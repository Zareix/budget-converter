export const Categories = [
  '🛒 Courses',
  '🍣 Restaurant',
  '🍹 Bar/Café',
  '🚕 Transport',
  '🎫 Divertissement',
  '🛍️ Shopping',
  '🌍 Voyage',
  '⛑️ Santé',
  '🏡 Maison',
  '🎁 Cadeaux',
  '🙏 Dons',
  '💬 Autres',
] as const
export type Category = (typeof Categories)[number]

export const PAYMENT_METHODS = [
  'Carte SG',
  'Carte AMEX',
  'Carte Revolut',
  'Carte compte joint',
  'Tricount Lola',
  'Espèces',
] as const
export type PaymentMethod = (typeof PAYMENT_METHODS)[number]

export const isPaymentMethod = (value: string): value is PaymentMethod => {
  return PAYMENT_METHODS.includes(value as PaymentMethod)
}

export type Transaction = {
  date: `${number}/${number}` // in format DD/MM
  originalDate: Date
  name: string
  amount: string // with a coma as decimal separator
  category: Category
  paymentMethod: PaymentMethod
}
export const PROVIDERS = ['amex', 'revolut'] as const
export type Provider = (typeof PROVIDERS)[number]
