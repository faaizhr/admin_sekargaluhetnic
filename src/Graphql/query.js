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
    nomor_resi
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
    nomor_resi
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

export const CountPesananJahit = gql `
query MyQuery {
  sekargaluhetnic_pesanan_jahit_aggregate(where: {kode_pemesanan: {_is_null: false}}) {
    aggregate {
      count
    }
  }
}
`

export const CountPesananPakaian = gql `
query MyQuery {
  sekargaluhetnic_pesanan_pakaian_aggregate(where: {pesanans_aggregate: {count: {predicate: {_gt: 0}}}}) {
    aggregate {
      count
    }
  }
}

`

export const CountMonthPesananPakaian = gql `
query MyQuery($_like: String = "", $_ilike: String = "") {
  sekargaluhetnic_pesanan_pakaian_aggregate(where: {created_at: {_like: $_like, _ilike: $_ilike}}) {
    aggregate {
      count
    }
  }
}
`
// {
//   "_like" : "%2023%",
//   "_ilike": "%may%"
// }

export const CountMonthPesananJahit = gql `
query MyQuery($_like: String = "", $_ilike: String = "") {
  sekargaluhetnic_pesanan_jahit_aggregate(where: {created_at: {_like: $_like, _ilike: $_ilike}}) {
    aggregate {
      count
    }
  }
}
`

export const SumPesananPakaian = gql `
query MyQuery {
  sekargaluhetnic_pesanan_pakaian_aggregate(where: {pesanans_aggregate: {count: {predicate: {_gt: 0}}}, status: {_nsimilar: "Menunggu Pembayaran||Pembayaran Ditolak||Dibatalkan"}}) {
    aggregate {
      sum {
        total_harga
      }
    }
  }
}

`

export const SumPesananJahit = gql `
query MyQuery {
  sekargaluhetnic_pesanan_jahit_aggregate(where: {status: {_nsimilar: "Menunggu Pembayaran||Pembayaran Ditolak||Dibatalkan"}}) {
    aggregate {
      sum {
        total_biaya
      }
    }
  }
}

`

export const GetPesananPakaianFilter = gql ` 
query MyQuery($_ilike: String = "") {
  sekargaluhetnic_pesanan_pakaian(where: {status: {_ilike: $_ilike}, pesanans_aggregate: {count: {predicate: {_gt: 0}}}}, order_by: {id: desc}) {
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

export const GetPesananJahitFilter = gql `
query MyQuery($_neq: String = "null", $_ilike: String!) {
  sekargaluhetnic_pesanan_jahit(where: {jenis_pakaian: {_neq: $_neq}, status: {_ilike: $_ilike}}, order_by: {id: desc}) {
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
    metode_pembayaran
    nama_rekening_pemilik
  }
}

`

export const PaginatePesananPakaian = gql `
query MyQuery($month: String = "", $year: String = "", $day: String = "", $offset: Int!) {
  sekargaluhetnic_pesanan_pakaian(where: {created_at: {_ilike: $month}, status: {_eq: "Pesanan Selesai"}, _and: {created_at: {_ilike: $year}, _and: {created_at: {_ilike: $day}, pesanans_aggregate: {count: {predicate: {_gt: 0}}}}}}, limit: 5, offset: $offset, order_by: {id: desc}) {
    id
    bukti_pembayaran
    created_at
    kode_pemesanan
    metode_pembayaran
    nama_rekening_pemilik
    ongkir
    opsi_pengiriman
    pesanan_session
    status
    total_harga
    user_id
    pesanans {
      katalog {
        nama
      }
    }
    pesanans_aggregate {
      aggregate {
        count
      }
    }
  }
}
`
// {
//   "offset": 5
// }

export const PaginateCountPesananPakaian = gql `
query MyQuery {
  sekargaluhetnic_pesanan_pakaian(where: {pesanans_aggregate: {count: {predicate: {_gt: 0}}}, status: {_eq: "Pesanan Selesai"}}, order_by: {id: desc}) {
    id
    bukti_pembayaran
    created_at
    kode_pemesanan
    metode_pembayaran
    nama_rekening_pemilik
    ongkir
    opsi_pengiriman
    pesanan_session
    status
    total_harga
    user_id
    pesanans {
      katalog {
        nama
      }
    }
    pesanans_aggregate {
      aggregate {
        count
      }
    }
  }
}
`

export const PaginatePesananJahit = gql `
query MyQuery($offset: Int!, $day: String = "", $month: String = "", $year: String = "") {
  sekargaluhetnic_pesanan_jahit(limit: 5, offset: $offset, order_by: {id: desc}, where: {created_at: {_ilike: $day}, _and: {created_at: {_ilike: $month}, _and: {created_at: {_ilike: $year}, jenis_pakaian: {_is_null: false}}}, status: {_eq: "Pesanan Selesai"}}) {
    bukti_pembayaran
    created_at
    deskripsi
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
    status
    total_biaya
    updated_at
    user_id
  }
}


`
// {
//   "offset": 0,
//   "day": "%%",
//   "month": "%%",
//   "year": "%%"
// }

export const PaginateCountPesananJahit = gql `
query MyQuery {
  sekargaluhetnic_pesanan_jahit_aggregate(where: {jenis_pakaian: {_is_null: false}, status: {_eq: "Pesanan Selesai"}}) {
    aggregate {
      count
    }
  }
}
`