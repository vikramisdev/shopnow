// store/services/userEndpoints.ts

import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => "user",
            providesTags: ["User"],
        }),
        updateProfile: builder.mutation({
            query: (body) => ({
                url: "user",
                method: "POST",
                body,
            }),
            invalidatesTags: ["User"],
        }),
        getCart: builder.query({
            query: () => "user/cart",
            providesTags: ["Cart"],
        }),
        toggleCartItem: builder.mutation({
            query: (item) => ({
                url: "user/cart",
                method: "POST",
                body: item,
            }),
            invalidatesTags: ["Cart"],
        }),
        getFavorites: builder.query({
            query: () => "user/favorites",
            providesTags: ["Favorites"],
        }),
        toggleFavorite: builder.mutation({
            query: (item) => ({
                url: "user/favorites",
                method: "POST",
                body: item,
            }),
            invalidatesTags: ["Favorites"],
        }),
        getOrders: builder.query({
            query: () => "user/order",
            providesTags: ["Orders"],
        }),
        placeOrder: builder.mutation({
            query: (orderData) => ({
                url: "user/order",
                method: "POST",
                body: orderData,
            }),
            invalidatesTags: ["Orders", "Cart"],
        }),
        cancelOrder: builder.mutation({
            query: (orderId) => ({
                url: `user/order/${orderId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Orders"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useGetCartQuery,
    useToggleCartItemMutation,
    useGetFavoritesQuery,
    useToggleFavoriteMutation,
    useGetOrdersQuery,
    usePlaceOrderMutation,
    useCancelOrderMutation, // <-- add this
} = userApi;

