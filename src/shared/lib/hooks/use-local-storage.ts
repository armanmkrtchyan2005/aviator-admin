import { useLayoutEffect } from "react";

export const useLocalStorage = <T = unknown>(key: string, initialValue?: T) => {
    useLayoutEffect(() => {
        if (!initialValue) return;

        try {
            window.localStorage.setItem(key, JSON.stringify(initialValue));
        } catch (error) {
            console.error(error);
        }
    }, [key, initialValue]);

    const setItem = (value: T) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }
    };

    const getItem = () => {
        try {
            const item = window.localStorage.getItem(key);

            if (!item) return;

            return JSON.parse(item);
        } catch (error) {
            console.error(error);
        }
    };

    const removeItem = () => {
        try {
            window.localStorage.removeItem(key);
        } catch (error) {
            console.error(error);
        }
    };

    return { setItem, getItem, removeItem };
};
