import {gql, useMutation} from '@apollo/client';

export const LoginMutations = gql`
  mutation girisYap($kname: String!, $password: String!) {
    girisYap(kullaniciAd: $kname, parola: $password) {
      kullaniciAd
      id
    }
  }
`;
export const RegisterMutations = gql`
  mutation (
    $uname: String!
    $enamil: String!
    $password: String!
    $conpassword: String!
  ) {
    uyeOl(
      kullaniciAd: $uname
      email: $enamil
      parola: $password
      parolaKontrol: $conpassword
    )
  }
`;

export const AddPostMutations = gql`
  mutation addPost($uname: String!, $text: String!) {
    addPost(KullaniciId: $uname, body: $text)
  }
`;
