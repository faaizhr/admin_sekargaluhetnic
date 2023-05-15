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
  sekargaluhetnic_katalog(order_by: {id: desc}) {
    deskripsi
    foto
    gender
    harga
    id
    nama
    material
    kode_produk
    stok
    ukuran
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
    opsi_pengiriman
    kode_pemesanan
  }
}
`

export const GetPesananJahit = gql `
query MyQuery($_neq: String = "null") {
  sekargaluhetnic_pesanan_jahit(where: {jenis_pakaian: {_neq: $_neq}}, order_by: {id: desc}) {
    created_at
    id
    jahit_session
    jenis_pakaian
    kain
    panjang_lengan
    updated_at
    user_id
    user {
      email
      id
      jenis_kelamin
      name
      telephone
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
    }
    foto_desains {
      foto
      id
    }
    kode_pemesanan
    lebar_bahu
    lingkar_dada
    lingkar_kerung_lengan
    lingkar_leher
    lingkar_pergelangan_tangan
    lingkar_pinggang
    lingkar_pinggul
    ongkir
    opsi_pengiriman
    panjang_baju
    status
    total_biaya
    deskripsi
  }
}


`