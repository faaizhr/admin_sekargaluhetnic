import { gql, useQuery, useLazyQuery, useSubscription } from "@apollo/client"

export const SubscriptionKatalog = gql `
subscription MySubscription {
  sekargaluhetnic_katalog(order_by: {id: desc}) {
    deskripsi
    foto
    gender
    harga
    id
    kode_produk
    material
    nama
    stok
    ukuran
  }
}
`

export const SubscriptionKain = gql `
subscription MySubscription {
  sekargaluhetnic_kain(order_by: {id: desc}) {
    deskripsi
    foto
    harga
    id
    nama
  }
}
`