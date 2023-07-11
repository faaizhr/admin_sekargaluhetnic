import { gql, useQuery, useLazyQuery } from "@apollo/client"

export const InsertKain = gql `
mutation MyMutation($object: sekargaluhetnic_kain_insert_input = {}) {
  insert_sekargaluhetnic_kain_one(object: $object) {
    deskripsi
    foto
    harga
    id
    nama
  }
}
`
// {
//   "object": {
//     "nama": "Batik Awan Biru",
//     "foto": "https://firebasestorage.googleapis.com/v0/b/sekargaluhetnic.appspot.com/o/Kain%2Fimage1.png?alt=media&token=b96fd3bd-2c83-4a90-ab09-3ab44e879076",
//     "harga": 230000,
//     "deskripsi": "Lorem Ipsum Dolor sit amet"
//   }
// }

export const DeleteKain = gql `
mutation MyMutation($_eq: Int!) {
  delete_sekargaluhetnic_kain(where: {id: {_eq: $_eq}}) {
    affected_rows
    returning {
      nama
    }
  }
}
`
// {
//   "_eq": 5
// }

export const UpdateKain = gql `
mutation MyMutation($_set: sekargaluhetnic_kain_set_input = {}, $_eq: Int!) {
  update_sekargaluhetnic_kain(where: {id: {_eq: $_eq}}, _set: $_set) {
    affected_rows
  }
}
`
// {
//   "_eq": 7,
//   "_set": {
//     "foto": "asdas",
//     "deskripsi": "loremipsumdolorsitamet",
//     "harga": 24000000,
//     "nama": "batik cirebon"
//   }
// }



export const InsertKatalog = gql `
mutation MyMutation($object: sekargaluhetnic_katalog_insert_input = {}) {
  insert_sekargaluhetnic_katalog_one(object: $object) {
    id
    nama
  }
}
`
// {
//   "object": {
//     "nama": "asdasda",
//     "deskripsi": "asdasdas",
//     "harga": 234000,
//     "gender": "Pria",
//     "foto": "sdasdasdasdas"
//     "ukuran": "all size",
//     "kode_produk": "",
//     "material": "",
//     "stok": 1
//   }
// }

export const DeleteKatalog = gql `
mutation MyMutation($_eq: Int = 10) {
  delete_sekargaluhetnic_katalog(where: {id: {_eq: $_eq}}) {
    affected_rows
  }
}
`
// {
//   "_eq": 5
// }

export const UpdateKatalog = gql `
mutation MyMutation($_eq: Int!, $_set: sekargaluhetnic_katalog_set_input = {}) {
  update_sekargaluhetnic_katalog(where: {id: {_eq: $_eq}}, _set: $_set) {
    affected_rows
    returning {
      id
    }
  }
}
`
// {
//   "_eq": 7,
//   "_set": {
//     "nama": "Batik Lurik",
//     "deskripsi": "Batik Lurik Khas Cirebon",
//     "foto": "ashdjasdkjsad",
//     "harga": 500000,
//     "gender": "Wanita"
//   }
// }

export const CancelPesanan = gql `
mutation MyMutation($_eq: Int!, $status: String = "") {
  update_sekargaluhetnic_pesanan_pakaian(where: {id: {_eq: $_eq}}, _set: {status: $status}) {
    affected_rows
    returning {
      id
    }
  }
}
`
// {
//   "_eq": 59,
//   "status": "Dibatalkan"
// }

export const CancelPesananJahit = gql `
mutation MyMutation($_eq: Int!) {
  update_sekargaluhetnic_pesanan_jahit(where: {id: {_eq: $_eq}}, _set: {status: "Dibatalkan"}) {
    affected_rows
  }
}
`
// {
//   "_eq": 32,
// }


export const InsertChat = gql `
mutation MyMutation($object: sekargaluhetnic_chat_insert_input = {}) {
  insert_sekargaluhetnic_chat_one(object: $object) {
    id
  }
}
`
// {  VARIABLES YANG DIPERLUKAN
//   "object": {
//     "pesanan_pakaian_id": 8,
//     "user_id": 3,
//     "message": "balas chat"
//   }
// }

export const InsertChatJahit = gql `
mutation MyMutation($object: sekargaluhetnic_chat_jahit_insert_input = {}) {
  insert_sekargaluhetnic_chat_jahit_one(object: $object) {
    id
  }
}
`
// {
//   "object": {
//     "pesanan_jahit_id": 30,
//     "user_id": "2",
//     "message": "halo lagi"
//   }
// }

export const KonfirmasiPembayaranPesananPakaian = gql ` 
mutation MyMutation($_eq: Int!, $status: String = "") {
  update_sekargaluhetnic_pesanan_pakaian(where: {id: {_eq: $_eq}}, _set: {status: $status}) {
    affected_rows
  }
}
`
// {
//   _eq: 2,
//   status: status
// }

export const KonfirmasiPembayaranPesananJahit = gql `
mutation MyMutation($_eq: Int!, $status: String!) {
  update_sekargaluhetnic_pesanan_jahit(where: {id: {_eq: $_eq}}, _set: {status: $status}) {
    affected_rows
  }
}
`
// {
//   _eq: 2,
//   status: status
// }

export const HandleChangeStatusRetur = gql `
mutation MyMutation($_eq: Int!, $status: String!) {
  update_sekargaluhetnic_retur_produk(where: {id: {_eq: $_eq}}, _set: {status: $status}) {
    affected_rows
  }
}
`
// {
//   _eq: 2,
//   status: status
// }


export const HandleInputNomorResi = gql `
mutation MyMutation($id: Int!, $nomor_resi: String = "") {
  update_sekargaluhetnic_pesanan_pakaian_by_pk(pk_columns: {id: $id}, _set: {nomor_resi: $nomor_resi}) {
    id
  }
}
`
// {
//   "id": 92,
//   "nomor_resi": "AS76A8VSAS8BAS"
// }


export const HandleInputNomorResiJahit = gql `
mutation MyMutation($id: Int!, $nomor_resi: String!) {
  update_sekargaluhetnic_pesanan_jahit_by_pk(pk_columns: {id: $id}, _set: {nomor_resi: $nomor_resi}) {
    id
  }
}
`
// {
//   "id": 92,
//   "nomor_resi": "AS76A8VSAS8BAS"
// }