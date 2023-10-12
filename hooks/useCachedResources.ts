import { useEffect, useState } from "react";

export default function useCachedResources() {

    const [isLoadingComplete, setLoadingComplete] = useState(false);

    useEffect(() => {

        async function loadResourcesAndDataAsync() {

            try {

                // Do nothing for now

            } catch (error) {

                console.error(error);

            } finally {

                setLoadingComplete(true);

            }

        }

        loadResourcesAndDataAsync();

    }, []);

    return isLoadingComplete;

}
