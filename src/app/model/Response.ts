export interface Result {
  date: Date
  message: string
}

export interface ErrorMsg {
  code: string
  message: string
}

export interface ResponseNode {
  DoppioTennis: number
  SingoloTennis: number
  Padel: number
}

export interface Token {
  token: string
}
