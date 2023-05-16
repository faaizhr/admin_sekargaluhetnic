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

export const GetPesananPakaianDetail = gql `
query MyQuery($_eq: Int!) {
  sekargaluhetnic_pesanan_pakaian(where: {id: {_eq: $_eq}}) {
    created_at
    id
    kode_pemesanan
    ongkir
    opsi_pengiriman
    pesanan_session
    status
    total_harga
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
    pesanans {
      created_at
      id
      katalog_id
      pesanan_pakaian_id
      katalog {
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
    bukti_pembayaran
    metode_pembayaran
    nama_rekening_pemilik
  }
}
`

export const GetPesananJahitDetail = gql `
query MyQuery($_eq: Int!) {
  sekargaluhetnic_pesanan_jahit(where: {id: {_eq: $_eq}}) {
    created_at
    deskripsi
    foto_desains {
      foto
      id
      pesanan_jahit_id
      user_id
    }
    id
    jahit_session
    jenis_pakaian
    kain
    kode_pemesanan
    lebar_bahu
    lingkar_dada
    lingkar_kerung_lengan
    lingkar_leher
    lingkar_pergelangan_tangan
    lingkar_pinggang
    lingkar_pinggul
    metode_pembayaran
    nama_rekening_pemilik
    ongkir
    opsi_pengiriman
    panjang_baju
    panjang_lengan
    status
    bukti_pembayaran
    total_biaya
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
  }
}

`