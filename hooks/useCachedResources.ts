import { useEffect, useState } from "react";
import { SplashScreen } from "expo-router";

export default function useCachedResources() {

    const [isLoadingComplete, setLoadingComplete] = useState(false);

    useEffect(() => {

        async function loadResourcesAndDataAsync() {

            try {

                // Do nothing for now

            } catch (error) {

                console.error(error);

            } finally {

                SplashScreen.hideAsync();

                setLoadingComplete(true);

            }

        }

        loadResourcesAndDataAsync();

    }, []);

    return isLoadingComplete;

}
