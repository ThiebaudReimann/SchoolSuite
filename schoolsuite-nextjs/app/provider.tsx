"use client";

import { useRouter } from 'next/navigation';
import { Provider } from '@react-spectrum/s2';

// Configure the type of the `routerOptions` prop on all React Spectrum components.
declare module '@react-spectrum/s2' {
    interface RouterConfig {
        routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>['push']>[1]>
    }
}

export function ClientProvider({ lang, children }: { lang: string, children: React.ReactNode }) {
    let router = useRouter();

    return (
        <Provider elementType="html" locale={lang} router={{ navigate: router.push }}>
            {children}
        </Provider>
    );
}