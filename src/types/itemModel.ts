export interface ApiItemsResponse {
    items: itemModel[]
}

export interface itemModel {
  title: string
  description: string
  price: number
  email: string
  image: string
}
