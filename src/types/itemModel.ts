export interface ApiItemsResponse {
    items: itemModel[]
}

export interface itemModel {
  title: string
  description: string
  price: string
  email: string
  image: string
}
