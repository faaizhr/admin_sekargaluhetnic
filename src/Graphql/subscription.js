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

export const SubscriptionReturBarangPakaian = gql `
subscription MySubscription {
  sekargaluhetnic_retur_produk(where: {pesanan_pakaian_id: {_is_null: false}}) {
    alasan
    id
    pesanan_jahit_id
    pesanan_pakaian_id
    status
    user_id
    retur_produk_pesanan_pakaian {
      bukti_pembayaran
      created_at
      id
      kode_pemesanan
      metode_pembayaran
      nama_rekening_pemilik
      ongkir
      opsi_pengiriman
      pesanan_session
      status
      total_harga
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
          material
          nama
          stok
          ukuran
          kode_produk
        }
      }
    }
  }
}
`

export const SubscriptionReturBarangJahit = gql `
subscription MySubscription {
  sekargaluhetnic_retur_produk(where: {pesanan_jahit_id: {_is_null: false}}) {
    alasan
    id
    pesanan_jahit_id
    pesanan_pakaian_id
    status
    user_id
    retur_produk_pesanan_jahit {
      bukti_pembayaran
      created_at
      deskripsi
      foto_desains {
        user_id
        pesanan_jahit_id
        id
        foto
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
      total_biaya
      updated_at
    }
  }
}
`