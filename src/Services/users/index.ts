import { API } from "../base";


// export interface User {
//   id: number;
//   email: string;
//   name: string;
//   phone: string;
//   username: string;
// }

type UserForm = {
  username: string,
  password: string,
}

const userApi = API.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.mutation<any, Partial<any>>({
      query: (params) => ({
        url: `users/${params.username}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${params.token}`,
        }
      })
    }),
  }),
  overrideExisting: true,

});


const updateUser = API.injectEndpoints({
  endpoints: (build) => ({
    updateUser: build.mutation<any, Partial<any>>({
      query: (params) => ({
        url: `users/${params.id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
        body: params.info
      })
    }),
  }),
  overrideExisting: true,
});

const loginDB = API.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<any, Partial<any>>({
      query: (body: UserForm) => ({
        url: 'auth/login',
        method: 'POST',
        body
      })
    }),
  }),
  overrideExisting: true,
})


const register = API.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<any, Partial<any>>({
      query: (body: UserForm) => ({
        url: 'users/signup',
        method: 'POST',
        body
      })
    }),
  }),
  overrideExisting: true,
})
export const { useGetUserMutation } = userApi;
export const { useLoginMutation } = loginDB;
export const {useRegisterMutation} = register
export const {useUpdateUserMutation} = updateUser
