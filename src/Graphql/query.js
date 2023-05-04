import { gql, useQuery, useLazyQuery } from "@apollo/client"

export const GetKain = gql `
query MyQuery {
  sekargaluhetnic_kain {
    deskripsi
    foto
    harga
    id
    nama
  }
}
`

export const GetLazyKain = gql ` 
query MyQuery($_eq: Int!) {
  sekargaluhetnic_kain(where: {id: {_eq: $_eq}}) {
    deskripsi
    foto
    harga
    id
    nama
  }
}
`

export const GetKatalog = gql `
query MyQuery {
  sekargaluhetnic_katalog {
    deskripsi
    foto
    gender
    harga
    id
    nama
  }
}
`

export const GetPesananPakaian = gql ` 
query MyQuery {
  sekargaluhetnic_pesanan_pakaian(where: {pesanans_aggregate: {count: {predicate: {_gt: 0}}}}) {
    created_at
    id
    ongkir
    pesanan_session
    status
    total_harga
    user_id
    user {
      email
      id
      jenis_kelamin
      name
      password
      alamats {
        alamat
        id
        kabupaten_kota
        kecamatan
        kelurahan
        kodepos
        negara
        provinsi
      }
      telephone
    }
    pesanans {
      id
      created_at
      katalog_id
      pesanan_pakaian_id
      katalog {
        deskripsi
        foto
        gender
        harga
        id
        nama
      }
    }
    chats {
      id
      message
      pesanan_pakaian_id
      user_id
    }
  }
}
`

export const GetPesananJahit = gql `
query MyQuery($_neq: String = "null") {
  sekargaluhetnic_pesanan_jahit(where: {jenis_pakaian: {_neq: $_neq}}) {
    created_at
    id
    jahit_session
    jenis_pakaian
    kain
    panjang_lengan
    ukuran_leher
    updated_at
    user_id
    user {
      email
      id
      jenis_kelamin
      name
    }
    foto_desains {
      foto
      id
    }
  }
}
`