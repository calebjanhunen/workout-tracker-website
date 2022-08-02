import React, { useEffect, useState } from 'react';

import { useLazyGetExercisesByQueryQuery } from 'redux/features/exercisesApiSlice';

export const useFetchExercises = (pageNum, bodyPart, searchQuery) => {
    const [getExercisesByQuery] = useLazyGetExercisesByQueryQuery();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [exercises, setExercises] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setExercises([]);
    }, [searchQuery, bodyPart]);

    useEffect(() => {
        async function getExercises() {
            setIsLoading(true);
            setIsError(false);
            try {
                const { data } = await getExercisesByQuery({
                    pageNum,
                    bodyPart,
                    searchQuery,
                });
                setIsLoading(false);
                console.log(data.exercises);

                setExercises(prev => [
                    ...new Set([...prev, ...data.exercises]),
                ]);

                setHasMore(data.exercises.length > 0);
            } catch (err) {
                setIsError(true);
            }
        }

        getExercises();
    }, [getExercisesByQuery, bodyPart, searchQuery, pageNum]);

    return { exercises, isLoading, isError, hasMore };
};
