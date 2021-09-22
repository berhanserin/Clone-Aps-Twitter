import {gql} from '@apollo/client';
export const gelAllPost = gql`
  query {
    getPost {
      id
      kullanici {
        kullaniciAd
        id
      }
      body
      olusturulmaTarihi
    }
  }
`;
