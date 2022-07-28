import { apiSlice } from "redux/api/apiSlice";

export const workoutTemplatesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getWorkoutTemplates: builder.query({
            query: () => "/workoutTemplates",
            providesTags: ["workoutTemplates"],
        }),
        createWorkoutTemplate: builder.mutation({
            query: workoutTemplate => ({
                url: "/workoutTemplates",
                method: "POST",
                body: workoutTemplate,
            }),
            invalidatesTags: ["workoutTemplates"],
        }),
        deleteWorkoutTemplate: builder.mutation({
            query: id => ({
                url: `/workoutTemplates/${id}`,
                method: "DELETE",
                body: id,
            }),
            invalidatesTags: ["workoutTemplates"],
        }),
    }),
});

export const {
    useCreateWorkoutTemplateMutation,
    useDeleteWorkoutTemplateMutation,
    useGetWorkoutTemplatesQuery,
} = workoutTemplatesApiSlice;
