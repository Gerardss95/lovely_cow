export interface ApiItemsResponse {
    items: itemModel[]
}

export interface itemsListModel extends itemModel {
    id: number
}
export interface itemModel {
  title: string
  description: string
  price: string
  email: string
  image: string
}


