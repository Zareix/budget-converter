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

export type Transaction = {
  date: `${number}/${number}`
  originalDate: Date
  name: string
  amount: string // with a coma as decimal separator
  category: Category
  payementMethod:
    | 'Carte SG'
    | 'Carte AMEX'
    | 'Carte Revolut'
    | 'Carte compte joint'
    | 'Tricount Lola'
    | 'Espèces'
}
export const PROVIDERS = ['amex', 'revolut'] as const
export type Provider = (typeof PROVIDERS)[number]
