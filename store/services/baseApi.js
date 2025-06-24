// store/services/api.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
    tagTypes: ["User", "Cart", "Favorites", "Orders"],
    endpoints: () => ({}), // leave empty if using injectEndpoints
});
