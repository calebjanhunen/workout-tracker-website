import { apiSlice } from 'redux/api/apiSlice';

export const exercisesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createExercise: builder.mutation({
            query: exercise => ({
                url: '/exercises',
                method: 'POST',
                body: exercise,
            }),
            invalidatesTags: ['exercises'],
        }),
        getExercises: builder.query({
            query: () => '/exercises',
            providesTags: ['exercises'],
        }),
        getExercisesByQuery: builder.query({
            query: ({ bodyPart }) => `/exercises?bodyPart=${bodyPart}`,
            providesTags: ['exercises'],
        }),
        getExerciseById: builder.query({
            query: id => `/exercises/${id}`,
        }),
        updateExercise: builder.mutation({
            query: ({ sets, id }) => ({
                url: `/exercises/${id}`,
                method: 'PATCH',
                body: sets,
            }),
        }),
        deleteExercise: builder.mutation({
            query: id => ({
                url: `/exercises/${id}`,
                method: 'DELETE',
                body: id,
            }),
            invalidatesTags: ['exercises'],
        }),
    }),
});

export const {
    useCreateExerciseMutation,
    useGetExercisesQuery,
    useLazyGetExercisesQuery,
    useLazyGetExercisesByQueryQuery,
    useGetExercisesByQueryQuery,
    useGetExerciseByIdQuery,
    useUpdateExerciseMutation,
    useDeleteExerciseMutation,
} = exercisesApiSlice;
